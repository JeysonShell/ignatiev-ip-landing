import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/** Общие стили контролов формы — Input и Textarea не должны разъехаться. */
export const fieldControlClassName = cn(
  "w-full rounded-[12px] border-[1.5px] border-ink/30 bg-card px-4",
  "text-base text-content placeholder:text-content-muted",
  "transition-[border-color,background-color] duration-200 ease-out-soft",
  "hover:border-ink",
  "aria-invalid:border-danger",
);

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn(fieldControlClassName, "h-12", className)}
      {...props}
    />
  );
}
