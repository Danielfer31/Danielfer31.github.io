import { footerContent, navItems } from "@/data/content";

export function Footer() {
  return (
    <footer id="footer" className="site-footer">
      <div className="footer-photo" aria-hidden="true" />
      <div className="footer-cards">
        {footerContent.cards.map((card) => (
          <a key={card.label} href={card.href} className="footer-card">
            <span>{card.label}</span>
            <span aria-hidden="true">/</span>
          </a>
        ))}
      </div>
      <div className="footer-links">
        <div className="footer-actions">
          <a className="footer-cta" href={footerContent.cta.href}>
            {footerContent.cta.label} <span aria-hidden="true">/</span>
          </a>
          <a className="footer-login" href={footerContent.secondary.href}>
            {footerContent.secondary.label} <span aria-hidden="true">/</span>
          </a>
        </div>
        <nav aria-label="Pie de página">
          {navItems.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="footer-bottom">
        <p>{footerContent.legal.copyright}</p>
        <a href="#footer">{footerContent.legal.privacy}</a>
        <a href="#footer">{footerContent.legal.terms}</a>
        <p>{footerContent.legal.nit}</p>
        <p>Medellín, Colombia</p>
      </div>
    </footer>
  );
}
