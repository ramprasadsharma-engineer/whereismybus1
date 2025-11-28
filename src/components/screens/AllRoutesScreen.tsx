import { ArrowLeft, Search, SlidersHorizontal, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';
import BottomNav from '../ui/BottomNav';

interface AllRoutesScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export default function AllRoutesScreen({ onNavigate }: AllRoutesScreenProps) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'BMTC', 'KSRTC', 'APSRTC'];

  const routes = [
    {
      number: 'BM5',
      provider: 'BMTC',
      from: 'Silk Board',
      to: 'Majestic',
      frequency: 'Every 10 min',
      distance: '12 km',
    },
    {
      number: '335E',
      provider: 'BMTC',
      from: 'Kengeri',
      to: 'Whitefield',
      frequency: 'Every 15 min',
      distance: '28 km',
    },
    {
      number: 'G4',
      provider: 'BMTC',
      from: 'Hebbal',
      to: 'Electronic City',
      frequency: 'Every 20 min',
      distance: '35 km',
    },
    {
      number: 'KA-KSRTC-501',
      provider: 'KSRTC',
      from: 'Bangalore',
      to: 'Mysore',
      frequency: 'Every 30 min',
      distance: '145 km',
    },
    {
      number: 'V-335',
      provider: 'BMTC',
      from: 'Vijayanagar',
      to: 'Marathahalli',
      frequency: 'Every 12 min',
      distance: '18 km',
    },
    {
      number: 'AP-300',
      provider: 'APSRTC',
      from: 'Bangalore',
      to: 'Tirupati',
      frequency: 'Every 60 min',
      distance: '250 km',
    },
  ];

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'BMTC':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'KSRTC':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'APSRTC':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const filteredRoutes =
    activeFilter === 'All'
      ? routes
      : routes.filter((route) => route.provider === activeFilter);

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="p-2 hover:bg-slate-100 rounded-lg"
            >
              <ArrowLeft className="w-6 h-6 text-slate-700" />
            </button>
            <h1 className="text-xl text-slate-900">All Routes</h1>
          </div>
          <button className="p-2 hover:bg-slate-100 rounded-lg">
            <Search className="w-6 h-6 text-slate-700" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Routes List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-20">
        <div className="space-y-3">
          {filteredRoutes.map((route, index) => (
            <button
              key={index}
              onClick={() => onNavigate('routeDetails', route)}
              className="w-full bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition-shadow text-left"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">🚌</div>
                  <div>
                    <h3 className="text-xl text-slate-900">{route.number}</h3>
                    <span
                      className={`inline-block text-xs px-2 py-1 rounded border mt-1 ${getProviderColor(
                        route.provider
                      )}`}
                    >
                      {route.provider}
                    </span>
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
                <div className="flex items-center gap-1 text-sm text-slate-600">
                  <Clock className="w-4 h-4" />
                  <span>{route.frequency}</span>
                </div>
                <span className="text-sm text-slate-600">{route.distance}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
        <SlidersHorizontal className="w-6 h-6" />
      </button>

      {/* Bottom Navigation */}
      <BottomNav activeScreen="routes" onNavigate={onNavigate} />
    </div>
  );
}
