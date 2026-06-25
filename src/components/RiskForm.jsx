import { useEffect, useMemo, useState } from "react";
import {
  ciaImpactLevels,
  domains,
  likelihoodLevels,
  statuses,
  subcomponentsByDomain,
} from "../data/constants.js";
import { calculateRiskLevel, enrichRisk } from "../utils/riskUtils.js";

const createEmptyRisk = () => ({
  title: "",
  system: "نظام الجامعة",
  asset: "",
  domain: domains[0].name,
  subComponent: domains[0].subcomponents[0],
  scenario: "",
  likelihood: 3,
  confidentialityImpact: 0,
  integrityImpact: 0,
  availabilityImpact: 0,
  status: statuses[0],
  recommendedAction: "",
});

const numericFields = [
  "likelihood",
  "confidentialityImpact",
  "integrityImpact",
  "availabilityImpact",
];

function CalculationItem({ label, value }) {
  return (
    <div className="calculation-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default function RiskForm({ editingRisk, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(createEmptyRisk);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (editingRisk) {
      setFormData({ ...createEmptyRisk(), ...enrichRisk(editingRisk) });
    } else {
      setFormData(createEmptyRisk());
    }
    setValidationError("");
  }, [editingRisk]);

  const calculatedRisk = useMemo(
    () =>
      calculateRiskLevel(
        formData.likelihood,
        formData.confidentialityImpact,
        formData.integrityImpact,
        formData.availabilityImpact,
      ),
    [
      formData.likelihood,
      formData.confidentialityImpact,
      formData.integrityImpact,
      formData.availabilityImpact,
    ],
  );

  const updateField = (name, value) => {
    setValidationError("");
    setFormData((current) => {
      if (name === "domain") {
        const nextSubComponents = subcomponentsByDomain[value] || [];
        return {
          ...current,
          domain: value,
          subComponent: nextSubComponents[0] || "",
        };
      }

      return {
        ...current,
        [name]: numericFields.includes(name) ? Number(value) : value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (calculatedRisk.finalImpact === 0) {
      setValidationError("يجب إدخال قيمة واحدة على الأقل أكبر من 0 للسرية أو السلامة أو التوفر.");
      return;
    }

    onSubmit(enrichRisk(formData));
  };

  return (
    <form className="risk-form" onSubmit={handleSubmit}>
      <section className="form-card">
        <div className="section-heading">
          <h2>بيانات الخطر</h2>
          <span className={`risk-badge ${calculatedRisk.colorClass}`}>
            {calculatedRisk.level} - {calculatedRisk.score}
          </span>
        </div>

        <div className="form-grid">
          <label>
            <span>اسم الخطر</span>
            <input
              value={formData.title}
              onChange={(event) => updateField("title", event.target.value)}
              required
            />
          </label>

          <label>
            <span>النظام</span>
            <input
              value={formData.system}
              onChange={(event) => updateField("system", event.target.value)}
              required
            />
          </label>

          <label>
            <span>الأصل المتأثر</span>
            <input
              value={formData.asset}
              onChange={(event) => updateField("asset", event.target.value)}
              required
            />
          </label>

          <label>
            <span>المجال</span>
            <select
              value={formData.domain}
              onChange={(event) => updateField("domain", event.target.value)}
            >
              {domains.map((domain) => (
                <option key={domain.key} value={domain.name}>
                  {domain.name}
                </option>
              ))}
            </select>
          </label>

          <label className="span-2">
            <span>المكون الفرعي</span>
            <select
              value={formData.subComponent}
              onChange={(event) => updateField("subComponent", event.target.value)}
            >
              {(subcomponentsByDomain[formData.domain] || []).map((component) => (
                <option key={component} value={component}>
                  {component}
                </option>
              ))}
            </select>
          </label>

          <label className="span-2">
            <span>وصف الخطر</span>
            <textarea
              value={formData.scenario}
              onChange={(event) => updateField("scenario", event.target.value)}
              required
            />
          </label>
        </div>
      </section>

      <section className="form-card">
        <h2>تقييم الخطر</h2>
        <div className="form-grid">
          <label>
            <span>الاحتمالية</span>
            <select
              value={formData.likelihood}
              onChange={(event) => updateField("likelihood", event.target.value)}
            >
              {likelihoodLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.value} - {level.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>أثر السرية</span>
            <select
              value={formData.confidentialityImpact}
              onChange={(event) => updateField("confidentialityImpact", event.target.value)}
            >
              {ciaImpactLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.value} - {level.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>أثر السلامة</span>
            <select
              value={formData.integrityImpact}
              onChange={(event) => updateField("integrityImpact", event.target.value)}
            >
              {ciaImpactLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.value} - {level.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>أثر التوفر</span>
            <select
              value={formData.availabilityImpact}
              onChange={(event) => updateField("availabilityImpact", event.target.value)}
            >
              {ciaImpactLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.value} - {level.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="calculation-card">
          <p>طريقة الحساب: أعلى قيمة من السرية والسلامة والتوفر</p>
          <div className="calculation-grid">
            <CalculationItem label="الاحتمالية" value={formData.likelihood} />
            <CalculationItem label="السرية" value={formData.confidentialityImpact} />
            <CalculationItem label="السلامة" value={formData.integrityImpact} />
            <CalculationItem label="التوفر" value={formData.availabilityImpact} />
            <CalculationItem label="الأثر النهائي" value={calculatedRisk.finalImpact} />
            <CalculationItem label="درجة الخطر" value={calculatedRisk.score} />
            <CalculationItem label="مستوى الخطر" value={calculatedRisk.level} />
          </div>
        </div>

        {validationError && <div className="validation-error">{validationError}</div>}
      </section>

      <section className="form-card">
        <h2>المعالجة</h2>
        <div className="form-grid">
          <label>
            <span>الحالة</span>
            <select
              value={formData.status}
              onChange={(event) => updateField("status", event.target.value)}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>

          <label className="span-2">
            <span>الإجراء المقترح</span>
            <textarea
              value={formData.recommendedAction}
              onChange={(event) => updateField("recommendedAction", event.target.value)}
              required
            />
          </label>
        </div>
      </section>

      <div className="form-actions">
        <button className="primary-button" type="submit">
          {editingRisk ? "حفظ التعديلات" : "إضافة الخطر"}
        </button>
        {editingRisk && (
          <button className="secondary-button" type="button" onClick={onCancel}>
            إلغاء
          </button>
        )}
      </div>
    </form>
  );
}
