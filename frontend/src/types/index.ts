export type UserRole = 'admin' | 'doctor' | 'patient';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  createdAt: string;
}

export interface Doctor {
  id: number;
  userId: number;
  name: string;
  specialization: string;
  experience: string;
  fees: number;
  bio: string;
  availableDays: string[];
  availableTime: string[];
  rating: number;
  totalRatings: number;
  image: string;
  createdAt: string;
}

export interface Patient {
  id: number;
  userId: number;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  bloodGroup: string;
  address: string;
  medicalHistory: string[];
  createdAt: string;
}

export type AppointmentStatus = 'confirmed' | 'pending' | 'cancelled' | 'completed';

export interface Appointment {
  id: number;
  patientId: number;
  patientName: string;
  doctorId: number;
  doctorName: string;
  specialization: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  symptoms: string;
  notes: string;
  doctorNotes: string;
  fee: number;
  createdAt: string;
}

export interface DashboardStats {
  totalPatients: number;
  todayAppointments: number;
  pendingConfirmations: number;
  revenueThisMonth: number;
  totalRevenue: number;
  totalDoctors: number;
  totalAppointments: number;
  last30DaysChart: { date: string; count: number }[];
  appointmentsByDoctor: { name: string; specialization: string; count: number }[];
  statusBreakdown: {
    confirmed: number;
    pending: number;
    cancelled: number;
    completed: number;
  };
  recentAppointments: Appointment[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  token?: string;
  user?: User;
}
