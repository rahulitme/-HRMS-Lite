interface StatsStripProps {
  totalEmployees: number;
  presentToday: number;
  absentToday: number;
  attendanceRate: number;
  lastUpdated?: string;
}

const Stat = ({ label, value, icon }: { label: string; value: string; icon?: string }) => (
  <div className="stat-card">
    <span>{icon ? `${icon} ${label}` : label}</span>
    <strong>{value}</strong>
  </div>
);

const StatsStrip = ({ totalEmployees, presentToday, absentToday, attendanceRate, lastUpdated }: StatsStripProps) => {
  return (
    <div className="stats">
      <Stat label="Employees" value={totalEmployees.toString()} icon="👥" />
      <Stat label="Present" value={presentToday.toString()} icon="✓" />
      <Stat label="Absent" value={absentToday.toString()} icon="✗" />
      <Stat label="Rate" value={`${attendanceRate.toFixed(0)}%`} icon="📊" />
      {lastUpdated ? <Stat label="Updated" value={lastUpdated} icon="⏰" /> : null}
    </div>
  );
};

export default StatsStrip;
