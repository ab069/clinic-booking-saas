import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { users } from '../data/mockData';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: string;
  };
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Not authorized, no token' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const secret = process.env.JWT_SECRET || 'clinic_saas_secret_2024';
    const decoded = jwt.verify(token, secret) as { id: number; email: string; role: string };
    const userExists = users.find(u => u.id === decoded.id);
    if (!userExists) {
      res.status(401).json({ success: false, message: 'User no longer exists' });
      return;
    }
    req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Token invalid or expired' });
  }
};

export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user?.role !== 'admin') {
    res.status(403).json({ success: false, message: 'Admin access required' });
    return;
  }
  next();
};
