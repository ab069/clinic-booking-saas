import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar, Clock, User, Plus, ChevronRight,
  Stethoscope, CheckCircle, AlertCircle, XCircle, Activity
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { appointmentsApi } from '../lib/api';
import { Appointment } from '../types';
import { getUser } from '../lib/auth';
import { formatDate, getStatusColor } from '../lib/utils';

const StatusIcon = ({ status }: { status: string }) => {
  if (status === 'confirmed' || status === 'completed') return <CheckCircle className="w-4 h-4 text-emerald-500" />;
  if (status === 'pending')  return <AlertCircle className="w-4 h-4 text-amber-500" />;
  return <XCircle className="w-4 h-4 text-red-400" />;
};

export default function PatientPortal() {
  const user = getUser();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading]           = useState(true);
  const [tab, setTab]                   = useState<'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    appointmentsApi.list()
      .then(res => setAppointments(res.data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const today = new Date().toISOString().slice(0, 10);
  const upcoming = appointments.filter(a => a.date >= today && a.status !== 'cancelled');
  const past     = appointments.filter(a => a.date < today || a.status === 'cancelled' || a.status === 'completed');
  const displayed = tab === 'upcoming' ? upcoming : past;

  const handleCancel = async (id: number) => {
    try {
      await appointmentsApi.update(id, { status: 'cancelled' });
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'cancelled' } : a));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.name.split(' ')[0]} 👋
              </h1>
              <p className="text-gray-400 text-sm mt-0.5">Manage your appointments and health records</p>
            </div>
            <Link
              to="/book"
              className="flex items-center gap-2 px-5 py-2.5 bg-primary-500 text-white font-semibold text-sm rounded-xl hover:bg-primary-600 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" /> Book Appointment
            </Link>
          </div>
        </motion.div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Bookings',   value: appointments.length,                                             color: 'bg-blue-50   text-blue-700',   icon: Calendar },
            { label: 'Upcoming',         value: upcoming.filter(a => a.status !== 'completed').length,           color: 'bg-emerald-50 text-emerald-700', icon: Clock },
            { label: 'Completed',        value: appointments.filter(a => a.status === 'completed').length,       color: 'bg-purple-50 text-purple-700', icon: CheckCircle },
          ].map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`${c.color} rounded-2xl p-5 flex items-center gap-4`}
            >
              <c.icon className="w-8 h-8 opacity-70 flex-shrink-0" />
              <div>
                <p className="text-3xl font-extrabold">{c.value}</p>
                <p className="text-xs font-medium opacity-70 mt-0.5">{c.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tab bar */}
        <div className="flex rounded-xl bg-white border border-gray-100 p-1 shadow-sm mb-6 w-fit">
          {(['upcoming','past'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                tab === t ? 'bg-primary-500 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t} ({t === 'upcoming' ? upcoming.length : past.length})
            </button>
          ))}
        </div>

        {/* Appointments list */}
        {loading ? (
          <div className="text-center py-16 text-gray-400">Loading your appointments...</div>
        ) : displayed.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm py-20 text-center"
          >
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium mb-2">No {tab} appointments</p>
            <p className="text-gray-400 text-sm mb-6">
              {tab === 'upcoming' ? 'Book your first appointment to get started.' : 'Your completed appointments will appear here.'}
            </p>
            {tab === 'upcoming' && (
              <Link to="/book" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-semibold hover:bg-primary-600 transition-colors">
                <Plus className="w-4 h-4" /> Book Now
              </Link>
            )}
          </motion.div>
        ) : (
          <div className="space-y-4">
            {displayed.map((appt, i) => (
              <motion.div
                key={appt.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow"
              >
                {/* Doctor avatar */}
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <Stethoscope className="w-6 h-6 text-primary-600" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-gray-800">{appt.doctorName}</p>
                      <p className="text-sm text-gray-400">{appt.specialization}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border flex-shrink-0 ${getStatusColor(appt.status)}`}>
                      <StatusIcon status={appt.status} />
                      <span className="capitalize">{appt.status}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(appt.date)}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {appt.time}
                    </div>
                    <div className="flex items-center gap-1.5 text-primary-600 font-medium">
                      PKR {appt.fee?.toLocaleString()}
                    </div>
                  </div>

                  {appt.symptoms && (
                    <p className="mt-2 text-xs text-gray-400">
                      <span className="font-medium text-gray-500">Symptoms:</span> {appt.symptoms}
                    </p>
                  )}
                  {appt.doctorNotes && (
                    <p className="mt-1 text-xs text-gray-400">
                      <span className="font-medium text-gray-500">Doctor's notes:</span> {appt.doctorNotes}
                    </p>
                  )}
                </div>

                {/* Actions */}
                {appt.status === 'pending' && (
                  <button
                    onClick={() => handleCancel(appt.id)}
                    className="flex-shrink-0 p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                    title="Cancel appointment"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Book another CTA */}
        {!loading && appointments.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 flex items-center justify-between"
          >
            <div>
              <p className="text-white font-semibold text-lg">Need to see a doctor?</p>
              <p className="text-primary-200 text-sm">Book your next appointment in seconds.</p>
            </div>
            <Link
              to="/book"
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-primary-600 font-semibold text-sm rounded-xl hover:bg-primary-50 transition-colors flex-shrink-0"
            >
              Book Now <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
