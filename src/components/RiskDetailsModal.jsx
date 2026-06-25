function DetailItem({ label, value }) {
  return (
    <div className="detail-item">
      <span>{label}</span>
      <strong>{value || value === 0 ? value : "غير محدد"}</strong>
    </div>
  );
}

export default function RiskDetailsModal({ risk, onClose }) {
  if (!risk) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <section className="modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div>
            <p>تفاصيل الخطر</p>
            <h2>{risk.title}</h2>
          </div>
          <button className="icon-button" onClick={onClose} type="button" aria-label="إغلاق">
            ×
          </button>
        </div>

        <div className="details-grid">
          <DetailItem label="النظام" value={risk.system} />
          <DetailItem label="الأصل المتأثر" value={risk.asset} />
          <DetailItem label="المجال" value={risk.domain} />
          <DetailItem label="المكون الفرعي" value={risk.subComponent} />
          <DetailItem label="الاحتمالية" value={risk.likelihood} />
          <DetailItem label="أثر السرية" value={risk.confidentialityImpact} />
          <DetailItem label="أثر السلامة" value={risk.integrityImpact} />
          <DetailItem label="أثر التوفر" value={risk.availabilityImpact} />
          <DetailItem label="الأثر النهائي" value={risk.finalImpact} />
          <DetailItem label="درجة الخطر" value={risk.score} />
          <div className="detail-item">
            <span>مستوى الخطر</span>
            <strong className={`risk-badge ${risk.colorClass}`}>{risk.level}</strong>
          </div>
          <DetailItem label="الحالة" value={risk.status} />
        </div>

        <div className="details-sections">
          <article>
            <h3>وصف الخطر</h3>
            <p>{risk.scenario}</p>
          </article>
          <article>
            <h3>الإجراء المقترح</h3>
            <p>{risk.recommendedAction}</p>
          </article>
        </div>
      </section>
    </div>
  );
}
