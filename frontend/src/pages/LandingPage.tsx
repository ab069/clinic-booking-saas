import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Activity, Calendar, Users, BarChart2, Shield, Clock,
  Star, ChevronRight, Check, ArrowRight, Stethoscope,
  Bell, FileText, Zap, Globe
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  show: { transition: { staggerChildren: 0.1 } },
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const features = [
  { icon: Calendar,    title: 'Smart Scheduling',   desc: 'Intelligent appointment booking with real-time availability, automated reminders, and conflict prevention.' },
  { icon: Users,       title: 'Patient Management', desc: 'Comprehensive patient records, medical history, and seamless communication all in one place.' },
  { icon: BarChart2,   title: 'Analytics Dashboard',desc: 'Deep insights into clinic performance, revenue trends, and patient flow with beautiful charts.' },
  { icon: Bell,        title: 'Automated Reminders', desc: 'Reduce no-shows by up to 40% with automated SMS and email reminders for patients and staff.' },
  { icon: Shield,      title: 'Secure & Compliant',  desc: 'Enterprise-grade security with role-based access, ensuring patient data stays protected.' },
  { icon: FileText,    title: 'Digital Records',     desc: 'Go paperless with structured digital prescriptions, lab results, and clinical notes.' },
];

const testimonials = [
  { name: 'Dr. Sana Rizvi',    role: 'Cardiologist, Islamabad',   rating: 5, text: 'CliniqFlow transformed how we run our practice. Scheduling is seamless and our patients love the portal.' },
  { name: 'Ahmed Malik',       role: 'Clinic Director, Lahore',   rating: 5, text: 'Revenue increased 28% in 3 months. The analytics dashboard gives us exactly the insights we needed.' },
  { name: 'Dr. Farida Hasan',  role: 'Pediatrician, Karachi',     rating: 5, text: 'Setting up was effortless. Our receptionist spends 60% less time on the phone booking appointments now.' },
];

const plans = [
  {
    name: 'Starter',
    price: 4999,
    period: '/month',
    desc: 'Perfect for solo practitioners',
    features: ['1 Doctor profile', 'Up to 100 appointments/mo', 'Patient portal', 'Email reminders', 'Basic analytics'],
    cta: 'Start Free Trial',
    highlight: false,
  },
  {
    name: 'Clinic',
    price: 14999,
    period: '/month',
    desc: 'For growing clinics',
    features: ['Up to 10 Doctors', 'Unlimited appointments', 'Patient portal', 'SMS + Email reminders', 'Advanced analytics', 'Priority support', 'Custom branding'],
    cta: 'Start Free Trial',
    highlight: true,
  },
  {
    name: 'Hospital',
    price: 39999,
    period: '/month',
    desc: 'For large healthcare facilities',
    features: ['Unlimited Doctors', 'Unlimited appointments', 'Multi-location support', 'All reminders', 'Full analytics suite', '24/7 Dedicated support', 'API access', 'SSO & compliance'],
    cta: 'Contact Sales',
    highlight: false,
  },
];

