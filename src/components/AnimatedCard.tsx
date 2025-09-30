import { motion } from 'motion/react';
import { Card } from './ui/card';
import { cn } from './ui/utils';

interface AnimatedCardProps extends React.ComponentProps<typeof Card> {
  hoverScale?: number;
  hoverY?: number;
  glowEffect?: boolean;
  delay?: number;
}

export function AnimatedCard({
  children,
  className,
  hoverScale = 1.02,
  hoverY = -8,
  glowEffect = false,
  delay = 0,
  ...props
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      whileHover={{ 
        scale: hoverScale,
        y: hoverY,
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 20 
        }
      }}
      className="group relative"
    >
      <Card
        className={cn(
          "relative overflow-hidden transition-all duration-500",
          "hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/20",
          "border-border/50 hover:border-border",
          "backdrop-blur-sm",
          className
        )}
        {...props}
      >
        {children}
        
        {/* Subtle shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
      </Card>
      
      {glowEffect && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10" />
      )}
    </motion.div>
  );
}