import { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  responsive?: boolean;
  distance?: number;
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className = '',
  responsive = true,
  distance = 60,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Responsive animation values
  const getResponsiveValues = () => {
    if (!responsive || typeof window === 'undefined') {
      return { distance, duration, threshold: threshold };
    }

    const width = window.innerWidth;
    
    if (width < 768) {
      return {
        distance: distance * 0.6,
        duration: duration * 0.8,
        threshold: Math.min(threshold + 0.05, 0.3)
      };
    } else if (width < 1024) {
      return {
        distance: distance * 0.8,
        duration: duration * 0.9,
        threshold: threshold
      };
    } else {
      return { distance, duration, threshold };
    }
  };

  const responsiveValues = getResponsiveValues();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, delay);
        }
      },
      { 
        threshold: responsiveValues.threshold, 
        rootMargin: responsive ? '20px' : '50px'
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [responsiveValues.threshold, delay, hasAnimated, responsive]);

  const getInitialTransform = () => {
    const dist = responsiveValues.distance;
    
    switch (direction) {
      case 'up':
        return `translateY(${dist}px)`;
      case 'down':
        return `translateY(-${dist}px)`;
      case 'left':
        return `translateX(${dist}px)`;
      case 'right':
        return `translateX(-${dist}px)`;
      case 'fade':
      default:
        return `translateY(${dist * 0.33}px)`;
    }
  };

  const getEasing = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 'cubic-bezier(0.4, 0, 0.2, 1)';
    }
    return 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  };

  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0)' : getInitialTransform(),
        transition: `opacity ${responsiveValues.duration}ms ${getEasing()}, transform ${responsiveValues.duration}ms ${getEasing()}`,
        transitionProperty: 'opacity, transform',
        backfaceVisibility: 'hidden',
        perspective: 1000,
      }}
    >
      {children}
    </div>
  );
}

// Pre-configured variants
export function FadeReveal({ children, ...props }: Omit<ScrollRevealProps, 'direction'>) {
  return (
    <ScrollReveal direction="fade" distance={40} {...props}>
      {children}
    </ScrollReveal>
  );
}

export function SlideUpReveal({ children, ...props }: Omit<ScrollRevealProps, 'direction'>) {
  return (
    <ScrollReveal direction="up" distance={80} {...props}>
      {children}
    </ScrollReveal>
  );
}

export function SlideLeftReveal({ children, ...props }: Omit<ScrollRevealProps, 'direction'>) {
  return (
    <ScrollReveal direction="left" distance={100} {...props}>
      {children}
    </ScrollReveal>
  );
}

export function StaggerReveal({ 
  children, 
  staggerDelay = 100,
  ...props 
}: ScrollRevealProps & { staggerDelay?: number }) {
  const childrenArray = Array.isArray(children) ? children : [children];
  
  return (
    <>
      {childrenArray.map((child, index) => (
        <ScrollReveal
          key={index}
          delay={props.delay ? props.delay + (index * staggerDelay) : index * staggerDelay}
          {...props}
        >
          {child}
        </ScrollReveal>
      ))}
    </>
  );
}

// Hook for manual scroll reveal control
export function useScrollReveal(options: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
} = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { threshold = 0.1, rootMargin = '50px', once = true } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            setHasAnimated(true);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, once]);

  return { ref, isVisible, hasAnimated };
}

// Performance optimized version for multiple elements
export function ScrollRevealGroup({
  children,
  className = '',
  staggerDelay = 100,
  ...props
}: ScrollRevealProps & { staggerDelay?: number }) {
  const childrenArray = Array.isArray(children) ? children : [children];
  
  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <ScrollReveal
          key={index}
          delay={props.delay ? props.delay + (index * staggerDelay) : index * staggerDelay}
          {...props}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
}