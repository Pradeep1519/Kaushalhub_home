import { Button } from "./ui/button";
import { ArrowRight, Users, Clock, Trophy } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { AnimatedButton } from "./AnimatedButton";
import { motion } from "motion/react";

interface CTABannerProps {
  onNavigate?: (page: string) => void;
}

export function CTABanner({ onNavigate }: CTABannerProps) {
  const { user } = useAuth();

  // Function to scroll to courses section
  const handleScrollToCourses = () => {
    const coursesSection = document.getElementById('courses');
    if (coursesSection) {
      coursesSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleGetStarted = () => {
    if (user) {
      onNavigate?.("dashboard");
    } else {
      onNavigate?.("signup");
    }
  };

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 overflow-hidden">
      {/* Background Pattern - Animated Circles */}
      <div className="absolute inset-0 opacity-5 sm:opacity-10">
        {/* Large screens - animated circles */}
        <motion.div 
          className="hidden sm:block absolute top-10 left-10 w-16 h-16 sm:w-20 sm:h-20 border-2 border-white rounded-full"
          animate={{
            x: [0, 10, 0],
            y: [0, -5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="hidden sm:block absolute top-32 right-20 w-12 h-12 sm:w-16 sm:h-16 border-2 border-white rounded-lg rotate-45"
          animate={{
            x: [0, -15, 0],
            y: [0, 10, 0],
            rotate: [45, 60, 45],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="hidden sm:block absolute bottom-20 left-32 w-10 h-10 sm:w-12 sm:h-12 border-2 border-white rounded-full"
          animate={{
            x: [0, 8, 0],
            y: [0, 12, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="hidden sm:block absolute bottom-32 right-10 w-16 h-16 sm:w-24 sm:h-24 border-2 border-white rounded-lg rotate-12"
          animate={{
            x: [0, -20, 0],
            y: [0, -8, 0],
            rotate: [12, 30, 12],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        
        {/* Mobile - animated circles */}
        <motion.div 
          className="sm:hidden absolute top-6 left-6 w-12 h-12 border border-white rounded-full"
          animate={{
            x: [0, 5, 0],
            y: [0, -3, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="sm:hidden absolute bottom-6 right-6 w-10 h-10 border border-white rounded-lg rotate-45"
          animate={{
            x: [0, -8, 0],
            y: [0, 5, 0],
            rotate: [45, 60, 45],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="sm:hidden absolute top-1/2 left-1/4 w-8 h-8 border border-white rounded-full"
          animate={{
            x: [0, 6, 0],
            y: [0, 8, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-teal-500/10 animate-pulse-slow"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white space-y-6 sm:space-y-8 lg:space-y-10">
          {/* Main Headline */}
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight sm:leading-tighter">
              Ready to Transform
              <span className="block bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mt-1 sm:mt-2">
                Your Career?
              </span>
            </h2>
            
            <p className="text-base sm:text-lg lg:text-xl opacity-90 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed sm:leading-loose px-2 sm:px-0">
              Join thousands of successful students and start building the future you deserve today.
            </p>
          </div>

          {/* Features Grid - Improved Responsive Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 py-4 sm:py-6 lg:py-8">
            <motion.div 
              className="flex flex-col items-center space-y-2 sm:space-y-3 p-4 sm:p-6 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
              </div>
              <div className="font-semibold text-sm sm:text-base lg:text-lg">Expert Instructors</div>
              <div className="text-xs sm:text-sm opacity-80 text-center leading-tight">
                Learn from industry professionals
              </div>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center space-y-2 sm:space-y-3 p-4 sm:p-6 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
              </div>
              <div className="font-semibold text-sm sm:text-base lg:text-lg">Flexible Schedule</div>
              <div className="text-xs sm:text-sm opacity-80 text-center leading-tight">
                Study at your own pace
              </div>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center space-y-2 sm:space-y-3 p-4 sm:p-6 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
              </div>
              <div className="font-semibold text-sm sm:text-base lg:text-lg">Career Support</div>
              <div className="text-xs sm:text-sm opacity-80 text-center leading-tight">
                Job placement assistance
              </div>
            </motion.div>
          </div>

          {/* CTAs - Improved Responsive Layout */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-stretch sm:items-center w-full max-w-md sm:max-w-lg mx-auto">
            <AnimatedButton 
              className="bg-white text-blue-600 hover:bg-gray-50 font-semibold text-base sm:text-lg px-6 sm:px-8 lg:px-10 py-3 sm:py-4 flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300"
              glowEffect
              onClick={handleGetStarted}
            >
              Get Started Today
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
            </AnimatedButton>
            
            <AnimatedButton 
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 font-semibold text-base sm:text-lg px-6 sm:px-8 lg:px-10 py-3 sm:py-4 flex items-center justify-center w-full sm:w-auto backdrop-blur-sm transition-all duration-300"
              onClick={() => onNavigate?.("courses")}
            >
              View All Courses
            </AnimatedButton>
          </div>

          {/* Special Offer - CENTERED with Animation */}
          <motion.div 
            className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 mt-6 sm:mt-8 lg:mt-10 border border-white/20 hover:border-white/30 transition-all duration-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 text-center">
              <motion.div 
                className="text-2xl sm:text-3xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🎉
              </motion.div>
              <div className="flex-1">
                <div className="font-semibold text-base sm:text-lg lg:text-xl mb-2 sm:mb-3">
                  Limited Time Offer
                </div>
                <div className="text-xs sm:text-sm lg:text-base opacity-90 flex flex-col items-center gap-2 justify-center">
                  <span>Get 40% off your first course when you enroll this month.</span>
                  <div className="flex items-center gap-2">
                    <span>Use code</span>
                    <motion.code 
                      className="font-mono bg-white/20 px-3 sm:px-4 py-1.5 rounded text-sm sm:text-base lg:text-lg border border-white/30 font-bold"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      LEARN40
                    </motion.code>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <div className="pt-4 sm:pt-6 lg:pt-8 border-t border-white/20">
            <div className="text-xs sm:text-sm opacity-80">
              <span className="font-semibold">10,000+</span> students trusted us • <span className="font-semibold">98%</span> satisfaction rate • <span className="font-semibold">24/7</span> support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}