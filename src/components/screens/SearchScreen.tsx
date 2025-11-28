import { ArrowLeft, Search, Bus, Clock } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface SearchScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export default function SearchScreen({ onNavigate }: SearchScreenProps) {
  const [busNumber, setBusNumber] = useState('');

  const recentSearches = [
    { number: 'KA-01-AB-1234', route: 'BM5 - Silk Board to Majestic', time: '2 hours ago' },
    { number: 'KA-01-CD-5678', route: '335E - Kengeri to Whitefield', time: '1 day ago' },
    { number: 'KA-02-EF-9012', route: 'G4 - Hebbal to Electronic City', time: '2 days ago' },
  ];

  const handleSearch = () => {
    if (busNumber.trim()) {
      onNavigate('tracking', busNumber);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            <ArrowLeft className="w-6 h-6 text-slate-700" />
          </button>
          <h1 className="text-xl text-slate-900">Where is My Bus?</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {/* Bus Icon and Subtitle */}
        <div className="text-center mb-8">
          <div className="text-7xl mb-4">🚌</div>
          <p className="text-slate-600 px-4">
            Track your bus in real-time by entering the bus number
          </p>
        </div>

        {/* Search Input */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-2 bg-white border-2 border-slate-200 rounded-lg px-4 py-3 focus-within:border-blue-600 transition-colors">
            <Bus className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={busNumber}
              onChange={(e) => setBusNumber(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Enter bus number (e.g., KA-01-AB-1234)"
              className="flex-1 outline-none text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <button
            onClick={handleSearch}
            className="w-full bg-blue-600 text-white rounded-lg px-6 py-4 flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Search className="w-5 h-5" />
            <span>Search Bus</span>
          </button>
        </div>

        {/* Recent Searches */}
        <div className="mb-8">
          <h2 className="text-lg text-slate-900 mb-4">Recent Searches</h2>
          <div className="space-y-3">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => onNavigate('tracking', search.number)}
                className="w-full bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition-shadow text-left"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <Bus className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-slate-900">{search.number}</p>
                      <p className="text-sm text-slate-600">{search.route}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500 mt-2">
                  <Clock className="w-3 h-3" />
                  <span>{search.time}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Illustration */}
        <div className="mt-8 rounded-xl overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1568600559840-0d34bbd37f0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXMlMjBpbGx1c3RyYXRpb24lMjBtb2Rlcm58ZW58MXx8fHwxNzY0MzUwNjI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Bus illustration"
            className="w-full h-48 object-cover opacity-60"
          />
        </div>
      </div>
    </div>
  );
}
