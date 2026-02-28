"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { RiskResult } from "@/lib/types";
import { loadResult } from "@/lib/storage";
import { Gauge } from "@/components/Gauge";
import { recommendations } from "@/lib/recommendations";

export default function ResultPage() {
  const [res, setRes] = useState<RiskResult | null>(null);

  useEffect(() => {
    setRes(loadResult());
  }, []);

  if (!res) {
    return (
      <div className="space-y-3">
        <h1 className="text-xl font-semibold">Résultat</h1>
        <p className="text-gray-700">Aucun résultat enregistré.</p>
        <Link className="underline" href="/risk-test">Faire le test</Link>
      </div>
    );
  }

  const recos = recommendations(res.level, res.answers);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border p-5 space-y-4">
        <h1 className="text-xl font-semibold">Votre résultat</h1>
        <Gauge score={res.score} level={res.level} />
        <div className="text-xs text-gray-600">
          Date : {new Date(res.createdAt).toLocaleString("fr-FR")}
        </div>
      </div>

      <div className="rounded-2xl border p-5">
        <h2 className="font-semibold">Recommandations</h2>
        <ul className="mt-3 space-y-2 text-sm text-gray-800">
          {recos.map((r, i) => (
            <li key={i} className="rounded-xl bg-gray-50 p-3">{r}</li>
          ))}
        </ul>
      </div>

      <div className="flex gap-3">
        <Link href="/risk-test" className="rounded-xl border px-4 py-2">
          Refaire le test
        </Link>
        <Link href="/privacy" className="rounded-xl bg-black px-4 py-2 text-white">
          Confidentialité / RGPD
        </Link>
      </div>
    </div>
  );
}