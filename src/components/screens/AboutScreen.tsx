import { ArrowLeft, Mail, Globe, Shield, Heart } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface AboutScreenProps {
  onNavigate: (screen: string) => void;
}

export default function AboutScreen({ onNavigate }: AboutScreenProps) {
  const { t } = useLanguage();

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
          <h1 className="text-xl font-medium">{t('settings.about')}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* App Info */}
        <div className="p-6 text-center border-b border-border">
          <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg text-white">
            <span className="text-5xl">🚌</span>
          </div>
          <h2 className="text-2xl font-medium mb-2">{t('about.app_name')}</h2>
          <p className="text-muted-foreground mb-1">{t('about.track_realtime')}</p>
          <p className="text-sm text-muted-foreground/70">{t('settings.version')} 1.0.0</p>
        </div>

        {/* Description */}
        <div className="p-6 border-b border-border">
          <p className="text-foreground leading-relaxed">
            {t('about.desc')}
          </p>
        </div>

        {/* Features */}
        <div className="p-6 border-b border-border">
          <h3 className="text-sm text-muted-foreground mb-4 uppercase">{t('about.key_features')}</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-lg">🚌</span>
              </div>
              <div>
                <p className="text-foreground font-medium">{t('about.feature.tracking')}</p>
                <p className="text-sm text-muted-foreground">{t('about.feature.tracking_desc')}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-lg">🤖</span>
              </div>
              <div>
                <p className="text-foreground font-medium">{t('about.feature.ai')}</p>
                <p className="text-sm text-muted-foreground">{t('about.feature.ai_desc')}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-lg">💺</span>
              </div>
              <div>
                <p className="text-foreground font-medium">{t('about.feature.seats')}</p>
                <p className="text-sm text-muted-foreground">{t('about.feature.seats_desc')}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-50 dark:bg-orange-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-lg">🌤️</span>
              </div>
              <div>
                <p className="text-foreground font-medium">{t('about.feature.weather')}</p>
                <p className="text-sm text-muted-foreground">{t('about.feature.weather_desc')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="p-6 border-b border-border">
          <h3 className="text-sm text-muted-foreground mb-4 uppercase">{t('about.contact')}</h3>
          <div className="space-y-3">
            <a
              href="mailto:support@whereismybus.com"
              className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors"
            >
              <Mail className="w-5 h-5 text-primary" />
              <span className="text-card-foreground">support@whereismybus.com</span>
            </a>
            <a
              href="https://whereismybus.com"
              className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors"
            >
              <Globe className="w-5 h-5 text-primary" />
              <span className="text-card-foreground">www.whereismybus.com</span>
            </a>
          </div>
        </div>

        {/* Legal */}
        <div className="p-6">
          <div className="space-y-2">
            <button className="w-full text-left p-3 hover:bg-accent rounded-lg transition-colors flex items-center gap-3 text-card-foreground">
              <Shield className="w-5 h-5 text-muted-foreground" />
              <span>{t('about.privacy')}</span>
            </button>
            <button className="w-full text-left p-3 hover:bg-accent rounded-lg transition-colors flex items-center gap-3 text-card-foreground">
              <Shield className="w-5 h-5 text-muted-foreground" />
              <span>{t('about.terms')}</span>
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              {t('about.made_with')} <Heart className="w-4 h-4 text-red-500 fill-red-500" /> {t('about.in_india')}
            </p>
            <p className="text-xs text-muted-foreground/70 mt-2">© 2024 WhereIsMyBus. {t('about.rights')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
