import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const cardVariants = cva("relative isolate", {
  variants: {
    surface: {
      glass: "bg-transparent",
      solid: "bg-transparent",
      plain: "bg-transparent",
    },
    radius: {
      card: "",
      bento: "",
    },
    padding: {
      none: "",
      sm: "",
      md: "",
      lg: "",
    },
    interactive: {
      true: "",
    },
  },
    defaultVariants: {
      surface: "plain",
      radius: "card",
      padding: "none",
    },
});

type CardProps = ComponentProps<"div"> & VariantProps<typeof cardVariants>;

export function Card({
  className,
  surface,
  radius,
  padding,
  interactive,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        cardVariants({ surface, radius, padding, interactive }),
        className,
      )}
      {...props}
    />
  );
}

/** Уровень заголовка выбирает вызывающая секция — порядок h1→h2→h3 не ломаем. */
type CardTitleProps = ComponentProps<"h3"> & {
  readonly as?: "h2" | "h3" | "h4";
};

export function CardTitle({
  className,
  as: Heading = "h3",
  ...props
}: CardTitleProps) {
  return (
    <Heading
      className={cn(
        "text-lg font-bold tracking-tight text-content md:text-xl",
        className,
      )}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "text-sm leading-relaxed text-content-muted md:text-base",
        className,
      )}
      {...props}
    />
  );
}

/** Иконка без пилюли — в лофте достаточно самого знака. */
export function CardIcon({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "inline-flex text-green",
        "[&_svg]:size-5",
        className,
      )}
      {...props}
    />
  );
}
