import { ArrowLeft, Star, MapPin, Clock, Trash2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface FavoritesScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export default function FavoritesScreen({ onNavigate }: FavoritesScreenProps) {
  const { t } = useLanguage();
  const favorites = [
    {
      id: 1,
      busNumber: '335E',
      route: 'Kengeri - Whitefield',
      frequency: 'Every 15 min',
      isFavorite: true,
    },
    {
      id: 2,
      busNumber: 'BM5',
      route: 'Silk Board - Majestic',
      frequency: 'Every 10 min',
      isFavorite: true,
    },
    {
      id: 3,
      busNumber: 'G4',
      route: 'Hebbal - Electronic City',
      frequency: 'Every 20 min',
      isFavorite: true,
    },
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
          <h1 className="text-xl font-medium">{t('nav.favorites')}</h1>
          <p className="text-sm opacity-90">{favorites.length} {t('favorites.saved_routes')}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {favorites.length > 0 ? (
          <div className="space-y-3">
            {favorites.map((fav) => (
              <div
                key={fav.id}
                className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-3xl">🚌</span>
                    <div className="flex-1">
                      <span className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded text-sm mb-2">
                        {fav.busNumber}
                      </span>
                      <p className="text-sm text-card-foreground">{fav.route}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition-colors">
                      <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                    </button>
                    <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{fav.frequency.replace('Every', t('favorites.every'))}</span>
                  </div>
                  <button
                    onClick={() =>
                      onNavigate('liveTracking', {
                        busNumber: fav.busNumber,
                        from: fav.route.split(' - ')[0],
                        to: fav.route.split(' - ')[1],
                      })
                    }
                    className="text-sm text-primary hover:text-primary/80"
                  >
                    {t('favorites.track_now')} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="text-xl text-foreground mb-2">{t('favorites.no_favorites')}</h3>
            <p className="text-muted-foreground mb-6">
              {t('favorites.no_favorites_desc')}
            </p>
            <button
              onClick={() => onNavigate('home')}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              {t('favorites.explore_routes')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
