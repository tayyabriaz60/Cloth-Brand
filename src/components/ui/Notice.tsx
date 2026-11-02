import type { ReactNode } from "react";

interface NoticeProps {
  children: ReactNode;
}

export function Notice({ children }: NoticeProps) {
  return (
    <p role="status" className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-amber-900">
      ⏳ {children}
    </p>
  );
}
