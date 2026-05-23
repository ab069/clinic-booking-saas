import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Star, ChevronRight, Calendar, Clock, Stethoscope,
  CheckCircle, Filter, ArrowLeft
} from 'lucide-react';
import Navbar from '../components/Navbar';
import BookingModal from '../components/BookingModal';
import { doctorsApi } from '../lib/api';
import { Doctor } from '../types';

const SPECIALIZATIONS = ['All', 'Cardiology', 'General Medicine', 'Dentistry', 'Neurology', 'Pediatrics'];

export default function BookAppointment() {
  const navigate = useNavigate();
  const [doctors, setDoctors]         = useState<Doctor[]>([]);
  const [filtered, setFiltered]       = useState<Doctor[]>([]);
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState('');
  const [specFilter, setSpecFilter]   = useState('All');
  const [selectedDoctor, setSelected] = useState<Doctor | null>(null);
  const [booked, setBooked]           = useState(false);

  useEffect(() => {
    doctorsApi.list()
      .then(res => {
        const docs = res.data.data || [];
        setDoctors(docs);
        setFiltered(docs);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Filter
  useEffect(() => {
    let result = doctors;
    if (specFilter !== 'All') result = result.filter(d => d.specialization === specFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.specialization.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [search, specFilter, doctors]);

  const handleBookingSuccess = () => {
    setSelected(null);
    setBooked(true);
    setTimeout(() => {
      navigate('/portal');
    }, 2500);
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Success toast */}
      <AnimatePresence>
        {booked && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-white border border-emerald-200 rounded-2xl shadow-xl px-6 py-4 flex items-center gap-3"
          >
            <CheckCircle className="w-6 h-6 text-emerald-500" />
            <div>
              <p className="font-semibold text-gray-800">Appointment booked!</p>
              <p className="text-sm text-gray-400">Redirecting to your portal...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <button onClick={() => navigate('/portal')} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 mb-4">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to portal
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Book an Appointment</h1>
          <p className="text-gray-400 text-sm mt-0.5">Choose a specialist and pick a convenient time</p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by doctor name or specialty..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <div className="flex gap-1.5 flex-wrap">
              {SPECIALIZATIONS.map(s => (
                <button
                  key={s}
                  onClick={() => setSpecFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    specFilter === s
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-50 text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Doctors grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Stethoscope className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>No doctors found matching your search.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {filtered.map((doctor, i) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-100 transition-all overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-2xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-800 text-base">{doctor.name}</h3>
                      <p className="text-primary-500 text-sm font-medium">{doctor.specialization}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{doctor.experience} experience</p>

                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-sm font-semibold text-gray-700">{doctor.rating}</span>
                          <span className="text-xs text-gray-400">({doctor.totalRatings})</span>
                        </div>
                        <div className="text-primary-600 font-semibold text-sm">
                          PKR {doctor.fees.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-500 text-xs leading-relaxed mt-4 line-clamp-2">{doctor.bio}</p>

                  {/* Availability */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {doctor.availableDays.map(day => (
                      <span key={day} className="px-2 py-0.5 bg-primary-50 text-primary-600 text-xs rounded-md font-medium">
                        {day.slice(0,3)}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 mt-2 flex-wrap">
                    {doctor.availableTime.slice(0, 4).map(time => (
                      <span key={time} className="flex items-center gap-1 px-2 py-0.5 bg-gray-50 text-gray-500 text-xs rounded-md">
                        <Clock className="w-2.5 h-2.5" />{time}
                      </span>
                    ))}
                    {doctor.availableTime.length > 4 && (
                      <span className="text-xs text-gray-400">+{doctor.availableTime.length - 4} more</span>
                    )}
                  </div>
                </div>

                {/* Book button */}
                <div className="px-6 pb-5">
                  <button
                    onClick={() => setSelected(doctor)}
                    className="w-full py-2.5 bg-primary-500 text-white rounded-xl font-semibold text-sm hover:bg-primary-600 transition-colors flex items-center justify-center gap-2 group-hover:shadow-md"
                  >
                    Book Appointment <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          onClose={() => setSelected(null)}
          onSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
}
