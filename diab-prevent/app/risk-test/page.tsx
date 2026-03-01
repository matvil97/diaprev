"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { RiskAnswers, RiskResult } from "@/lib/types";
import { computeRisk } from "@/lib/scoring";
import { saveResult } from "@/lib/storage";
import { DID_YOU_KNOW } from "@/lib/facts";
import { AvatarCoach } from "@/components/AvatarCoach";
import { Progress } from "@/components/Progress";
import { Card, CardBody, CardHeader, Button, Badge } from "@/components/ui";

const totalSteps = 7;

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
  const [step, setStep] = useState(1);
  const [consent, setConsent] = useState(false);
  const router = useRouter();

  const fact = useMemo(() => DID_YOU_KNOW[(step - 1) % DID_YOU_KNOW.length], [step]);

  function next() {
    setStep((s) => Math.min(totalSteps, s + 1));
  }
  function back() {
    setStep((s) => Math.max(1, s - 1));
  }

  function finish() {
    if (!consent) return;
    const { score, level } = computeRisk(a);
    const result: RiskResult = { score, level, answers: a, createdAt: new Date().toISOString() };
    saveResult(result);
    router.push("/result");
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Test de risque (simple & bienveillant)"
          subtitle="Pas de bonne ou mauvaise réponse. On cherche juste à vous orienter."
        />

        <CardBody className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <Badge>~2 minutes</Badge>
            <Badge>Stockage local</Badge>
            <Badge>RGPD by design</Badge>
          </div>

          <Progress current={step} total={totalSteps} />

          <AvatarCoach
            mood={step === totalSteps ? "focus" : "happy"}
            message={
              step === totalSteps
                ? "Dernière étape ! Ensuite je te donne un score indicatif + des conseils."
                : "On y va tranquille. Réponds au feeling 🙂"
            }
          />

          {/* Bloc questions */}
          <div className="glass rounded-2xl border p-5 shadow-sm">
            {step === 1 && (
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
            )}

            {step === 2 && (
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
            )}

            {step === 3 && (
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
            )}

            {step === 4 && (
              <Toggle
                label="Antécédents familiaux (parents/fratrie)"
                checked={a.familyHistory}
                onChange={(checked) => setA({ ...a, familyHistory: checked })}
              />
            )}

            {step === 5 && (
              <Toggle
                label="Hypertension (diagnostiquée) ou traitement"
                checked={a.highBloodPressure}
                onChange={(checked) => setA({ ...a, highBloodPressure: checked })}
              />
            )}

            {step === 6 && (
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
            )}

            {step === 7 && (
              <Toggle
                label="Tour de taille élevé (indicatif)"
                checked={a.waistRisk}
                onChange={(checked) => setA({ ...a, waistRisk: checked })}
              />
            )}
          </div>

          {/* Le saviez-vous */}
          <div className="glass rounded-2xl border p-5 shadow-sm">
            <div className="text-xs font-medium text-gray-700">Le saviez-vous ?</div>
            <div className="mt-1 text-sm text-gray-900">{fact}</div>
          </div>

          {/* Consentement */}
          {step === totalSteps && (
            <div className="glass rounded-2xl border p-4 text-sm text-gray-800 shadow-sm">
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="mt-1 accent-gray-900"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                <span>
                  J’accepte le calcul du score <b>localement</b> sur mon appareil. Je comprends que ce test n’est pas
                  un dispositif médical.
                </span>
              </label>
            </div>
          )}

          <div className="flex justify-between">
            <Button variant="secondary" onClick={back} disabled={step === 1}>
              Retour
            </Button>

            {step < totalSteps ? (
              <Button onClick={next}>Suivant</Button>
            ) : (
              <Button onClick={finish} disabled={!consent}>
                Terminer & voir le résultat
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
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
      <div className="text-sm font-medium text-gray-900">{props.label}</div>
      <select
        className="w-full rounded-2xl border border-white/70 bg-white p-3 shadow-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-200"
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

function Toggle(props: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between gap-4">
      <span className="text-sm font-medium text-gray-900">{props.label}</span>
      <input
        type="checkbox"
        checked={props.checked}
        onChange={(e) => props.onChange(e.target.checked)}
        className="h-5 w-5 accent-gray-900"
      />
    </label>
  );
}