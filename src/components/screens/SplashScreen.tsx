export default function SplashScreen() {
  return (
    <div className="h-screen w-full bg-background flex flex-col items-center justify-center relative transition-colors duration-300">
      {/* App Logo */}
      <div className="mb-8">
        <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center shadow-lg text-white">
          <span className="text-5xl">🚌</span>
        </div>
      </div>

      {/* App Name */}
      <h1 className="text-3xl font-medium text-foreground mb-2">
        WhereIsMyBus
      </h1>

      {/* Tagline */}
      <p className="text-muted-foreground">
        Track your bus in real-time
      </p>

      {/* Loading indicator */}
      <div className="absolute bottom-16">
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}
