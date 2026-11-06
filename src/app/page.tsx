import { Apply } from "@/components/sections/apply";
import { JsonLd } from "@/components/seo/json-ld";
import { ScrollStory } from "@/components/story/scroll-story";
import { PAGE_JSON_LD } from "@/lib/seo";

/**
 * Лендинг — скроллтеллинг по кадрам (ScrollStory), затем обычная секция
 * отклика с формой. Прежние секции (Hero, Conditions, Venues, Duties, Trust,
 * Team) остались в components/sections, но на странице не используются.
 */
export default function HomePage() {
  return (
    <main id="main" tabIndex={-1}>
      <JsonLd data={PAGE_JSON_LD} />
      <ScrollStory />
      <Apply />
    </main>
  );
}
