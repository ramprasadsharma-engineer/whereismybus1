import { ArrowLeft, Search, MapPin } from 'lucide-react';
import { useState } from 'react';

interface RouteSearchScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export default function RouteSearchScreen({ onNavigate }: RouteSearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const routes = [
    {
      number: 'BM5',
      provider: 'BMTC',
      from: 'Silk Board',
      to: 'Majestic',
      frequency: 'Every 10 min',
    },
    {
      number: '335E',
      provider: 'BMTC',
      from: 'Kengeri',
      to: 'Whitefield',
      frequency: 'Every 15 min',
    },
    {
      number: 'G4',
      provider: 'BMTC',
      from: 'Hebbal',
      to: 'Electronic City',
      frequency: 'Every 20 min',
    },
    {
      number: 'V-335',
      provider: 'BMTC',
      from: 'Vijayanagar',
      to: 'Marathahalli',
      frequency: 'Every 12 min',
    },
    {
      number: 'KA-501',
      provider: 'KSRTC',
      from: 'Bangalore',
      to: 'Mysore',
      frequency: 'Every 30 min',
    },
  ];

  const filteredRoutes = routes.filter(
    (route) =>
      route.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.to.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => onNavigate('home')}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl">All Routes</h1>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search routes, stops..."
            className="w-full pl-10 pr-4 py-3 rounded-lg outline-none text-slate-900"
          />
        </div>
      </div>

      {/* Routes List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <p className="text-sm text-slate-600 mb-3">
            {filteredRoutes.length} routes found
          </p>
          <div className="space-y-3">
            {filteredRoutes.map((route, index) => (
              <button
                key={index}
                onClick={() =>
                  onNavigate('liveTracking', {
                    busNumber: route.number,
                    from: route.from,
                    to: route.to,
                  })
                }
                className="w-full bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow text-left"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🚌</span>
                    <div>
                      <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded text-sm">
                        {route.number}
                      </span>
                      <p className="text-xs text-slate-500 mt-1">{route.provider}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-slate-700">{route.from}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-slate-700">{route.to}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="text-sm text-slate-600">{route.frequency}</span>
                  <span className="text-sm text-blue-600">Track →</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
