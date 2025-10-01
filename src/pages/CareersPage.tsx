import { motion } from "motion/react";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { TypewriterText } from "../components/TypewriterText";
import { AnimatedButton } from "../components/AnimatedButton";
import { ArrowLeft, Sparkles, Rocket, Heart } from "lucide-react";
import styles from "./CareersPage.module.css";

interface CareersPageProps {
  onNavigate?: (page: string) => void;
}

export function CareersPage({ onNavigate }: CareersPageProps) {
  return (
    <div className={`${styles.careersContainer} flex items-center justify-center p-4 sm:p-6 md:p-8 min-h-screen w-full overflow-x-hidden`}>
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Main Content */}
      <div className="relative z-10 text-center w-full max-w-4xl lg:max-w-6xl mx-auto px-2 sm:px-4">
        {/* Decorative Icons - Responsive Positioning */}
        <motion.div
          className="absolute -top-10 -left-8 sm:-top-16 sm:-left-12 md:-top-20 md:-left-20 text-purple-500/20"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
        </motion.div>
        
        <motion.div
          className="absolute -top-8 -right-8 sm:-top-12 sm:-right-12 md:-top-16 md:-right-16 text-blue-500/20"
          animate={{
            rotate: [360, 0],
            y: [-10, 10, -10],
          }}
          transition={{
            duration: 6,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <Rocket className="w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9" />
        </motion.div>
        
        <motion.div
          className="absolute -bottom-6 sm:-bottom-8 md:-bottom-12 left-1/2 transform -translate-x-1/2 text-pink-500/20"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 20, 0],
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
        </motion.div>

        {/* Main Heading with Gradient Animation - Responsive Text */}
        <motion.div
          className="mb-6 sm:mb-8 md:mb-12 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
        >
          <motion.h1
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-bold leading-tight px-2 sm:px-4"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            whileHover={{
              scale: 1.02,
            }}
            style={{
              background: "linear-gradient(45deg, #9333ea, #3b82f6, #ec4899, #9333ea)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            We will hire soon
          </motion.h1>
          
          {/* Glowing Border Effect */}
          <motion.div
            className="absolute inset-0 rounded-lg -z-10 mx-2 sm:mx-4"
            style={{
              background: "linear-gradient(45deg, #9333ea, #3b82f6, #ec4899, #9333ea)",
              backgroundSize: "400% 400%",
              opacity: 0.1,
              filter: "blur(12px) sm:blur(16px) md:blur(20px)",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </motion.div>

        {/* Typewriter Subtext - Responsive */}
        <motion.div
          className="mb-8 sm:mb-10 md:mb-12 px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <TypewriterText
            text="Stay tuned for opportunities"
            delay={2000}
            speed={80}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground"
          />
        </motion.div>

        {/* Animated Stats - Responsive Grid */}
        <motion.div
          className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto px-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4, duration: 0.8 }}
        >
          {[
            { label: "Amazing Culture", value: "💫" },
            { label: "Growth Opportunities", value: "🚀" },
            { label: "Great Benefits", value: "💝" },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              className="text-center p-3 sm:p-4 rounded-lg sm:rounded-xl bg-background/10 backdrop-blur-sm border border-white/10"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.15)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div
                className="text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 2,
                  delay: index * 0.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                {item.value}
              </motion.div>
              <div className="text-xs sm:text-sm text-muted-foreground leading-tight px-1">
                {item.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Back to Home Button - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5, duration: 0.8 }}
          className="px-2"
        >
          <AnimatedButton
            onClick={() => onNavigate?.("home")}
            size="lg"
            className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 hover:from-purple-700 hover:via-blue-700 hover:to-pink-700 text-white border-0 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-medium w-full sm:w-auto"
            glowEffect
          >
            <motion.div
              className="flex items-center justify-center sm:justify-start space-x-2"
              whileHover={{ x: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-pulse flex-shrink-0" />
              <span className="truncate">Back to Home</span>
            </motion.div>
            
            {/* Button Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </AnimatedButton>
        </motion.div>

        {/* Floating Call-to-Action - Responsive */}
        <motion.div
          className="mt-12 sm:mt-14 md:mt-16 text-center px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 6, duration: 0.8 }}
        >
          <motion.p
            className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Follow us for updates on job openings
          </motion.p>
          
          {/* Social Icons Placeholder - Responsive */}
          <motion.div
            className="flex justify-center space-x-4 sm:space-x-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 6.5,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
          >
            {["📧", "📱", "🔗"].map((icon, index) => (
              <motion.div
                key={index}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background/20 backdrop-blur-sm border border-white/10 flex items-center justify-center cursor-pointer flex-shrink-0"
                whileHover={{
                  scale: 1.2,
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  rotate: 360,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="text-sm sm:text-lg">{icon}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Corner Decorations - Responsive */}
      <motion.div
        className="absolute top-2 left-2 w-8 h-8 sm:top-4 sm:left-4 sm:w-12 sm:h-12 md:w-16 md:h-16 border-l-2 border-t-2 border-purple-500/30 rounded-tl-lg"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 7, duration: 1 }}
      />
      
      <motion.div
        className="absolute top-2 right-2 w-8 h-8 sm:top-4 sm:right-4 sm:w-12 sm:h-12 md:w-16 md:h-16 border-r-2 border-t-2 border-blue-500/30 rounded-tr-lg"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 7.2, duration: 1 }}
      />
      
      <motion.div
        className="absolute bottom-2 left-2 w-8 h-8 sm:bottom-4 sm:left-4 sm:w-12 sm:h-12 md:w-16 md:h-16 border-l-2 border-b-2 border-pink-500/30 rounded-bl-lg"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 7.4, duration: 1 }}
      />
      
      <motion.div
        className="absolute bottom-2 right-2 w-8 h-8 sm:bottom-4 sm:right-4 sm:w-12 sm:h-12 md:w-16 md:h-16 border-r-2 border-b-2 border-purple-500/30 rounded-br-lg"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 7.6, duration: 1 }}
      />
    </div>
  );
}