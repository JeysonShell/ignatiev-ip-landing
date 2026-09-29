import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { type ComponentProps, forwardRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Обводка фокуса задана глобально через :focus-visible в base.css,
 * поэтому в вариантах её не дублируем.
 * Все размеры дают тач-зону не меньше 44x44 (WCAG 2.5.5).
 */
const buttonVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center gap-2",
    "rounded-[10px] font-semibold whitespace-nowrap select-none",
    "transition-[background-color,border-color,box-shadow,color,transform]",
    "duration-200 ease-out-soft",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "motion-reduce:transition-none motion-reduce:hover:translate-none motion-reduce:active:translate-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-brand text-on-brand shadow-brand",
          "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-brand-strong",
          "active:translate-x-1 active:translate-y-1 active:shadow-none",
        ],
        secondary: [
          "border-[1.5px] border-ink bg-card text-ink shadow-elevate",
          "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-paper-2",
          "active:translate-x-1 active:translate-y-1 active:shadow-none",
        ],
        ghost: "text-ink-soft hover:bg-paper-2 hover:text-ink",
        outline: [
          "border-[1.5px] border-ink text-ink",
          "hover:bg-paper-2",
        ],
      },
      size: {
        sm: "h-11 px-4 text-sm [&_svg]:size-4",
        md: "h-12 px-5 text-[0.9375rem] [&_svg]:size-[1.125rem]",
        lg: "h-14 px-7 text-base md:text-lg [&_svg]:size-5",
        icon: "size-11 [&_svg]:size-5",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    /** Рендерит стили на дочернем элементе — для ссылок-кнопок (<a>, <Link>). */
    readonly asChild?: boolean;
    readonly isLoading?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) {
    const isDisabled = disabled === true || isLoading;
    const classes = cn(buttonVariants({ variant, size, fullWidth }), className);

    // Slot переносит стили на дочерний узел (обычно <a>), где атрибут disabled
    // невалиден: блокируем такую «кнопку» через aria-disabled и классы.
    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn(
            classes,
            isDisabled && "pointer-events-none opacity-50",
          )}
          aria-disabled={isDisabled || undefined}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={isDisabled}
        aria-busy={isLoading || undefined}
        {...props}
      >
        {isLoading ? <Loader2 aria-hidden className="animate-spin" /> : null}
        {children}
      </button>
    );
  },
);
