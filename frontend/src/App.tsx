import { useEffect, useMemo, useState } from 'react';
import AttendanceForm from './components/attendance/AttendanceForm';
import AttendanceTable from './components/attendance/AttendanceTable';
import EmployeeForm from './components/employees/EmployeeForm';
import EmployeeTable from './components/employees/EmployeeTable';
import Toast from './components/common/Toast';
import StatsStrip from './components/common/StatsStrip';
import Header from './components/common/Header';
import { api } from './api/client';
import type { AttendanceRecord, AttendanceStatus, Employee } from './types';

const App = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [employeeError, setEmployeeError] = useState<string | null>(null);
  const [attendanceError, setAttendanceError] = useState<string | null>(null);
  const [action, setAction] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [empList, attList] = await Promise.all([api.employees.list(), api.attendance.list()]);
        setEmployees(empList);
        setAttendance(sortAttendance(attList));
      } catch (err) {
        setError(messageFromError(err));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const presentToday = useMemo(() => countByStatus(attendance, 'Present'), [attendance]);
  const absentToday = useMemo(() => countByStatus(attendance, 'Absent'), [attendance]);
  const attendanceRate = useMemo(() => {
    const total = presentToday + absentToday;
    if (!total) return 0;
    return (presentToday / total) * 100;
  }, [presentToday, absentToday]);

  const lastUpdated = useMemo(() => {
    if (!attendance.length) return undefined;
    const latest = attendance[0];
    return new Date(latest.date).toLocaleDateString();
  }, [attendance]);

  const handleAddEmployee = async (payload: { employeeId: string; fullName: string; email: string; department: string }) => {
    setEmployeeError(null);
    setAction('create-employee');
    try {
      const created = await api.employees.create(payload);
      setEmployees((prev) => [...prev, created]);
      setToast('Employee added successfully');
    } catch (err) {
      setEmployeeError(messageFromError(err));
    } finally {
      setAction(null);
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    setEmployeeError(null);
    setAction(`delete-${id}`);
    try {
      await api.employees.remove(id);
      setEmployees((prev) => prev.filter((e) => e.id !== id));
      setAttendance((prev) => prev.filter((a) => a.employeeId !== id));
      setToast('Employee deleted');
    } catch (err) {
      setEmployeeError(messageFromError(err));
    } finally {
      setAction(null);
    }
  };

  const handleMarkAttendance = async (payload: { employeeId: string; date: string; status: AttendanceStatus }) => {
    setAttendanceError(null);
    setAction('mark-attendance');
    try {
      const saved = await api.attendance.mark(payload);
      setAttendance((prev) => sortAttendance([...prev.filter((a) => !(a.employeeId === saved.employeeId && a.date === saved.date)), saved]));
      setToast('Attendance recorded successfully');
    } catch (err) {
      setAttendanceError(messageFromError(err));
    } finally {
      setAction(null);
    }
  };

  return (
    <div className="app-shell">
      <Header totalEmployees={employees.length} />
      
      <div className="app-content">
        <div className="app-main">
          <div className="hero">
            <div className="hero-card">
              <h1>HRMS Lite</h1>
              <p>Professional HR management with employee records and attendance tracking.</p>
            </div>
            <div className="hero-card" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(14,165,233,0.08))' }}>
              <StatsStrip
                totalEmployees={employees.length}
                presentToday={presentToday}
                absentToday={absentToday}
                attendanceRate={attendanceRate}
                lastUpdated={lastUpdated}
              />
            </div>
          </div>

          {loading ? <div className="state">Loading workspace...</div> : null}
          {error ? <div className="state error">{error}</div> : null}

          <div className="grid" style={{ marginBottom: 24 }}>
            <div className="panel">
              <h2>Add Employee</h2>
              <EmployeeForm loading={action === 'create-employee'} onSubmit={handleAddEmployee} errorMessage={employeeError} />
            </div>
            <div className="panel">
              <h2>Mark Attendance</h2>
              <AttendanceForm
                employees={employees}
                onSubmit={handleMarkAttendance}
                loading={action === 'mark-attendance'}
                errorMessage={attendanceError}
              />
            </div>
          </div>

          <div className="grid">
            <div className="panel">
              <h2>Employees</h2>
              <EmployeeTable employees={employees} onDelete={handleDeleteEmployee} deletingId={action?.startsWith('delete-') ? action.replace('delete-', '') : null} />
            </div>
            <div className="panel">
              <h2>Attendance</h2>
              <AttendanceTable records={attendance} employees={employees} />
            </div>
          </div>

          {toast ? <Toast message={toast} onClose={() => setToast(null)} /> : null}
        </div>
      </div>
    </div>
  );
};

function countByStatus(records: AttendanceRecord[], status: AttendanceStatus) {
  const today = new Date().toISOString().slice(0, 10);
  return records.filter((r) => r.status === status && r.date.slice(0, 10) === today).length;
}

function sortAttendance(records: AttendanceRecord[]) {
  return [...records].sort((a, b) => b.date.localeCompare(a.date));
}

function messageFromError(err: unknown) {
  if (err instanceof Error) return err.message;
  if (typeof err === 'string') return err;
  return 'Something went wrong. Please try again.';
}

export default App;
