import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  responsive?: boolean;
  cursorBlinkSpeed?: number;
  onComplete?: () => void;
}

export function TypewriterText({ 
  text, 
  delay = 0, 
  speed = 50, 
  className = "",
  responsive = true,
  cursorBlinkSpeed = 530,
  onComplete
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive speed adjustments
  const getResponsiveSpeed = () => {
    if (!responsive || typeof window === 'undefined') {
      return speed;
    }

    const width = window.innerWidth;
    
    if (width < 768) {
      // Mobile - faster typing for better UX
      return Math.max(speed * 0.7, 30);
    } else if (width < 1024) {
      // Tablet - slightly faster
      return Math.max(speed * 0.85, 40);
    } else {
      // Desktop - original speed
      return speed;
    }
  };

  // Responsive cursor size
  const getCursorSize = () => {
    if (!responsive || typeof window === 'undefined') {
      return "w-0.5 h-5";
    }

    const width = window.innerWidth;
    
    if (width < 640) {
      // Small mobile - smaller cursor
      return "w-0.5 h-4";
    } else if (width < 768) {
      // Mobile - medium cursor
      return "w-0.5 h-4.5";
    } else if (width < 1024) {
      // Tablet - standard cursor
      return "w-0.5 h-5";
    } else {
      // Desktop - original cursor
      return "w-0.5 h-5";
    }
  };

  const responsiveSpeed = getResponsiveSpeed();
  const cursorSizeClass = getCursorSize();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      } else if (!isTypingComplete) {
        setIsTypingComplete(true);
        if (onComplete) {
          onComplete();
        }
      }
    }, currentIndex === 0 ? delay : responsiveSpeed);

    return () => clearTimeout(timer);
  }, [currentIndex, delay, responsiveSpeed, text, isTypingComplete, onComplete]);

  // Blinking cursor effect
  useEffect(() => {
    if (isTypingComplete) {
      // Stop blinking when typing is complete
      setShowCursor(false);
      return;
    }

    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, cursorBlinkSpeed);

    return () => clearInterval(cursorTimer);
  }, [cursorBlinkSpeed, isTypingComplete]);

  // Pause typing when tab is not visible (performance optimization)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && currentIndex < text.length) {
        // Resume typing when tab becomes visible again
        const timer = setTimeout(() => {
          if (currentIndex < text.length) {
            setDisplayText(prev => prev + text[currentIndex]);
            setCurrentIndex(prev => prev + 1);
          }
        }, responsiveSpeed);
        
        return () => clearTimeout(timer);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentIndex, text, responsiveSpeed]);

  return (
    <motion.div 
      ref={containerRef}
      className={`inline-flex items-center ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay / 1000 }}
      style={{
        // Ensure proper text wrapping and prevent overflow
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
      }}
    >
      {/* Display text with proper line height */}
      <span 
        className="leading-relaxed"
        style={{
          // Prevent cumulative layout shift
          display: 'inline-block',
          minHeight: '1.5em',
        }}
      >
        {displayText}
      </span>
      
      {/* Blinking cursor */}
      {!isTypingComplete && (
        <motion.span 
          className={`${cursorSizeClass} bg-current ml-1 inline-block`}
          animate={{ 
            opacity: showCursor ? 1 : 0,
            scaleY: showCursor ? 1 : 0.8 
          }}
          transition={{ 
            duration: 0.1,
            ease: "easeInOut"
          }}
          style={{
            // Smooth cursor animation
            transformOrigin: 'center',
          }}
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
}

// Pre-configured variants for common use cases
export function FastTypewriterText(props: Omit<TypewriterTextProps, 'speed'>) {
  return <TypewriterText speed={30} {...props} />;
}

export function SlowTypewriterText(props: Omit<TypewriterTextProps, 'speed'>) {
  return <TypewriterText speed={80} {...props} />;
}

export function ResponsiveTypewriterText(props: Omit<TypewriterTextProps, 'responsive'>) {
  return <TypewriterText responsive={true} {...props} />;
}

// Hook for manual typewriter control
export function useTypewriter(text: string, options: {
  delay?: number;
  speed?: number;
  responsive?: boolean;
  autoStart?: boolean;
} = {}) {
  const {
    delay = 0,
    speed = 50,
    responsive = true,
    autoStart = true
  } = options;

  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isComplete, setIsComplete] = useState(false);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setDisplayText("");
    setCurrentIndex(0);
    setIsComplete(false);
    if (autoStart) setIsRunning(true);
  };

  // Responsive speed calculation
  const getResponsiveSpeed = () => {
    if (!responsive || typeof window === 'undefined') return speed;
    
    const width = window.innerWidth;
    if (width < 768) return Math.max(speed * 0.7, 30);
    if (width < 1024) return Math.max(speed * 0.85, 40);
    return speed;
  };

  useEffect(() => {
    if (!isRunning || currentIndex >= text.length) return;

    const timer = setTimeout(() => {
      setDisplayText(prev => prev + text[currentIndex]);
      setCurrentIndex(prev => {
        if (prev + 1 >= text.length) {
          setIsComplete(true);
          setIsRunning(false);
        }
        return prev + 1;
      });
    }, currentIndex === 0 ? delay : getResponsiveSpeed());

    return () => clearTimeout(timer);
  }, [currentIndex, delay, isRunning, text, responsive, speed]);

  return {
    text: displayText,
    isRunning,
    isComplete,
    progress: text.length > 0 ? (currentIndex / text.length) * 100 : 0,
    start,
    pause,
    reset,
  };
}