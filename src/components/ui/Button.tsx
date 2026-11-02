import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "confirm" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "min-h-14 bg-blue-700 text-white hover:bg-blue-800 text-lg font-semibold",
  confirm: "min-h-14 bg-green-700 text-white hover:bg-green-800 text-lg font-semibold",
  secondary: "min-h-11 bg-white text-slate-800 border border-slate-300 hover:bg-slate-50",
};

export function Button({ variant = "primary", className = "", type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 transition-colors focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-60 ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    />
  );
}
