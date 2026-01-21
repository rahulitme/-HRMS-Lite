import { FormEvent, useState } from 'react';

interface EmployeeFormProps {
  loading?: boolean;
  onSubmit: (payload: { employeeId: string; fullName: string; email: string; department: string }) => Promise<void> | void;
  errorMessage?: string | null;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EmployeeForm = ({ loading, onSubmit, errorMessage }: EmployeeFormProps) => {
  const [employeeId, setEmployeeId] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!employeeId.trim() || !fullName.trim() || !email.trim() || !department.trim()) {
      setLocalError('All fields are required.');
      return;
    }

    if (!emailPattern.test(email.trim())) {
      setLocalError('Please enter a valid email address.');
      return;
    }

    await onSubmit({ employeeId: employeeId.trim(), fullName: fullName.trim(), email: email.trim(), department: department.trim() });
    setEmployeeId('');
    setFullName('');
    setEmail('');
    setDepartment('');
  };

  const message = localError || errorMessage;

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="field">
        <label>Employee ID</label>
        <input 
          value={employeeId} 
          onChange={(e) => setEmployeeId(e.target.value)} 
          onFocus={() => setFocused('employeeId')}
          onBlur={() => setFocused(null)}
          placeholder="EMP-001" 
          style={{ borderColor: focused === 'employeeId' ? 'var(--accent)' : 'var(--border)' }}
        />
      </div>
      <div className="field">
        <label>Full Name</label>
        <input 
          value={fullName} 
          onChange={(e) => setFullName(e.target.value)} 
          onFocus={() => setFocused('fullName')}
          onBlur={() => setFocused(null)}
          placeholder="Jane Doe" 
          style={{ borderColor: focused === 'fullName' ? 'var(--accent)' : 'var(--border)' }}
        />
      </div>
      <div className="field">
        <label>Email</label>
        <input 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          onFocus={() => setFocused('email')}
          onBlur={() => setFocused(null)}
          placeholder="jane@company.com" 
          type="email"
          style={{ borderColor: focused === 'email' ? 'var(--accent)' : 'var(--border)' }}
        />
      </div>
      <div className="field">
        <label>Department</label>
        <input 
          value={department} 
          onChange={(e) => setDepartment(e.target.value)} 
          onFocus={() => setFocused('department')}
          onBlur={() => setFocused(null)}
          placeholder="Engineering" 
          style={{ borderColor: focused === 'department' ? 'var(--accent)' : 'var(--border)' }}
        />
      </div>

      {message ? <div className="state error">{message}</div> : null}

      <button type="submit" disabled={loading} aria-busy={loading}>
        {loading ? 'Adding...' : '+ Add Employee'}
      </button>
    </form>
  );
};

export default EmployeeForm;
