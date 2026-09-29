import { Apply } from "@/components/sections/apply";
import { Conditions } from "@/components/sections/conditions";
import { Duties } from "@/components/sections/duties";
import { Hero } from "@/components/sections/hero";
import { Team } from "@/components/sections/team";
import { Trust } from "@/components/sections/trust";
import { Venues } from "@/components/sections/venues";
import { JsonLd } from "@/components/seo/json-ld";
import { PAGE_JSON_LD } from "@/lib/seo";

export default function HomePage() {
  return (
    <main id="main" tabIndex={-1}>
      <JsonLd data={PAGE_JSON_LD} />
      <Hero />
      <Conditions />
      <Venues />
      <Duties />
      <Trust />
      <Team />
      <Apply />
    </main>
  );
}
