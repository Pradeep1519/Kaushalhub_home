import { Button } from './ui/button';
import { cn } from './ui/utils';
import { motion } from 'motion/react';

interface AnimatedButtonProps extends React.ComponentProps<typeof Button> {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
  glowEffect?: boolean;
  scaleOnHover?: boolean;
}

export function AnimatedButton({
  children,
  className,
  variant = 'default',
  glowEffect = false,
  scaleOnHover = true,
  ...props
}: AnimatedButtonProps) {
  return (
    <motion.div
      whileHover={{ 
        scale: scaleOnHover ? 1.05 : 1,
        y: -2,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17 
      }}
      className="relative inline-block"
    >
      <Button
        variant={variant}
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          "hover:shadow-lg active:shadow-md",
          glowEffect && variant === 'default' && "hover:shadow-blue-500/25",
          glowEffect && variant === 'outline' && "hover:shadow-primary/20",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
          "before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700",
          className
        )}
        {...props}
      >
        <span className="relative z-10">
          {children}
        </span>
      </Button>
      
      {glowEffect && (
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg opacity-0 hover:opacity-20 transition-opacity duration-300 blur-sm -z-10" />
      )}
    </motion.div>
  );
}