import { Users } from 'lucide-react';

interface CrowdIndicatorProps {
  level: 'Low' | 'Medium' | 'High';
  percentage: number;
}

export default function CrowdIndicator({ level, percentage }: CrowdIndicatorProps) {
  const getColor = () => {
    switch (level) {
      case 'Low':
        return 'bg-green-500';
      case 'Medium':
        return 'bg-orange-500';
      case 'High':
        return 'bg-red-500';
      default:
        return 'bg-slate-500';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-slate-600" />
          <span className="text-sm text-slate-700">Crowd Level: {level}</span>
        </div>
        <span className="text-sm text-slate-600">{percentage}%</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full ${getColor()} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
