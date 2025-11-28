import { ArrowLeft, Bell, Share2, Gauge, Clock } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';
import CrowdIndicator from '../ui/CrowdIndicator';
import RouteTimeline from '../ui/RouteTimeline';

interface TrackingResultScreenProps {
  busNumber: string;
  onNavigate: (screen: string, data?: any) => void;
}

export default function TrackingResultScreen({
  busNumber,
  onNavigate,
}: TrackingResultScreenProps) {
  const stops = [
    { name: 'Silk Board', time: 'Departed', status: 'passed' as const },
    { name: 'BTM Layout', time: 'Departed', status: 'passed' as const },
    { name: 'Jayanagar 4th Block', time: 'Arriving in 2 min', status: 'current' as const },
    { name: 'Lalbagh', time: '10 min', status: 'upcoming' as const },
    { name: 'KR Market', time: '15 min', status: 'upcoming' as const },
    { name: 'Majestic', time: '20 min', status: 'upcoming' as const },
  ];

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('search')}
              className="p-2 hover:bg-slate-100 rounded-lg"
            >
              <ArrowLeft className="w-6 h-6 text-slate-700" />
            </button>
            <div>
              <h1 className="text-xl text-slate-900">{busNumber}</h1>
              <p className="text-sm text-slate-600">Live Tracking</p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="relative h-[35vh] bg-slate-200 border-b border-slate-300">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-2">🗺️</div>
            <p className="text-slate-600">Bus Location Map</p>
          </div>
        </div>
        {/* Animated bus marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl animate-bounce">
          🚌
        </div>
        {/* Route line simulation */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path
            d="M 50 250 Q 150 200 250 150 T 400 100"
            stroke="#2563EB"
            strokeWidth="4"
            fill="none"
            strokeDasharray="8,8"
          />
        </svg>
      </div>

      {/* Bus Info Card */}
      <div className="bg-white shadow-lg rounded-t-3xl -mt-6 relative z-10 flex-1 overflow-y-auto">
        <div className="px-4 py-6">
          {/* Route Info */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl text-slate-900">Route 335E</h2>
              <StatusBadge status="On Time" />
            </div>
            <p className="text-slate-600">Kengeri to Whitefield</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-slate-600">ETA</span>
              </div>
              <p className="text-2xl text-blue-600">5 min</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
              <div className="flex items-center gap-2 mb-2">
                <Gauge className="w-5 h-5 text-green-600" />
                <span className="text-sm text-slate-600">Speed</span>
              </div>
              <p className="text-2xl text-green-600">25 km/h</p>
            </div>
          </div>

          {/* Crowd Level */}
          <div className="mb-6">
            <CrowdIndicator level="Low" percentage={20} />
          </div>

          {/* Route Timeline */}
          <div className="mb-6">
            <h3 className="text-lg text-slate-900 mb-4">Route Progress</h3>
            <div className="bg-slate-50 rounded-xl p-4">
              <RouteTimeline stops={stops} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg px-6 py-3 hover:bg-blue-700 transition-colors">
              <Bell className="w-5 h-5" />
              <span>Set Alert</span>
            </button>
            <button className="flex items-center justify-center gap-2 bg-white text-blue-600 border-2 border-blue-600 rounded-lg px-6 py-3 hover:bg-blue-50 transition-colors">
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
