import { Check, Circle, MapPin } from 'lucide-react';

interface Stop {
  name: string;
  time?: string;
  status: 'passed' | 'current' | 'upcoming';
}

interface RouteTimelineProps {
  stops: Stop[];
}

export default function RouteTimeline({ stops }: RouteTimelineProps) {
  return (
    <div className="space-y-0">
      {stops.map((stop, index) => (
        <div key={index} className="flex items-start gap-3">
          <div className="flex flex-col items-center">
            {/* Icon */}
            <div
              className={`rounded-full p-1 ${
                stop.status === 'passed'
                  ? 'bg-slate-300'
                  : stop.status === 'current'
                  ? 'bg-blue-600'
                  : 'bg-slate-200'
              }`}
            >
              {stop.status === 'passed' ? (
                <Check className="w-3 h-3 text-white" />
              ) : stop.status === 'current' ? (
                <MapPin className="w-3 h-3 text-white" />
              ) : (
                <Circle className="w-3 h-3 text-slate-400" />
              )}
            </div>
            {/* Line */}
            {index < stops.length - 1 && (
              <div
                className={`w-0.5 h-12 ${
                  stop.status === 'passed' ? 'bg-slate-300' : 'bg-slate-200'
                }`}
              />
            )}
          </div>

          {/* Stop Info */}
          <div className="flex-1 pb-8">
            <p
              className={`text-sm ${
                stop.status === 'current'
                  ? 'text-blue-600'
                  : stop.status === 'passed'
                  ? 'text-slate-500'
                  : 'text-slate-700'
              }`}
            >
              {stop.name}
            </p>
            {stop.time && (
              <p className="text-xs text-slate-500 mt-1">{stop.time}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
