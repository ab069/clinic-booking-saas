import { motion } from 'framer-motion';
import { Calendar, Clock, User, Stethoscope, MoreVertical, Check, X, Loader } from 'lucide-react';
import { Appointment } from '../types';
import { formatDate, getStatusColor } from '../lib/utils';

interface AppointmentTableProps {
  appointments: Appointment[];
  onStatusChange?: (id: number, status: string) => void;
  showActions?: boolean;
  title?: string;
}

const StatusIcon = ({ status }: { status: string }) => {
  if (status === 'confirmed') return <Check className="w-3 h-3" />;
  if (status === 'cancelled') return <X className="w-3 h-3" />;
  if (status === 'pending')   return <Loader className="w-3 h-3" />;
  return null;
};

export default function AppointmentTable({
  appointments,
  onStatusChange,
  showActions = false,
  title = 'Recent Appointments',
}: AppointmentTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <span className="text-sm text-gray-400">{appointments.length} records</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Doctor</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date & Time</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Specialization</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Fee</th>
              {showActions && (
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={showActions ? 7 : 6} className="px-6 py-12 text-center text-gray-400">
                  No appointments found
                </td>
              </tr>
            ) : (
              appointments.map((appt, i) => (
                <motion.tr
                  key={appt.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* Patient */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{appt.patientName}</p>
                        <p className="text-xs text-gray-400">ID #{appt.patientId}</p>
                      </div>
                    </div>
                  </td>

                  {/* Doctor */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{appt.doctorName}</span>
                    </div>
                  </td>

                  {/* Date & Time */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-1 text-sm text-gray-700">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        {formatDate(appt.date)}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        {appt.time}
                      </div>
                    </div>
                  </td>

                  {/* Specialization */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{appt.specialization}</span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(appt.status)}`}>
                      <StatusIcon status={appt.status} />
                      <span className="capitalize">{appt.status}</span>
                    </span>
                  </td>

                  {/* Fee */}
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-800">
                      PKR {appt.fee?.toLocaleString()}
                    </span>
                  </td>

                  {/* Actions */}
                  {showActions && onStatusChange && (
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {appt.status === 'pending' && (
                          <>
                            <button
                              onClick={() => onStatusChange(appt.id, 'confirmed')}
                              className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                              title="Confirm"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => onStatusChange(appt.id, 'cancelled')}
                              className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                              title="Cancel"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  )}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
