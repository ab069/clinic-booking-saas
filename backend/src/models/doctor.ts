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
