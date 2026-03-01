export function Progress({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-gray-600">
        <span>Question {current}/{total}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 rounded-full bg-gray-300 overflow-hidden">
        <div className="h-2 bg-gray-900 rounded-full" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}