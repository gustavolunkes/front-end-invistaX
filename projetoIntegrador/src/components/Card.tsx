import type { ReactNode } from 'react';

interface CardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export function Card({ title, value, subtitle, icon, trend }: CardProps) {
  return (
    <div className="bg-zinc-700 rounded-lg p-4 shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-zinc-300 text-sm">{title}</h3>
          <p className="text-white text-2xl font-bold mt-1">{value}</p>
          {subtitle && <p className="text-zinc-400 text-xs mt-1">{subtitle}</p>}
        </div>
        {icon && <div className="p-2 bg-zinc-600 rounded-md">{icon}</div>}
      </div>
      {trend && (
        <div className={`mt-2 text-xs ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {trend.isPositive ? '↑' : '↓'} {trend.value}
        </div>
      )}
    </div>
  );
}