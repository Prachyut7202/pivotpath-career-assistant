"""Provider router for PivotPath: Groq, opt-in Gemini, and legacy OpenAI.
Secrets are environment variables; no client-side API keys.
Only use Gemini when allow_gemini is explicitly true for that browser session.
"""
import os
import re
import json
import httpx
import logging
from fastapi import HTTPException

GROQ_KEY = os.getenv("GROQ_API_KEY", "").strip()
GROQ_MODEL = os.getenv("GROQ_MODEL", "openai/gpt-oss-20b")
GEMINI_KEY = os.getenv("GEMINI_API_KEY", "").strip()
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash-lite")
OPENAI_KEY = os.getenv("OPENAI_API_KEY", "").strip()
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4.1-mini")
logger = logging.getLogger("pivotpath.providers")


def configured_providers():
    return [name for name, key in (("groq", GROQ_KEY), ("gemini", GEMINI_KEY), ("openai", OPENAI_KEY)) if key]


def parse_json_object(text):
    value = text.strip()
    value = re.sub(r"^\x60\x60\x60(?:json)?\s*|\s*\x60\x60\x60$", "", value).strip()
    try:
        parsed = json.loads(value)
    except json.JSONDecodeError:
        # Recover a single JSON object if a model accidentally adds a preface.
        match = re.search(r"\{[\s\S]*\}", value)
        if not match:
            raise ValueError("The provider did not return a JSON object")
        parsed = json.loads(match.group(0))
    if not isinstance(parsed, dict):
        raise ValueError("Expected a JSON object")
    return parsed


async def provider_request(client, provider, system, payload, max_tokens):
    prompt = json.dumps(payload, ensure_ascii=False)
    if provider == "groq":
        r = await client.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={"Authorization": "Bearer " + GROQ_KEY},
            json={"model": GROQ_MODEL,
                  "messages": [{"role": "system", "content": system},
                               {"role": "user", "content": prompt}],
                  "temperature": 0.45,
                  "response_format": {"type": "json_object"},
                  # GPT-OSS uses reasoning tokens. A 650-token budget can run
                  # out before the JSON reply starts; low effort + more room.
                  "reasoning_effort": "low",
                  "include_reasoning": False,
                  "max_completion_tokens": max(1800, min(3800, max_tokens * 3))})
        if r.status_code >= 400:
            raise RuntimeError("Groq HTTP " + str(r.status_code))
        completion = r.json()["choices"][0]
        content = completion.get("message", {}).get("content") or ""
        if not content.strip():
            raise ValueError("Groq returned empty output; finish_reason=" + str(completion.get("finish_reason","unknown")))
        return parse_json_object(content)
    if provider == "gemini":
        r = await client.post(
            "https://generativelanguage.googleapis.com/v1beta/models/" + GEMINI_MODEL + ":generateContent",
            headers={"x-goog-api-key": GEMINI_KEY},
            json={"systemInstruction": {"parts": [{"text": system}]},
                  "contents": [{"role": "user", "parts": [{"text": prompt}]}],
                  "generationConfig": {"responseMimeType": "application/json",
                                       "maxOutputTokens": max_tokens}})
        if r.status_code >= 400:
            raise RuntimeError("Gemini returned HTTP " + str(r.status_code))
        parts = r.json()["candidates"][0]["content"]["parts"]
        return parse_json_object("\n".join(x.get("text", "") for x in parts))
    if provider == "openai":
        r = await client.post(
            "https://api.openai.com/v1/responses",
            headers={"Authorization": "Bearer " + OPENAI_KEY},
            json={"model": OPENAI_MODEL, "instructions": system, "input": prompt,
                  "max_output_tokens": max_tokens, "store": False})
        if r.status_code >= 400:
            raise RuntimeError("OpenAI returned HTTP " + str(r.status_code))
        fragments = [item.get("text", "")
                     for msg in r.json().get("output", []) if msg.get("type") == "message"
                     for item in msg.get("content", []) if item.get("type") == "output_text"]
        return parse_json_object("\n".join(fragments))
    raise ValueError("Unknown provider")


async def route_json(system, payload, max_output_tokens=800, task="coach", allow_gemini=False):
    # Gemini's free API tier may use content to improve Google products. No
    # automatic routing of any personal career information to Gemini without opt-in.
    preferred = (["gemini", "groq", "openai"] if
                 task in ("assess", "resume") and allow_gemini
                 else ["groq", "gemini", "openai"])
    eligible = [p for p in preferred if p in configured_providers()
                and (p != "gemini" or allow_gemini)]
    if not eligible:
        raise HTTPException(503, "No eligible live AI provider. Configure GROQ_API_KEY or opt in to configured Gemini.")
    errors = []
    async with httpx.AsyncClient(timeout=20) as client:
        for provider in eligible:
            try:
                out = await provider_request(client, provider, system, payload, max_output_tokens)
                out["_provider"] = provider
                return out
            except (httpx.HTTPError, RuntimeError, ValueError, KeyError, IndexError, TypeError) as err:
                # Diagnostics expose only provider, exception class and HTTP
                # status, never prompts, responses, credentials, or raw bodies.
                message = str(err)
                status = re.search(r"HTTP\s+(\d{3})", message)
                code = ("HTTP " + status.group(1)) if status else (
                    "timeout" if isinstance(err, httpx.TimeoutException) else
                    "invalid response" if isinstance(err, (ValueError, KeyError, IndexError, TypeError)) else
                    "network error")
                errors.append(provider + ": " + code)
                logger.warning("PivotPath AI request failed: provider=%s, reason=%s", provider, code)
    raise HTTPException(502, "AI service unavailable (" + "; ".join(errors) + "). Your work is saved; try again.")
