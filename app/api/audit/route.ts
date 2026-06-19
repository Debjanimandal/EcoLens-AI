import { NextRequest, NextResponse } from "next/server";

// ─── Mock delay helper ───────────────────────────────────────────────────────
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

// ─── Hardcoded mock response for the stormy cloud photo (w1.jpeg) ────────────
const MOCK_AUDIT_RESULT = {
  audit: {
    identified_subject:
      "Dramatic cumulonimbus storm cloud formation over open sky",
    observed_issue:
      "Large, rapidly developing thunderstorm cells indicate unstable atmospheric conditions associated with increasing frequency of severe weather events driven by climate change.",
    why_it_matters:
      "Cumulonimbus clouds of this scale produce lightning, hail, flash floods, and damaging winds. Climate change is intensifying storm frequency and severity globally, causing greater infrastructure damage, crop loss, and displacement.",
    confidence: "high",
  },
  mitigation: {
    recommendations: [
      "Reduce urban greenhouse gas emissions to slow atmospheric warming that intensifies storm energy",
      "Transition local energy grids to renewable sources (solar/wind) to cut CO₂ driving extreme weather",
      "Plant urban tree canopies and green corridors to reduce surface heat that feeds convective storms",
    ],
    expected_benefit:
      "A 1.5°C stabilisation target could reduce extreme storm events by up to 40% over the next 50 years, protecting millions from flood and wind damage annually.",
    effort_level: "high",
  },
  adaptation: {
    recommendations: [
      "Install early-warning storm alert systems in vulnerable coastal and low-lying communities",
      "Upgrade stormwater drainage infrastructure to handle 200% of current peak rainfall capacity",
      "Redesign buildings with storm-resistant roofing, impact-rated windows, and lightning protection",
    ],
    risk_addressed:
      "Flash flooding, wind damage, and lightning strike risk from increasingly intense convective storms",
    resilience_benefit:
      "Hardened infrastructure and early-warning systems reduce storm fatalities by up to 60% and cut economic losses by 35%, maintaining community function during extreme weather events.",
  },
  roi: {
    cost_level: "medium",
    payback_or_value:
      "Every $1 invested in storm-resilient infrastructure returns $6 in avoided disaster recovery costs. Early-warning systems pay back within 3–5 years through reduced emergency response spending.",
    impact_score: 82,
  },
  summary:
    "This intense cumulonimbus formation highlights the growing threat of climate-amplified severe storms. The highest-priority action is upgrading local stormwater and early-warning infrastructure while accelerating the renewable energy transition to reduce the atmospheric instability driving these extreme weather events.",
};

// ─── POST /api/audit ─────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // Consume the request body so the browser doesn't hang
  await req.formData().catch(() => null);

  // Simulate a realistic AI processing delay (2.5 seconds)
  await sleep(2500);

  // Return the hardcoded mock result — same shape the frontend expects
  return NextResponse.json({ data: MOCK_AUDIT_RESULT }, { status: 200 });
}
