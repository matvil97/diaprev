import Link from "next/link";
import { Badge } from "@/components/ui";

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/40 bg-white/60 backdrop-blur-xl">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-gray-900 text-white grid place-items-center font-semibold">
            D
          </div>
          <div className="leading-tight">
            <div className="font-semibold tracking-tight">DiaPrevent</div>
            <div className="text-xs text-gray-600">Prévention diabète</div>
          </div>
        </Link>

        <nav className="flex items-center gap-3 text-sm">
          <Link href="/risk-test" className="px-3 py-2 rounded-xl hover:bg-white/70">Test</Link>
          <Link href="/result" className="px-3 py-2 rounded-xl hover:bg-white/70">Résultat</Link>
          <Link href="/privacy" className="px-3 py-2 rounded-xl hover:bg-white/70">RGPD</Link>
          <div className="hidden sm:block">
            <Badge>Démo MVP</Badge>
          </div>
        </nav>
      </div>
    </header>
  );
}