import { motion } from "motion/react";
import { useEffect, useState, useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
}

export function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });

  // Window size detection for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive particle configuration
  useEffect(() => {
    const colors = [
      "rgba(147, 51, 234, 0.1)", // purple
      "rgba(59, 130, 246, 0.1)",  // blue
      "rgba(236, 72, 153, 0.1)",  // pink
      "rgba(16, 185, 129, 0.1)",  // emerald
      "rgba(251, 191, 36, 0.1)",  // amber
    ];

    // Adjust particle count based on screen size
    const getParticleCount = () => {
      if (windowSize.width < 768) return 20;  // Mobile
      if (windowSize.width < 1024) return 35; // Tablet
      return 50; // Desktop
    };

    // Adjust particle size based on screen size
    const getParticleSize = () => {
      if (windowSize.width < 768) return Math.random() * 3 + 0.5;  // Smaller on mobile
      return Math.random() * 4 + 1;
    };

    const newParticles: Particle[] = Array.from({ length: getParticleCount() }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: getParticleSize(),
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 20 + 10,
    }));

    setParticles(newParticles);
  }, [windowSize]);

  // Responsive orb sizes and positions using useMemo for optimization
  const orbConfigs = useMemo(() => {
    const isMobile = windowSize.width < 768;
    const isTablet = windowSize.width < 1024;

    return {
      largeOrb: {
        size: isMobile ? 'w-32 h-32' : isTablet ? 'w-48 h-48' : 'w-64 h-64',
        blur: isMobile ? 'blur(20px)' : isTablet ? 'blur(30px)' : 'blur(40px)',
        top: isMobile ? 'top-10' : 'top-20',
        left: isMobile ? 'left-10' : 'left-20'
      },
      mediumOrb: {
        size: isMobile ? 'w-24 h-24' : isTablet ? 'w-32 h-32' : 'w-48 h-48',
        blur: isMobile ? 'blur(15px)' : isTablet ? 'blur(25px)' : 'blur(40px)',
        bottom: isMobile ? 'bottom-10' : 'bottom-20',
        right: isMobile ? 'right-10' : 'right-20'
      },
      smallOrb: {
        size: isMobile ? 'w-16 h-16' : isTablet ? 'w-24 h-24' : 'w-32 h-32',
        blur: isMobile ? 'blur(10px)' : isTablet ? 'blur(20px)' : 'blur(30px)'
      }
    };
  }, [windowSize.width]);

  // Reduced motion for accessibility
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 opacity-20 sm:opacity-30"
        animate={prefersReducedMotion ? {} : {
          background: [
            "radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 20% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 50%), radial-gradient(circle at 60% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%), radial-gradient(circle at 90% 20%, rgba(147, 51, 234, 0.1) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={prefersReducedMotion ? {} : {
          duration: 8,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={prefersReducedMotion ? {} : {
            y: windowSize.width < 768 ? [-10, 10, -10] : [-20, 20, -20],
            x: windowSize.width < 768 ? [-5, 5, -5] : [-10, 10, -10],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={prefersReducedMotion ? {} : {
            duration: particle.duration,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* Large Gradient Orb */}
      <motion.div
        className={`absolute ${orbConfigs.largeOrb.top} ${orbConfigs.largeOrb.left} ${orbConfigs.largeOrb.size} rounded-full`}
        style={{
          background: "radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)",
          filter: orbConfigs.largeOrb.blur,
        }}
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.2, 1],
          x: windowSize.width < 768 ? [0, 50, 0] : [0, 100, 0],
          y: windowSize.width < 768 ? [0, -25, 0] : [0, -50, 0],
        }}
        transition={prefersReducedMotion ? {} : {
          duration: 15,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Medium Gradient Orb */}
      <motion.div
        className={`absolute ${orbConfigs.mediumOrb.bottom} ${orbConfigs.mediumOrb.right} ${orbConfigs.mediumOrb.size} rounded-full`}
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
          filter: orbConfigs.mediumOrb.blur,
        }}
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.3, 1],
          x: windowSize.width < 768 ? [0, -40, 0] : [0, -80, 0],
          y: windowSize.width < 768 ? [0, 30, 0] : [0, 60, 0],
        }}
        transition={prefersReducedMotion ? {} : {
          duration: 12,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Small Center Orb */}
      <motion.div
        className={`absolute top-1/2 left-1/2 ${orbConfigs.smallOrb.size} rounded-full`}
        style={{
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)",
          filter: orbConfigs.smallOrb.blur,
          transform: "translate(-50%, -50%)",
        }}
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.5, 1],
          rotate: [0, 180, 360],
        }}
        transition={prefersReducedMotion ? {} : {
          duration: 20,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Performance optimization overlay for mobile */}
      {windowSize.width < 768 && (
        <div className="absolute inset-0 bg-background/5 backdrop-blur-[0.5px]" />
      )}
    </div>
  );
}