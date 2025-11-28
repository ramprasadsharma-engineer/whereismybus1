import { ArrowLeft, MapPin, Clock, Navigation, Bell, Share2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface LiveTrackingScreenProps {
  route: any;
  onNavigate: (screen: string) => void;
}

export default function LiveTrackingScreen({ route, onNavigate }: LiveTrackingScreenProps) {
  const { t } = useLanguage();
  const stops = [
    { name: 'Silk Board', time: '06:00 AM', status: 'completed', delay: '' },
    { name: 'BTM Layout', time: '06:08 AM', status: 'completed', delay: '' },
    { name: 'Jayanagar 4th Block', time: '06:15 AM', status: 'current', delay: t('status.arriving') },
    { name: 'Lalbagh', time: '06:22 AM', status: 'upcoming', delay: '' },
    { name: 'KR Market', time: '06:30 AM', status: 'upcoming', delay: '' },
    { name: 'Majestic', time: '06:40 AM', status: 'upcoming', delay: '' },
  ];

  return (
    <div className="h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
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
            <h1 className="text-xl font-medium">{t('live.tracking')}</h1>
            <p className="text-sm opacity-90">{t('bus.n')} {route?.busNumber || 'BM5'}</p>
          </div>
          <button className="p-2 hover:bg-blue-700 rounded-lg transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Map Preview */}
      <div className="relative h-48 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 border-b border-border">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-2 animate-pulse">🚌</div>
            <p className="text-sm text-muted-foreground">{t('current.location')}</p>
            <p className="text-xs text-muted-foreground/80 mt-1">Near Jayanagar 4th Block</p>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <button className="bg-card px-3 py-2 rounded-lg shadow-md text-sm text-card-foreground hover:bg-accent flex items-center gap-1 border border-border">
            <Navigation className="w-4 h-4" />
            {t('view.on.map')}
          </button>
        </div>
      </div>

      {/* Bus Info Card */}
      <div className="bg-accent/50 border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{t('route.label')}</p>
            <p className="text-foreground font-medium">
              {route?.from || 'Silk Board'} → {route?.to || 'Majestic'}
            </p>
          </div>
          <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs border border-green-200 dark:border-green-800">
            {t('status.on_time')}
          </div>
        </div>
        <div className="flex items-center gap-6 mt-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground">{t('status.eta')}: 5 min</span>
          </div>
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground">{t('status.speed')}: 25 km/h</span>
          </div>
        </div>
      </div>

      {/* Stops Timeline */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">{t('route.timeline')}</h2>
          <button className="text-sm text-primary hover:text-primary/80">{t('view.all.stops')}</button>
        </div>

        <div className="relative">
          {stops.map((stop, index) => (
            <div key={index} className="flex gap-4 pb-8 last:pb-0">
              {/* Timeline */}
              <div className="flex flex-col items-center">
                {/* Circle */}
                <div
                  className={`w-3 h-3 rounded-full border-2 ${
                    stop.status === 'completed'
                      ? 'bg-green-500 border-green-500'
                      : stop.status === 'current'
                      ? 'bg-primary border-primary ring-4 ring-primary/20'
                      : 'bg-card border-muted-foreground'
                  }`}
                ></div>
                {/* Line */}
                {index < stops.length - 1 && (
                  <div
                    className={`w-0.5 h-full mt-1 ${
                      stop.status === 'completed' ? 'bg-green-500' : 'bg-border'
                    }`}
                  ></div>
                )}
              </div>

              {/* Stop Info */}
              <div className="flex-1 pb-2">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex-1">
                    <p
                      className={`${
                        stop.status === 'current'
                          ? 'text-primary font-medium'
                          : stop.status === 'completed'
                          ? 'text-muted-foreground'
                          : 'text-foreground'
                      }`}
                    >
                      {stop.name}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{stop.time}</p>
                  </div>
                  {stop.status === 'current' && (
                    <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                      {stop.delay}
                    </span>
                  )}
                  {stop.status === 'completed' && (
                    <span className="text-green-600 dark:text-green-400 text-xs">✓ {t('status.passed')}</span>
                  )}
                </div>
                {stop.status === 'current' && (
                  <div className="mt-2 bg-accent border border-border rounded-lg p-3">
                    <p className="text-sm text-foreground">
                      🚌 {t('bus.approaching')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View Directions Button */}
        <div className="mt-6 flex justify-center">
          <a
            href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
              route?.from || 'Silk Board, Bangalore'
            )}&destination=${encodeURIComponent(
              route?.to || 'Majestic, Bangalore'
            )}&travelmode=transit`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card border-2 border-primary text-primary px-6 py-3 rounded-full hover:bg-accent transition-colors flex items-center gap-2 shadow-md"
          >
            <MapPin className="w-5 h-5 text-primary" />
            <span>{t('view.directions')}</span>
          </a>
        </div>
      </div>

      {/* Action Button */}
      <div className="border-t border-border p-4 bg-card">
        <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
          <Bell className="w-5 h-5" />
          <span>{t('alert.set')}</span>
        </button>
      </div>
    </div>
  );
}
