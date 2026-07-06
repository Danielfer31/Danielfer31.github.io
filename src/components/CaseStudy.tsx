import { caseStudy } from "@/data/content";

export function CaseStudy() {
  return (
    <section id="case-study" className="case-section" aria-labelledby="case-heading">
      <div className="case-photo" aria-hidden="true" />
      <h2 id="case-heading">{caseStudy.heading}</h2>
      <article className="case-panel">
        <div className="case-panel__brand">{caseStudy.brand}</div>
        <h3>{caseStudy.title}</h3>
        <div className="case-panel__rule" />
        <p>{caseStudy.body}</p>
        <a href="#demo">
          {caseStudy.cta} <span aria-hidden="true">/</span>
        </a>
      </article>
    </section>
  );
}
