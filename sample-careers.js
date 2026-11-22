/* PivotPath prototype personas based on three real CVs supplied for testing.
   Public-friendly, curated excerpts only. No phone numbers, addresses, email
   addresses, age, private social links, or original CV files are included.
   Career track labels are NOT invented job titles or skill assessments. */
window.PIVOTPATH_SAMPLES = Object.freeze({
  JRA: {
    track:"Research Analyst",
    firstName:"Prachuit",
    experienceNote:"Research Associate at BCG. Source CV describes consulting research, an internal productization effort, strategy cases and technical work.",
    profile:{
      name:"Prachuit (sample)",
      role:"Research Associate",
      employer:"Boston Consulting Group (BCG)",
      years:"",
      education:"B.Tech (Honours), Electrical and Electronics Engineering — NIT Rourkela",
      skills:"Python, SQL, Excel, Power BI, PowerPoint, market research, peer benchmarking, organizational diagnostics",
      achievements:"Productized an AI-led organization-mapping solution: owned PRD development and refined application logic to structure raw workforce data, reducing turnaround time by 80% with adoption across 10+ cases.\nBenchmarked 10 global funding models for a national R&D innovation fund and built a six-KPI performance framework.\nPrioritized 100+ prospective buyers for a go-to-market research assignment.",
      source:"redacted CV-based sample"
    },
    sections:{
      experience:[
        {title:"Boston Consulting Group (BCG) — Research Associate", detail:"Consulting research / strategic diagnostics",kind:"entry"},
        {detail:"Productized an AI-led org-mapping workflow, owning the PRD and refining hierarchical structuring logic; reported 80% turnaround-time reduction and adoption across 10+ cases.",kind:"bullet"},
        {detail:"Benchmarked global R&D funding models and developed a six-KPI performance framework.",kind:"bullet"},
        {detail:"Conducted oil-and-gas and IT services market, organization and workforce diagnostics.",kind:"bullet"},
        {detail:"Prioritized 100+ prospective buyers in a go-to-market assignment and built 150+ target operating-model archetypes.",kind:"bullet"},
        {title:"Nation with NaMo — Summer Associate Consultant",detail:"Policy analysis and air-quality roadmap",kind:"entry"},
        {detail:"Modeled interventions and recommended 25+ reforms in a roadmap targeting reduced vehicular emissions.",kind:"bullet"}
      ],
      education:[
        {title:"NIT Rourkela — B.Tech (Honours)",detail:"Electrical and Electronics Engineering",kind:"entry"}
      ],
      projects:[
        {title:"EnhanceNet — multimodal emotion-recognition research",detail:"Integrated facial, speech and text inputs; reported 78.23% combined accuracy.",kind:"entry"},
        {title:"Matiks — product and marketing strategy",detail:"Worked on SEO, referral growth and college expansion as described in the source CV.",kind:"entry"}
      ],
      leadership:[
        {title:"INNOVISION — Convenor",detail:"Led a 300+ member festival team and managed the INR 90.5L event budget.",kind:"entry"},
        {title:"Analytics & Consulting Club — Founder",detail:"Built a student consulting group delivering live projects.",kind:"entry"}
      ],
      skills:[{detail:"Python, SQL, Excel, Power BI, PowerPoint, research, benchmarking, requirements writing",kind:"bullet"}]
    },
    followup:"For the AI org-mapping solution, which product decisions were yours, and what evidence did you use to prioritize them?"
  },
  AC: {
    track:"Associate Consultant",
    firstName:"Siya",
    experienceNote:"Consulting career-track example. The actual CV lists Business Analyst at Redseer, plus CRISIL, Invest India and Nation with NaMo internships—not an Associate Consultant job title.",
    profile:{
      name:"Siya (sample)",
      role:"Business Analyst",
      employer:"Redseer Strategy Consultants",
      years:"",
      education:"B.Com. (Honours) — Shri Ram College of Commerce, University of Delhi",
      skills:"Market sizing, investment research, market-entry analysis, competitor benchmarking, cost-benefit assessment, policy analysis",
      achievements:"Modeled a $2.5B FY2025 strategic investment opportunity in gaming and interactive media; evaluated growth segments and monetization opportunities.\nDeveloped a market overview for a furniture and appliance rental platform's DRHP and analyzed rental intent and ownership costs.\nAt CRISIL, drafted seven policies informed by sustainability benchmarking across 15+ peers.",
      source:"redacted CV-based sample"
    },
    sections:{
      internships:[
        {title:"Redseer Strategy Consultants — Business Analyst",detail:"Strategic investment research and sector opportunity assessments",kind:"entry"},
        {detail:"Modeled a $2.5B FY2025 gaming and interactive-media investment opportunity and segmented potential growth areas.",kind:"bullet"},
        {detail:"Developed a market overview for a furniture and appliance rental platform's DRHP and analyzed market demand and ownership economics.",kind:"bullet"},
        {title:"CRISIL — Consulting Intern",detail:"ESG and policy benchmarking",kind:"entry"},
        {detail:"Drafted seven policies based on comparative sustainability analysis of 15+ peers; assessed 50+ ESG parameters.",kind:"bullet"},
        {title:"Invest India — Research Intern",detail:"Trade policy and market-entry research",kind:"entry"},
        {detail:"Compared trade incentives in six countries and analyzed 20+ raw materials across international value chains.",kind:"bullet"},
        {title:"Nation with NaMo — Summer Associate",detail:"Governance and air-quality policy research",kind:"entry"},
        {detail:"Reviewed 10+ policies addressing Delhi air quality and benchmarked emission-control technologies.",kind:"bullet"}
      ],
      education:[
        {title:"Shri Ram College of Commerce — B.Com. (Honours)",detail:"University of Delhi; 8.97 CGPA as listed on the sample CV",kind:"entry"}
      ],
      projects:[
        {title:"TVS Motors — consumer perception project",detail:"Analyzed a 100+ respondent survey and benchmarked competing vehicles.",kind:"entry"},
        {title:"HDFC Capital Advisors — emerging technologies research",detail:"Evaluated five technologies addressing construction and demolition waste.",kind:"entry"}
      ],
      leadership:[
        {title:"Shri Ram Consulting & Research Centre — Director",detail:"Led a team of 30+ executives and organized a large consulting event.",kind:"entry"}
      ],
      skills:[{detail:"Market sizing, financial modeling, sector assessment, competitor benchmarking, ESG and policy research",kind:"bullet"}]
    },
    followup:"In the gaming or rental-market analysis, how did you decide which strategic opportunity deserved priority, and what assumptions were most uncertain?"
  },
  BA: {
    track:"Business Analyst",
    firstName:"Aryan",
    experienceNote:"Business/data-analyst career-track example. The actual CV lists Project Intern at Fractal Analytics and Analyst Intern at PwC; it does not establish a full-time Business Analyst title.",
    profile:{
      name:"Aryan (sample)",
      role:"Project Intern",
      employer:"Fractal Analytics",
      years:"",
      education:"B.Tech, Civil Engineering — NIT Rourkela",
      skills:"Data modeling, analytics automation, feature engineering, customer-feedback analysis, machine learning, AI workflow integration, product experimentation",
      achievements:"Built a data-driven scheduling tool using travel-time, location and availability inputs to automate sales planning.\nDeveloped an AI utility to standardize structured outputs from five AI providers and simulated four datasets with 30K+ records each.\nAt PwC, built a speech-to-text pipeline for customer calls and enriched a fault-prediction workflow with mobility signals.",
      source:"redacted CV-based sample"
    },
    sections:{
      experience:[
        {title:"Fractal Analytics — Project Intern",detail:"Business and analytics workflow automation",kind:"entry"},
        {detail:"Built a location- and availability-based scheduling tool for automated sales planning.",kind:"bullet"},
        {detail:"Standardized structured outputs across five AI providers and generated four synthetic datasets with 30K+ records each.",kind:"bullet"},
        {detail:"Automated creation of 40+ analytical features for faster hypothesis testing.",kind:"bullet"},
        {title:"PwC — Analyst Intern",detail:"Speech analytics and infrastructure fault prediction",kind:"entry"},
        {detail:"Built a speech-to-text pipeline to convert customer calls to structured feedback data.",kind:"bullet"},
        {detail:"Used sampling and mobility inputs in fault-detection models; the CV reports up to 90% prediction accuracy.",kind:"bullet"}
      ],
      education:[
        {title:"NIT Rourkela — B.Tech",detail:"Civil Engineering; CGPA 9.07/10 as listed on the sample CV",kind:"entry"}
      ],
      projects:[
        {title:"Matiks — Product & Marketing Strategy",detail:"Source CV reports user growth from 23K to 100K through SEO and referral-loop initiatives.",kind:"entry"},
        {title:"YouTube ad-experience MVP",detail:"Used survey and behavior findings about ad interruptions to design a Pause Ads MVP.",kind:"entry"},
        {title:"Multilingual sentiment-analysis publication",detail:"Benchmarked language-model outputs and developed multilingual sentiment models.",kind:"entry"}
      ],
      leadership:[
        {title:"Training Secretary — NIT Rourkela",detail:"Helped organize training for 1,000+ students.",kind:"entry"},
        {title:"Film & Music Society — Dean's Nominated Secretary",detail:"Led a 300+ member team and managed a multi-event budget.",kind:"entry"}
      ],
      skills:[{detail:"Analytics automation, data quality, feature engineering, AI integration, product experimentation",kind:"bullet"}]
    },
    followup:"When building the scheduling or AI-output standardization tool, how did you define the user problem and validate that your solution worked?"
  }
});