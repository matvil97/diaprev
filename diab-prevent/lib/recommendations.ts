import type { RiskAnswers, RiskLevel } from "./types";

export function recommendations(level: RiskLevel, a: RiskAnswers): string[] {
  const base = [
    "Cet outil informe et ne remplace pas un avis médical.",
    "Objectif simple : 150 minutes d’activité modérée par semaine (marche, vélo…).",
    "Boire surtout de l’eau et limiter les boissons sucrées."
  ];

  const byLevel =
    level === "low"
      ? ["Risque faible : maintenez vos habitudes, refaites un point dans 3 mois."]
      : level === "medium"
      ? ["Risque modéré : commencez par +20 min de marche, 3 fois/semaine."]
      : [
          "Risque élevé : prenez rendez-vous pour un bilan (médecin / infirmier / diététicien).",
          "Priorité : augmenter l’activité et réduire les sucres rapides progressivement."
        ];

  const perso: string[] = [];
  if (a.activity === "sedentary") perso.push("Astuce : 10 min/jour pendant 7 jours, puis +5 min/semaine.");
  if (a.sugaryDrinks === "often") perso.push("Remplacez 1 boisson sucrée/jour par de l’eau (gain immédiat).");
  if (a.bmiRange !== "under25") perso.push("Une perte de 5% du poids peut déjà améliorer les marqueurs métaboliques.");

  return [...byLevel, ...perso, ...base];
}