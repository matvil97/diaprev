export type RiskLevel = "low" | "medium" | "high";

export type RiskAnswers = {
  ageRange: "under40" | "40to55" | "over55";
  bmiRange: "under25" | "25to30" | "over30";
  activity: "active" | "some" | "sedentary";
  familyHistory: boolean;
  highBloodPressure: boolean;
  sugaryDrinks: "rare" | "sometimes" | "often";
  waistRisk: boolean;
};

export type RiskResult = {
  score: number;
  level: RiskLevel;
  answers: RiskAnswers;
  createdAt: string; // ISO
};