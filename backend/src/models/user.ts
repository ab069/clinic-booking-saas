export type UserRole = 'admin' | 'doctor' | 'patient';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
  createdAt: string;
}
