import { Router, Response } from 'express';
import { appointments, doctors, patients } from '../data/mockData';
import * as mockData from '../data/mockData';
import { protect, AuthRequest } from '../middleware/auth';
import { Appointment } from '../models/appointment';

const router = Router();

// GET /api/appointments
router.get('/', protect, (req: AuthRequest, res: Response) => {
  let result = [...appointments];
  const { role, id } = req.user!;

  // Patients see only their own
  if (role === 'patient') {
    const patient = patients.find(p => p.userId === id);
    if (patient) result = result.filter(a => a.patientId === patient.id);
    else result = [];
  }
  // Doctors see only their own
  if (role === 'doctor') {
    const doctor = doctors.find(d => d.userId === id);
    if (doctor) result = result.filter(a => a.doctorId === doctor.id);
    else result = [];
  }

  // Query filters
  const { status, doctorId, patientId, date } = req.query;
  if (status) result = result.filter(a => a.status === status);
  if (doctorId) result = result.filter(a => a.doctorId === Number(doctorId));
  if (patientId) result = result.filter(a => a.patientId === Number(patientId));
  if (date) result = result.filter(a => a.date === date);

  result.sort((a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time));
  return res.json({ success: true, data: result });
});

// GET /api/appointments/:id
router.get('/:id', protect, (req: AuthRequest, res: Response) => {
  const appt = appointments.find(a => a.id === Number(req.params.id));
  if (!appt) return res.status(404).json({ success: false, message: 'Appointment not found' });
  return res.json({ success: true, data: appt });
});

// POST /api/appointments
router.post('/', protect, (req: AuthRequest, res: Response) => {
  const { doctorId, date, time, symptoms, notes } = req.body;
  if (!doctorId || !date || !time) {
    return res.status(400).json({ success: false, message: 'doctorId, date, and time are required' });
  }

  const doctor = doctors.find(d => d.id === Number(doctorId));
  if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });

  // Find or create patient record for the user
  let patient = patients.find(p => p.userId === req.user!.id);
  let patientName = '';
  let patientId = 0;

  if (patient) {
    patientName = patient.name;
    patientId = patient.id;
  } else {
    // Use user name from users array
    patientName = req.body.patientName || 'Unknown Patient';
    patientId = mockData.nextPatientId;
    (mockData as any).nextPatientId += 1;
    patients.push({
      id: patientId,
      userId: req.user!.id,
      name: patientName,
      email: req.user!.email,
      phone: '',
      dateOfBirth: '',
      gender: 'male',
      bloodGroup: '',
      address: '',
      medicalHistory: [],
      createdAt: new Date().toISOString(),
    });
  }

  const newAppt: Appointment = {
    id: mockData.nextAppointmentId,
    patientId,
    patientName,
    doctorId: Number(doctorId),
    doctorName: doctor.name,
    specialization: doctor.specialization,
    date,
    time,
    status: 'pending',
    symptoms: symptoms || '',
    notes: notes || '',
    doctorNotes: '',
    fee: doctor.fees,
    createdAt: new Date().toISOString(),
  };
  (mockData as any).nextAppointmentId += 1;
  appointments.push(newAppt);

  return res.status(201).json({ success: true, data: newAppt });
});

// PUT /api/appointments/:id
router.put('/:id', protect, (req: AuthRequest, res: Response) => {
  const idx = appointments.findIndex(a => a.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ success: false, message: 'Appointment not found' });

  const appt = appointments[idx];
  const { role } = req.user!;

  // Patients can only cancel their own
  if (role === 'patient') {
    const patient = patients.find(p => p.userId === req.user!.id);
    if (!patient || appt.patientId !== patient.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    if (req.body.status && req.body.status !== 'cancelled') {
      return res.status(403).json({ success: false, message: 'Patients can only cancel appointments' });
    }
  }

  const allowed: (keyof Appointment)[] = ['status', 'symptoms', 'notes', 'doctorNotes', 'date', 'time'];
  allowed.forEach(field => {
    if (req.body[field] !== undefined) {
      (appt as any)[field] = req.body[field];
    }
  });

  return res.json({ success: true, data: appt });
});

// DELETE /api/appointments/:id
router.delete('/:id', protect, (req: AuthRequest, res: Response) => {
  const idx = appointments.findIndex(a => a.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ success: false, message: 'Appointment not found' });

  if (req.user?.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }

  appointments.splice(idx, 1);
  return res.json({ success: true, message: 'Appointment deleted' });
});

export default router;
