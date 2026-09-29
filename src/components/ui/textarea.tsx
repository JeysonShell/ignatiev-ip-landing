import type { ComponentProps } from "react";

import { fieldControlClassName } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        fieldControlClassName,
        "min-h-32 resize-y py-3 leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}
