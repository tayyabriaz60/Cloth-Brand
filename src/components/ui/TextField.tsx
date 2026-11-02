import { forwardRef, useId, type InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, error, className = "", ...props },
  ref,
) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-semibold text-slate-800">
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`min-h-14 rounded-xl border bg-white px-4 text-lg text-start outline-none focus-visible:ring-4 focus-visible:ring-blue-300 ${error ? "border-red-600" : "border-slate-300"} ${className}`}
        {...props}
      />
      {error ? (
        <p id={errorId} className="text-base text-red-700">
          ⚠ {error}
        </p>
      ) : null}
    </div>
  );
});
