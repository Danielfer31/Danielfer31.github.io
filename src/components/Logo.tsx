type LogoProps = {
  tone?: "light" | "dark";
};

export function Logo({ tone = "light" }: LogoProps) {
  return (
    <span className={`brand-logo brand-logo--${tone}`} aria-label="Cootrasec, transporte ejecutivo">
      <span className="brand-logo__mark" aria-hidden="true">
        {/* Marca: carretera en curva con punto de destino, trazo verde Cootrasec */}
        <svg viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2 17 C 7 15, 8 9, 13 7 S 20 4, 21 3"
            stroke="#2E9D5C"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M2 17 C 7 15, 8 9, 13 7"
            stroke="#22C55E"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeDasharray="0.5 3"
          />
          <circle cx="21" cy="3" r="2.4" fill="#22C55E" />
        </svg>
      </span>
      <span className="brand-logo__text">
        <strong>COOTRASEC</strong>
        <small>Transporte ejecutivo</small>
      </span>
    </span>
  );
}
