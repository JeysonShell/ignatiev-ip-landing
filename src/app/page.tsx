import { Apply } from "@/components/sections/apply";
import { Conditions } from "@/components/sections/conditions";
import { Duties } from "@/components/sections/duties";
import { Hero } from "@/components/sections/hero";
import { Team } from "@/components/sections/team";
import { Trust } from "@/components/sections/trust";
import { Venues } from "@/components/sections/venues";
import { JOB_POSTING_JSON_LD } from "@/lib/content/vacancy";

export default function HomePage() {
  return (
    <main id="main" tabIndex={-1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(JOB_POSTING_JSON_LD),
        }}
      />
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
