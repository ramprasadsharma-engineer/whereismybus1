import { ArrowLeft, Users, TrendingUp, Clock, MapPin, AlertCircle, ThumbsUp } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface CrowdPredictionScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export default function CrowdPredictionScreen({ onNavigate }: CrowdPredictionScreenProps) {
  const { t } = useLanguage();
  const [selectedTime, setSelectedTime] = useState('now');

  const timeSlots = [
    { id: 'now', label: t('time.now') },
    { id: '30min', label: t('time.30min') },
    { id: '1hr', label: t('time.1hr') },
    { id: '2hr', label: t('time.2hr') },
  ];

  const crowdData = [
    {
      busNumber: '335E',
      route: 'Kengeri - Whitefield',
      currentCrowd: 85,
      level: 'High',
      prediction: 'Will remain crowded for next 2 hours',
      peakTime: '8:00 AM - 10:00 AM',
      recommendation: 'Wait for next bus in 15 min (40% crowd)',
      trend: 'increasing',
    },
    {
      busNumber: 'BM5',
      route: 'Silk Board - Majestic',
      currentCrowd: 35,
      level: 'Low',
      prediction: 'Good time to board',
      peakTime: '9:00 AM - 11:00 AM',
      recommendation: 'Best time to travel now',
      trend: 'stable',
    },
    {
      busNumber: 'G4',
      route: 'Hebbal - Electronic City',
      currentCrowd: 60,
      level: 'Medium',
      prediction: 'Crowd will increase in 30 minutes',
      peakTime: '8:30 AM - 10:30 AM',
      recommendation: 'Board now to avoid rush',
      trend: 'increasing',
    },
    {
      busNumber: 'V-335',
      route: 'Vijayanagar - Marathahalli',
      currentCrowd: 20,
      level: 'Low',
      prediction: 'Seats available',
      peakTime: '7:30 AM - 9:30 AM',
      recommendation: 'Excellent time to travel',
      trend: 'decreasing',
    },
  ];

  const getCrowdColor = (level: string) => {
    switch (level) {
      case 'High':
        return {
          bg: 'bg-red-50 dark:bg-red-900/20',
          text: 'text-red-700 dark:text-red-400',
          border: 'border-red-200 dark:border-red-800',
          bar: 'bg-red-500',
          ring: 'ring-red-100 dark:ring-red-900',
        };
      case 'Medium':
        return {
          bg: 'bg-orange-50 dark:bg-orange-900/20',
          text: 'text-orange-700 dark:text-orange-400',
          border: 'border-orange-200 dark:border-orange-800',
          bar: 'bg-orange-500',
          ring: 'ring-orange-100 dark:ring-orange-900',
        };
      case 'Low':
        return {
          bg: 'bg-green-50 dark:bg-green-900/20',
          text: 'text-green-700 dark:text-green-400',
          border: 'border-green-200 dark:border-green-800',
          bar: 'bg-green-500',
          ring: 'ring-green-100 dark:ring-green-900',
        };
      default:
        return {
          bg: 'bg-slate-50 dark:bg-slate-800',
          text: 'text-slate-700 dark:text-slate-300',
          border: 'border-slate-200 dark:border-slate-700',
          bar: 'bg-slate-500',
          ring: 'ring-slate-100 dark:ring-slate-800',
        };
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'increasing') {
      return <span className="text-red-600 dark:text-red-400">↗</span>;
    } else if (trend === 'decreasing') {
      return <span className="text-green-600 dark:text-green-400">↘</span>;
    } else {
      return <span className="text-muted-foreground">→</span>;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => onNavigate('home')}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6" />
              <h1 className="text-xl font-medium">{t('crowd.prediction')}</h1>
            </div>
            <p className="text-sm text-indigo-100">{t('crowd.ai_analysis')}</p>
          </div>
        </div>

        {/* Time Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {timeSlots.map((slot) => (
            <button
              key={slot.id}
              onClick={() => setSelectedTime(slot.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedTime === slot.id
                  ? 'bg-white text-indigo-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {slot.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-b border-indigo-100 dark:border-indigo-900/50">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card rounded-lg p-3 text-center border border-border">
            <div className="text-2xl text-green-600 dark:text-green-400 mb-1">2</div>
            <p className="text-xs text-muted-foreground">{t('crowd.stats.low')}</p>
          </div>
          <div className="bg-card rounded-lg p-3 text-center border border-border">
            <div className="text-2xl text-orange-600 dark:text-orange-400 mb-1">1</div>
            <p className="text-xs text-muted-foreground">{t('crowd.stats.medium')}</p>
          </div>
          <div className="bg-card rounded-lg p-3 text-center border border-border">
            <div className="text-2xl text-red-600 dark:text-red-400 mb-1">1</div>
            <p className="text-xs text-muted-foreground">{t('crowd.stats.high')}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Crowd Predictions */}
        <div className="p-4">
          <h3 className="text-sm text-muted-foreground mb-3 uppercase">{t('crowd.live_predictions')}</h3>
          <div className="space-y-3">
            {crowdData.map((bus, index) => {
              const colors = getCrowdColor(bus.level);

              return (
                <div
                  key={index}
                  className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-3xl">🚌</span>
                      <div className="flex-1">
                        <span className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded text-sm mb-2">
                          {bus.busNumber}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <p className="text-xs text-card-foreground">{bus.route}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(bus.trend)}
                      <span
                        className={`text-xs px-2 py-1 rounded border ${colors.bg} ${colors.text} ${colors.border}`}
                      >
                        {t(`crowd.level.${bus.level.toLowerCase()}`)}
                      </span>
                    </div>
                  </div>

                  {/* Crowd Meter */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-card-foreground">{t('crowd.current_level')}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{bus.currentCrowd}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full transition-all ${colors.bar}`}
                        style={{ width: `${bus.currentCrowd}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Crowd Visualization */}
                  <div className={`rounded-lg p-3 mb-3 ${colors.bg} ${colors.border} border`}>
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className={`w-4 h-4 ${colors.text}`} />
                      <p className={`text-sm ${colors.text}`}>
                        {bus.prediction}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{t('crowd.peak_time')}: {bus.peakTime}</span>
                    </div>
                  </div>

                  {/* Recommendation */}
                  {bus.level === 'Low' ? (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-3">
                      <div className="flex items-start gap-2">
                        <ThumbsUp className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-green-700 dark:text-green-400 mb-1">
                            {bus.recommendation}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-3">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-blue-700 dark:text-blue-400 mb-1">
                            💡 {bus.recommendation}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
                      {t('crowd.view_history')}
                    </button>
                    <button
                      onClick={() =>
                        onNavigate('liveTracking', {
                          busNumber: bus.busNumber,
                          from: bus.route.split(' - ')[0],
                          to: bus.route.split(' - ')[1],
                        })
                      }
                      className="text-sm text-primary hover:text-primary/80"
                    >
                      {t('crowd.track_bus')} →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* How it Works */}
        <div className="p-4">
          <h3 className="text-sm text-muted-foreground mb-3 uppercase">{t('crowd.how_it_works')}</h3>
          <div className="space-y-3">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-white dark:bg-indigo-950 p-2 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-card-foreground font-medium mb-1">{t('crowd.ai_analysis')}</h4>
                  <p className="text-sm text-muted-foreground">
                    {t('crowd.ai_desc')}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-white dark:bg-purple-950 p-2 rounded-lg">
                  <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h4 className="text-card-foreground font-medium mb-1">{t('crowd.real_time')}</h4>
                  <p className="text-sm text-muted-foreground">
                    {t('crowd.real_time_desc')}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-white dark:bg-blue-950 p-2 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="text-card-foreground font-medium mb-1">{t('crowd.smart_recs')}</h4>
                  <p className="text-sm text-muted-foreground">
                    {t('crowd.smart_recs_desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
