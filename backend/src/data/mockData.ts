import bcrypt from 'bcryptjs';
import { User } from '../models/user';
import { Doctor } from '../models/doctor';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';

const hashSync = (pw: string) => bcrypt.hashSync(pw, 10);

// ─── Users ───────────────────────────────────────────────────────────────────
export const users: User[] = [
  { id: 1, name: 'Admin User',         email: 'admin@clinic.com',    password: hashSync('admin123'),   role: 'admin',   phone: '0300-1234567', createdAt: '2024-01-01T00:00:00Z' },
  { id: 2, name: 'Ahmad Raza',          email: 'patient@clinic.com',  password: hashSync('patient123'), role: 'patient', phone: '0301-1234567', createdAt: '2024-01-05T00:00:00Z' },
  { id: 3, name: 'Dr. Ayesha Fatima',  email: 'ayesha@clinic.com',   password: hashSync('doctor123'),  role: 'doctor',  phone: '0302-1234567', createdAt: '2024-01-02T00:00:00Z' },
  { id: 4, name: 'Dr. Maryam Noor',    email: 'maryam@clinic.com',   password: hashSync('doctor123'),  role: 'doctor',  phone: '0303-1234567', createdAt: '2024-01-02T00:00:00Z' },
  { id: 5, name: 'Dr. Zulkifl Ahmad',  email: 'zulkifl@clinic.com',  password: hashSync('doctor123'),  role: 'doctor',  phone: '0304-1234567', createdAt: '2024-01-02T00:00:00Z' },
  { id: 6, name: 'Dr. Muhammad Salman',email: 'salman@clinic.com',   password: hashSync('doctor123'),  role: 'doctor',  phone: '0305-1234567', createdAt: '2024-01-02T00:00:00Z' },
  { id: 7, name: 'Dr. Hassan Ahmed',   email: 'hassan@clinic.com',   password: hashSync('doctor123'),  role: 'doctor',  phone: '0306-1234567', createdAt: '2024-01-02T00:00:00Z' },
  { id: 8, name: 'Fatima Malik',        email: 'fatima@clinic.com',   password: hashSync('patient123'), role: 'patient', phone: '0307-1234567', createdAt: '2024-02-10T00:00:00Z' },
  { id: 9, name: 'Imran Khan',          email: 'imran@clinic.com',    password: hashSync('patient123'), role: 'patient', phone: '0308-1234567', createdAt: '2024-02-15T00:00:00Z' },
  { id:10, name: 'Sana Javed',          email: 'sana@clinic.com',     password: hashSync('patient123'), role: 'patient', phone: '0309-1234567', createdAt: '2024-03-01T00:00:00Z' },
];

