import { ArrowLeft, Bell, MapPin, Moon, Globe, Info, ChevronRight, Check } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage, Language } from '../../contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface SettingsScreenProps {
  onNavigate: (screen: string) => void;
}

export default function SettingsScreen({ onNavigate }: SettingsScreenProps) {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(true);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const languages: { code: Language; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
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
          <h1 className="text-xl font-medium">{t('nav.settings')}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Preferences Section */}
        <div className="p-4 border-b border-border">
          <h2 className="text-sm text-muted-foreground mb-3 uppercase">{t('settings.preferences')}</h2>
          
          <div className="space-y-2">
            {/* Notifications */}
            <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="text-card-foreground">{t('settings.notifications')}</span>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  notifications ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-background rounded-full shadow-md transition-transform ${
                    notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                ></div>
              </button>
            </div>

            {/* Location */}
            <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <span className="text-card-foreground">{t('settings.location')}</span>
              </div>
              <button
                onClick={() => setLocation(!location)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  location ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-background rounded-full shadow-md transition-transform ${
                    location ? 'translate-x-6' : 'translate-x-1'
                  }`}
                ></div>
              </button>
            </div>

            {/* Dark Mode */}
            <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-muted-foreground" />
                <span className="text-card-foreground">{t('settings.darkMode')}</span>
              </div>
              <button
                onClick={toggleTheme}
                className={`w-12 h-6 rounded-full transition-colors ${
                  theme === 'dark' ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-background rounded-full shadow-md transition-transform ${
                    theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                ></div>
              </button>
            </div>
          </div>
        </div>

        {/* General Section */}
        <div className="p-4 border-b border-border">
          <h2 className="text-sm text-muted-foreground mb-3 uppercase">{t('settings.general')}</h2>
          
          <div className="space-y-2">
            {/* Language Selector */}
            <Dialog open={isLanguageOpen} onOpenChange={setIsLanguageOpen}>
              <DialogTrigger asChild>
                <button className="w-full flex items-center justify-between bg-card border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-muted-foreground" />
                    <span className="text-card-foreground">{t('settings.language')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{t(`language.${language}`)}</span>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </button>
              </DialogTrigger>
              <DialogContent className="w-[90%] rounded-xl">
                <DialogHeader>
                  <DialogTitle>{t('language.select')}</DialogTitle>
                </DialogHeader>
                <div className="space-y-2 mt-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLanguageOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border ${
                        language === lang.code
                          ? 'bg-primary/10 border-primary text-primary'
                          : 'bg-card border-border text-card-foreground hover:bg-accent'
                      }`}
                    >
                      <span>{lang.name}</span>
                      {language === lang.code && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>

            <button
              onClick={() => onNavigate('about')}
              className="w-full flex items-center justify-between bg-card border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-muted-foreground" />
                <span className="text-card-foreground">{t('settings.about')}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* App Info */}
        <div className="p-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 text-white">
              <span className="text-3xl">🚌</span>
            </div>
            <p className="text-sm text-muted-foreground">{t('app.name')}</p>
            <p className="text-xs text-muted-foreground/70 mt-1">{t('settings.version')} 1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
