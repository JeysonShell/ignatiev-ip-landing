/**
 * JSON-LD в обычном script: next/script для исполняемого JS, не для разметки.
 * Экранируем `<`, чтобы payload не сломал HTML.
 */
export function JsonLd({ data }: { readonly data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
