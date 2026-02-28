import type { RiskAnswers, RiskLevel } from "./types";

export function computeRisk(a: RiskAnswers): { score: number; level: RiskLevel } {
  let score = 0;

  score += a.ageRange === "40to55" ? 2 : a.ageRange === "over55" ? 4 : 0;
  score += a.bmiRange === "25to30" ? 2 : a.bmiRange === "over30" ? 4 : 0;
  score += a.activity === "some" ? 1 : a.activity === "sedentary" ? 3 : 0;

  score += a.familyHistory ? 3 : 0;
  score += a.highBloodPressure ? 2 : 0;
  score += a.waistRisk ? 2 : 0;

  score += a.sugaryDrinks === "sometimes" ? 1 : a.sugaryDrinks === "often" ? 2 : 0;

  let level: RiskLevel = "low";
  if (score >= 13) level = "high";
  else if (score >= 7) level = "medium";

  return { score, level };
}