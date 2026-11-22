"""Build the self-contained PivotPath HTML safely.

Use callable replacements: JavaScript String.replace-style replacement semantics
and some templating engines treat $' or $& specially and can corrupt embedded JS.
This script uses explicit split/join to preserve source bytes exactly.
"""
from pathlib import Path

root = Path(__file__).parent
html = (root / "template.html").read_text(encoding="utf-8")
for marker, filename in [
    ("/*__CSS__*/", "style.css"),
    ("/*__DATA__*/", "roles.json"),
    ("/*__JS__*/", "app.js"),
]:
    if html.count(marker) != 1:
        raise RuntimeError(f"Expected exactly one marker: {marker}")
    contents = (root / filename).read_text(encoding="utf-8")
    if marker == "/*__DATA__*/":
        contents = contents.strip()
    # Prevent an embedded literal closing script tag ending the inline script.
    if filename in ("roles.json", "app.js"):
        contents = contents.replace("</script", "<\\/script").replace("</SCRIPT", "<\\/SCRIPT")
    html = html.split(marker)[0] + contents + html.split(marker, 1)[1]

if html.count("</script>") != 1:
    raise RuntimeError("Expected exactly one closing script tag after bundling")
if "conversation_goal:S.coachGoal" not in html:
    raise RuntimeError("Chat history logic is missing from the generated page")
(root / "index.html").write_text(html, encoding="utf-8")
print("Bundled index.html", (root / "index.html").stat().st_size, "bytes")
