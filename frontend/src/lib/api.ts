import axios from 'axios';
import { getToken } from './auth';
import type {
  Appointment,
  Doctor,
  Patient,
  DashboardStats,
  ApiResponse,
  User,
} from '../types';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT on every request
api.interceptors.request.use(config => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const authApi = {
  login: (email: string, password: string) =>
    api.post<ApiResponse<null>>('/auth/login', { email, password }),
  register: (data: { name: string; email: string; password: string; phone?: string; role?: string }) =>
    api.post<ApiResponse<null>>('/auth/register', data),
  me: () => api.get<ApiResponse<User>>('/auth/me'),
};

// Doctors
export const doctorsApi = {
  list: () => api.get<ApiResponse<Doctor[]>>('/doctors'),
  get:  (id: number) => api.get<ApiResponse<Doctor>>(`/doctors/${id}`),
};

// Patients
export const patientsApi = {
  list: () => api.get<ApiResponse<Patient[]>>('/patients'),
  get:  (id: number) => api.get<ApiResponse<Patient>>(`/patients/${id}`),
};

// Appointments
export const appointmentsApi = {
  list: (params?: { status?: string; doctorId?: number; date?: string }) =>
    api.get<ApiResponse<Appointment[]>>('/appointments', { params }),
  get:  (id: number) => api.get<ApiResponse<Appointment>>(`/appointments/${id}`),
  create: (data: { doctorId: number; date: string; time: string; symptoms?: string; notes?: string }) =>
    api.post<ApiResponse<Appointment>>('/appointments', data),
  update: (id: number, data: Partial<Appointment>) =>
    api.put<ApiResponse<Appointment>>(`/appointments/${id}`, data),
  remove: (id: number) => api.delete<ApiResponse<null>>(`/appointments/${id}`),
};

// Dashboard
export const dashboardApi = {
  stats: () => api.get<ApiResponse<DashboardStats>>('/dashboard/stats'),
};

export default api;
