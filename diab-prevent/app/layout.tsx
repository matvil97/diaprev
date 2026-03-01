import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${jakarta.className} min-h-screen text-gray-900`}>
        {/* Background */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-emerald-50" />
        <div
          className="fixed inset-0 -z-10 opacity-50
          bg-[radial-gradient(circle_at_12%_18%,rgba(99,102,241,0.38),transparent_42%),
              radial-gradient(circle_at_86%_24%,rgba(16,185,129,0.38),transparent_42%),
              radial-gradient(circle_at_50%_86%,rgba(236,72,153,0.28),transparent_42%),
              radial-gradient(circle_at_30%_65%,rgba(14,165,233,0.22),transparent_40%)]"
        />

        <Navbar />
        <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
      </body>
    </html>
  );
}