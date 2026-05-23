import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Stethoscope, ChevronRight } from 'lucide-react';
import { Doctor } from '../types';
import { appointmentsApi } from '../lib/api';

interface BookingModalProps {
  doctor: Doctor;
  onClose: () => void;
  onSuccess: () => void;
}

const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

export default function BookingModal({ doctor, onClose, onSuccess }: BookingModalProps) {
  const [step, setStep] = useState(1); // 1: date/time, 2: symptoms, 3: confirm
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [symptoms, setSymptoms]         = useState('');
  const [notes, setNotes]               = useState('');
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState('');

  // Generate next 14 available days
  const getAvailableDates = () => {
    const dates: string[] = [];
    const today = new Date();
    for (let i = 1; i <= 21 && dates.length < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayName = DAYS[d.getDay()];
      if (doctor.availableDays.includes(dayName)) {
        dates.push(d.toISOString().slice(0, 10));
      }
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  const handleBook = async () => {
    setLoading(true);
    setError('');
    try {
      await appointmentsApi.create({
        doctorId: doctor.id,
        date: selectedDate,
        time: selectedTime,
        symptoms,
        notes,
      });
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  const formatDateDisplay = (d: string) => {
    const dt = new Date(d + 'T00:00:00');
    return dt.toLocaleDateString('en-PK', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-primary-100 text-sm mb-0.5">Booking with</p>
                <h2 className="text-white text-xl font-bold">{doctor.name}</h2>
                <p className="text-primary-200 text-sm">{doctor.specialization}</p>
              </div>
              <button onClick={onClose} className="text-primary-200 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Steps */}
            <div className="flex items-center gap-2 mt-4">
              {[1,2,3].map(s => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step >= s ? 'bg-white text-primary-600' : 'bg-primary-400 text-primary-200'
                  }`}>{s}</div>
                  {s < 3 && <div className={`h-0.5 w-8 rounded ${step > s ? 'bg-white' : 'bg-primary-400'}`} />}
                </div>
              ))}
              <span className="text-primary-100 text-xs ml-2">
                {step === 1 ? 'Select Date & Time' : step === 2 ? 'Add Details' : 'Confirm'}
              </span>
            </div>
          </div>

          <div className="p-6">
            {/* Step 1: Date & Time */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-primary-500" /> Select Date
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {availableDates.map(date => (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`p-2.5 rounded-xl text-sm text-center border transition-all ${
                          selectedDate === date
                            ? 'bg-primary-500 text-white border-primary-500 shadow-sm'
                            : 'border-gray-200 text-gray-700 hover:border-primary-300 hover:bg-primary-50'
                        }`}
                      >
                        {formatDateDisplay(date)}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedDate && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-primary-500" /> Select Time
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {doctor.availableTime.map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 rounded-xl text-sm border transition-all ${
                            selectedTime === time
                              ? 'bg-primary-500 text-white border-primary-500'
                              : 'border-gray-200 text-gray-700 hover:border-primary-300 hover:bg-primary-50'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                <button
                  disabled={!selectedDate || !selectedTime}
                  onClick={() => setStep(2)}
                  className="w-full py-3 bg-primary-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-2"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step 2: Symptoms */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Symptoms / Reason for Visit</label>
                  <textarea
                    value={symptoms}
                    onChange={e => setSymptoms(e.target.value)}
                    placeholder="Describe your symptoms..."
                    rows={3}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional Notes <span className="text-gray-400">(optional)</span></label>
                  <textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Any additional info..."
                    rows={2}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 py-3 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50">
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-primary-600 transition-colors"
                  >
                    Review <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Confirm */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <h4 className="text-sm font-semibold text-gray-700">Booking Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500 flex items-center gap-1.5">
                        <Stethoscope className="w-3.5 h-3.5" /> Doctor
                      </span>
                      <span className="font-medium text-gray-800">{doctor.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> Date
                      </span>
                      <span className="font-medium text-gray-800">{formatDateDisplay(selectedDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> Time
                      </span>
                      <span className="font-medium text-gray-800">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-2">
                      <span className="text-gray-500">Consultation Fee</span>
                      <span className="font-bold text-primary-600">PKR {doctor.fees.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {symptoms && (
                  <div className="text-sm">
                    <span className="text-gray-500">Symptoms: </span>
                    <span className="text-gray-700">{symptoms}</span>
                  </div>
                )}

                {error && <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>}

                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="flex-1 py-3 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50">
                    Back
                  </button>
                  <button
                    onClick={handleBook}
                    disabled={loading}
                    className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 disabled:opacity-60 transition-colors"
                  >
                    {loading ? 'Booking...' : 'Confirm Booking'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
