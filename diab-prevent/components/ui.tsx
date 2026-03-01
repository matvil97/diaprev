import React from "react";

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`glass rounded-3xl border backdrop-blur-xl shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="p-6 pb-0">
      <h1 className="text-2xl font-semibold tracking-tight text-gray-900">{title}</h1>
      {subtitle && <p className="mt-2 text-[15px] leading-relaxed text-gray-700">{subtitle}</p>}
    </div>
  );
}

export function CardBody({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={"p-6 " + className}>{children}</div>;
}

export function Button({
  children,
  onClick,
  disabled,
  variant = "primary",
  className = "",
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit";
}) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-medium transition active:scale-[0.99] " +
    "disabled:opacity-40 disabled:cursor-not-allowed " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25 focus-visible:ring-offset-2 focus-visible:ring-offset-white/60";

  const styles =
    variant === "primary"
      ? "bg-gray-900 text-white hover:bg-gray-800 shadow-sm"
      : "bg-white/80 border border-white/70 hover:bg-white shadow-sm text-gray-900";

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
}

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-medium text-gray-700">
      {children}
    </span>
  );
}