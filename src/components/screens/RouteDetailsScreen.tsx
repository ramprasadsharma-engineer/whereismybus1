import { ArrowLeft, MapPin, Clock, Activity } from 'lucide-react';

interface RouteDetailsScreenProps {
  route: any;
  onNavigate: (screen: string, data?: any) => void;
}

export default function RouteDetailsScreen({
  route,
  onNavigate,
}: RouteDetailsScreenProps) {
  if (!route) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-600">No route selected</p>
      </div>
    );
  }

  const stops = [
    { name: route.from, time: '06:00 AM' },
    { name: 'Stop 1 - Example Location', time: '06:12 AM' },
    { name: 'Stop 2 - Example Location', time: '06:24 AM' },
    { name: 'Stop 3 - Example Location', time: '06:36 AM' },
    { name: 'Stop 4 - Example Location', time: '06:48 AM' },
    { name: route.to, time: '07:00 AM' },
  ];

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('routes')}
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            <ArrowLeft className="w-6 h-6 text-slate-700" />
          </button>
          <div>
            <h1 className="text-xl text-slate-900">Route {route.number}</h1>
            <p className="text-sm text-slate-600">{route.provider}</p>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="relative h-[30vh] bg-slate-200 border-b border-slate-300">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-2">🗺️</div>
            <p className="text-slate-600">Full Route Map</p>
          </div>
        </div>
        {/* Route path simulation */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path
            d="M 50 200 L 100 150 L 200 120 L 300 100 L 400 80"
            stroke="#2563EB"
            strokeWidth="4"
            fill="none"
          />
          {/* Start marker */}
          <circle cx="50" cy="200" r="8" fill="#22C55E" />
          {/* End marker */}
          <circle cx="400" cy="80" r="8" fill="#EF4444" />
        </svg>
      </div>

      {/* Route Info */}
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white p-4 mb-4 shadow-sm">
          <h2 className="text-lg text-slate-900 mb-4">Route Information</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="bg-blue-50 rounded-lg p-3 mb-2">
                <MapPin className="w-6 h-6 text-blue-600 mx-auto" />
              </div>
              <p className="text-xs text-slate-600 mb-1">Distance</p>
              <p className="text-sm text-slate-900">{route.distance}</p>
            </div>
            <div className="text-center">
              <div className="bg-green-50 rounded-lg p-3 mb-2">
                <Clock className="w-6 h-6 text-green-600 mx-auto" />
              </div>
              <p className="text-xs text-slate-600 mb-1">Duration</p>
              <p className="text-sm text-slate-900">60 min</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-50 rounded-lg p-3 mb-2">
                <Activity className="w-6 h-6 text-orange-600 mx-auto" />
              </div>
              <p className="text-xs text-slate-600 mb-1">Frequency</p>
              <p className="text-sm text-slate-900">{route.frequency}</p>
            </div>
          </div>
        </div>

        {/* Stops List */}
        <div className="px-4 pb-6">
          <h2 className="text-lg text-slate-900 mb-4">All Stops</h2>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100">
            {stops.map((stop, index) => (
              <div key={index} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      index === 0
                        ? 'bg-green-100 text-green-700'
                        : index === stops.length - 1
                        ? 'bg-red-100 text-red-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-slate-900">{stop.name}</p>
                    <p className="text-xs text-slate-500">{stop.time}</p>
                  </div>
                </div>
                {index === 0 && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded border border-green-200">
                    Start
                  </span>
                )}
                {index === stops.length - 1 && (
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded border border-red-200">
                    End
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Track Button */}
          <button className="w-full bg-blue-600 text-white rounded-lg px-6 py-4 mt-6 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
            <span>Track Buses on This Route</span>
          </button>
        </div>
      </div>
    </div>
  );
}
