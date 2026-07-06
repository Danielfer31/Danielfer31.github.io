"use client";

import { useEffect, useRef } from "react";
import type { SceneVariant } from "@/data/content";

type MediaSceneProps = {
  variant: SceneVariant;
  className?: string;
};

const STICKY_VIDEO = {
  poster: "/assets/landing/hero-poster.webp",
  webm: "/assets/landing/hero-loop.webm",
  mp4: "/assets/landing/hero-loop.mp4"
};

export function MediaScene({ variant, className = "" }: MediaSceneProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {
      // The poster remains visible if a browser blocks background autoplay.
    });
  }, []);

  return (
    <div className={`media-scene media-scene--${variant} ${className}`} aria-hidden="true">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={STICKY_VIDEO.poster}
      >
        <source src={STICKY_VIDEO.webm} type="video/webm" />
        <source src={STICKY_VIDEO.mp4} type="video/mp4" />
      </video>

      {variant === "hero" || variant === "rutas" ? <RoadLines /> : null}
      {variant === "rutas" ? <CorridorWaypoints /> : null}
    </div>
  );
}

function RoadLines() {
  return (
    <svg className="road-lines" viewBox="0 0 1440 810" preserveAspectRatio="none">
      <path className="line line-blue thick" d="M-40 624 C 220 540 390 512 540 582 S 882 772 1488 652" />
      <path className="line line-orange" d="M-50 686 C 220 594 420 544 610 620 S 1048 828 1490 722" />
      <path className="line line-red thin" d="M-20 520 C 288 500 438 432 592 482 C 768 540 910 592 1480 412" />
    </svg>
  );
}

function CorridorWaypoints() {
  const stops = [
    { x: 130, y: 596, label: "Medellín" },
    { x: 540, y: 582, label: "La Dorada" },
    { x: 900, y: 682, label: "Honda" },
    { x: 1300, y: 674, label: "Bogotá" }
  ];

  return (
    <svg className="road-lines" viewBox="0 0 1440 810" preserveAspectRatio="xMidYMid slice">
      {stops.map((stop) => (
        <g key={stop.label} className="hotspot">
          <circle cx={stop.x} cy={stop.y} r="14" />
          <circle className="hotspot-dot" cx={stop.x} cy={stop.y} r="4" />
          <text x={stop.x + 22} y={stop.y - 14}>
            {stop.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
