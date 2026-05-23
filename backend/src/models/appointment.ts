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
