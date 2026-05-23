import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Eye, EyeOff, LogIn, UserPlus, ArrowLeft, Stethoscope } from 'lucide-react';
import { authApi } from '../lib/api';
import { saveAuth } from '../lib/auth';
import { User } from '../types';

type Mode = 'login' | 'register';

const demoAccounts = [
  { label: 'Admin',   email: 'admin@clinic.com',   password: 'admin123',   role: 'admin',   color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { label: 'Patient', email: 'patient@clinic.com', password: 'patient123', role: 'patient', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
  { label: 'Doctor',  email: 'ayesha@clinic.com',  password: 'doctor123',  role: 'doctor',  color: 'bg-purple-50 border-purple-200 text-purple-700' },
];

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode]           = useState<Mode>('login');
  const [showPw, setShowPw]       = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');
  const [form, setForm]           = useState({ name: '', email: '', password: '', phone: '' });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        const res = await authApi.login(form.email, form.password);
        const { token, user } = res.data;
        if (token && user) {
          saveAuth(token, user as User);
          redirectByRole(user.role);
        }
      } else {
        const res = await authApi.register({ name: form.name, email: form.email, password: form.password, phone: form.phone });
        const { token, user } = res.data;
        if (token && user) {
          saveAuth(token, user as User);
          redirectByRole(user.role);
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const redirectByRole = (role: string) => {
    if (role === 'admin')   navigate('/dashboard');
    else if (role === 'doctor') navigate('/schedule');
    else navigate('/portal');
  };

  const quickLogin = async (email: string, password: string) => {
    setForm(prev => ({ ...prev, email, password }));
    setLoading(true);
    setError('');
    try {
      const res = await authApi.login(email, password);
      const { token, user } = res.data;
      if (token && user) {
        saveAuth(token, user as User);
        redirectByRole(user.role);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-primary-50/30 to-white flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-primary-700 flex-col justify-between p-12 relative overflow-hidden">
        {/* BG decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/3" />

        <div className="relative">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-xl">CliniqFlow</span>
          </Link>
        </div>

        <div className="relative">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Stethoscope className="w-12 h-12 text-primary-300 mb-6" />
            <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
              Modern healthcare starts here
            </h2>
            <p className="text-primary-200 text-lg leading-relaxed">
              Manage appointments, track patients, and grow your practice — all in one place.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {[
              { label: 'Active Clinics', value: '500+' },
              { label: 'Appointments', value: '2M+' },
              { label: 'Satisfaction', value: '98%' },
              { label: 'Fewer No-shows', value: '40%' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="bg-white/10 rounded-xl p-4"
              >
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-primary-200 text-xs mt-0.5">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="relative text-primary-300 text-sm">© 2024 CliniqFlow · msakithub.com</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Cliniq<span className="text-primary-500">Flow</span></span>
            </Link>
          </div>

          {/* Back link */}
          <Link to="/" className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-6 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to home
          </Link>

          {/* Mode toggle */}
          <div className="flex rounded-xl bg-gray-100 p-1 mb-8">
            {(['login','register'] as Mode[]).map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(''); }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  mode === m ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {m === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {mode === 'login' ? 'Sign in to continue to CliniqFlow' : 'Start your 14-day free trial today'}
            </p>
          </div>

          {/* Demo accounts */}
          {mode === 'login' && (
            <div className="mb-6">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Quick Demo Access</p>
              <div className="grid grid-cols-3 gap-2">
                {demoAccounts.map(acc => (
                  <button
                    key={acc.role}
                    onClick={() => quickLogin(acc.email, acc.password)}
                    disabled={loading}
                    className={`py-2 rounded-lg text-xs font-semibold border transition-all hover:shadow-sm ${acc.color} disabled:opacity-60`}
                  >
                    {acc.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={set('name')}
                  placeholder="Ahmad Raza"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={set('email')}
                placeholder="you@clinic.com"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone <span className="text-gray-400">(optional)</span></label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={set('phone')}
                  placeholder="0300-1234567"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={set('password')}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 disabled:opacity-60 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : mode === 'login' ? (
                <><LogIn className="w-4 h-4" /> Sign In</>
              ) : (
                <><UserPlus className="w-4 h-4" /> Create Account</>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
              className="text-primary-500 font-semibold hover:text-primary-600"
            >
              {mode === 'login' ? 'Create one' : 'Sign in'}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
