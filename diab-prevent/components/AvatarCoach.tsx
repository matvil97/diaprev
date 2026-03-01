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
      <div className="h-12 w-12 rounded-2xl bg-white/70 border border-white/60 grid place-items-center text-2xl">
        {face}
      </div>
      <div className="rounded-2xl bg-white/70 border border-white/60 px-4 py-3">
        <div className="text-xs text-gray-500">{name}</div>
        <div className="text-sm text-gray-800">{message}</div>
      </div>
    </div>
  );
}