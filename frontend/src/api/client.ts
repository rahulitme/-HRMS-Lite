import type { AttendanceRecord, Employee } from '../types';

const baseFromEnv = import.meta.env.VITE_API_BASE_URL as string | undefined;
export const API_BASE = (baseFromEnv || 'http://localhost:8000').replace(/\/$/, '');

interface ApiError extends Error {
  status?: number;
  details?: unknown;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  if (!res.ok) {
    const message = await safeMessage(res);
    const err: ApiError = new Error(message || 'Request failed');
    err.status = res.status;
    err.details = message;
    throw err;
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

async function safeMessage(res: Response): Promise<string | undefined> {
  try {
    const data = await res.json();
    if (typeof data === 'string') return data;
    if (data?.detail) return Array.isArray(data.detail) ? data.detail[0]?.msg || data.detail[0] : data.detail;
    if (data?.message) return data.message;
  } catch (err) {
    return res.statusText;
  }
  return res.statusText;
}

export const api = {
  employees: {
    list: () => request<Employee[]>('/employees'),
    create: (payload: Omit<Employee, 'id' | 'createdAt'>) =>
      request<Employee>('/employees', { method: 'POST', body: JSON.stringify(payload) }),
    remove: (id: string) => request<void>(`/employees/${id}`, { method: 'DELETE' })
  },
  attendance: {
    list: (employeeId?: string) => {
      const query = employeeId ? `?employee_id=${encodeURIComponent(employeeId)}` : '';
      return request<AttendanceRecord[]>(`/attendance${query}`);
    },
    mark: (payload: { employeeId: string; date: string; status: AttendanceRecord['status'] }) =>
      request<AttendanceRecord>('/attendance', { method: 'POST', body: JSON.stringify(payload) })
  }
};
