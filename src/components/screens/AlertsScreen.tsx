import { ArrowLeft, Bell, BellOff, Clock, MapPin } from 'lucide-react';

interface AlertsScreenProps {
  onNavigate: (screen: string) => void;
}

export default function AlertsScreen({ onNavigate }: AlertsScreenProps) {
  const alerts = [
    {
      id: 1,
      busNumber: '335E',
      stop: 'Jayanagar 4th Block',
      time: '5 min',
      active: true,
      type: 'arrival',
    },
    {
      id: 2,
      busNumber: 'BM5',
      stop: 'Majestic',
      time: '10 min',
      active: true,
      type: 'arrival',
    },
    {
      id: 3,
      busNumber: 'G4',
      stop: 'Electronic City',
      time: 'Delayed by 15 min',
      active: false,
      type: 'delay',
    },
  ];

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl">Alerts & Notifications</h1>
            <p className="text-sm text-blue-100">{alerts.filter(a => a.active).length} active alerts</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-white border rounded-lg p-4 ${
                alert.active
                  ? 'border-blue-200 bg-blue-50'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`p-2 rounded-lg ${
                    alert.active ? 'bg-blue-100' : 'bg-slate-100'
                  }`}>
                    {alert.active ? (
                      <Bell className="w-5 h-5 text-blue-600" />
                    ) : (
                      <BellOff className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded text-sm mb-2">
                      {alert.busNumber}
                    </span>
                    <div className="flex items-center gap-2 mt-2">
                      <MapPin className="w-4 h-4 text-slate-500" />
                      <p className="text-sm text-slate-700">{alert.stop}</p>
                    </div>
                  </div>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  {alert.active ? 'Disable' : 'Enable'}
                </button>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-200">
                <Clock className="w-4 h-4 text-slate-500" />
                <span className={`text-sm ${
                  alert.type === 'delay' ? 'text-red-600' : 'text-slate-700'
                }`}>
                  {alert.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Alert Button */}
        <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
          <Bell className="w-5 h-5" />
          <span>Set New Alert</span>
        </button>
      </div>
    </div>
  );
}
