import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  readonly id: string;
  readonly eyebrow?: string | undefined;
  readonly title: string;
  readonly lead?: string | undefined;
  readonly className?: string | undefined;
  readonly align?: "start" | "center";
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  className,
  align = "start",
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Badge variant="accent" size="md" eyebrow>
          {eyebrow}
        </Badge>
      ) : null}
      <h2
        id={id}
        className={cn("text-display-lg", eyebrow ? "mt-3" : null)}
      >
        {title}
      </h2>
      {lead ? (
        <p className="mt-2.5 text-lead text-content-muted">{lead}</p>
      ) : null}
    </header>
  );
}
