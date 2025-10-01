import { motion } from 'motion/react';
import { Card } from './ui/card';
import { cn } from './ui/utils';
import { useEffect, useState } from 'react';

interface AnimatedCardProps extends React.ComponentProps<typeof Card> {
  hoverScale?: number;
  hoverY?: number;
  glowEffect?: boolean;
  delay?: number;
  disableHoverEffects?: boolean;
}

export function AnimatedCard({
  children,
  className,
  hoverScale = 1.02,
  hoverY = -8,
  glowEffect = false,
  delay = 0,
  disableHoverEffects = false,
  ...props
}: AnimatedCardProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Detect screen size for responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Responsive animation values
  const getResponsiveValues = () => {
    if (isMobile) {
      return {
        scale: disableHoverEffects ? 1 : 1.01,
        y: disableHoverEffects ? 0 : -4,
        shadow: 'hover:shadow-lg',
        transition: { type: "spring", stiffness: 400, damping: 25 }
      };
    }
    
    if (isTablet) {
      return {
        scale: disableHoverEffects ? 1 : 1.015,
        y: disableHoverEffects ? 0 : -6,
        shadow: 'hover:shadow-xl',
        transition: { type: "spring", stiffness: 350, damping: 20 }
      };
    }

    return {
      scale: disableHoverEffects ? 1 : hoverScale,
      y: disableHoverEffects ? 0 : hoverY,
      shadow: 'hover:shadow-2xl',
      transition: { type: "spring", stiffness: 300, damping: 20 }
    };
  };

  const responsiveValues = getResponsiveValues();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      whileHover={!disableHoverEffects ? { 
        scale: responsiveValues.scale,
        y: responsiveValues.y,
        transition: responsiveValues.transition
      } : undefined}
      className={cn(
        "group relative",
        // Ensure proper sizing on all devices
        "w-full h-full"
      )}
    >
      <Card
        className={cn(
          // Base styles
          "relative overflow-hidden transition-all duration-300",
          "w-full h-full",
          
          // Responsive padding
          "p-4 sm:p-6 lg:p-8",
          
          // Responsive border radius
          "rounded-lg sm:rounded-xl lg:rounded-2xl",
          
          // Border styles
          "border border-border/50 hover:border-border/80",
          
          // Background with better mobile performance
          "bg-card/95 backdrop-blur-sm sm:backdrop-blur-md",
          
          // Responsive shadow
          "shadow-sm sm:shadow-md",
          responsiveValues.shadow,
          "hover:shadow-black/5 dark:hover:shadow-black/20",
          
          // Disable hover effects on mobile if needed
          disableHoverEffects && "hover:transform-none",
          
          className
        )}
        {...props}
      >
        {/* Content container with responsive spacing */}
        <div className={cn(
          "h-full flex flex-col",
          "space-y-3 sm:space-y-4 lg:space-y-6"
        )}>
          {children}
        </div>
        
        {/* Subtle shine effect - disabled on mobile for performance */}
        {!isMobile && (
          <div className={cn(
            "absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent",
            "translate-x-[-200%] group-hover:translate-x-[200%]",
            "transition-transform duration-1000 ease-in-out",
            // Disable on touch devices
            "max-md:hidden"
          )} />
        )}
      </Card>
      
      {/* Glow Effect - responsive intensity */}
      {glowEffect && !isMobile && (
        <motion.div 
          className={cn(
            "absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-teal-600/20",
            "rounded-lg sm:rounded-xl lg:rounded-2xl",
            "blur-[2px] sm:blur-sm",
            "opacity-0 group-hover:opacity-100",
            "transition-opacity duration-500",
            "-z-10",
            // Responsive glow intensity
            isTablet ? "from-blue-600/15 to-teal-600/15" : "from-blue-600/20 to-teal-600/20"
          )}
          whileHover={{
            opacity: isTablet ? 0.8 : 1
          }}
        />
      )}
      
      {/* Mobile tap feedback */}
      {isMobile && !disableHoverEffects && (
        <motion.div
          className="absolute inset-0 bg-black/0 active:bg-black/5 rounded-lg sm:rounded-xl lg:rounded-2xl transition-colors duration-150 -z-10"
          whileTap={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
        />
      )}
    </motion.div>
  );
}

// Additional responsive card container components
interface CardGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: number;
}

export function ResponsiveCardGrid({ children, className, cols = 3 }: CardGridProps) {
  return (
    <div className={cn(
      "grid grid-cols-1",
      // Responsive columns
      "sm:grid-cols-2",
      cols >= 3 && "lg:grid-cols-3",
      cols >= 4 && "xl:grid-cols-4",
      // Responsive gaps
      "gap-4 sm:gap-6 lg:gap-8",
      "w-full",
      className
    )}>
      {children}
    </div>
  );
}

export function CardContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn(
      "max-w-7xl mx-auto",
      "px-4 sm:px-6 lg:px-8",
      "w-full",
      className
    )}>
      {children}
    </div>
  );
}