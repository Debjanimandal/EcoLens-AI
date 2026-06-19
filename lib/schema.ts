import { z } from "zod";

// ─── Confidence / Effort / Cost level enum ──────────────────────────────────
const LevelSchema = z.enum(["low", "medium", "high"]);

// ─── Full Audit Result schema ────────────────────────────────────────────────
export const AuditResultSchema = z.object({
  audit: z.object({
    identified_subject: z.string().min(1),
    observed_issue: z.string().min(1),
    why_it_matters: z.string().min(1),
    confidence: LevelSchema,
  }),
  mitigation: z.object({
    recommendations: z.array(z.string()).min(1),
    expected_benefit: z.string().min(1),
    effort_level: LevelSchema,
  }),
  adaptation: z.object({
    recommendations: z.array(z.string()).min(1),
    risk_addressed: z.string().min(1),
    resilience_benefit: z.string().min(1),
  }),
  roi: z.object({
    cost_level: LevelSchema,
    payback_or_value: z.string().min(1),
    impact_score: z.number().min(0).max(100),
  }),
  summary: z.string().min(1),
});

// ─── TypeScript types inferred from schema ───────────────────────────────────
export type AuditResult = z.infer<typeof AuditResultSchema>;
export type Level = z.infer<typeof LevelSchema>;
