import { ArrowLeft, Sparkles, MapPin, Clock, TrendingUp, Zap } from 'lucide-react';
import { useState } from 'react';

interface BusBuddyAIScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export default function BusBuddyAIScreen({ onNavigate }: BusBuddyAIScreenProps) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const aiSuggestions = [
    {
      route: 'BM5 → 335E',
      duration: '45 min',
      changes: '1 change',
      crowdLevel: 'Low',
      confidence: 95,
      tip: 'Fastest route with minimal crowd',
    },
    {
      route: 'G4 Direct',
      duration: '60 min',
      changes: 'Direct',
      crowdLevel: 'Medium',
      confidence: 88,
      tip: 'No changes required',
    },
    {
      route: 'V-335 → BM5',
      duration: '55 min',
      changes: '1 change',
      crowdLevel: 'Low',
      confidence: 82,
      tip: 'Less crowded alternative',
    },
  ];

  const handleGetSuggestions = () => {
    if (from && to) {
      setShowSuggestions(true);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => onNavigate('home')}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              <h1 className="text-xl">Bus Buddy AI</h1>
            </div>
            <p className="text-sm text-purple-100">AI-powered route suggestions</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Input Section */}
        <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="bg-white rounded-lg shadow-md border border-purple-100 p-4">
            <h2 className="text-lg text-slate-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Where do you want to go?
            </h2>

            <div className="space-y-3">
              <div>
                <label className="text-sm text-slate-600 mb-2 block">From</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" />
                  <input
                    type="text"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="Starting location"
                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-300 rounded-lg outline-none focus:border-purple-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-600 mb-2 block">To</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-600" />
                  <input
                    type="text"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="Destination"
                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-300 rounded-lg outline-none focus:border-purple-600 transition-colors"
                  />
                </div>
              </div>

              <button
                onClick={handleGetSuggestions}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>Get AI Suggestions</span>
              </button>
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        {showSuggestions && (
          <div className="p-4">
            <h3 className="text-sm text-slate-600 mb-3">RECOMMENDED ROUTES</h3>
            <div className="space-y-3">
              {aiSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg text-slate-900">{suggestion.route}</span>
                        {index === 0 && (
                          <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-2 py-1 rounded">
                            Best Match
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 flex items-center gap-1">
                        <Zap className="w-4 h-4 text-purple-600" />
                        {suggestion.tip}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="bg-purple-50 rounded-lg p-2 text-center">
                      <Clock className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                      <p className="text-xs text-slate-600">{suggestion.duration}</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-2 text-center">
                      <TrendingUp className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                      <p className="text-xs text-slate-600">{suggestion.changes}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-2 text-center">
                      <span className="text-sm">👥</span>
                      <p className="text-xs text-slate-600">{suggestion.crowdLevel}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-slate-200 rounded-full h-2 w-24">
                        <div
                          className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                          style={{ width: `${suggestion.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-600">{suggestion.confidence}%</span>
                    </div>
                    <button className="text-sm text-purple-600 hover:text-purple-700">
                      Select →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features Info */}
        {!showSuggestions && (
          <div className="p-4">
            <h3 className="text-sm text-slate-600 mb-3">AI FEATURES</h3>
            <div className="space-y-3">
              <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-white p-2 rounded-lg">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 mb-1">Smart Route Planning</h4>
                    <p className="text-sm text-slate-600">
                      AI analyzes traffic, crowd levels, and weather to suggest optimal routes
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-white p-2 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 mb-1">Real-time Predictions</h4>
                    <p className="text-sm text-slate-600">
                      Get accurate arrival times based on current traffic conditions
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-white p-2 rounded-lg">
                    <Zap className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 mb-1">Personalized Suggestions</h4>
                    <p className="text-sm text-slate-600">
                      Learn your preferences and provide tailored recommendations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
