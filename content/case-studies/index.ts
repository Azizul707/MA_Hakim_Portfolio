export const caseStudies: import("@/types").CaseStudy[] = [
  {
    title: "From 60% Lost Leads to 340% Growth",
    slug: "hvac-lead-transformation",
    industry: "HVAC",
    problem:
      "A 20-year-old HVAC company with 12 field technicians was hemorrhaging revenue. 60% of inbound leads never converted. Their phone system couldn't handle after-hours calls, email inquiries were checked once daily, and their dispatcher spent mornings manually routing jobs instead of handling urgent scheduling conflicts. They were losing an estimated $40,000/month in missed opportunities.",
    analysis:
      "We audited their full lead lifecycle over 30 days. Key findings: 70% of after-hours callers hung up after 30 seconds of ringing; web form submissions had no auto-responder, causing 48-hour first-contact latency; dispatch routing was done on paper printouts; no follow-up sequence existed for unconverted leads. The core issue was not volume but velocity — they had the demand, but couldn't process it fast enough.",
    solution:
      "We deployed a three-layer automation system: (1) AI call answering with natural language capture for after-hours calls; (2) automated lead qualification using NLP intent detection; (3) real-time API dispatch routing that matches job type, location, and technician availability. The entire system integrates with their existing CRM and dispatcher dashboard.",
    outcome:
      "Within 90 days: 340% increase in lead conversion rate. Average response time dropped from 24 hours to 28 seconds. Dispatch overhead reduced by 80%. Revenue increased by $35,000/month. The system paid for itself in the first month.",
    metrics: [
      { label: "Lead Conversion", value: "+340%" },
      { label: "Response Time", value: "24h → 28s" },
      { label: "Monthly Revenue Lift", value: "$35K" },
    ],
    technologies: ["OpenAI", "Twilio", "Make", "Supabase", "Next.js"],
    relatedProject: "ai-lead-qualification-system",
  },
  {
    title: "Multi-Location Review Recovery",
    slug: "restaurant-review-recovery",
    industry: "Restaurants",
    problem:
      "A 5-location restaurant group was seeing their average rating slide from 4.0 to 3.6 over six months. They had no system for responding to reviews — some negative reviews sat for two weeks without acknowledgment. Competitors with better review engagement were capturing market share despite similar food quality.",
    analysis:
      "We analyzed 2,400+ reviews across Google, Yelp, and TripAdvisor. The pattern was clear: negative reviews escalated because no one responded within the first 48 hours. Positive reviews received no engagement, reducing their algorithmic boost. Manual response drafting took 6+ hours weekly per location. The brand voice was inconsistent — some responses were apologetic, others defensive.",
    solution:
      "Built an AI-powered review management system that monitors all platforms in real-time. It classifies sentiment, urgency, and topic (food quality, service, wait times). Drafts brand-voice responses for positive reviews automatically. Flags critical negative reviews with a severity score and routes to the GM for human review before auto-suggesting a response.",
    outcome:
      "Response time dropped from 48 hours to under 5 minutes. Average rating recovered from 3.6 to 4.3 over 4 months. Review volume increased 150% (more engagement drives more reviews). GMs save 5+ hours weekly per location.",
    metrics: [
      { label: "Rating Recovery", value: "3.6 → 4.3" },
      { label: "Response Time", value: "48h → 5m" },
      { label: "Review Volume", value: "+150%" },
    ],
    technologies: ["AI Agent", "Google Maps API", "Yelp API", "Make", "React"],
  },
  {
    title: "Scheduling That Works While You Sleep",
    slug: "field-service-scheduling-transformation",
    industry: "Local Services",
    problem:
      "A plumbing and electrical company was operating a 9-to-5 phone-based scheduling system for a 24/7 service demand. Customers calling after 5 PM or on weekends reached voicemail. 40% of these callers never called back. Inside, an administrator spent 3 hours daily playing phone tag to confirm bookings.",
    analysis:
      "The booking funnel was the bottleneck. We traced the customer journey: discovery → call → hold → voicemail → call again → finally book. Each booking required an average of 2.7 touchpoints. The 9-5 window meant they were only accessible for 25% of when customers actively wanted to book. Additionally, 18% of booked appointments ended in no-shows because there was no automated reminder system.",
    solution:
      "Deployed a conversational AI scheduler accessible via SMS and web chat. Customers describe their issue in natural language, the AI matches them to the right technician type, shows live availability from the dispatch calendar, books the appointment, and sends automated reminders via SMS 24 hours and 1 hour before the visit.",
    outcome:
      "47% of bookings now happen outside business hours. No-show rate dropped from 18% to 6.8% (62% reduction). Admin saved 15 hours per week. Customer satisfaction scores improved 22%.",
    metrics: [
      { label: "After-Hours Bookings", value: "47%" },
      { label: "No-Show Rate", value: "18% → 6.8%" },
      { label: "CSAT Improvement", value: "+22%" },
    ],
    technologies: ["Twilio", "OpenAI", "Calendly API", "Airtable", "Zapier"],
    relatedProject: "appointment-follow-up-automation",
  },
];
