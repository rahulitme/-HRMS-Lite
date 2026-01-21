export type AttendanceStatus = 'Present' | 'Absent';

export interface Employee {
  id: string;
  employeeId: string;
  fullName: string;
  email: string;
  department: string;
  createdAt?: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  status: AttendanceStatus;
  date: string;
  employeeName?: string;
}
