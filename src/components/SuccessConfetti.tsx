import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface SuccessConfettiProps {
  isVisible: boolean;
  onComplete?: () => void;
}

export function SuccessConfetti({ isVisible, onComplete }: SuccessConfettiProps) {
  const [confettiPieces, setConfettiPieces] = useState<Array<{
    id: number;
    x: number;
    y: number;
    rotation: number;
    color: string;
    size: number;
  }>>([]);

  // Responsive confetti configuration
  useEffect(() => {
    const getConfettiConfig = () => {
      if (typeof window === 'undefined') {
        return { count: 50, minSize: 5, maxSize: 15 };
      }

      const width = window.innerWidth;
      
      if (width < 768) {
        // Mobile - fewer, smaller pieces for better performance
        return { count: 30, minSize: 3, maxSize: 8 };
      } else if (width < 1024) {
        // Tablet - medium count and size
        return { count: 40, minSize: 4, maxSize: 12 };
      } else {
        // Desktop - original values
        return { count: 50, minSize: 5, maxSize: 15 };
      }
    };

    const config = getConfettiConfig();
    
    const pieces = Array.from({ length: config.count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10,
      rotation: Math.random() * 360,
      color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'][Math.floor(Math.random() * 6)],
      size: Math.random() * (config.maxSize - config.minSize) + config.minSize
    }));

    setConfettiPieces(pieces);
  }, [isVisible]);

  useEffect(() => {
    if (isVisible && onComplete) {
      const timer = setTimeout(onComplete, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Confetti Pieces */}
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute rounded-full"
          style={{
            backgroundColor: piece.color,
            width: piece.size,
            height: piece.size,
            left: `${piece.x}%`,
          }}
          initial={{
            y: '-10vh',
            rotate: 0,
            opacity: 1
          }}
          animate={{
            y: '110vh',
            rotate: piece.rotation * 4,
            opacity: 0
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            ease: 'linear',
            delay: Math.random() * 0.5
          }}
        />
      ))}
      
      {/* Success Message - Responsive positioning and sizing */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-4"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="bg-white dark:bg-gray-800 px-4 sm:px-6 md:px-8 py-4 sm:py-6 rounded-xl sm:rounded-2xl shadow-2xl border-2 border-green-500">
          <motion.div
            className="text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Emoji - Responsive sizing */}
            <motion.div
              className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 0.6,
                delay: 0.6,
                repeat: 2
              }}
            >
              🎉
            </motion.div>
            
            {/* Title - Responsive typography */}
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 mb-2 sm:mb-3">
              Welcome to the Course!
            </h3>
            
            {/* Description - Responsive typography */}
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Enrollment successful! Let's start learning.
            </p>

            {/* Additional responsive message for larger screens */}
            <motion.p
              className="hidden sm:block text-xs text-gray-500 dark:text-gray-400 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Your learning journey begins now!
            </motion.p>
          </motion.div>

          {/* Progress indicator for mobile */}
          <motion.div
            className="sm:hidden mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.8, ease: "linear" }}
          >
            <div className="h-1 bg-green-500 rounded-full"></div>
          </motion.div>
        </div>
      </motion.div>

      {/* Background overlay with responsive blur */}
      <motion.div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}