import { Button } from './ui/button';
import { cn } from './ui/utils';
import { motion } from 'motion/react';

interface AnimatedButtonProps extends React.ComponentProps<typeof Button> {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
  glowEffect?: boolean;
  scaleOnHover?: boolean;
  responsiveSize?: 'sm' | 'md' | 'lg' | 'auto';
}

export function AnimatedButton({
  children,
  className,
  variant = 'default',
  glowEffect = false,
  scaleOnHover = true,
  responsiveSize = 'auto',
  ...props
}: AnimatedButtonProps) {
  // Responsive size classes
  const getSizeClasses = () => {
    if (responsiveSize !== 'auto') {
      return {
        button: `text-${responsiveSize === 'sm' ? 'sm' : responsiveSize === 'lg' ? 'lg' : 'base'} px-${responsiveSize === 'sm' ? '3' : responsiveSize === 'lg' ? '6' : '4'} py-${responsiveSize === 'sm' ? '2' : responsiveSize === 'lg' ? '3' : '2'}`,
        scale: responsiveSize === 'sm' ? 1.03 : responsiveSize === 'lg' ? 1.04 : 1.05
      };
    }

    // Auto responsive sizes
    return {
      button: "text-sm sm:text-base lg:text-lg px-3 sm:px-4 lg:px-6 py-2 sm:py-2 lg:py-3",
      scale: 1.05
    };
  };

  const sizeConfig = getSizeClasses();

  // Responsive hover effects
  const getHoverScale = () => {
    if (!scaleOnHover) return 1;
    
    // Smaller scale on mobile for better UX
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 1.02;
    }
    
    return sizeConfig.scale;
  };

  // Responsive glow effect intensity
  const getGlowIntensity = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return "opacity-0 hover:opacity-15"; // Softer glow on mobile
    }
    return "opacity-0 hover:opacity-20";
  };

  return (
    <motion.div
      whileHover={{ 
        scale: getHoverScale(),
        y: -1, // Reduced lift on hover for mobile
      }}
      whileTap={{ 
        scale: 0.98,
        y: 0 
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17 
      }}
      className="relative inline-block max-w-full"
    >
      <Button
        variant={variant}
        className={cn(
          // Base styles
          "relative overflow-hidden transition-all duration-200",
          "hover:shadow-lg active:shadow-md",
          "min-h-[44px]", // Minimum touch target for mobile
          "min-w-[44px]", // Minimum touch target for mobile
          
          // Responsive sizing
          sizeConfig.button,
          
          // Responsive font weight
          "font-medium sm:font-semibold",
          
          // Border radius consistency
          "rounded-lg",
          
          // Glow effects based on variant
          glowEffect && variant === 'default' && "hover:shadow-blue-500/20 sm:hover:shadow-blue-500/25",
          glowEffect && variant === 'outline' && "hover:shadow-primary/15 sm:hover:shadow-primary/20",
          
          // Shine effect
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
          "before:translate-x-[-200%] hover:before:translate-x-[200%]",
          "before:transition-transform before:duration-700 before:ease-in-out",
          
          // Disable shine effect on mobile for performance
          "max-sm:before:hidden",
          
          // Focus styles for accessibility
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          
          // Disabled state
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none",
          
          className
        )}
        {...props}
      >
        <span className={cn(
          "relative z-10",
          // Ensure text is properly sized and doesn't overflow
          "truncate max-w-full",
          // Responsive font scaling
          "text-inherit"
        )}>
          {children}
        </span>
      </Button>
      
      {/* Glow Effect */}
      {glowEffect && (
        <motion.div 
          className={cn(
            "absolute -inset-1 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg blur-sm -z-10 transition-opacity duration-300",
            getGlowIntensity(),
            // Responsive blur
            "blur-[2px] sm:blur-sm"
          )}
          whileHover={{
            opacity: typeof window !== 'undefined' && window.innerWidth < 768 ? 0.15 : 0.2
          }}
        />
      )}
    </motion.div>
  );
}

// Additional responsive button variants
export function ResponsiveButtonGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn(
      "flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto",
      "items-stretch sm:items-center",
      className
    )}>
      {children}
    </div>
  );
}