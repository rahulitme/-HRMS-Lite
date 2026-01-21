import type { AttendanceRecord, Employee } from '../../types';

interface AttendanceTableProps {
  records: AttendanceRecord[];
  employees: Employee[];
}

const formatDate = (iso: string) => new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

const AttendanceTable = ({ records, employees }: AttendanceTableProps) => {
  if (!records.length) {
    return <div className="list-empty">📋 No attendance records yet. Mark attendance to see history.</div>;
  }

  const lookup = new Map(employees.map((e) => [e.id, e]));

  return (
    <div style={{ overflowX: 'auto' }}>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Employee</th>
            <th style={{ textAlign: 'center' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec) => {
            const person = lookup.get(rec.employeeId);
            const label = person ? person.fullName : rec.employeeName || 'Unknown';
            const empId = person ? person.employeeId : 'Unknown';
            return (
              <tr key={rec.id}>
                <td>{formatDate(rec.date)}</td>
                <td>
                  <div>
                    <strong>{label}</strong>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>{empId}</div>
                  </div>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span className={`badge ${rec.status === 'Present' ? 'success' : 'danger'}`}>
                    {rec.status === 'Present' ? '✓' : '✗'} {rec.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
