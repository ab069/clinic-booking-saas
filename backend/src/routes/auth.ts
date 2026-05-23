import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { users, nextUserId, patients, nextPatientId } from '../data/mockData';
import * as mockData from '../data/mockData';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'clinic_saas_secret_2024';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '7d';

const signToken = (id: number, email: string, role: string) =>
  jwt.sign({ id, email, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = signToken(user.id, user.email, user.role);
    const { password: _pw, ...userWithoutPw } = user;

    return res.json({
      success: true,
      token,
      user: userWithoutPw,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, role = 'patient' } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password required' });
    }

    const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }

    const hashedPw = await bcrypt.hash(password, 10);
    const newUser = {
      id: mockData.nextUserId,
      name,
      email,
      password: hashedPw,
      role: role as 'patient' | 'admin' | 'doctor',
      phone: phone || '',
      createdAt: new Date().toISOString(),
    };
    (mockData as any).nextUserId += 1;
    users.push(newUser);

    // Auto-create patient record if role is patient
    if (role === 'patient' || role === undefined) {
      const newPatient = {
        id: mockData.nextPatientId,
        userId: newUser.id,
        name,
        email,
        phone: phone || '',
        dateOfBirth: '',
        gender: 'male' as const,
        bloodGroup: '',
        address: '',
        medicalHistory: [],
        createdAt: new Date().toISOString(),
      };
      (mockData as any).nextPatientId += 1;
      patients.push(newPatient);
    }

    const token = signToken(newUser.id, newUser.email, newUser.role);
    const { password: _pw, ...userWithoutPw } = newUser;

    return res.status(201).json({
      success: true,
      token,
      user: userWithoutPw,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/auth/me
router.get('/me', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token' });
  }
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string; role: string };
    const user = users.find(u => u.id === decoded.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    const { password: _pw, ...userWithoutPw } = user;
    return res.json({ success: true, user: userWithoutPw });
  } catch {
    return res.status(401).json({ success: false, message: 'Token invalid' });
  }
});

export default router;
