import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar, ChevronLeft, ChevronRight, Clock,
  User, CheckCircle, AlertCircle, Stethoscope
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { appointmentsApi, doctorsApi } from '../lib/api';
import { Appointment, Doctor } from '../types';
import { getUser } from '../lib/auth';
import { getStatusColor } from '../lib/utils';

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export default function DoctorSchedule() {
  const user = getUser();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctor, setDoctor]             = useState<Doctor | null>(null);
  const [loading, setLoading]           = useState(true);
  const [viewDate, setViewDate]         = useState(new Date());
  const [selectedDay, setSelectedDay]   = useState(new Date().toISOString().slice(0,10));

  useEffect(() => {
    const loadData = async () => {
      try {
        const [apptsRes, doctorsRes] = await Promise.all([
          appointmentsApi.list(),
          doctorsApi.list(),
        ]);
        const appts = apptsRes.data.data || [];
        const docs  = doctorsRes.data.data || [];
        const myDoc = docs.find(d => d.userId === user?.id);
        setDoctor(myDoc || null);
        setAppointments(appts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      await appointmentsApi.update(id, { status: status as any });
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: status as any } : a));
    } catch (err) { console.error(err); }
  };

  // Calendar helpers
  const year  = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarCells = [];
  for (let i = 0; i < firstDay; i++) calendarCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d);

  const dateStr = (d: number) => `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
  const apptCountOn = (d: number) => appointments.filter(a => a.date === dateStr(d)).length;

  const prevMonth = () => setViewDate(new Date(year, month - 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1));

  const dayAppointments = appointments
    .filter(a => a.date === selectedDay)
    .sort((a, b) => a.time.localeCompare(b.time));

  const today = new Date().toISOString().slice(0, 10);

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center">
              <Stethoscope className="w-7 h-7 text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
              <p className="text-gray-400 text-sm">{doctor?.specialization} · {doctor?.experience} experience</p>
            </div>
          </div>
        </motion.div>

        {/* Summary row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Today's patients",    value: appointments.filter(a => a.date === today).length, color: 'bg-blue-50 text-blue-700' },
            { label: 'This week',           value: (() => {
                const d = new Date(); const mon = new Date(d); mon.setDate(d.getDate() - d.getDay() + 1);
                const sun = new Date(mon); sun.setDate(mon.getDate() + 6);
                return appointments.filter(a => a.date >= mon.toISOString().slice(0,10) && a.date <= sun.toISOString().slice(0,10)).length;
              })(), color: 'bg-purple-50 text-purple-700' },
            { label: 'Pending approvals',   value: appointments.filter(a => a.status === 'pending').length, color: 'bg-amber-50 text-amber-700' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className={`${s.color} rounded-2xl p-5`}>
              <p className="text-3xl font-extrabold">{s.value}</p>
              <p className="text-xs font-medium opacity-70 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Calendar */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            {/* Month header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">{MONTHS[month]} {year}</h3>
              <div className="flex gap-1">
                <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {DAYS.map(d => (
                <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>
              ))}
            </div>

            {/* Cells */}
            <div className="grid grid-cols-7 gap-1">
              {calendarCells.map((d, i) => {
                if (!d) return <div key={i} />;
                const ds = dateStr(d);
                const count = apptCountOn(d);
                const isSelected = ds === selectedDay;
                const isToday = ds === today;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDay(ds)}
                    className={`relative aspect-square rounded-lg flex flex-col items-center justify-center text-sm font-medium transition-all ${
                      isSelected
                        ? 'bg-primary-500 text-white'
                        : isToday
                        ? 'bg-primary-50 text-primary-600 ring-1 ring-primary-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {d}
                    {count > 0 && (
                      <span className={`absolute bottom-0.5 w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-primary-400'}`} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Doctor availability */}
            {doctor && (
              <div className="mt-5 pt-4 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Available Days</p>
                <div className="flex flex-wrap gap-1.5">
                  {doctor.availableDays.map(day => (
                    <span key={day} className="px-2 py-0.5 bg-primary-50 text-primary-600 text-xs rounded-md font-medium">{day.slice(0,3)}</span>
                  ))}
                </div>
                <p className="text-xs font-semibold text-gray-500 uppercase mt-3 mb-2">Time Slots</p>
                <div className="flex flex-wrap gap-1.5">
                  {doctor.availableTime.map(t => (
                    <span key={t} className="px-2 py-0.5 bg-gray-50 text-gray-600 text-xs rounded-md">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Day view */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
            className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">
                  {new Date(selectedDay + 'T00:00:00').toLocaleDateString('en-PK', { weekday: 'long', month: 'long', day: 'numeric' })}
                </h3>
                <p className="text-xs text-gray-400">{dayAppointments.length} appointment{dayAppointments.length !== 1 ? 's' : ''}</p>
              </div>
              {selectedDay === today && (
                <span className="px-3 py-1 bg-primary-50 text-primary-600 text-xs font-semibold rounded-full">Today</span>
              )}
            </div>

            <div className="divide-y divide-gray-50">
              {dayAppointments.length === 0 ? (
                <div className="py-16 text-center text-gray-400">
                  <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No appointments on this day</p>
                </div>
              ) : (
                dayAppointments.map((appt, i) => (
                  <motion.div
                    key={appt.id}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      {/* Time */}
                      <div className="w-14 text-center flex-shrink-0">
                        <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center mx-auto">
                          <Clock className="w-4 h-4 text-primary-500" />
                        </div>
                        <p className="text-xs font-semibold text-gray-600 mt-1">{appt.time}</p>
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <p className="font-medium text-gray-800 text-sm">{appt.patientName}</p>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(appt.status)}`}>
                            {appt.status}
                          </span>
                        </div>

                        {appt.symptoms && (
                          <p className="text-xs text-gray-400 mt-1 ml-6">
                            <span className="font-medium text-gray-500">Symptoms:</span> {appt.symptoms}
                          </p>
                        )}

                        {appt.status === 'pending' && (
                          <div className="flex gap-2 mt-2 ml-6">
                            <button
                              onClick={() => handleStatusUpdate(appt.id, 'confirmed')}
                              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs rounded-lg hover:bg-emerald-100 transition-colors font-medium"
                            >
                              <CheckCircle className="w-3.5 h-3.5" /> Confirm
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(appt.id, 'cancelled')}
                              className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 text-xs rounded-lg hover:bg-red-100 transition-colors font-medium"
                            >
                              <AlertCircle className="w-3.5 h-3.5" /> Decline
                            </button>
                          </div>
                        )}

                        {appt.status === 'confirmed' && (
                          <div className="flex gap-2 mt-2 ml-6">
                            <button
                              onClick={() => handleStatusUpdate(appt.id, 'completed')}
                              className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 text-xs rounded-lg hover:bg-blue-100 transition-colors font-medium"
                            >
                              <CheckCircle className="w-3.5 h-3.5" /> Mark Complete
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Fee */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-bold text-gray-800">PKR {appt.fee?.toLocaleString()}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
