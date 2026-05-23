import { User } from '../types';

const TOKEN_KEY = 'cliniq_token';
const USER_KEY  = 'cliniq_user';

export const saveAuth = (token: string, user: User): void => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);

export const getUser = (): User | null => {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as User; }
  catch { return null; }
};

export const clearAuth = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const isAuthenticated = (): boolean => !!getToken();
