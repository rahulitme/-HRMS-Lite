import type { Employee } from '../../types';

interface EmployeeTableProps {
  employees: Employee[];
  onDelete: (id: string) => Promise<void> | void;
  deletingId?: string | null;
}

const EmployeeTable = ({ employees, onDelete, deletingId }: EmployeeTableProps) => {
  if (!employees.length) {
    return <div className="list-empty">👥 No employees yet. Add your first team member to get started.</div>;
  }

  const handleDelete = (id: string, name: string) => {
    const confirmed = window.confirm(`Delete ${name}? This will also remove their attendance records.`);
    if (confirmed) onDelete(id);
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th style={{ textAlign: 'right', paddingRight: 20 }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td><code style={{ background: 'var(--panel-strong)', padding: '4px 8px', borderRadius: 6, fontSize: 12 }}>{emp.employeeId}</code></td>
              <td><strong>{emp.fullName}</strong></td>
              <td style={{ color: 'var(--muted)' }}>{emp.email}</td>
              <td><span className="badge">{emp.department}</span></td>
              <td style={{ textAlign: 'right' }}>
                <button
                  className="danger"
                  onClick={() => handleDelete(emp.id, emp.fullName)}
                  disabled={deletingId === emp.id}
                  aria-busy={deletingId === emp.id}
                  style={{ fontSize: 13, padding: '8px 12px' }}
                >
                  {deletingId === emp.id ? 'Deleting...' : '🗑️'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
