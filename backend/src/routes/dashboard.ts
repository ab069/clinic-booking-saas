import { Router, Response } from 'express';
import { appointments, patients, doctors } from '../data/mockData';
import { protect, adminOnly, AuthRequest } from '../middleware/auth';

const router = Router();

// GET /api/dashboard/stats
router.get('/stats', protect, adminOnly, (_req: AuthRequest, res: Response) => {
  const today = new Date().toISOString().slice(0, 10);

  const totalPatients = patients.length;
  const todayAppointments = appointments.filter(a => a.date === today).length;
  const pendingConfirmations = appointments.filter(a => a.status === 'pending').length;

  // Revenue this month
  const now = new Date();
  const monthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
  const revenueThisMonth = appointments
    .filter(a => a.date >= monthStart && (a.status === 'confirmed' || a.status === 'completed'))
    .reduce((sum, a) => sum + a.fee, 0);

  // Total revenue all time
  const totalRevenue = appointments
    .filter(a => a.status === 'confirmed' || a.status === 'completed')
    .reduce((sum, a) => sum + a.fee, 0);

  // Appointments over last 30 days (for line chart)
  const last30: { date: string; count: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const count = appointments.filter(a => a.date === dateStr).length;
    last30.push({ date: dateStr, count });
  }

  // Appointments by doctor (for bar chart)
  const byDoctor = doctors.map(doc => ({
    name: doc.name.replace('Dr. ', ''),
    specialization: doc.specialization,
    count: appointments.filter(a => a.doctorId === doc.id).length,
  }));

  // Status breakdown
  const statusBreakdown = {
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    pending: appointments.filter(a => a.status === 'pending').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length,
    completed: appointments.filter(a => a.status === 'completed').length,
  };

  // Recent appointments (latest 10)
  const recent = [...appointments]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 10);

  return res.json({
    success: true,
    data: {
      totalPatients,
      todayAppointments,
      pendingConfirmations,
      revenueThisMonth,
      totalRevenue,
      totalDoctors: doctors.length,
      totalAppointments: appointments.length,
      last30DaysChart: last30,
      appointmentsByDoctor: byDoctor,
      statusBreakdown,
      recentAppointments: recent,
    },
  });
});

export default router;
