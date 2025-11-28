import { ArrowLeft, Users, Search, TrendingUp, MapPin } from 'lucide-react';
import { useState } from 'react';

interface SeatVacancyScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export default function SeatVacancyScreen({ onNavigate }: SeatVacancyScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const buses = [
    {
      number: '335E',
      route: 'Kengeri - Whitefield',
      totalSeats: 50,
      occupied: 12,
      status: 'Low',
      eta: '5 min',
      nextBus: '15 min',
    },
    {
      number: 'BM5',
      route: 'Silk Board - Majestic',
      totalSeats: 45,
      occupied: 28,
      status: 'Medium',
      eta: '8 min',
      nextBus: '10 min',
    },
    {
      number: 'G4',
      route: 'Hebbal - Electronic City',
      totalSeats: 48,
      occupied: 42,
      status: 'High',
      eta: '12 min',
      nextBus: '20 min',
    },
    {
      number: 'V-335',
      route: 'Vijayanagar - Marathahalli',
      totalSeats: 52,
      occupied: 8,
      status: 'Low',
      eta: '3 min',
      nextBus: '12 min',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Low':
        return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' };
      case 'Medium':
        return { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' };
      case 'High':
        return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };
      default:
        return { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' };
    }
  };

  const getOccupancyPercentage = (occupied: number, total: number) => {
    return Math.round((occupied / total) * 100);
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => onNavigate('home')}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6" />
              <h1 className="text-xl">Seat Vacancy</h1>
            </div>
            <p className="text-sm text-blue-100">Check available seats in real-time</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search bus number or route..."
            className="w-full pl-10 pr-4 py-3 rounded-lg outline-none text-slate-900"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Stats Summary */}
        <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-b border-blue-100">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-lg p-3 text-center border border-blue-100">
              <div className="text-2xl text-green-600 mb-1">4</div>
              <p className="text-xs text-slate-600">Low Crowd</p>
            </div>
            <div className="bg-white rounded-lg p-3 text-center border border-blue-100">
              <div className="text-2xl text-orange-600 mb-1">2</div>
              <p className="text-xs text-slate-600">Medium Crowd</p>
            </div>
            <div className="bg-white rounded-lg p-3 text-center border border-blue-100">
              <div className="text-2xl text-red-600 mb-1">1</div>
              <p className="text-xs text-slate-600">High Crowd</p>
            </div>
          </div>
        </div>

        {/* Buses List */}
        <div className="p-4">
          <h3 className="text-sm text-slate-600 mb-3">NEARBY BUSES</h3>
          <div className="space-y-3">
            {buses.map((bus, index) => {
              const colors = getStatusColor(bus.status);
              const percentage = getOccupancyPercentage(bus.occupied, bus.totalSeats);
              const available = bus.totalSeats - bus.occupied;

              return (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">🚌</span>
                      <div>
                        <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded text-sm mb-1">
                          {bus.number}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <p className="text-xs text-slate-600">{bus.route}</p>
                        </div>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded border ${colors.bg} ${colors.text} ${colors.border}`}
                    >
                      {bus.status}
                    </span>
                  </div>

                  {/* Seat Visualization */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-600" />
                        <span className="text-sm text-slate-700">
                          {available} seats available
                        </span>
                      </div>
                      <span className="text-sm text-slate-600">{percentage}% filled</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          bus.status === 'Low'
                            ? 'bg-green-500'
                            : bus.status === 'Medium'
                            ? 'bg-orange-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Seat Grid Preview */}
                  <div className="bg-slate-50 rounded-lg p-3 mb-3">
                    <div className="grid grid-cols-10 gap-1">
                      {Array.from({ length: bus.totalSeats }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-5 h-5 rounded ${
                            i < bus.occupied ? 'bg-red-400' : 'bg-green-400'
                          }`}
                          title={i < bus.occupied ? 'Occupied' : 'Available'}
                        ></div>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-600">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-green-400 rounded"></div>
                        <span>Available</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-red-400 rounded"></div>
                        <span>Occupied</span>
                      </div>
                    </div>
                  </div>

                  {/* ETA Info */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="text-sm text-slate-600">
                      Arriving in <span className="text-blue-600">{bus.eta}</span>
                    </div>
                    <button
                      onClick={() =>
                        onNavigate('liveTracking', {
                          busNumber: bus.number,
                          from: bus.route.split(' - ')[0],
                          to: bus.route.split(' - ')[1],
                        })
                      }
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Track Bus →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Info Card */}
        <div className="p-4">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="bg-white p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="text-slate-900 mb-1">Real-time Updates</h4>
                <p className="text-sm text-slate-600">
                  Seat availability is updated in real-time. Book your seat or plan accordingly!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
