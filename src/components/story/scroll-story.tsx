import type { CSSProperties } from "react";

import { StoryController } from "@/components/story/story-controller";
import { TelegramButton, WhatsAppButton } from "@/components/ui/cta";
import { ExternalLink } from "@/components/ui/external-link";
import { STORY_CUTS, STORY_SCENES } from "@/lib/content/story";
import {
  ABOUT_COMPANY,
  CONDITIONS_SECTION,
  LEADER_MESSAGE,
  ONBOARDING_STEPS,
  ROLE_SECTION,
  TEAM_SECTION,
  TRUST_POINTS,
  TRUST_SECTION,
  VACANCY_BENEFITS,
  VACANCY_DUTIES,
  VACANCY_HERO,
  VACANCY_HIGHLIGHTS,
  VACANCY_REQUIREMENTS,
  VENUES,
  VENUES_SECTION,
} from "@/lib/content/vacancy";
import { STORY_FRAMES } from "@/lib/media";
import { cn } from "@/lib/utils";

const STORY_ID = "story";

/**
 * Без JS закрепление и canvas не работают, поэтому сцены просто идут друг
 * за другом обычным текстом на тёмном фоне.
 */
const NO_SCRIPT_CSS = [
  ".story__stage{position:relative;height:auto}",
  ".story__scene{position:relative;opacity:1;visibility:visible;padding-block:2.5rem}",
  ".story__spacers,.story__canvas,.story__scrim,.story-rail,.story-progress{display:none}",
].join("");

/**
 * Весь лендинг как прокрутка по кадрам: одна закреплённая сцена на экран,
 * кадры сменяются на canvas, тексты проявляются поверх. Серверный компонент:
 * тексты попадают в HTML сразу, движок кадров — StoryController.
 *
 * Якоря (#conditions, #venues, ...) стоят не на самих сценах, а на пустых
 * маркерах внутри распорок: сцены лежат в закреплённом блоке, и браузер не
 * смог бы доскроллить до них. Куда именно встанет прокрутка, задаёт
 * scroll-margin-top маркера (см. story.css).
 */
