import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface SuccessConfettiProps {
  isVisible: boolean;
  onComplete?: () => void;
}

export function SuccessConfetti({ isVisible, onComplete }: SuccessConfettiProps) {
  const [confettiPieces] = useState(() => 
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10,
      rotation: Math.random() * 360,
      color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'][Math.floor(Math.random() * 6)],
      size: Math.random() * 10 + 5
    }))
  );

  useEffect(() => {
    if (isVisible && onComplete) {
      const timer = setTimeout(onComplete, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-2 h-2 rounded-full"
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
      
      {/* Success Message */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="bg-white dark:bg-gray-800 px-8 py-6 rounded-2xl shadow-2xl border-2 border-green-500">
          <motion.div
            className="text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div
              className="text-6xl mb-4"
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
            <h3 className="text-2xl font-bold text-green-600 mb-2">
              Welcome to the Course!
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Enrollment successful! Let's start learning.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}