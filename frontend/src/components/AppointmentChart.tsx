import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  AreaChart,
} from 'recharts';
import { formatShortDate } from '../lib/utils';

// ─── Line / Area chart: appointments over 30 days ─────────────────────────────
interface LineChartData {
  date: string;
  count: number;
}

interface AppointmentLineChartProps {
  data: LineChartData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 shadow-lg rounded-xl p-3">
        <p className="text-xs text-gray-500 mb-1">{formatShortDate(label)}</p>
        <p className="text-sm font-semibold text-primary-600">{payload[0].value} appointments</p>
      </div>
    );
  }
  return null;
};

export function AppointmentLineChart({ data }: AppointmentLineChartProps) {
  const formatted = data.map(d => ({ ...d, label: formatShortDate(d.date) }));

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Appointments (Last 30 Days)</h3>
        <p className="text-sm text-gray-400">Daily booking trend</p>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={formatted} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#0ea5e9" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
            interval={4}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#0ea5e9"
            strokeWidth={2.5}
            fill="url(#colorCount)"
            dot={false}
            activeDot={{ r: 5, fill: '#0ea5e9', strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Bar chart: appointments by doctor ────────────────────────────────────────
interface BarChartData {
  name: string;
  specialization: string;
  count: number;
}

interface AppointmentBarChartProps {
  data: BarChartData[];
}

const BarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 shadow-lg rounded-xl p-3">
        <p className="text-xs font-semibold text-gray-700 mb-0.5">Dr. {label}</p>
        <p className="text-xs text-gray-400 mb-1">{payload[0]?.payload?.specialization}</p>
        <p className="text-sm font-semibold text-purple-600">{payload[0].value} appointments</p>
      </div>
    );
  }
  return null;
};

export function AppointmentBarChart({ data }: AppointmentBarChartProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">By Doctor</h3>
        <p className="text-sm text-gray-400">Total appointments per doctor</p>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={true} vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <Tooltip content={<BarTooltip />} />
          <Bar dataKey="count" fill="#8b5cf6" radius={[6, 6, 0, 0]} maxBarSize={48} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