const stats = [
  { value: '500+', label: 'Clinics onboarded' },
  { value: '2M+',  label: 'Appointments booked' },
  { value: '98%',  label: 'Customer satisfaction' },
  { value: '40%',  label: 'Fewer no-shows' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ─── Navbar ─────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                Cliniq<span className="text-primary-500">Flow</span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-gray-600 hover:text-primary-500 transition-colors">Features</a>
              <a href="#testimonials" className="text-sm text-gray-600 hover:text-primary-500 transition-colors">Reviews</a>
              <a href="#pricing" className="text-sm text-gray-600 hover:text-primary-500 transition-colors">Pricing</a>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-primary-500 transition-colors">
                Sign in
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 bg-primary-500 text-white text-sm font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-sm"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-primary-50/40 to-white pt-20 pb-32">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-100/30 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-100/20 rounded-full translate-y-1/3 -translate-x-1/4 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: copy */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="max-w-xl"
            >
              {/* Badge */}
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 text-primary-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
                <Zap className="w-3.5 h-3.5" />
                Trusted by 500+ clinics across Pakistan
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Smart Clinic{' '}
                <span className="text-primary-500">Management</span>{' '}
                for Modern Healthcare
              </motion.h1>

              <motion.p variants={fadeUp} className="text-lg text-gray-500 leading-relaxed mb-8">
                Streamline appointments, delight patients, and grow your practice —
                all from one beautifully simple platform built for Pakistan's healthcare providers.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-all shadow-lg shadow-primary-200 group"
                >
                  Start Free — No Card Needed
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                >
                  See how it works
                </a>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center gap-6">
                <div className="flex -space-x-2">
                  {['AF','MN','ZA','MS','HA'].map((init, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: ['#0ea5e9','#8b5cf6','#0ea5e9','#f59e0b','#10b981'][i] }}
                    >
                      {init}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-xs text-gray-500">Loved by 2,000+ healthcare professionals</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: dashboard preview card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Main dashboard mock */}
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                  {/* Top bar */}
                  <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4 flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-white/30" />
                      <div className="w-3 h-3 rounded-full bg-white/30" />
                      <div className="w-3 h-3 rounded-full bg-white/30" />
                    </div>
                    <span className="text-white text-sm font-medium">CliniqFlow Dashboard</span>
                  </div>

                  {/* Stats row */}
                  <div className="p-4 grid grid-cols-2 gap-3">
                    {[
                      { label: 'Total Patients', value: '1,284', color: 'text-blue-600', bg: 'bg-blue-50' },
                      { label: "Today's Appts",  value: '24',    color: 'text-emerald-600', bg: 'bg-emerald-50' },
                      { label: 'Monthly Revenue',value: 'PKR 2.4M', color: 'text-purple-600', bg: 'bg-purple-50' },
                      { label: 'Pending',        value: '8',     color: 'text-amber-600', bg: 'bg-amber-50' },
                    ].map((s, i) => (
                      <div key={i} className={`${s.bg} rounded-xl p-3`}>
                        <p className="text-xs text-gray-500 mb-1">{s.label}</p>
                        <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Mini chart bars */}
                  <div className="px-4 pb-2">
                    <p className="text-xs text-gray-400 mb-2">Last 7 days</p>
                    <div className="flex items-end gap-1.5 h-16">
                      {[4,7,5,9,6,8,10].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-primary-500 rounded-t-md opacity-80"
                          style={{ height: `${h * 6}px` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Mini table */}
                  <div className="px-4 pb-4">
                    <div className="border border-gray-100 rounded-xl overflow-hidden">
                      <div className="bg-gray-50 px-3 py-2 flex justify-between text-xs font-semibold text-gray-500">
                        <span>Patient</span>
                        <span>Status</span>
                      </div>
                      {[
                        { name: 'Ahmad Raza',    status: 'confirmed', color: 'text-emerald-600 bg-emerald-50' },
                        { name: 'Fatima Malik',  status: 'pending',   color: 'text-amber-600 bg-amber-50' },
                        { name: 'Imran Khan',    status: 'confirmed', color: 'text-emerald-600 bg-emerald-50' },
                      ].map((r, i) => (
                        <div key={i} className="px-3 py-2 flex justify-between items-center border-t border-gray-50">
                          <span className="text-xs text-gray-700">{r.name}</span>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${r.color}`}>{r.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating notification */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Check className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">New Booking!</p>
                    <p className="text-xs text-gray-400">Dr. Ayesha · 10:00 AM</p>
                  </div>
                </motion.div>

                {/* Floating stat */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 4, delay: 1 }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3"
                >
                  <p className="text-xs text-gray-400">Revenue Today</p>
                  <p className="text-base font-bold text-primary-600">PKR 87,500</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Stats bar ──────────────────────────────────────────────────────── */}
      <section className="bg-primary-600 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-4xl font-extrabold text-white">{s.value}</p>
                <p className="text-primary-200 text-sm mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ───────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary-500 text-sm font-semibold uppercase tracking-wider">Why CliniqFlow</span>
            <h2 className="mt-2 text-4xl font-extrabold text-gray-900">Everything your clinic needs</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              From first appointment to long-term patient relationships — we've built every feature you need to run a modern, efficient clinic.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="group p-6 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all bg-white"
              >
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                  <f.icon className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it works ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary-500 text-sm font-semibold uppercase tracking-wider">How It Works</span>
            <h2 className="mt-2 text-4xl font-extrabold text-gray-900">Up and running in minutes</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-0.5 bg-primary-100" />

            {[
              { step: '01', title: 'Set up your clinic', desc: 'Add your doctors, services, and availability in under 10 minutes.', icon: Stethoscope },
              { step: '02', title: 'Patients book online', desc: 'Patients self-book via your portal — any device, any time.', icon: Calendar },
              { step: '03', title: 'Track & grow', desc: 'Monitor revenue, attendance, and trends from your dashboard.', icon: BarChart2 },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-primary-100 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-primary-500" />
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-primary-500 text-white text-xs font-bold flex items-center justify-center -mt-3">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ───────────────────────────────────────────────────── */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary-500 text-sm font-semibold uppercase tracking-wider">Testimonials</span>
            <h2 className="mt-2 text-4xl font-extrabold text-gray-900">Trusted by healthcare professionals</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-50 rounded-2xl p-8 border border-gray-100"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-700 font-bold text-sm">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing ────────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary-500 text-sm font-semibold uppercase tracking-wider">Pricing</span>
            <h2 className="mt-2 text-4xl font-extrabold text-gray-900">Simple, transparent pricing</h2>
            <p className="mt-4 text-gray-500">14-day free trial on all plans. No credit card required.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`rounded-2xl p-8 border ${
                  plan.highlight
                    ? 'bg-primary-500 border-primary-400 shadow-xl shadow-primary-200 relative'
                    : 'bg-white border-gray-100 shadow-sm'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-4 py-1.5 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className={`text-xl font-bold mb-1 ${plan.highlight ? 'text-white' : 'text-gray-800'}`}>{plan.name}</h3>
                <p className={`text-sm mb-6 ${plan.highlight ? 'text-primary-100' : 'text-gray-400'}`}>{plan.desc}</p>
                <div className="mb-6">
                  <span className={`text-4xl font-extrabold ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>
                    PKR {plan.price.toLocaleString()}
                  </span>
                  <span className={`text-sm ml-1 ${plan.highlight ? 'text-primary-200' : 'text-gray-400'}`}>{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm">
                      <Check className={`w-4 h-4 flex-shrink-0 ${plan.highlight ? 'text-primary-200' : 'text-primary-500'}`} />
                      <span className={plan.highlight ? 'text-primary-100' : 'text-gray-600'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/login"
                  className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                    plan.highlight
                      ? 'bg-white text-primary-600 hover:bg-primary-50'
                      : 'bg-primary-500 text-white hover:bg-primary-600'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-extrabold text-white mb-4">
              Ready to modernize your clinic?
            </h2>
            <p className="text-primary-200 text-lg mb-8 max-w-2xl mx-auto">
              Join 500+ clinics already using CliniqFlow. Start your free trial today — no credit card needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 font-bold rounded-xl hover:bg-primary-50 transition-colors shadow-lg group"
              >
                Get Started Free
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center px-8 py-4 border border-primary-400 text-white font-semibold rounded-xl hover:bg-primary-500 transition-colors"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                  <Activity className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-bold text-lg">CliniqFlow</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">Modern healthcare management for Pakistan's clinics and hospitals.</p>
            </div>
            {[
              { title: 'Product',  links: ['Features','Pricing','Demo','Changelog'] },
              { title: 'Company',  links: ['About','Blog','Careers','Contact'] },
              { title: 'Legal',    links: ['Privacy Policy','Terms of Service','HIPAA Compliance'] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-white font-semibold text-sm mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">© 2024 CliniqFlow by msakithub.com. All rights reserved.</p>
            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
              <Globe className="w-4 h-4" />
              Built in Pakistan 🇵🇰
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
