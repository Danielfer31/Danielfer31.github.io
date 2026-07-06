"use client";

import { useState } from "react";

export function CookieBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="region" aria-label="Aviso de cookies">
      <p>
        Este sitio utiliza <a href="#footer">cookies</a>
      </p>
      <button type="button" onClick={() => setVisible(false)}>
        Rechazar
      </button>
      <button type="button" onClick={() => setVisible(false)}>
        Aceptar
      </button>
    </div>
  );
}
