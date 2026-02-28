import type { RiskLevel } from "@/lib/types";

function levelText(level: RiskLevel) {
  return level === "low" ? "Faible" : level === "medium" ? "Modéré" : "Élevé";
}

export function Gauge({ score, level }: { score: number; level: RiskLevel }) {
  const max = 18;
  const pct = Math.min(100, Math.round((score / max) * 100));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-gray-700">Score</div>
        <div className="text-sm">
          <span className="font-semibold">{levelText(level)}</span> • {score}/{max}
        </div>
      </div>

      <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-emerald-500 via-indigo-500 to-pink-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-gray-600">
        <span>Faible</span>
        <span>Modéré</span>
        <span>Élevé</span>
      </div>
    </div>
  );
}