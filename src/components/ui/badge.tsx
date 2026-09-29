import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5",
    "font-medium whitespace-nowrap",
    "[&_svg]:size-3.5 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        neutral: "text-ink-soft",
        accent: "text-green",
        success: "text-green",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
      },
      /** Капслок с разрядкой — для надзаголовков секций, без пилюли. */
      eyebrow: {
        true: "font-semibold tracking-[0.16em] uppercase",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "sm",
    },
  },
);

type BadgeProps = ComponentProps<"span"> & VariantProps<typeof badgeVariants>;

export function Badge({
  className,
  variant,
  size,
  eyebrow,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size, eyebrow }), className)}
      {...props}
    />
  );
}
