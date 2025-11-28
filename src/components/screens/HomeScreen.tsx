import { useState } from 'react';
import { Menu, Search, ArrowRightLeft, Clock, MapPin, X, Sparkles, Users, CloudRain, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface HomeScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [fromStop, setFromStop] = useState('');
  const [toStop, setToStop] = useState('');
  const [busNumber, setBusNumber] = useState('');

  const recentSearches = [
    { busNumber: '335E', route: 'Kengeri - Whitefield', time: '2 hours ago' },
    { busNumber: 'BM5', route: 'Silk Board - Majestic', time: '1 day ago' },
    { busNumber: 'G4', route: 'Hebbal - Electronic City', time: '3 days ago' },
  ];

  const categories = [
    {
      id: 'crowdPrediction',
      title: t('crowd.prediction'),
      description: 'AI-powered crowd forecasting',
      icon: TrendingUp,
      gradient: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      textColor: 'text-indigo-700 dark:text-indigo-300',
      borderColor: 'border-indigo-200 dark:border-indigo-800',
      featured: true,
    },
    {
      id: 'busBuddyAI',
      title: t('bus.buddy'),
      description: 'Get smart route suggestions',
      icon: Sparkles,
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-700 dark:text-purple-300',
      borderColor: 'border-purple-200 dark:border-purple-800',
    },
    {
      id: 'seatVacancy',
      title: t('seat.vacancy'),
      description: 'Check available seats',
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-700 dark:text-blue-300',
      borderColor: 'border-blue-200 dark:border-blue-800',
    },
    {
      id: 'weatherRoutes',
      title: t('weather.routes'),
      description: 'Routes based on weather',
      icon: CloudRain,
      gradient: 'from-orange-500 to-yellow-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      textColor: 'text-orange-700 dark:text-orange-300',
      borderColor: 'border-orange-200 dark:border-orange-800',
    },
  ];

  const handleSwap = () => {
    const temp = fromStop;
    setFromStop(toStop);
    setToStop(temp);
  };

  const handleSearch = () => {
    if (busNumber || (fromStop && toStop)) {
      onNavigate('liveTracking', {
        busNumber: busNumber || 'BM5',
        from: fromStop || 'Silk Board',
        to: toStop || 'Majestic',
      });
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-medium">{t('app.name')}</h1>
          <button className="p-2 hover:bg-blue-700 rounded-lg transition-colors">
            <Search className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Search Card */}
        <div className="p-4">
          <div className="bg-card text-card-foreground rounded-lg shadow-md border border-border p-4">
            <h2 className="text-lg font-medium mb-4">{t('search.track_your_bus')}</h2>

            {/* Bus Number Input */}
            <div className="mb-4">
              <label className="text-sm text-muted-foreground mb-2 block">{t('search.bus_number')}</label>
              <div className="relative">
                <input
                  type="text"
                  value={busNumber}
                  onChange={(e) => setBusNumber(e.target.value)}
                  placeholder={t('search.bus_number_placeholder')}
                  className="w-full px-4 py-3 bg-input-background border-2 border-input rounded-lg outline-none focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 h-px bg-border"></div>
              <span className="text-sm text-muted-foreground">{t('search.or')}</span>
              <div className="flex-1 h-px bg-border"></div>
            </div>

            {/* From Stop */}
            <div className="mb-3">
              <label className="text-sm text-muted-foreground mb-2 block">{t('search.from')}</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" />
                <input
                  type="text"
                  value={fromStop}
                  onChange={(e) => setFromStop(e.target.value)}
                  placeholder={t('search.from_placeholder')}
                  className="w-full pl-10 pr-4 py-3 bg-input-background border-2 border-input rounded-lg outline-none focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center -my-2 relative z-10">
              <button
                onClick={handleSwap}
                className="bg-card border-2 border-border p-2 rounded-full hover:bg-accent transition-colors"
              >
                <ArrowRightLeft className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* To Stop */}
            <div className="mb-4">
              <label className="text-sm text-muted-foreground mb-2 block">{t('search.to')}</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-destructive" />
                <input
                  type="text"
                  value={toStop}
                  onChange={(e) => setToStop(e.target.value)}
                  placeholder={t('search.to_placeholder')}
                  className="w-full pl-10 pr-4 py-3 bg-input-background border-2 border-input rounded-lg outline-none focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              {t('search.button')}
            </button>
          </div>
        </div>

        {/* Categories Section */}
        <div className="px-4 pb-4">
          <h3 className="text-sm text-muted-foreground mb-3 uppercase">{t('smart.features')}</h3>
          <div className="grid grid-cols-1 gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => onNavigate(category.id)}
                  className={`bg-card rounded-lg border p-4 hover:shadow-md transition-all text-left group relative overflow-hidden ${
                    category.featured ? 'border-indigo-300 dark:border-indigo-700 shadow-sm' : 'border-border'
                  }`}
                >
                  {category.featured && (
                    <div className="absolute top-2 right-2">
                      <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs px-2 py-1 rounded">
                        ⭐ {t('smart.featured')}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    <div className={`${category.bgColor} p-3 rounded-xl`}>
                      <Icon className={`w-6 h-6 ${category.textColor}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-card-foreground font-medium mb-1">{category.title}</h4>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                    <div className="text-muted-foreground group-hover:text-primary transition-colors">
                      →
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Searches */}
        <div className="px-4 pb-6">
          <h3 className="text-sm text-muted-foreground mb-3 uppercase">{t('recent.searches')}</h3>
          <div className="space-y-2">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() =>
                  onNavigate('liveTracking', {
                    busNumber: search.busNumber,
                    from: search.route.split(' - ')[0],
                    to: search.route.split(' - ')[1],
                  })
                }
                className="w-full bg-card rounded-lg border border-border p-4 hover:bg-accent/50 transition-colors text-left"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🚌</span>
                    <div>
                      <span className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded text-sm mb-1">
                        {search.busNumber}
                      </span>
                      <p className="text-sm text-card-foreground">{search.route}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                  <Clock className="w-3 h-3" />
                  <span>{search.time}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Side Drawer Menu */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          ></div>
          <div className="fixed top-0 left-0 bottom-0 w-80 bg-card z-50 shadow-2xl transition-transform duration-300 border-r border-border">
            <div className="bg-blue-600 text-white p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium">{t('nav.menu')}</h2>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 hover:bg-blue-700 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <p className="text-sm opacity-90">{t('nav.welcome')}</p>
                  <p className="font-medium">{t('nav.traveler')}</p>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-1">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onNavigate('home');
                }}
                className="w-full text-left px-4 py-3 hover:bg-accent rounded-lg transition-colors flex items-center gap-3 text-card-foreground"
              >
                <span className="text-xl">🏠</span>
                <span>{t('nav.home')}</span>
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onNavigate('crowdPrediction');
                }}
                className="w-full text-left px-4 py-3 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors flex items-center gap-3 border-l-4 border-indigo-600"
              >
                <span className="text-xl">📊</span>
                <div className="flex-1 flex items-center">
                  <span className="text-card-foreground">{t('crowd.prediction')}</span>
                  <span className="ml-2 text-xs bg-indigo-600 text-white px-2 py-0.5 rounded">{t('smart.new')}</span>
                </div>
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onNavigate('routeSearch');
                }}
                className="w-full text-left px-4 py-3 hover:bg-accent rounded-lg transition-colors flex items-center gap-3 text-card-foreground"
              >
                <span className="text-xl">🗺️</span>
                <span>{t('nav.all_routes')}</span>
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onNavigate('favorites');
                }}
                className="w-full text-left px-4 py-3 hover:bg-accent rounded-lg transition-colors flex items-center gap-3 text-card-foreground"
              >
                <span className="text-xl">⭐</span>
                <span>{t('nav.favorites')}</span>
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onNavigate('alerts');
                }}
                className="w-full text-left px-4 py-3 hover:bg-accent rounded-lg transition-colors flex items-center gap-3 text-card-foreground"
              >
                <span className="text-xl">🔔</span>
                <span>{t('nav.alerts')}</span>
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onNavigate('about');
                }}
                className="w-full text-left px-4 py-3 hover:bg-accent rounded-lg transition-colors flex items-center gap-3 text-card-foreground"
              >
                <span className="text-xl">ℹ️</span>
                <span>{t('settings.about')}</span>
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onNavigate('settings');
                }}
                className="w-full text-left px-4 py-3 hover:bg-accent rounded-lg transition-colors flex items-center gap-3 text-card-foreground"
              >
                <span className="text-xl">⚙️</span>
                <span>{t('nav.settings')}</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
