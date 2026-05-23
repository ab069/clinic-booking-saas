import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: number; label: string };
  color?: 'blue' | 'green' | 'amber' | 'purple' | 'red';
  index?: number;
}

const colorMap = {
  blue:   { bg: 'bg-blue-50',   icon: 'bg-blue-500',   text: 'text-blue-600',   badge: 'bg-blue-100 text-blue-700' },
  green:  { bg: 'bg-emerald-50', icon: 'bg-emerald-500', text: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-700' },
  amber:  { bg: 'bg-amber-50',  icon: 'bg-amber-500',  text: 'text-amber-600',  badge: 'bg-amber-100 text-amber-700' },
  purple: { bg: 'bg-purple-50', icon: 'bg-purple-500', text: 'text-purple-600', badge: 'bg-purple-100 text-purple-700' },
  red:    { bg: 'bg-red-50',    icon: 'bg-red-500',    text: 'text-red-600',    badge: 'bg-red-100 text-red-700' },
};

export default function StatCard({ title, value, icon: Icon, trend, color = 'blue', index = 0 }: StatCardProps) {
  const c = colorMap[color];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className={`inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full text-xs font-medium ${c.badge}`}>
              <span>{trend.value >= 0 ? '+' : ''}{trend.value}%</span>
              <span className="text-gray-500">{trend.label}</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 ${c.icon} rounded-xl flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
}