// ─── Doctors ─────────────────────────────────────────────────────────────────
export const doctors: Doctor[] = [
  {
    id: 1, userId: 3,
    name: 'Dr. Ayesha Fatima',
    specialization: 'Cardiology',
    experience: '15 years',
    fees: 3500,
    bio: 'Experienced cardiologist with 15 years of practice. Graduated from Aga Khan University, Karachi. Dedicated to providing comprehensive heart care with a focus on preventive cardiology.',
    availableDays: ['Monday','Tuesday','Wednesday','Thursday','Friday'],
    availableTime: ['09:00','10:00','11:00','14:00','15:00','16:00'],
    rating: 4.8, totalRatings: 120,
    image: 'https://ui-avatars.com/api/?name=Ayesha+Fatima&background=0ea5e9&color=fff&size=400&bold=true',
    createdAt: '2024-01-02T00:00:00Z',
  },
  {
    id: 2, userId: 4,
    name: 'Dr. Maryam Noor',
    specialization: 'General Medicine',
    experience: '12 years',
    fees: 2500,
    bio: 'General physician focused on preventive care and holistic patient wellness. Trained at LUMS Medical College, Lahore with expertise in family medicine and chronic disease management.',
    availableDays: ['Monday','Wednesday','Friday'],
    availableTime: ['10:00','11:00','14:00','15:00','16:00'],
    rating: 4.9, totalRatings: 95,
    image: 'https://ui-avatars.com/api/?name=Maryam+Noor&background=8b5cf6&color=fff&size=400&bold=true',
    createdAt: '2024-01-02T00:00:00Z',
  },
  {
    id: 3, userId: 5,
    name: 'Dr. Zulkifl Ahmad',
    specialization: 'Dentistry',
    experience: '10 years',
    fees: 2800,
    bio: 'Dentist specializing in cosmetic and preventive dentistry with state-of-the-art equipment. Graduate of Dow University of Health Sciences, Karachi.',
    availableDays: ['Tuesday','Thursday','Saturday'],
    availableTime: ['09:30','10:30','13:30','14:30','15:30'],
    rating: 4.7, totalRatings: 110,
    image: 'https://ui-avatars.com/api/?name=Zulkifl+Ahmad&background=0ea5e9&color=fff&size=400&bold=true',
    createdAt: '2024-01-02T00:00:00Z',
  },
  {
    id: 4, userId: 6,
    name: 'Dr. Muhammad Salman',
    specialization: 'Neurology',
    experience: '18 years',
    fees: 4500,
    bio: 'Specialized neurologist with expertise in complex neurological conditions. Educated at Peshawar Medical College with international board certifications.',
    availableDays: ['Monday','Tuesday','Thursday','Friday'],
    availableTime: ['11:00','14:00','15:00','16:00'],
    rating: 4.9, totalRatings: 85,
    image: 'https://ui-avatars.com/api/?name=Muhammad+Salman&background=f59e0b&color=fff&size=400&bold=true',
    createdAt: '2024-01-02T00:00:00Z',
  },
  {
    id: 5, userId: 7,
    name: 'Dr. Hassan Ahmed',
    specialization: 'Pediatrics',
    experience: '13 years',
    fees: 2800,
    bio: 'Pediatrician dedicated to children\'s health and development. Graduated from Rawalpindi Medical College with additional fellowship in pediatric care from UK.',
    availableDays: ['Monday','Wednesday','Friday','Saturday'],
    availableTime: ['10:00','11:00','14:00','15:00','16:00'],
    rating: 4.8, totalRatings: 140,
    image: 'https://ui-avatars.com/api/?name=Hassan+Ahmed&background=10b981&color=fff&size=400&bold=true',
    createdAt: '2024-01-02T00:00:00Z',
  },
];

// ─── Patients ─────────────────────────────────────────────────────────────────
export const patients: Patient[] = [
  { id:1,  userId:2,  name:'Ahmad Raza',       email:'patient@clinic.com', phone:'0301-1234567', dateOfBirth:'1990-04-15', gender:'male',   bloodGroup:'B+',  address:'House 12, Street 5, F-7/2, Islamabad',           medicalHistory:['Hypertension','Type 2 Diabetes'], createdAt:'2024-01-05T00:00:00Z' },
  { id:2,  userId:8,  name:'Fatima Malik',      email:'fatima@clinic.com',  phone:'0307-1234567', dateOfBirth:'1988-09-22', gender:'female', bloodGroup:'A+',  address:'Flat 3B, Gulberg III, Lahore',                    medicalHistory:['Asthma'],                        createdAt:'2024-02-10T00:00:00Z' },
  { id:3,  userId:9,  name:'Imran Khan',         email:'imran@clinic.com',   phone:'0308-1234567', dateOfBirth:'1975-12-01', gender:'male',   bloodGroup:'O-',  address:'Bungalow 45, DHA Phase 6, Karachi',               medicalHistory:['Heart disease'],                 createdAt:'2024-02-15T00:00:00Z' },
  { id:4,  userId:10, name:'Sana Javed',         email:'sana@clinic.com',    phone:'0309-1234567', dateOfBirth:'1995-06-30', gender:'female', bloodGroup:'AB+', address:'House 7, Model Town, Lahore',                     medicalHistory:[],                                createdAt:'2024-03-01T00:00:00Z' },
  { id:5,  userId:0,  name:'Bilal Hussain',      email:'bilal@example.com',  phone:'0310-9876543', dateOfBirth:'1985-03-20', gender:'male',   bloodGroup:'B-',  address:'Plot 22, Sector G-11, Islamabad',                 medicalHistory:['Diabetes'],                      createdAt:'2024-03-10T00:00:00Z' },
  { id:6,  userId:0,  name:'Zara Shahid',        email:'zara@example.com',   phone:'0311-5554321', dateOfBirth:'2000-11-11', gender:'female', bloodGroup:'A-',  address:'Apartment 502, Bahria Town, Rawalpindi',           medicalHistory:[],                                createdAt:'2024-03-15T00:00:00Z' },
  { id:7,  userId:0,  name:'Muhammad Arif',      email:'arif@example.com',   phone:'0312-1112233', dateOfBirth:'1970-07-04', gender:'male',   bloodGroup:'O+',  address:'House 99, Johar Town, Lahore',                    medicalHistory:['Arthritis','Hypertension'],       createdAt:'2024-04-01T00:00:00Z' },
  { id:8,  userId:0,  name:'Nadia Iqbal',        email:'nadia@example.com',  phone:'0313-3332211', dateOfBirth:'1993-02-14', gender:'female', bloodGroup:'B+',  address:'Villa 8, Hayatabad Phase 3, Peshawar',            medicalHistory:['Migraine'],                      createdAt:'2024-04-05T00:00:00Z' },
  { id:9,  userId:0,  name:'Usman Butt',         email:'usman@example.com',  phone:'0314-6667788', dateOfBirth:'1982-08-25', gender:'male',   bloodGroup:'AB-', address:'Street 3, I-8/4, Islamabad',                      medicalHistory:[],                                createdAt:'2024-04-12T00:00:00Z' },
  { id:10, userId:0,  name:'Hira Tariq',         email:'hira@example.com',   phone:'0315-9990011', dateOfBirth:'1998-05-09', gender:'female', bloodGroup:'A+',  address:'House 56, Cantt, Lahore',                         medicalHistory:['Eczema'],                        createdAt:'2024-04-20T00:00:00Z' },
];

