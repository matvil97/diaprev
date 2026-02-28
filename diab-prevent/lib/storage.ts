import type { RiskResult } from "./types";

const KEY = "diab_prevent_risk_result";

export function saveResult(r: RiskResult) {
  localStorage.setItem(KEY, JSON.stringify(r));
}

export function loadResult(): RiskResult | null {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as RiskResult;
  } catch {
    return null;
  }
}

export function clearAll() {
  localStorage.removeItem(KEY);
}