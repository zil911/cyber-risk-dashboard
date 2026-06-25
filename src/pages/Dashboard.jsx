import Heatmap from "../components/Heatmap.jsx";
import { domains, riskLevels } from "../data/constants.js";
import { countBy } from "../utils/riskUtils.js";

function MetricCard({ label, value, className = "" }) {
  return (
    <article className={`metric-card ${className}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function CountList({ title, counts, labels }) {
  const max = Math.max(1, ...labels.map((label) => counts[label] || 0));

  return (
    <section className="panel">
      <h2>{title}</h2>
      <div className="count-list">
        {labels.map((label) => {
          const value = counts[label] || 0;
          return (
            <div className="count-row" key={label}>
              <span>{label}</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${(value / max) * 100}%` }} />
              </div>
              <strong>{value}</strong>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function Dashboard({ risks }) {
  const levelCounts = riskLevels.reduce((counts, level) => {
    counts[level] = risks.filter((risk) => risk.level === level).length;
    return counts;
  }, {});

  const domainCounts = countBy(risks, "domain");
  const componentCounts = countBy(risks, "subComponent");

  const topRisks = [...risks]
    .sort((first, second) => second.score - first.score)
    .slice(0, 5);

  const summaryCards = [
    { label: "إجمالي المخاطر", value: risks.length, className: "accent" },
    { label: "المخاطر الكارثية", value: levelCounts["كارثي"] || 0 },
    { label: "المخاطر المرتفعة", value: levelCounts["مرتفع"] || 0 },
    { label: "المخاطر المفتوحة", value: risks.filter((risk) => risk.status === "مفتوح").length },
  ];

  const domainLabels = domains.map((domain) => domain.name);
  const componentLabels = Object.keys(componentCounts).sort(
    (first, second) => componentCounts[second] - componentCounts[first],
  );

  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p>لوحة التحكم</p>
          <h1>تقييم مخاطر الأمن السيبراني</h1>
        </div>
      </header>

      <section className="metrics-grid">
        <MetricCard label="إجمالي المخاطر" value={risks.length} className="accent" />
        {riskLevels.map((level) => (
          <MetricCard key={level} label={level} value={levelCounts[level] || 0} />
        ))}
      </section>

      <section className="panel">
        <div className="section-heading">
          <h2>مصفوفة المخاطر</h2>
          <span>درجة الخطر = الاحتمالية × الأثر النهائي</span>
        </div>
        <Heatmap risks={risks} />
      </section>

      <div className="two-column">
        <section className="panel">
          <h2>أعلى المخاطر</h2>
          <div className="top-risk-list">
            {topRisks.map((risk) => (
              <article className="top-risk-row" key={risk.id}>
                <div>
                  <strong>{risk.title}</strong>
                  <span>
                    {risk.domain} - الأثر النهائي {risk.finalImpact}
                  </span>
                </div>
                <span className={`risk-badge ${risk.colorClass}`}>
                  {risk.score} - {risk.level}
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2>ملخص المخاطر</h2>
          <div className="summary-card-grid">
            {summaryCards.map((card) => (
              <MetricCard
                key={card.label}
                label={card.label}
                value={card.value}
                className={card.className || ""}
              />
            ))}
          </div>
        </section>
      </div>

      <div className="two-column">
        <CountList title="المخاطر حسب المجال" counts={domainCounts} labels={domainLabels} />
        <CountList title="المخاطر حسب المكون" counts={componentCounts} labels={componentLabels} />
      </div>
    </div>
  );
}
