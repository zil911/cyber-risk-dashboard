import { useMemo, useState } from "react";
import { domains, riskLevels, statuses } from "../data/constants.js";

const ALL_FILTER = "الكل";

export default function RisksTable({ risks, onEdit, onDelete, onView }) {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState(ALL_FILTER);
  const [domainFilter, setDomainFilter] = useState(ALL_FILTER);
  const [statusFilter, setStatusFilter] = useState(ALL_FILTER);

  const filteredRisks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return risks.filter((risk) => {
      const matchesSearch =
        !query ||
        [
          risk.title,
          risk.system,
          risk.asset,
          risk.domain,
          risk.subComponent,
          risk.scenario,
          risk.recommendedAction,
        ]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(query));

      const matchesLevel = levelFilter === ALL_FILTER || risk.level === levelFilter;
      const matchesDomain = domainFilter === ALL_FILTER || risk.domain === domainFilter;
      const matchesStatus = statusFilter === ALL_FILTER || risk.status === statusFilter;

      return matchesSearch && matchesLevel && matchesDomain && matchesStatus;
    });
  }, [risks, search, levelFilter, domainFilter, statusFilter]);

  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p>قائمة المخاطر</p>
          <h1>سجل مخاطر الأمن السيبراني</h1>
        </div>
      </header>

      <section className="panel">
        <div className="filters">
          <label>
            <span>بحث</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} />
          </label>

          <label>
            <span>مستوى الخطر</span>
            <select value={levelFilter} onChange={(event) => setLevelFilter(event.target.value)}>
              <option value={ALL_FILTER}>{ALL_FILTER}</option>
              {riskLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>المجال</span>
            <select value={domainFilter} onChange={(event) => setDomainFilter(event.target.value)}>
              <option value={ALL_FILTER}>{ALL_FILTER}</option>
              {domains.map((domain) => (
                <option key={domain.key} value={domain.name}>
                  {domain.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>الحالة</span>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option value={ALL_FILTER}>{ALL_FILTER}</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="table-wrap">
          <table className="risks-table">
            <thead>
              <tr>
                <th>اسم الخطر</th>
                <th>النظام</th>
                <th>المجال</th>
                <th>الاحتمالية</th>
                <th>السرية</th>
                <th>السلامة</th>
                <th>التوفر</th>
                <th>الأثر النهائي</th>
                <th>الدرجة</th>
                <th>المستوى</th>
                <th>الحالة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredRisks.map((risk) => (
                <tr key={risk.id}>
                  <td>
                    <strong>{risk.title}</strong>
                    <span>{risk.asset}</span>
                  </td>
                  <td>{risk.system}</td>
                  <td>{risk.domain}</td>
                  <td>{risk.likelihood}</td>
                  <td>{risk.confidentialityImpact}</td>
                  <td>{risk.integrityImpact}</td>
                  <td>{risk.availabilityImpact}</td>
                  <td>{risk.finalImpact}</td>
                  <td>{risk.score}</td>
                  <td>
                    <span className={`risk-badge ${risk.colorClass}`}>{risk.level}</span>
                  </td>
                  <td>{risk.status}</td>
                  <td className="actions-cell">
                    <div className="table-actions">
                      <button type="button" onClick={() => onView(risk)}>
                        عرض
                      </button>
                      <button type="button" onClick={() => onEdit(risk)}>
                        تعديل
                      </button>
                      <button
                        className="danger-button"
                        type="button"
                        onClick={() => onDelete(risk.id)}
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRisks.length === 0 && (
          <div className="empty-state">لا توجد مخاطر مطابقة للمرشحات الحالية.</div>
        )}
      </section>
    </div>
  );
}
