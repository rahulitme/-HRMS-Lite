import { FormEvent, useMemo, useState } from 'react';
import type { AttendanceStatus, Employee } from '../../types';

interface AttendanceFormProps {
  employees: Employee[];
  onSubmit: (payload: { employeeId: string; date: string; status: AttendanceStatus }) => Promise<void> | void;
  loading?: boolean;
  errorMessage?: string | null;
}

const AttendanceForm = ({ employees, onSubmit, loading, errorMessage }: AttendanceFormProps) => {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [employeeId, setEmployeeId] = useState('');
  const [date, setDate] = useState(today);
  const [status, setStatus] = useState<AttendanceStatus>('Present');
  const [localError, setLocalError] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!employeeId) {
      setLocalError('Select an employee to mark attendance.');
      return;
    }
    await onSubmit({ employeeId, date, status });
  };

  const message = localError || errorMessage;

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="field">
        <label>Employee</label>
        <select 
          value={employeeId} 
          onChange={(e) => setEmployeeId(e.target.value)} 
          disabled={!employees.length}
          onFocus={() => setFocused('employee')}
          onBlur={() => setFocused(null)}
          style={{ borderColor: focused === 'employee' ? 'var(--accent)' : 'var(--border)' }}
        >
          <option value="">Select employee...</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.fullName} ({emp.employeeId})
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label>Date</label>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)}
          onFocus={() => setFocused('date')}
          onBlur={() => setFocused(null)}
          style={{ borderColor: focused === 'date' ? 'var(--accent)' : 'var(--border)' }}
        />
      </div>
      <div className="field">
        <label>Status</label>
        <select 
          value={status} 
          onChange={(e) => setStatus(e.target.value as AttendanceStatus)}
          onFocus={() => setFocused('status')}
          onBlur={() => setFocused(null)}
          style={{ borderColor: focused === 'status' ? 'var(--accent)' : 'var(--border)' }}
        >
          <option value="Present">✓ Present</option>
          <option value="Absent">✗ Absent</option>
        </select>
      </div>

      {message ? <div className="state error" style={{ textAlign: 'left' }}>{message}</div> : null}

      <button type="submit" disabled={!employees.length || loading} aria-busy={loading}>
        {loading ? 'Marking...' : '📍 Mark Attendance'}
      </button>
    </form>
  );
};

export default AttendanceForm;
