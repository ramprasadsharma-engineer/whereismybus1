import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import SplashScreen from './components/screens/SplashScreen';
import HomeScreen from './components/screens/HomeScreen';
import LiveTrackingScreen from './components/screens/LiveTrackingScreen';
import RouteSearchScreen from './components/screens/RouteSearchScreen';
import FavoritesScreen from './components/screens/FavoritesScreen';
import AlertsScreen from './components/screens/AlertsScreen';
import SettingsScreen from './components/screens/SettingsScreen';
import AboutScreen from './components/screens/AboutScreen';
import BusBuddyAIScreen from './components/screens/BusBuddyAIScreen';
import SeatVacancyScreen from './components/screens/SeatVacancyScreen';
import WeatherRoutesScreen from './components/screens/WeatherRoutesScreen';
import CrowdPredictionScreen from './components/screens/CrowdPredictionScreen';

type Screen = 
  | 'splash' 
  | 'home' 
  | 'liveTracking' 
  | 'routeSearch'
  | 'favorites'
  | 'alerts'
  | 'settings'
  | 'about'
  | 'busBuddyAI'
  | 'seatVacancy'
  | 'weatherRoutes'
  | 'crowdPrediction';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [selectedRoute, setSelectedRoute] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen('home');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigation = (screen: Screen, data?: any) => {
    if (data) {
      setSelectedRoute(data);
    }
    setCurrentScreen(screen);
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-slate-50 dark:bg-background transition-colors duration-300">
          <div className="max-w-md mx-auto bg-white dark:bg-card min-h-screen shadow-2xl relative overflow-hidden transition-colors duration-300">
            {currentScreen === 'splash' && <SplashScreen />}
            {currentScreen === 'home' && <HomeScreen onNavigate={handleNavigation} />}
            {currentScreen === 'liveTracking' && (
              <LiveTrackingScreen route={selectedRoute} onNavigate={handleNavigation} />
            )}
            {currentScreen === 'routeSearch' && (
              <RouteSearchScreen onNavigate={handleNavigation} />
            )}
            {currentScreen === 'favorites' && <FavoritesScreen onNavigate={handleNavigation} />}
            {currentScreen === 'alerts' && <AlertsScreen onNavigate={handleNavigation} />}
            {currentScreen === 'settings' && <SettingsScreen onNavigate={handleNavigation} />}
            {currentScreen === 'about' && <AboutScreen onNavigate={handleNavigation} />}
            {currentScreen === 'busBuddyAI' && <BusBuddyAIScreen onNavigate={handleNavigation} />}
            {currentScreen === 'seatVacancy' && <SeatVacancyScreen onNavigate={handleNavigation} />}
            {currentScreen === 'weatherRoutes' && <WeatherRoutesScreen onNavigate={handleNavigation} />}
            {currentScreen === 'crowdPrediction' && <CrowdPredictionScreen onNavigate={handleNavigation} />}
          </div>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
