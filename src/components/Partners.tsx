import { partners, partnersTitle } from "@/data/content";
import { Logo } from "./Logo";

export function Partners() {
  return (
    <section id="partners" className="partners-section" aria-labelledby="partners-heading">
      <div className="partners-section__heading">
        <h2 id="partners-heading">{partnersTitle}</h2>
      </div>
      <div className="partner-marquee" aria-label="Empresas aliadas (nombres provisionales)">
        {[...partners, ...partners].map((partner, index) => (
          <div className="partner-card" key={`${partner}-${index}`}>
            <Logo tone="dark" />
            <p>{partner}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
