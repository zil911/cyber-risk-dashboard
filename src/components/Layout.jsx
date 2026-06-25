const navItems = [
  { id: "dashboard", label: "لوحة التحكم" },
  { id: "add", label: "إضافة خطر" },
  { id: "risks", label: "قائمة المخاطر" },
];

export default function Layout({ activePage, onNavigate, children, editingRisk }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">أمن</span>
          <div>
            <strong>تقييم المخاطر</strong>
            <span>الأمن السيبراني</span>
          </div>
        </div>

        <nav className="nav-list" aria-label="التنقل الرئيسي">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? "active" : ""}`}
              onClick={() => onNavigate(item.id)}
              type="button"
            >
              {item.id === "add" && editingRisk ? "تعديل خطر" : item.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="content">{children}</main>
    </div>
  );
}
