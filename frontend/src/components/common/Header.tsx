interface HeaderProps {
  totalEmployees: number;
}

const Header = ({ totalEmployees }: HeaderProps) => {
  return (
    <header className="app-sidebar">
      <div className="app-logo">HRMS Lite</div>
      <nav style={{ flex: 1 }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600, marginBottom: 12 }}>Admin Panel</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ padding: '8px 12px', borderRadius: 8, background: 'var(--accent-light)', color: 'var(--accent)', fontSize: 14, fontWeight: 500 }}>
            👥 Employees
          </div>
          <div style={{ padding: '8px 12px', borderRadius: 8, color: 'var(--muted)', fontSize: 14, fontWeight: 500 }}>
            📋 Attendance
          </div>
        </div>
      </nav>
      <div style={{ paddingTop: 16, borderTop: '1px solid var(--border)' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)' }}>Total Employees</div>
        <div style={{ fontSize: 24, fontWeight: 700, marginTop: 4, background: 'linear-gradient(135deg, var(--text), var(--text-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {totalEmployees}
        </div>
      </div>
    </header>
  );
};

export default Header;
