const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Файлы из /public с префиксом GitHub Pages. */
export function publicSrc(path: string): string {
  if (!path.startsWith("/") || (BASE && path.startsWith(BASE))) {
    return path;
  }
  return `${BASE}${path}`;
}
