import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsComplete(true);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-all duration-500 ${
        isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ 
        transform: isComplete ? 'scale(1.1)' : 'scale(1)',
      }}
    >
      {/* Logo Animation - Responsive sizing */}
      <div className="mb-4 sm:mb-6 lg:mb-8 relative">
        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent animate-pulse">
          KaushalHub
        </div>
        <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-blue-600/20 to-teal-600/20 blur-lg sm:blur-xl rounded-full animate-ping"></div>
      </div>

      {/* Progress Bar - Responsive width */}
      <div className="w-48 sm:w-56 lg:w-64 xl:w-72 h-1 bg-muted rounded-full overflow-hidden mx-4">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-teal-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Loading Text - Responsive sizing */}
      <div className="mt-3 sm:mt-4 lg:mt-5 text-xs sm:text-sm lg:text-base text-muted-foreground animate-pulse px-4 text-center">
        Loading amazing content...
      </div>

      {/* Floating Particles - Responsive count and size */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(typeof window !== 'undefined' && window.innerWidth < 640 ? 12 : 
                  window.innerWidth < 1024 ? 16 : 20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-500/30 animate-bounce"
            style={{
              width: typeof window !== 'undefined' && window.innerWidth < 640 ? '2px' : '3px',
              height: typeof window !== 'undefined' && window.innerWidth < 640 ? '2px' : '3px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Additional decorative elements for larger screens */}
      <div className="hidden lg:block absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-4 h-4 border-2 border-blue-400/30 rounded-full animate-spin"
          style={{
            left: '10%',
            top: '20%',
            animationDuration: '8s',
          }}
        />
        <div 
          className="absolute w-3 h-3 border-2 border-teal-400/30 rounded-full animate-spin"
          style={{
            right: '15%',
            bottom: '25%',
            animationDuration: '6s',
            animationDirection: 'reverse',
          }}
        />
      </div>
    </div>
  );
}