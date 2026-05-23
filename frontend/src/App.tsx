import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from './lib/auth';
import LandingPage      from './pages/LandingPage';
import Login            from './pages/Login';
import AdminDashboard   from './pages/AdminDashboard';
import PatientPortal    from './pages/PatientPortal';
import DoctorSchedule   from './pages/DoctorSchedule';
import BookAppointment  from './pages/BookAppointment';

function RequireAuth({ children, role }: { children: JSX.Element; role?: string }) {
  const user = getUser();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<LandingPage />} />
        <Route path="/login"     element={<Login />} />

        <Route path="/dashboard" element={
          <RequireAuth role="admin">
            <AdminDashboard />
          </RequireAuth>
        } />

        <Route path="/portal" element={
          <RequireAuth role="patient">
            <PatientPortal />
          </RequireAuth>
        } />

        <Route path="/schedule" element={
          <RequireAuth role="doctor">
            <DoctorSchedule />
          </RequireAuth>
        } />

        <Route path="/book" element={
          <RequireAuth>
            <BookAppointment />
          </RequireAuth>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
