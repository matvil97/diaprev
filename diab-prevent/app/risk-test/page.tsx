"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { RiskAnswers, RiskResult } from "@/lib/types";
import { computeRisk } from "@/lib/scoring";
import { saveResult } from "@/lib/storage";

const defaultAnswers: RiskAnswers = {
  ageRange: "under40",
  bmiRange: "under25",
  activity: "some",
  familyHistory: false,
  highBloodPressure: false,
  sugaryDrinks: "sometimes",
  waistRisk: false,
};

export default function RiskTestPage() {
  const [a, setA] = useState<RiskAnswers>(defaultAnswers);
  const [consent, setConsent] = useState(false);
  const router = useRouter();

  function submit() {
    if (!consent) return;

    const { score, level } = computeRisk(a);
    const result: RiskResult = {
      score,
      level,
      answers: a,
      createdAt: new Date().toISOString(),
    };

    saveResult(result);
    router.push("/result");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Test de risque (indicatif)</h1>

      <div className="rounded-2xl border p-5 space-y-5">
        <Select
          label="Tranche d’âge"
          value={a.ageRange}
          onChange={(v) => setA({ ...a, ageRange: v as RiskAnswers["ageRange"] })}
          options={[
            ["under40", "Moins de 40 ans"],
            ["40to55", "40–55 ans"],
            ["over55", "Plus de 55 ans"],
          ]}
        />

        <Select
          label="IMC (approx.)"
          value={a.bmiRange}
          onChange={(v) => setA({ ...a, bmiRange: v as RiskAnswers["bmiRange"] })}
          options={[
            ["under25", "< 25"],
            ["25to30", "25–30"],
            ["over30", "> 30"],
          ]}
        />

        <Select
          label="Activité physique"
          value={a.activity}
          onChange={(v) => setA({ ...a, activity: v as RiskAnswers["activity"] })}
          options={[
            ["active", "Régulière (≥ 150 min/sem)"],
            ["some", "Occasionnelle"],
            ["sedentary", "Sédentaire"],
          ]}
        />

        <Toggle
          label="Antécédents familiaux de diabète (parents/fratrie)"
          checked={a.familyHistory}
          onChange={(checked) => setA({ ...a, familyHistory: checked })}
        />

        <Toggle
          label="Hypertension (diagnostiquée) ou traitement"
          checked={a.highBloodPressure}
          onChange={(checked) => setA({ ...a, highBloodPressure: checked })}
        />

        <Select
          label="Boissons sucrées"
          value={a.sugaryDrinks}
          onChange={(v) => setA({ ...a, sugaryDrinks: v as RiskAnswers["sugaryDrinks"] })}
          options={[
            ["rare", "Rarement / jamais"],
            ["sometimes", "Parfois"],
            ["often", "Souvent"],
          ]}
        />

        <Toggle
          label="Tour de taille élevé (indicatif)"
          checked={a.waistRisk}
          onChange={(checked) => setA({ ...a, waistRisk: checked })}
        />

        <div className="rounded-xl bg-gray-50 p-4 text-sm text-gray-700">
          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              className="mt-1"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            <span>
              J’accepte que mes réponses soient utilisées pour calculer un score <b>localement</b>
              sur mon appareil. Je comprends que ce test n’est pas un dispositif médical.
            </span>
          </label>
        </div>

        <button
          onClick={submit}
          disabled={!consent}
          className="rounded-xl bg-black px-4 py-2 text-white disabled:opacity-40"
        >
          Voir mon résultat
        </button>
      </div>
    </div>
  );
}

function Select(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">{props.label}</div>
      <select
        className="w-full rounded-xl border p-2"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      >
        {props.options.map(([v, name]) => (
          <option key={v} value={v}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

function Toggle(props: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-4">
      <span className="text-sm font-medium">{props.label}</span>
      <input
        type="checkbox"
        checked={props.checked}
        onChange={(e) => props.onChange(e.target.checked)}
        className="h-5 w-5"
      />
    </label>
  );
}