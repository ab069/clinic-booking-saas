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
