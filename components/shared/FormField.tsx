import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  /** Id of the control inside; hint and error ids are derived from it. */
  id: string;
  label: string;
  /** Text such as "optional", shown after the label. */
  labelNote?: string;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

/** ids to put in the control's aria-describedby, so hints and errors are read out. */
export function describedBy(id: string, hint?: string, error?: string): string | undefined {
  const ids = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean);
  return ids.length > 0 ? ids.join(" ") : undefined;
}

/** Label, control, hint and inline error for one form field. */
export function FormField({
  id,
  label,
  labelNote,
  hint,
  error,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="font-medium">
        {label}
        {labelNote ? (
          <span className="ml-1.5 text-sm font-normal text-muted-foreground">({labelNote})</span>
        ) : null}
      </label>
      {children}
      {hint ? (
        <p id={`${id}-hint`} className="text-sm text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-sm font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
