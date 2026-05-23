import { Router, Request, Response } from 'express';
import { patients } from '../data/mockData';
import { protect, adminOnly, AuthRequest } from '../middleware/auth';

const router = Router();

// GET /api/patients  (admin only)
router.get('/', protect, adminOnly, (_req: AuthRequest, res: Response) => {
  res.json({ success: true, data: patients });
});

// GET /api/patients/:id
router.get('/:id', protect, (req: AuthRequest, res: Response) => {
  const patient = patients.find(p => p.id === Number(req.params.id));
  if (!patient) return res.status(404).json({ success: false, message: 'Patient not found' });
  // Admin can view any; patient can view their own
  if (req.user?.role !== 'admin' && patient.userId !== req.user?.id) {
    return res.status(403).json({ success: false, message: 'Not authorized' });
  }
  return res.json({ success: true, data: patient });
});

export default router;
