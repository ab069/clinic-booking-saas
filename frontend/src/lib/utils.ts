import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return `PKR ${amount.toLocaleString('en-PK')}`;
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-PK', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function formatShortDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-PK', { month: 'short', day: 'numeric' });
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'confirmed':  return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'pending':    return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'cancelled':  return 'bg-red-100 text-red-700 border-red-200';
    case 'completed':  return 'bg-blue-100 text-blue-700 border-blue-200';
    default:           return 'bg-gray-100 text-gray-700 border-gray-200';
  }
}

export function isToday(dateStr: string): boolean {
  return dateStr === new Date().toISOString().slice(0, 10);
}
