import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users, Calendar, DollarSign, Clock, Stethoscope,
  TrendingUp, RefreshCw, Search, Filter, Bell, Settings
} from 'lucide-react';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import { AppointmentLineChart, AppointmentBarChart } from '../components/AppointmentChart';
import AppointmentTable from '../components/AppointmentTable';
import { dashboardApi, appointmentsApi } from '../lib/api';
import { DashboardStats, Appointment } from '../types';
import { formatCurrency, getStatusColor } from '../lib/utils';

export default function AdminDashboard() {
  const [stats, setStats]             = useState<DashboardStats | null>(null);
  const [allAppts, setAllAppts]       = useState<Appointment[]>([]);
  const [filtered, setFiltered]       = useState<Appointment[]>([]);
  const [loading, setLoading]         = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearch]      = useState('');
  const [refreshing, setRefreshing]   = useState(false);

  const load = async () => {
    try {
      const [statsRes, apptsRes] = await Promise.all([
        dashboardApi.stats(),
        appointmentsApi.list(),
      ]);
      setStats(statsRes.data.data!);
      const appts = apptsRes.data.data || [];
      setAllAppts(appts);
      setFiltered(appts);
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { load(); }, []);

  // Filter logic
  useEffect(() => {
    let result = allAppts;
    if (statusFilter !== 'all') result = result.filter(a => a.status === statusFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a =>
        a.patientName.toLowerCase().includes(q) ||
        a.doctorName.toLowerCase().includes(q) ||
        a.specialization.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [statusFilter, searchQuery, allAppts]);

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await appointmentsApi.update(id, { status: status as any });
      setAllAppts(prev => prev.map(a => a.id === id ? { ...a, status: status as any } : a));
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    load();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" style={{ borderWidth: 3 }} />
          <p className="text-gray-400 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const todayAppts = allAppts.filter(a => a.date === new Date().toISOString().slice(0, 10));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Page header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm mt-0.5">
              {new Date().toLocaleDateString('en-PK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              className={`p-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-white transition-colors ${refreshing ? 'animate-spin' : ''}`}
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button className="p-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-white transition-colors relative">
              <Bell className="w-4 h-4" />
              {stats && stats.pendingConfirmations > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {stats.pendingConfirmations}
                </span>
              )}
            </button>
            <button className="p-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-white transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Patients"
            value={stats?.totalPatients ?? 0}
            icon={Users}
            trend={{ value: 12, label: 'vs last month' }}
            color="blue"
            index={0}
          />
          <StatCard
            title="Today's Appointments"
            value={todayAppts.length}
            icon={Calendar}
            trend={{ value: 8, label: 'vs yesterday' }}
            color="green"
            index={1}
          />
          <StatCard
            title="Revenue This Month"
            value={formatCurrency(stats?.revenueThisMonth ?? 0)}
            icon={DollarSign}
            trend={{ value: 18, label: 'vs last month' }}
            color="purple"
            index={2}
          />
          <StatCard
            title="Pending Confirmations"
            value={stats?.pendingConfirmations ?? 0}
            icon={Clock}
            color="amber"
            index={3}
          />
        </div>

        {/* Secondary stat strip */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Appointments', value: stats?.totalAppointments ?? 0, icon: Calendar, color: 'text-blue-500' },
            { label: 'Active Doctors',     value: stats?.totalDoctors ?? 0,       icon: Stethoscope, color: 'text-purple-500' },
            { label: 'All-Time Revenue',   value: formatCurrency(stats?.totalRevenue ?? 0), icon: TrendingUp, color: 'text-emerald-500' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.06 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4"
            >
              <item.icon className={`w-8 h-8 ${item.color} flex-shrink-0`} />
              <div>
                <p className="text-gray-400 text-xs">{item.label}</p>
                <p className="text-xl font-bold text-gray-800">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-5 gap-6 mb-8">
          <div className="lg:col-span-3">
            {stats && <AppointmentLineChart data={stats.last30DaysChart} />}
          </div>
          <div className="lg:col-span-2">
            {stats && <AppointmentBarChart data={stats.appointmentsByDoctor} />}
          </div>
        </div>

        {/* Status breakdown pills */}
        {stats && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-4 gap-3 mb-8"
          >
            {Object.entries(stats.statusBreakdown).map(([status, count]) => (
              <div key={status} className={`rounded-xl p-4 border text-center cursor-pointer transition-all ${getStatusColor(status)} ${statusFilter === status ? 'ring-2 ring-offset-1 ring-current' : ''}`}
                onClick={() => setStatusFilter(statusFilter === status ? 'all' : status)}>
                <p className="text-2xl font-bold">{count}</p>
                <p className="text-xs font-medium capitalize mt-0.5">{status}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Appointments table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* Table toolbar */}
          <div className="bg-white rounded-t-2xl border border-gray-100 border-b-0 px-6 py-4 flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by patient, doctor, or specialty..."
                value={searchQuery}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button className="flex items-center gap-1.5 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>

          <AppointmentTable
            appointments={filtered.slice(0, 20)}
            onStatusChange={handleStatusChange}
            showActions={true}
            title=""
          />
        </motion.div>

        {/* Quick actions sidebar-style row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Today\'s Schedule', count: todayAppts.length,                                   color: 'bg-blue-50 text-blue-700',    border: 'border-blue-100' },
            { label: 'Pending Review',    count: allAppts.filter(a => a.status === 'pending').length,  color: 'bg-amber-50 text-amber-700',  border: 'border-amber-100' },
            { label: 'Confirmed Today',   count: todayAppts.filter(a => a.status === 'confirmed').length, color: 'bg-emerald-50 text-emerald-700', border: 'border-emerald-100' },
            { label: 'Cancelled Today',   count: todayAppts.filter(a => a.status === 'cancelled').length, color: 'bg-red-50 text-red-700',    border: 'border-red-100' },
          ].map((item, i) => (
            <div key={i} className={`rounded-xl p-4 border ${item.border} ${item.color}`}>
              <p className="text-3xl font-extrabold">{item.count}</p>
              <p className="text-xs font-medium mt-1">{item.label}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
