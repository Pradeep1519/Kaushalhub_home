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
    <div className={`${styles.careersContainer} flex items-center justify-center p-4`}>
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Main Content */}
      <div className="relative z-10 text-center w-full max-w-6xl mx-auto">
        {/* Decorative Icons */}
        <motion.div
          className="absolute -top-20 -left-20 text-purple-500/20"
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
          <Sparkles size={40} />
        </motion.div>
        
        <motion.div
          className="absolute -top-16 -right-16 text-blue-500/20"
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
          <Rocket size={36} />
        </motion.div>
        
        <motion.div
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-pink-500/20"
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
          <Heart size={32} />
        </motion.div>

        {/* Main Heading with Gradient Animation */}
        <motion.div
          className="mb-8"
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
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight ${styles.gradientText}`}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            whileHover={{
              scale: 1.05,
            }}
          >
            We will hire soon
          </motion.h1>
          
          {/* Glowing Border Effect */}
          <motion.div
            className="absolute inset-0 rounded-lg"
            style={{
              background: "linear-gradient(45deg, #9333ea, #3b82f6, #ec4899, #9333ea)",
              backgroundSize: "400% 400%",
              opacity: 0.1,
              filter: "blur(20px)",
              zIndex: -1,
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

        {/* Typewriter Subtext */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <TypewriterText
            text="Stay tuned for opportunities"
            delay={2000}
            speed={80}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground"
          />
        </motion.div>

        {/* Animated Stats */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
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
              className="text-center p-4 rounded-xl bg-background/10 backdrop-blur-sm border border-white/10"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.15)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div
                className="text-2xl mb-2"
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
              <div className="text-sm text-muted-foreground">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5, duration: 0.8 }}
        >
          <AnimatedButton
            onClick={() => onNavigate?.("home")}
            size="lg"
            className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 hover:from-purple-700 hover:via-blue-700 hover:to-pink-700 text-white border-0 px-8 py-4 text-lg font-medium"
            glowEffect
          >
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ x: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <ArrowLeft className="w-5 h-5 group-hover:animate-pulse" />
              <span>Back to Home</span>
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

        {/* Floating Call-to-Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 6, duration: 0.8 }}
        >
          <motion.p
            className="text-sm text-muted-foreground mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Follow us for updates on job openings
          </motion.p>
          
          {/* Social Icons Placeholder */}
          <motion.div
            className="flex justify-center space-x-6"
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
                className="w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm border border-white/10 flex items-center justify-center cursor-pointer"
                whileHover={{
                  scale: 1.2,
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  rotate: 360,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="text-lg">{icon}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Corner Decorations */}
      <motion.div
        className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-purple-500/30 rounded-tl-lg"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 7, duration: 1 }}
      />
      
      <motion.div
        className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-blue-500/30 rounded-tr-lg"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 7.2, duration: 1 }}
      />
      
      <motion.div
        className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-pink-500/30 rounded-bl-lg"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 7.4, duration: 1 }}
      />
      
      <motion.div
        className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-purple-500/30 rounded-br-lg"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 7.6, duration: 1 }}
      />
    </div>
  );
}