// helper to get a date string relative to today
function relDate(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

// ─── Appointments ────────────────────────────────────────────────────────────
export const appointments: Appointment[] = [
  // Historical — completed
  { id:1,  patientId:1,  patientName:'Ahmad Raza',       doctorId:1, doctorName:'Dr. Ayesha Fatima',   specialization:'Cardiology',      date:relDate(-29), time:'09:00', status:'completed', symptoms:'Chest tightness', notes:'Regular follow-up',          doctorNotes:'BP stable, continue medication', fee:3500, createdAt:relDate(-30)+'T08:00:00Z' },
  { id:2,  patientId:2,  patientName:'Fatima Malik',      doctorId:2, doctorName:'Dr. Maryam Noor',     specialization:'General Medicine', date:relDate(-28), time:'10:00', status:'completed', symptoms:'Fever and cough', notes:'',                             doctorNotes:'Prescribed antibiotics',         fee:2500, createdAt:relDate(-29)+'T09:00:00Z' },
  { id:3,  patientId:3,  patientName:'Imran Khan',         doctorId:4, doctorName:'Dr. Muhammad Salman', specialization:'Neurology',        date:relDate(-27), time:'14:00', status:'completed', symptoms:'Severe headache', notes:'History of migraine',          doctorNotes:'MRI recommended',                fee:4500, createdAt:relDate(-28)+'T10:00:00Z' },
  { id:4,  patientId:4,  patientName:'Sana Javed',         doctorId:5, doctorName:'Dr. Hassan Ahmed',    specialization:'Pediatrics',       date:relDate(-26), time:'11:00', status:'completed', symptoms:'Child vaccination', notes:'',                            doctorNotes:'All vaccines administered',       fee:2800, createdAt:relDate(-27)+'T11:00:00Z' },
  { id:5,  patientId:5,  patientName:'Bilal Hussain',      doctorId:3, doctorName:'Dr. Zulkifl Ahmad',   specialization:'Dentistry',        date:relDate(-25), time:'09:30', status:'completed', symptoms:'Tooth pain',      notes:'',                             doctorNotes:'Root canal done',                fee:2800, createdAt:relDate(-26)+'T07:00:00Z' },
  { id:6,  patientId:6,  patientName:'Zara Shahid',        doctorId:1, doctorName:'Dr. Ayesha Fatima',   specialization:'Cardiology',       date:relDate(-24), time:'10:00', status:'completed', symptoms:'Shortness of breath', notes:'',                         doctorNotes:'Echo cardiogram done, normal',   fee:3500, createdAt:relDate(-25)+'T09:00:00Z' },
  { id:7,  patientId:7,  patientName:'Muhammad Arif',      doctorId:2, doctorName:'Dr. Maryam Noor',     specialization:'General Medicine', date:relDate(-23), time:'14:00', status:'completed', symptoms:'Diabetes follow-up', notes:'HbA1c test ordered',       doctorNotes:'Sugar levels improved',          fee:2500, createdAt:relDate(-24)+'T13:00:00Z' },
  { id:8,  patientId:8,  patientName:'Nadia Iqbal',        doctorId:4, doctorName:'Dr. Muhammad Salman', specialization:'Neurology',        date:relDate(-22), time:'11:00', status:'completed', symptoms:'Dizziness',        notes:'',                            doctorNotes:'Vertigo, prescribed meds',       fee:4500, createdAt:relDate(-23)+'T10:00:00Z' },
  { id:9,  patientId:9,  patientName:'Usman Butt',         doctorId:5, doctorName:'Dr. Hassan Ahmed',    specialization:'Pediatrics',       date:relDate(-21), time:'15:00', status:'completed', symptoms:'Ear infection',    notes:'',                            doctorNotes:'Ear drops prescribed',           fee:2800, createdAt:relDate(-22)+'T14:00:00Z' },
  { id:10, patientId:10, patientName:'Hira Tariq',         doctorId:3, doctorName:'Dr. Zulkifl Ahmad',   specialization:'Dentistry',        date:relDate(-20), time:'13:30', status:'completed', symptoms:'Teeth cleaning',   notes:'',                            doctorNotes:'Scaling done',                   fee:2800, createdAt:relDate(-21)+'T12:00:00Z' },
  { id:11, patientId:1,  patientName:'Ahmad Raza',         doctorId:2, doctorName:'Dr. Maryam Noor',     specialization:'General Medicine', date:relDate(-19), time:'10:00', status:'completed', symptoms:'Flu symptoms',     notes:'',                            doctorNotes:'Rest and hydration advised',     fee:2500, createdAt:relDate(-20)+'T09:00:00Z' },
  { id:12, patientId:3,  patientName:'Imran Khan',         doctorId:1, doctorName:'Dr. Ayesha Fatima',   specialization:'Cardiology',       date:relDate(-18), time:'14:00', status:'completed', symptoms:'Heart palpitations', notes:'Stress ECG done',            doctorNotes:'Normal sinus rhythm',            fee:3500, createdAt:relDate(-19)+'T13:00:00Z' },
  { id:13, patientId:5,  patientName:'Bilal Hussain',      doctorId:2, doctorName:'Dr. Maryam Noor',     specialization:'General Medicine', date:relDate(-17), time:'11:00', status:'completed', symptoms:'High blood sugar', notes:'',                            doctorNotes:'Insulin adjusted',               fee:2500, createdAt:relDate(-18)+'T10:00:00Z' },
  { id:14, patientId:7,  patientName:'Muhammad Arif',      doctorId:4, doctorName:'Dr. Muhammad Salman', specialization:'Neurology',        date:relDate(-16), time:'14:00', status:'completed', symptoms:'Back pain',        notes:'',                            doctorNotes:'Physiotherapy recommended',      fee:4500, createdAt:relDate(-17)+'T13:00:00Z' },
  { id:15, patientId:2,  patientName:'Fatima Malik',       doctorId:5, doctorName:'Dr. Hassan Ahmed',    specialization:'Pediatrics',       date:relDate(-15), time:'15:00', status:'completed', symptoms:'Skin rash (child)', notes:'',                           doctorNotes:'Allergic reaction, antihistamine',fee:2800, createdAt:relDate(-16)+'T14:00:00Z' },
  { id:16, patientId:4,  patientName:'Sana Javed',         doctorId:3, doctorName:'Dr. Zulkifl Ahmad',   specialization:'Dentistry',        date:relDate(-14), time:'09:30', status:'completed', symptoms:'Wisdom tooth pain', notes:'',                           doctorNotes:'Extraction scheduled',           fee:2800, createdAt:relDate(-15)+'T08:00:00Z' },
  { id:17, patientId:6,  patientName:'Zara Shahid',        doctorId:2, doctorName:'Dr. Maryam Noor',     specialization:'General Medicine', date:relDate(-13), time:'10:00', status:'completed', symptoms:'Thyroid checkup',  notes:'',                            doctorNotes:'TSH normal',                     fee:2500, createdAt:relDate(-14)+'T09:00:00Z' },
  { id:18, patientId:8,  patientName:'Nadia Iqbal',        doctorId:1, doctorName:'Dr. Ayesha Fatima',   specialization:'Cardiology',       date:relDate(-12), time:'11:00', status:'completed', symptoms:'ECG follow-up',    notes:'',                            doctorNotes:'All clear',                      fee:3500, createdAt:relDate(-13)+'T10:00:00Z' },
  { id:19, patientId:9,  patientName:'Usman Butt',         doctorId:3, doctorName:'Dr. Zulkifl Ahmad',   specialization:'Dentistry',        date:relDate(-11), time:'14:30', status:'completed', symptoms:'Cavity filling',   notes:'',                            doctorNotes:'Two fillings done',              fee:2800, createdAt:relDate(-12)+'T13:00:00Z' },
  { id:20, patientId:10, patientName:'Hira Tariq',         doctorId:4, doctorName:'Dr. Muhammad Salman', specialization:'Neurology',        date:relDate(-10), time:'15:00', status:'completed', symptoms:'Memory issues',    notes:'',                            doctorNotes:'Cognitive tests normal for age', fee:4500, createdAt:relDate(-11)+'T14:00:00Z' },
  // Recent — mix
  { id:21, patientId:1,  patientName:'Ahmad Raza',         doctorId:1, doctorName:'Dr. Ayesha Fatima',   specialization:'Cardiology',       date:relDate(-9),  time:'09:00', status:'completed', symptoms:'Monthly BP check', notes:'',                            doctorNotes:'Medication increased',           fee:3500, createdAt:relDate(-10)+'T08:00:00Z' },
  { id:22, patientId:3,  patientName:'Imran Khan',         doctorId:5, doctorName:'Dr. Hassan Ahmed',    specialization:'Pediatrics',       date:relDate(-8),  time:'10:00', status:'completed', symptoms:'Child fever',      notes:'',                            doctorNotes:'Paracetamol and rest',           fee:2800, createdAt:relDate(-9)+'T09:00:00Z' },
  { id:23, patientId:5,  patientName:'Bilal Hussain',      doctorId:4, doctorName:'Dr. Muhammad Salman', specialization:'Neurology',        date:relDate(-7),  time:'14:00', status:'cancelled', symptoms:'Neck stiffness',   notes:'Patient cancelled',           doctorNotes:'',                               fee:4500, createdAt:relDate(-8)+'T13:00:00Z' },
  { id:24, patientId:7,  patientName:'Muhammad Arif',      doctorId:2, doctorName:'Dr. Maryam Noor',     specialization:'General Medicine', date:relDate(-6),  time:'11:00', status:'completed', symptoms:'Routine checkup',  notes:'',                            doctorNotes:'Good health overall',            fee:2500, createdAt:relDate(-7)+'T10:00:00Z' },
  { id:25, patientId:2,  patientName:'Fatima Malik',       doctorId:3, doctorName:'Dr. Zulkifl Ahmad',   specialization:'Dentistry',        date:relDate(-5),  time:'13:30', status:'completed', symptoms:'Tooth sensitivity', notes:'',                           doctorNotes:'Desensitizing toothpaste advised',fee:2800, createdAt:relDate(-6)+'T12:00:00Z' },
  { id:26, patientId:4,  patientName:'Sana Javed',         doctorId:1, doctorName:'Dr. Ayesha Fatima',   specialization:'Cardiology',       date:relDate(-4),  time:'10:00', status:'completed', symptoms:'Annual heart checkup', notes:'',                         doctorNotes:'Heart healthy, keep exercising', fee:3500, createdAt:relDate(-5)+'T09:00:00Z' },
  { id:27, patientId:6,  patientName:'Zara Shahid',        doctorId:5, doctorName:'Dr. Hassan Ahmed',    specialization:'Pediatrics',       date:relDate(-3),  time:'15:00', status:'cancelled', symptoms:'Vaccination',      notes:'Rescheduled',                 doctorNotes:'',                               fee:2800, createdAt:relDate(-4)+'T14:00:00Z' },
  { id:28, patientId:8,  patientName:'Nadia Iqbal',        doctorId:2, doctorName:'Dr. Maryam Noor',     specialization:'General Medicine', date:relDate(-2),  time:'10:00', status:'confirmed', symptoms:'Flu & fever',      notes:'',                            doctorNotes:'',                               fee:2500, createdAt:relDate(-3)+'T09:00:00Z' },
  { id:29, patientId:9,  patientName:'Usman Butt',         doctorId:4, doctorName:'Dr. Muhammad Salman', specialization:'Neurology',        date:relDate(-1),  time:'11:00', status:'confirmed', symptoms:'Epilepsy review',  notes:'Monthly medication review',   doctorNotes:'',                               fee:4500, createdAt:relDate(-2)+'T10:00:00Z' },
  // Today
  { id:30, patientId:10, patientName:'Hira Tariq',         doctorId:3, doctorName:'Dr. Zulkifl Ahmad',   specialization:'Dentistry',        date:relDate(0),   time:'09:30', status:'confirmed', symptoms:'Braces consultation', notes:'',                          doctorNotes:'',                               fee:2800, createdAt:relDate(-1)+'T08:00:00Z' },
  { id:31, patientId:1,  patientName:'Ahmad Raza',         doctorId:2, doctorName:'Dr. Maryam Noor',     specialization:'General Medicine', date:relDate(0),   time:'10:00', status:'confirmed', symptoms:'Diabetes management', notes:'',                          doctorNotes:'',                               fee:2500, createdAt:relDate(-1)+'T09:00:00Z' },
  { id:32, patientId:3,  patientName:'Imran Khan',         doctorId:1, doctorName:'Dr. Ayesha Fatima',   specialization:'Cardiology',       date:relDate(0),   time:'11:00', status:'pending',   symptoms:'Palpitations follow-up', notes:'',                       doctorNotes:'',                               fee:3500, createdAt:relDate(0)+'T07:00:00Z' },
  { id:33, patientId:5,  patientName:'Bilal Hussain',      doctorId:5, doctorName:'Dr. Hassan Ahmed',    specialization:'Pediatrics',       date:relDate(0),   time:'14:00', status:'pending',   symptoms:'Child growth assessment', notes:'',                      doctorNotes:'',                               fee:2800, createdAt:relDate(0)+'T08:00:00Z' },
  // Upcoming
  { id:34, patientId:2,  patientName:'Fatima Malik',       doctorId:4, doctorName:'Dr. Muhammad Salman', specialization:'Neurology',        date:relDate(1),   time:'14:00', status:'confirmed', symptoms:'Migraine management',   notes:'',                        doctorNotes:'',                               fee:4500, createdAt:relDate(0)+'T10:00:00Z' },
  { id:35, patientId:7,  patientName:'Muhammad Arif',      doctorId:3, doctorName:'Dr. Zulkifl Ahmad',   specialization:'Dentistry',        date:relDate(2),   time:'09:30', status:'pending',   symptoms:'Crown fitting',         notes:'',                        doctorNotes:'',                               fee:2800, createdAt:relDate(0)+'T11:00:00Z' },
  { id:36, patientId:4,  patientName:'Sana Javed',         doctorId:2, doctorName:'Dr. Maryam Noor',     specialization:'General Medicine', date:relDate(3),   time:'10:00', status:'confirmed', symptoms:'Anemia follow-up',      notes:'',                        doctorNotes:'',                               fee:2500, createdAt:relDate(1)+'T09:00:00Z' },
  { id:37, patientId:6,  patientName:'Zara Shahid',        doctorId:1, doctorName:'Dr. Ayesha Fatima',   specialization:'Cardiology',       date:relDate(4),   time:'11:00', status:'pending',   symptoms:'Heart screening',       notes:'',                        doctorNotes:'',                               fee:3500, createdAt:relDate(1)+'T10:00:00Z' },
  { id:38, patientId:8,  patientName:'Nadia Iqbal',        doctorId:5, doctorName:'Dr. Hassan Ahmed',    specialization:'Pediatrics',       date:relDate(5),   time:'15:00', status:'confirmed', symptoms:'Vaccination booster',   notes:'',                        doctorNotes:'',                               fee:2800, createdAt:relDate(2)+'T14:00:00Z' },
  { id:39, patientId:9,  patientName:'Usman Butt',         doctorId:2, doctorName:'Dr. Maryam Noor',     specialization:'General Medicine', date:relDate(6),   time:'10:00', status:'pending',   symptoms:'BP monitoring',         notes:'',                        doctorNotes:'',                               fee:2500, createdAt:relDate(2)+'T09:00:00Z' },
  { id:40, patientId:10, patientName:'Hira Tariq',         doctorId:4, doctorName:'Dr. Muhammad Salman', specialization:'Neurology',        date:relDate(7),   time:'14:00', status:'confirmed', symptoms:'Spine check',           notes:'Follow up in 2 weeks',    doctorNotes:'',                               fee:4500, createdAt:relDate(3)+'T13:00:00Z' },
];

export let nextAppointmentId = appointments.length + 1;
export let nextUserId = users.length + 1;
export let nextPatientId = patients.length + 1;
