import type { ReactNode } from "react";

interface AlertProps {
  children: ReactNode;
  action?: ReactNode;
}

export function Alert({ children, action }: AlertProps) {
  return (
    <div
      role="alert"
      className="flex flex-col gap-3 rounded-xl border border-red-300 bg-red-50 p-4 text-red-800"
    >
      <p className="font-semibold">⚠ {children}</p>
      {action}
    </div>
  );
}
