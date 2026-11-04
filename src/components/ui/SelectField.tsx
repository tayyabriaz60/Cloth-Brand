import { forwardRef, useId, type SelectHTMLAttributes } from "react";

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(function SelectField(
  { label, error, className = "", children, ...props },
  ref,
) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-semibold text-slate-800">
        {label}
      </label>
      <select
        ref={ref}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`min-h-14 rounded-xl border bg-white px-4 text-lg text-start outline-none focus-visible:ring-4 focus-visible:ring-blue-300 ${error ? "border-red-600" : "border-slate-300"} ${className}`}
        {...props}
      >
        {children}
      </select>
      {error ? (
        <p id={errorId} className="text-base text-red-700">
          ⚠ {error}
        </p>
      ) : null}
    </div>
  );
});
