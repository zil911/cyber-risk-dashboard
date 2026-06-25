import RiskForm from "../components/RiskForm.jsx";

export default function AddRisk({ editingRisk, onSubmit, onCancel }) {
  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p>{editingRisk ? "تعديل خطر" : "إضافة خطر"}</p>
          <h1>{editingRisk ? editingRisk.title : "تسجيل خطر جديد"}</h1>
        </div>
      </header>
      <RiskForm editingRisk={editingRisk} onSubmit={onSubmit} onCancel={onCancel} />
    </div>
  );
}
