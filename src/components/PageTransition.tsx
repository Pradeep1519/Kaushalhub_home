import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  responsive?: boolean;
}

export function PageTransition({ children, className = '', responsive = true }: PageTransitionProps) {
  // Responsive animation values based on screen size
  const getAnimationValues = () => {
    if (!responsive || typeof window === 'undefined') {
      return {
        initialY: 20,
        exitY: -20,
        duration: 0.4
      };
    }

    const width = window.innerWidth;
    
    if (width < 768) {
      // Mobile - smaller movements for better performance
      return {
        initialY: 15,
        exitY: -15,
        duration: 0.35
      };
    } else if (width < 1024) {
      // Tablet - medium movements
      return {
        initialY: 18,
        exitY: -18,
        duration: 0.38
      };
    } else {
      // Desktop - original values
      return {
        initialY: 20,
        exitY: -20,
        duration: 0.4
      };
    }
  };

  const animation = getAnimationValues();

  return (
    <motion.div
      className={`w-full ${className}`}
      initial={{ opacity: 0, y: animation.initialY }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: animation.exitY }}
      transition={{
        duration: animation.duration,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  );
}

export function SlideTransition({ children, className = '', responsive = true }: PageTransitionProps) {
  // Responsive slide animation values
  const getSlideAnimationValues = () => {
    if (!responsive || typeof window === 'undefined') {
      return {
        initialX: 50,
        exitX: -50,
        duration: 0.5
      };
    }

    const width = window.innerWidth;
    
    if (width < 768) {
      // Mobile - smaller slide distance
      return {
        initialX: 30,
        exitX: -30,
        duration: 0.4
      };
    } else if (width < 1024) {
      // Tablet - medium slide distance
      return {
        initialX: 40,
        exitX: -40,
        duration: 0.45
      };
    } else {
      // Desktop - original values
      return {
        initialX: 50,
        exitX: -50,
        duration: 0.5
      };
    }
  };

  const animation = getSlideAnimationValues();

  return (
    <motion.div
      className={`w-full ${className}`}
      initial={{ opacity: 0, x: animation.initialX }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: animation.exitX }}
      transition={{
        duration: animation.duration,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  );
}

export function ScaleTransition({ children, className = '', responsive = true }: PageTransitionProps) {
  // Responsive scale animation values
  const getScaleAnimationValues = () => {
    if (!responsive || typeof window === 'undefined') {
      return {
        initialScale: 0.95,
        exitScale: 1.05,
        duration: 0.3
      };
    }

    const width = window.innerWidth;
    
    if (width < 768) {
      // Mobile - less scale for better performance
      return {
        initialScale: 0.98,
        exitScale: 1.02,
        duration: 0.25
      };
    } else if (width < 1024) {
      // Tablet - medium scale
      return {
        initialScale: 0.97,
        exitScale: 1.03,
        duration: 0.28
      };
    } else {
      // Desktop - original values
      return {
        initialScale: 0.95,
        exitScale: 1.05,
        duration: 0.3
      };
    }
  };

  const animation = getScaleAnimationValues();

  return (
    <motion.div
      className={`w-full ${className}`}
      initial={{ opacity: 0, scale: animation.initialScale }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: animation.exitScale }}
      transition={{
        duration: animation.duration,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  );
}

// New responsive transition variants
export function FadeTransition({ children, className = '', responsive = true }: PageTransitionProps) {
  const getFadeDuration = () => {
    if (!responsive || typeof window === 'undefined') return 0.3;
    
    const width = window.innerWidth;
    return width < 768 ? 0.25 : 0.3;
  };

  return (
    <motion.div
      className={`w-full ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: getFadeDuration(),
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  );
}

export function FlipTransition({ children, className = '', responsive = true }: PageTransitionProps) {
  const getFlipValues = () => {
    if (!responsive || typeof window === 'undefined') {
      return { duration: 0.6, rotateY: 10 };
    }

    const width = window.innerWidth;
    return {
      duration: width < 768 ? 0.5 : 0.6,
      rotateY: width < 768 ? 5 : 10
    };
  };

  const animation = getFlipValues();

  return (
    <motion.div
      className={`w-full ${className}`}
      initial={{ opacity: 0, rotateY: animation.rotateY }}
      animate={{ opacity: 1, rotateY: 0 }}
      exit={{ opacity: 0, rotateY: -animation.rotateY }}
      transition={{
        duration: animation.duration,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  );
}

// Container component for consistent transitions
interface TransitionContainerProps {
  children: ReactNode;
  className?: string;
  type?: 'page' | 'slide' | 'scale' | 'fade' | 'flip';
  responsive?: boolean;
}

export function TransitionContainer({ 
  children, 
  className = '', 
  type = 'page',
  responsive = true 
}: TransitionContainerProps) {
  const transitions = {
    page: PageTransition,
    slide: SlideTransition,
    scale: ScaleTransition,
    fade: FadeTransition,
    flip: FlipTransition
  };

  const TransitionComponent = transitions[type];

  return (
    <TransitionComponent className={className} responsive={responsive}>
      {children}
    </TransitionComponent>
  );
}

// Hook for responsive transition config
export function useResponsiveTransition() {
  const getTransitionConfig = (type: string) => {
    if (typeof window === 'undefined') {
      return { duration: 0.4 };
    }

    const width = window.innerWidth;
    let duration = 0.4;

    if (width < 768) {
      duration = 0.3; // Faster on mobile
    } else if (width < 1024) {
      duration = 0.35; // Medium on tablet
    }

    return { duration };
  };

  return { getTransitionConfig };
}