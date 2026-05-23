import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, LogOut, Menu, X, Calendar, LayoutDashboard, User } from 'lucide-react';
import { useState } from 'react';
import { getUser, clearAuth } from '../lib/auth';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  const dashLink = user?.role === 'admin'   ? '/dashboard'
                 : user?.role === 'doctor'  ? '/schedule'
                 : '/portal';

  const dashLabel = user?.role === 'admin'  ? 'Dashboard'
                  : user?.role === 'doctor' ? 'My Schedule'
                  : 'My Portal';

  const DashIcon = user?.role === 'admin' ? LayoutDashboard
                 : user?.role === 'doctor' ? Calendar
                 : User;

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Cliniq<span className="text-primary-500">Flow</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {!user ? (
              <>
                <a href="/#features" className="text-sm text-gray-600 hover:text-primary-500 transition-colors">Features</a>
                <a href="/#pricing" className="text-sm text-gray-600 hover:text-primary-500 transition-colors">Pricing</a>
                <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-primary-500 transition-colors">Sign in</Link>
                <Link to="/login" className="px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors">
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={dashLink}
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                    isActive(dashLink) ? 'text-primary-500' : 'text-gray-600 hover:text-primary-500'
                  }`}
                >
                  <DashIcon className="w-4 h-4" />
                  {dashLabel}
                </Link>
                {user.role === 'patient' && (
                  <Link
                    to="/book"
                    className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                      isActive('/book') ? 'text-primary-500' : 'text-gray-600 hover:text-primary-500'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    Book Appointment
                  </Link>
                )}
                <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-700 text-sm font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="hidden lg:block">
                    <p className="text-sm font-medium text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-2"
        >
          {!user ? (
            <>
              <a href="/#features" className="block py-2 text-sm text-gray-600">Features</a>
              <a href="/#pricing"  className="block py-2 text-sm text-gray-600">Pricing</a>
              <Link to="/login" className="block py-2 text-sm font-medium text-primary-500">Sign in</Link>
            </>
          ) : (
            <>
              <Link to={dashLink} className="block py-2 text-sm font-medium text-gray-700">{dashLabel}</Link>
              {user.role === 'patient' && (
                <Link to="/book" className="block py-2 text-sm font-medium text-gray-700">Book Appointment</Link>
              )}
              <hr className="border-gray-100" />
              <p className="py-2 text-sm text-gray-500">{user.name} · {user.role}</p>
              <button onClick={handleLogout} className="flex items-center gap-2 py-2 text-sm text-red-500">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          )}
        </motion.div>
      )}
    </nav>
  );
}
