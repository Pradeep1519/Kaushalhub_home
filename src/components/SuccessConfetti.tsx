import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface SuccessConfettiProps {
  isVisible: boolean;
  onComplete?: () => void;
  message?: string; // ✅ NEW: Custom message support
}

export function SuccessConfetti({ isVisible, onComplete, message }: SuccessConfettiProps) {
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
      {/* ✅ REDUCED BLUR: Background overlay with minimal blur */}
      <motion.div
        className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" // ✅ Reduced blur from 'sm' to '1px'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
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
      
      {/* ✅ IMPROVED: Success Message - More clear and prominent */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-4"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 25,
          duration: 0.5, 
          delay: 0.2 
        }}
      >
        <div className="bg-white/95 backdrop-blur-sm border-2 border-green-500/80 shadow-2xl rounded-2xl overflow-hidden">
          {/* Main Content */}
          <div className="px-6 py-8 text-center">
            {/* ✅ IMPROVED: Success Icon - More vibrant */}
            <motion.div
              className="mx-auto mb-4"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 0.8,
                delay: 0.4,
                repeat: 1
              }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <span className="text-3xl">🎉</span>
              </div>
            </motion.div>
            
            {/* ✅ IMPROVED: Title - More clear and bold */}
            <motion.h3
              className="text-2xl font-bold text-gray-800 mb-3"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {message || "Success!"} {/* ✅ Use custom message or default */}
            </motion.h3>
            
            {/* ✅ IMPROVED: Description - Better readability */}
            <motion.p
              className="text-gray-600 leading-relaxed mb-4"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {message 
                ? "Your request has been processed successfully!"
                : "Operation completed successfully!"
              }
            </motion.p>

            {/* ✅ Progress Bar - More visible */}
            <motion.div
              className="w-full bg-gray-200 rounded-full h-2 overflow-hidden"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.8, ease: "linear" }}
            >
              <div className="h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
            </motion.div>
          </div>

          {/* ✅ ADDED: Decorative bottom border */}
          <motion.div
            className="h-1 bg-gradient-to-r from-green-400 to-green-600"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 3, ease: "linear" }}
          />
        </div>
      </motion.div>

      {/* ✅ ADDED: Floating celebration elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 text-2xl"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          delay: 0.5
        }}
      >
        ⭐
      </motion.div>
      
      <motion.div
        className="absolute top-1/3 right-1/4 text-xl"
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, -15, 15, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          delay: 1
        }}
      >
        ✨
      </motion.div>
    </div>
  );
}