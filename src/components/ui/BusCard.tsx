import { Clock, Users } from 'lucide-react';
import StatusBadge from './StatusBadge';

interface BusCardProps {
  routeNumber: string;
  routeName: string;
  status: 'On Time' | 'Delayed' | 'Slight Delay';
  crowdLevel: 'Low' | 'Medium' | 'High';
  crowdPercentage: number;
  nextBus: string;
  onClick?: () => void;
}

export default function BusCard({
  routeNumber,
  routeName,
  status,
  crowdLevel,
  crowdPercentage,
  nextBus,
  onClick,
}: BusCardProps) {
  const getCrowdColor = () => {
    switch (crowdLevel) {
      case 'Low':
        return 'text-green-600';
      case 'Medium':
        return 'text-orange-600';
      case 'High':
        return 'text-red-600';
      default:
        return 'text-slate-600';
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-blue-600 text-2xl">🚌</span>
            <span className="text-xl text-slate-900">{routeNumber}</span>
          </div>
          <p className="text-sm text-slate-600">{routeName}</p>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <Users className={`w-4 h-4 ${getCrowdColor()}`} />
          <span className={`text-sm ${getCrowdColor()}`}>
            {crowdLevel} {crowdPercentage}%
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-500" />
          <span className="text-sm text-slate-700">{nextBus}</span>
        </div>
      </div>
    </div>
  );
}
