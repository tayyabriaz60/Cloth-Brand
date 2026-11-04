import { Link } from "react-router";
import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string;
  color: string;
  to?: string;
  icon: ReactNode;
}

export function StatCard({ label, value, color, to, icon }: StatCardProps) {
  const inner = (
    <div
      className="flex items-center gap-3 rounded-xl p-4 text-white shadow-md"
      style={{ backgroundColor: color }}
    >
      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/25">{icon}</div>
      <div className="min-w-0">
        <p className="text-[1.75rem] leading-tight font-bold" aria-live="polite">
          {value}
        </p>
        <p className="text-sm font-medium text-white/90">{label}</p>
      </div>
    </div>
  );
  if (!to) return inner;
  return (
    <Link to={to} className="block rounded-xl focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-500">
      {inner}
    </Link>
  );
}

export function CardIcon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="none" stroke="white" strokeWidth="2">
      <path d={d} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
