import { Router, Request, Response } from 'express';
import { doctors } from '../data/mockData';

const router = Router();

// GET /api/doctors
router.get('/', (_req: Request, res: Response) => {
  res.json({ success: true, data: doctors });
});

// GET /api/doctors/:id
router.get('/:id', (req: Request, res: Response) => {
  const doctor = doctors.find(d => d.id === Number(req.params.id));
  if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });
  return res.json({ success: true, data: doctor });
});

export default router;
