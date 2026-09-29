import { type ComponentProps, type ReactNode, forwardRef } from "react";

type ExternalLinkProps = Omit<
  ComponentProps<"a">,
  "target" | "rel" | "children"
> & {
  readonly href: string;
  readonly children: ReactNode;
};

/**
 * Ссылка на внешний ресурс (Telegram, WhatsApp, карты).
 * Собрана как компонент, чтобы триаду target + rel + предупреждение для
 * скринридера нельзя было забыть при очередном копировании разметки.
 * Совместима с <Button asChild>: className приходит от Slot и попадает на <a>.
 */
export const ExternalLink = forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  function ExternalLink({ children, ...props }, ref) {
    return (
      <a ref={ref} target="_blank" rel="noreferrer" {...props}>
        {children}
        <span className="sr-only"> (откроется в новой вкладке)</span>
      </a>
    );
  },
);

