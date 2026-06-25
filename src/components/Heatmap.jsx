import { impactLevels, likelihoodLevels } from "../data/constants.js";
import { calculateRiskLevel } from "../utils/riskUtils.js";

export default function Heatmap({ risks }) {
  const likelihoodRows = [...likelihoodLevels].reverse();

  const countRisks = (likelihood, finalImpact) =>
    risks.filter(
      (risk) =>
        Number(risk.likelihood) === Number(likelihood) &&
        Number(risk.finalImpact) === Number(finalImpact),
    ).length;

  return (
    <div className="heatmap-wrap">
      <table className="heatmap" aria-label="مصفوفة المخاطر">
        <thead>
          <tr>
            <th className="axis-label">الاحتمالية / الأثر النهائي</th>
            {impactLevels.map((impact) => (
              <th key={impact.value}>
                <span>{impact.value}</span>
                <small>{impact.label}</small>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {likelihoodRows.map((likelihood) => (
            <tr key={likelihood.value}>
              <th>
                <span>{likelihood.value}</span>
                <small>{likelihood.label}</small>
              </th>
              {impactLevels.map((impact) => {
                const riskInfo = calculateRiskLevel(likelihood.value, impact.value, 0, 0);
                const riskCount = countRisks(likelihood.value, impact.value);

                return (
                  <td key={`${likelihood.value}-${impact.value}`}>
                    <div className={`matrix-cell ${riskInfo.colorClass}`}>
                      <strong>{riskInfo.score}</strong>
                      <span>{riskInfo.level}</span>
                      {riskCount > 0 && <em>{riskCount} خطر</em>}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
