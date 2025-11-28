import { ArrowLeft, CloudRain, Sun, Cloud, Wind, Droplets, MapPin } from 'lucide-react';
import { useState } from 'react';

interface WeatherRoutesScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export default function WeatherRoutesScreen({ onNavigate }: WeatherRoutesScreenProps) {
  const [selectedCondition, setSelectedCondition] = useState('All');

  const weatherConditions = [
    { id: 'All', label: 'All', icon: Sun },
    { id: 'Sunny', label: 'Sunny', icon: Sun },
    { id: 'Rainy', label: 'Rainy', icon: CloudRain },
    { id: 'Cloudy', label: 'Cloudy', icon: Cloud },
  ];

  const routes = [
    {
      number: '335E',
      route: 'Kengeri - Whitefield',
      weather: 'Rainy',
      condition: 'Heavy Rain Expected',
      recommendation: 'Take covered route via Ring Road',
      delay: '+15 min',
      icon: CloudRain,
      severity: 'high',
    },
    {
      number: 'BM5',
      route: 'Silk Board - Majestic',
      weather: 'Sunny',
      condition: 'Clear Weather',
      recommendation: 'Normal route recommended',
      delay: 'On Time',
      icon: Sun,
      severity: 'low',
    },
    {
      number: 'G4',
      route: 'Hebbal - Electronic City',
      weather: 'Cloudy',
      condition: 'Light Drizzle Possible',
      recommendation: 'Carry umbrella, minor delays expected',
      delay: '+5 min',
      icon: Cloud,
      severity: 'medium',
    },
    {
      number: 'V-335',
      route: 'Vijayanagar - Marathahalli',
      weather: 'Rainy',
      condition: 'Waterlogging on Route',
      recommendation: 'Alternative route via Outer Ring Road',
      delay: '+20 min',
      icon: Droplets,
      severity: 'high',
    },
  ];

  const filteredRoutes =
    selectedCondition === 'All'
      ? routes
      : routes.filter((route) => route.weather === selectedCondition);

  const getSeverityColors = (severity: string) => {
    switch (severity) {
      case 'high':
        return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };
      case 'medium':
        return { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' };
      case 'low':
        return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' };
      default:
        return { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' };
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => onNavigate('home')}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <CloudRain className="w-6 h-6" />
              <h1 className="text-xl">Weather Aware Routes</h1>
            </div>
            <p className="text-sm text-orange-100">Plan routes based on weather</p>
          </div>
        </div>

        {/* Weather Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {weatherConditions.map((condition) => {
            const Icon = condition.icon;
            return (
              <button
                key={condition.id}
                onClick={() => setSelectedCondition(condition.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCondition === condition.id
                    ? 'bg-white text-orange-600'
                    : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{condition.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Weather */}
      <div className="p-4 bg-gradient-to-br from-orange-50 to-yellow-50 border-b border-orange-100">
        <div className="bg-white rounded-lg border border-orange-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg text-slate-900 mb-1">Current Weather</h3>
              <p className="text-sm text-slate-600">Bangalore City</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-2">🌤️</div>
              <p className="text-2xl text-slate-900">28°C</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-200">
            <div className="text-center">
              <Wind className="w-5 h-5 text-slate-600 mx-auto mb-1" />
              <p className="text-xs text-slate-600">12 km/h</p>
            </div>
            <div className="text-center">
              <Droplets className="w-5 h-5 text-slate-600 mx-auto mb-1" />
              <p className="text-xs text-slate-600">65%</p>
            </div>
            <div className="text-center">
              <CloudRain className="w-5 h-5 text-slate-600 mx-auto mb-1" />
              <p className="text-xs text-slate-600">40%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Routes List */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-sm text-slate-600 mb-3">ROUTE RECOMMENDATIONS</h3>
        <div className="space-y-3">
          {filteredRoutes.map((route, index) => {
            const Icon = route.icon;
            const colors = getSeverityColors(route.severity);

            return (
              <div
                key={index}
                className={`bg-white border rounded-lg p-4 hover:shadow-md transition-shadow ${colors.border}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-3xl">🚌</span>
                    <div className="flex-1">
                      <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded text-sm mb-2">
                        {route.number}
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        <p className="text-xs text-slate-600">{route.route}</p>
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded border ${colors.bg} ${colors.text} ${colors.border}`}>
                    <Icon className="w-3 h-3" />
                    <span>{route.weather}</span>
                  </div>
                </div>

                {/* Weather Info */}
                <div className={`rounded-lg p-3 mb-3 ${colors.bg}`}>
                  <div className="flex items-start gap-2 mb-2">
                    <Icon className={`w-4 h-4 ${colors.text} mt-0.5`} />
                    <div className="flex-1">
                      <p className={`text-sm ${colors.text} mb-1`}>{route.condition}</p>
                      <p className="text-sm text-slate-700">{route.recommendation}</p>
                    </div>
                  </div>
                </div>

                {/* Delay Info */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600">Expected Delay:</span>
                    <span
                      className={`text-sm ${
                        route.delay === 'On Time' ? 'text-green-600' : 'text-orange-600'
                      }`}
                    >
                      {route.delay}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      onNavigate('liveTracking', {
                        busNumber: route.number,
                        from: route.route.split(' - ')[0],
                        to: route.route.split(' - ')[1],
                      })
                    }
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Track →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Weather Alert */}
        <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="bg-white p-2 rounded-lg">
              <CloudRain className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h4 className="text-slate-900 mb-1">Weather Alert</h4>
              <p className="text-sm text-slate-600">
                Heavy rainfall expected between 2 PM - 5 PM. Plan your journey accordingly and avoid waterlogged routes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
