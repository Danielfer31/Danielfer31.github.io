import { stats, statsTitle } from "@/data/content";

export function Stats() {
  return (
    <section className="stats-section" aria-labelledby="stats-heading">
      <div className="cargo-photo" aria-hidden="true" />
      <h2 id="stats-heading">{statsTitle}</h2>
      <div className="stats-grid">
        {stats.map((stat) => (
          <article className={stat.featured ? "stat-card is-featured" : "stat-card"} key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