export function ScrollStory() {
  return (
    <>
      <nav
        className="story-rail"
        aria-label="Прогресс по странице"
        data-story-rail
      >
        <ol>
          {STORY_SCENES.map((scene) => (
            <li key={scene.id}>
              <a href={`#${scene.id}`} data-story-dot>
                <span className="story-rail__label">{scene.label}</span>
                <span className="story-rail__dot" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <div className="story-progress" data-story-progress aria-hidden="true" />

      <div id={STORY_ID} className="story">
        <div className="story__stage" data-story-stage>
          <canvas
            className="story__canvas"
            data-story-canvas
            aria-hidden="true"
          />
          <div className="story__scrim story__scrim--base" aria-hidden="true" />
          <div className="story__scrim story__scrim--side" aria-hidden="true" />

          <HeroScene />
          <ConditionsScene />
          <VenuesScene />
          <DutiesScene />
          <TrustScene />
          <TeamScene />
          <LeaderScene />
        </div>

        <div className="story__spacers" aria-hidden="true">
          {STORY_SCENES.map((scene, index) => (
            <div
              key={scene.id}
              className="story__spacer"
              data-story-spacer
              style={{ "--w": scene.weight } as CSSProperties}
            >
              <span
                id={scene.id}
                className={cn(
                  "story__anchor",
                  index === 0 && "story__anchor--first",
                )}
              />
            </div>
          ))}
        </div>

        <noscript>
          <style>{NO_SCRIPT_CSS}</style>
        </noscript>
      </div>

      <StoryController
        rootId={STORY_ID}
        frames={STORY_FRAMES}
        cuts={STORY_CUTS}
      />
    </>
  );
}

function HeroScene() {
  return (
    <section
      className="story__scene story__scene--first"
      data-story-scene
      aria-labelledby="hero-title"
    >
      <div className="story__in">
        <div className="story__copy story__copy--wide">
          <p className="story__eyebrow">{VACANCY_HERO.eyebrow}</p>
          <h1 id="hero-title" className="story__hero-title">
            {VACANCY_HERO.titleLead}{" "}
            <span className="story__nowrap">{VACANCY_HERO.titleGlue}</span>{" "}
            <span className="story__accent">{VACANCY_HERO.titleAccent}</span>
          </h1>

          <div className="story__cta">
            <TelegramButton className="story__btn story__btn--primary" />
            <WhatsAppButton
              label={VACANCY_HERO.whatsappCta}
              className="story__btn story__btn--ghost"
            />
          </div>

          <dl className="story__highlights">
            {VACANCY_HIGHLIGHTS.map((highlight) => (
              <div key={highlight.label}>
                <dt>{highlight.label}</dt>
                <dd>{highlight.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function ConditionsScene() {
  return (
    <section
      className="story__scene"
      data-story-scene
      aria-labelledby="conditions-title"
    >
      <div className="story__in">
        <div className="story__copy">
          <h2 id="conditions-title" className="story__title">
            {CONDITIONS_SECTION.title}
          </h2>
          <p className="story__lead">{CONDITIONS_SECTION.lead}</p>
          <ul className="story__rows">
            {VACANCY_BENEFITS.map((benefit) => (
              <li key={benefit.title}>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function VenuesScene() {
  return (
    <section
      className="story__scene"
      data-story-scene
      aria-labelledby="venues-title"
    >
      <div className="story__in">
        <div className="story__copy story__copy--wide">
          <h2 id="venues-title" className="story__title">
            {VENUES_SECTION.title}
          </h2>
          <p className="story__lead">{VENUES_SECTION.lead}</p>
          <ul className="story__venues">
            {VENUES.map((venue) => (
              <li key={venue.href}>
                <ExternalLink href={venue.href}>{venue.name}</ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function DutiesScene() {
  return (
    <section
      className="story__scene"
      data-story-scene
      aria-labelledby="duties-title"
    >
      <div className="story__in">
        <div className="story__copy story__copy--wide">
          <h2 id="duties-title" className="story__title">
            {ROLE_SECTION.title}
          </h2>
          <p className="story__lead">{ROLE_SECTION.lead}</p>
          <div className="story__cols">
            <div>
              <h3>{VACANCY_DUTIES.title}</h3>
              <ul className="story__dots">
                {VACANCY_DUTIES.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>{VACANCY_REQUIREMENTS.title}</h3>
              <ul className="story__dots">
                {VACANCY_REQUIREMENTS.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustScene() {
  return (
    <section
      className="story__scene"
      data-story-scene
      aria-labelledby="trust-title"
    >
      <div className="story__in">
        <div className="story__copy">
          <h2 id="trust-title" className="story__title">
            {TRUST_SECTION.title}
          </h2>
          <p className="story__lead">{TRUST_SECTION.lead}</p>
          <ul className="story__rows">
            {TRUST_POINTS.map((point) => (
              <li key={point.title}>
                <h3>{point.title}</h3>
                <p>{point.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function TeamScene() {
  return (
    <section
      className="story__scene"
      data-story-scene
      aria-labelledby="reviews-title"
    >
      <div className="story__in">
        <div className="story__copy">
          <h2 id="reviews-title" className="story__title">
            {TEAM_SECTION.title}
          </h2>
          <ol className="story__rows story__steps">
            {ONBOARDING_STEPS.map((step, index) => (
              <li key={step.title}>
                <span className="story__step-number" aria-hidden="true">
                  {index + 1}
                </span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function LeaderScene() {
  return (
    <section
      className="story__scene"
      data-story-scene
      aria-labelledby="leader-title"
    >
      <div className="story__in">
        <div className="story__copy">
          <h2 id="leader-title" className="story__title">
            {LEADER_MESSAGE.sectionTitle}
          </h2>
          <figure className="story__quote">
            <blockquote>{LEADER_MESSAGE.quote}</blockquote>
            <figcaption>
              <b>{LEADER_MESSAGE.authorName}</b>
              <span>{LEADER_MESSAGE.authorRole}</span>
            </figcaption>
          </figure>
          <div className="story__about">
            <h3>{ABOUT_COMPANY.title}</h3>
            {ABOUT_COMPANY.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
