"use client";

import { useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "motion/react";
import { chapters, fleetCatalog, hero } from "@/data/content";
import { MediaScene } from "./MediaScene";

// Stage 0 es el hero; los capítulos ocupan los stages 1..N.
const STAGE_COUNT = chapters.length + 1;

export function ChapterScroller() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const isHeroStage = activeIndex === 0;
  const activeChapter = isHeroStage ? null : chapters[activeIndex - 1];
  const stickyHeight = `${(STAGE_COUNT + 1) * 100}svh`;
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"]
  });
  // La barra mide solo el tramo de capítulos: 0 al entrar al capítulo 1.
  const chaptersProgress = useTransform(
    scrollYProgress,
    [1 / STAGE_COUNT, 1],
    [0, 1],
    { clamp: true }
  );
  const progressScale = useSpring(chaptersProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001
  });

  const detailItems = useMemo(() => fleetCatalog, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.min(
      STAGE_COUNT - 1,
      Math.max(0, Math.floor(latest * STAGE_COUNT))
    );

    if (activeIndexRef.current !== nextIndex) {
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    }
  });

  function scrollToStage(index: number) {
    if (!scrollRef.current) {
      return;
    }

    const scrollBounds = scrollRef.current.getBoundingClientRect();
    const scrollStart = scrollBounds.top + window.scrollY;
    const scrollDistance = scrollRef.current.offsetHeight - window.innerHeight;
    const stageProgress = index / STAGE_COUNT;

    window.scrollTo({
      top: scrollStart + scrollDistance * stageProgress,
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });
  }

  return (
    <section id="top" className="chapter-system" aria-labelledby="hero-title">
      <h1 id="hero-title" className="sr-only">
        {hero.titleLines.join(" ")}
      </h1>
      <div ref={scrollRef} className="chapter-scroll" style={{ minHeight: stickyHeight }}>
        <span
          id="platform"
          className="anchor-target anchor-target--platform"
          aria-hidden="true"
        />
        <div className="chapter-stage chapter-stage--sticky">
          <MediaScene
            variant={activeChapter ? activeChapter.visual : "hero"}
            className={
              activeChapter
                ? "chapter-stage__scene"
                : "chapter-stage__scene hero-scene"
            }
          />

          <div
            className={`chapter-scroll-progress ${isHeroStage ? "is-stage-hidden" : ""}`}
            role="progressbar"
            aria-label="Progreso del recorrido de servicios"
            aria-hidden={isHeroStage}
            aria-valuemin={1}
            aria-valuemax={chapters.length}
            aria-valuenow={Math.max(1, activeIndex)}
          >
            <motion.span style={{ scaleX: progressScale }} />
          </div>

          <AnimatePresence initial={false} mode="wait">
            {activeChapter ? (
              <motion.div
                key={activeChapter.title}
                className="chapter-stage__content"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -28 }}
                transition={{
                  duration: prefersReducedMotion ? 0.01 : 0.42,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <h2 id="platform-heading">{activeChapter.title}</h2>
                <p className="chapter-description">{activeChapter.description}</p>
              </motion.div>
            ) : (
              <motion.div
                key="hero-stage"
                className="hero-stage"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -28 }}
                transition={{
                  duration: prefersReducedMotion ? 0.01 : 0.42,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <div className="hero-title-wrap" aria-hidden="true">
                  <p>
                    {hero.titleLines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </p>
                </div>
                <div className="hero-copy-card">
                  <p>{hero.subhead}</p>
                  <a
                    href="#platform"
                    aria-label="Continuar a la sección de servicios"
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToStage(1);
                    }}
                  >
                    <span aria-hidden="true" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence initial={false}>
            {false && activeChapter?.metrics ? (
              <motion.ul
                key={`${activeChapter?.title ?? "chapter"}-metrics`}
                className="metric-pin-list"
                aria-label="Indicadores de operación en vivo"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -14 }}
                transition={{
                  duration: prefersReducedMotion ? 0.01 : 0.34,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                {(activeChapter?.metrics ?? []).map((metric) => (
                  <li key={metric.label}>
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </li>
                ))}
              </motion.ul>
            ) : null}
          </AnimatePresence>

          {false ? (
          <div
            className={`chapter-tabs ${isHeroStage ? "is-stage-hidden" : ""}`}
            role="tablist"
            aria-label="Capítulos de servicios"
            aria-hidden={isHeroStage}
          >
            {chapters.map((chapter, index) => (
              <button
                key={chapter.title}
                type="button"
                role="tab"
                aria-selected={activeIndex === index + 1}
                tabIndex={isHeroStage ? -1 : 0}
                className={activeIndex === index + 1 ? "is-active" : ""}
                onClick={() => scrollToStage(index + 1)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <small>{chapter.title}</small>
              </button>
            ))}
          </div>
          ) : null}
        </div>
      </div>

      <span id="marketplace" className="anchor-target" aria-hidden="true" />
      <div className="feature-rail fleet-catalog" aria-label="Catalogo de vehiculos Cootrasec">
        {detailItems.map((item, index) => (
          <article
            className="feature-card fleet-card"
            key={`${item.name}-${index}`}
          >
            <span className="feature-card__chapter">
              {String(index + 1).padStart(2, "0")} / 10
            </span>
            <div className="fleet-card__media">
              <img src={item.image} alt={item.alt} loading="lazy" />
            </div>
            <div className="fleet-card__body">
              <span className="fleet-card__eyebrow">{item.category}</span>
              <h3>{item.name}</h3>
              <dl className="fleet-card__specs">
                <div>
                  <dt>Modelo</dt>
                  <dd>{item.model}</dd>
                </div>
                <div>
                  <dt>Capacidad</dt>
                  <dd>{item.passengers}</dd>
                </div>
              </dl>
            </div>
            <a href={item.slug ? `/vehiculos/${item.slug}` : "#demo"}>
              {item.slug ? "Ver detalle y reservar" : "Cotizar vehiculo"}{" "}
              <span aria-hidden="true">/</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
