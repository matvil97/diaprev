export function AvatarCoach({
  mood = "happy",
  name = "Milo",
  message,
}: {
  mood?: "happy" | "focus" | "celebrate";
  name?: string;
  message: string;
}) {
  const face = mood === "celebrate" ? "🎉" : mood === "focus" ? "🧠" : "🙂";

  return (
    <div className="flex items-start gap-3">
      <div className="h-12 w-12 rounded-2xl bg-white/85 border border-white/70 shadow-sm grid place-items-center text-2xl">
        {face}
      </div>

      <div className="rounded-2xl bg-white/85 border border-white/70 shadow-sm px-4 py-3">
        <div className="text-xs font-medium text-gray-700">{name}</div>
        <div className="text-sm text-gray-900">{message}</div>
      </div>
    </div>
  );
}