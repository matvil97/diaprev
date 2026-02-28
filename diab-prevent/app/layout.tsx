import "./globals.css";
import { Navbar } from "@/components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen text-gray-900">
        {/* Background */}
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-white to-white" />
        <div className="fixed inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.25),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(16,185,129,0.20),transparent_45%),radial-gradient(circle_at_40%_80%,rgba(236,72,153,0.18),transparent_45%)]" />

        <Navbar />
        <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
      </body>
    </html>
  );
}