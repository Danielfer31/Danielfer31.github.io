"use client";

import { useEffect, useRef, useState } from "react";
import { ctaButtonLabel, ctaItems, navItems } from "@/data/content";
import { Logo } from "./Logo";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [ctaOpen, setCtaOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setCtaOpen(false);
      }
    }

    function onPointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setCtaOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Saltar al contenido principal
      </a>
      <header ref={headerRef} className={`site-header ${menuOpen ? "is-menu-open" : ""}`}>
        <div className="header-group">
          <a className="logo-tile" href="#top" aria-label="Volver al inicio de la página">
            <Logo />
          </a>
          <button
            className="menu-tile"
            type="button"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>

        <div className={`cta-menu ${ctaOpen ? "is-open" : ""}`}>
          <button
            className="cta-menu__button"
            type="button"
            aria-expanded={ctaOpen}
            aria-controls="cta-menu-list"
            onClick={() => setCtaOpen((value) => !value)}
          >
            {ctaButtonLabel}
            <span className="chevron" aria-hidden="true" />
          </button>
          <div id="cta-menu-list" className="cta-menu__list" role="menu">
            {ctaItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                role="menuitem"
                onClick={() => setCtaOpen(false)}
              >
                {item.label}
                <span aria-hidden="true">/</span>
              </a>
            ))}
          </div>
        </div>
      </header>

      <aside className={`mega-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mega-menu__shade" onClick={() => setMenuOpen(false)} />
        <nav className="mega-menu__panel" aria-label="Navegación principal">
          <div className="mega-menu__spacer" />
          <ul>
            {navItems.map((item) => (
              <li key={item.label}>
                <a href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                  {item.label === "Servicios" || item.label === "Cotizar" ? (
                    <span aria-hidden="true">/</span>
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
          <div className="mega-menu__footer">
            <a href="#demo" onClick={() => setMenuOpen(false)}>
              Cotice su servicio <span aria-hidden="true">/</span>
            </a>
            <a href="#footer" onClick={() => setMenuOpen(false)}>
              Contacto
            </a>
          </div>
        </nav>
      </aside>
    </>
  );
}
