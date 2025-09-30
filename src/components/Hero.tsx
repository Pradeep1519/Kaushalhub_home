import { Button } from "./ui/button";
import { ArrowRight, Play } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ScrollReveal } from "./ScrollReveal";
import { AnimatedButton } from "./AnimatedButton";
import { courses, useAuth } from "../contexts/AuthContext";
import { motion } from "motion/react";
import { CourseDetailsPage } from "../pages/CourseDetailsPage";
import { Courses } from "./Courses";

interface HeroProps {
  onNavigate?: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const { user } = useAuth();

  // Function to handle all CTAs - scroll to courses section
  const handleScrollToCourses = () => {
    const coursesSection = document.getElementById('courses');
    if (coursesSection) {
      coursesSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-background to-teal-50 dark:from-blue-950/20 dark:via-background dark:to-teal-950/20 py-20 lg:py-32 transition-colors duration-300">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  Transform Your
                </motion.span>
                <motion.span 
                  className="block bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Future with
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  Modern Education
                </motion.span>
              </h1>
              <motion.p 
                className="text-base sm:text-lg text-muted-foreground max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                Join thousands of students who are already building their careers with our cutting-edge courses. 
                Learn from industry experts and get hands-on experience with real-world projects.
              </motion.p>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <AnimatedButton 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
                glowEffect
                onClick={() => onNavigate?.("coursespage")}
              >
                Apply Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </AnimatedButton>
              <AnimatedButton variant="outline" size="lg" className="border-border">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </AnimatedButton>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              {[
                { value: "10K+", label: "Students", color: "text-blue-600" },
                { value: "4", label: "Specialized Courses", color: "text-teal-600" },
                { value: "100%", label: "Job Placement", color: "text-purple-600" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center sm:text-left"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                >
                  <div className={`text-xl sm:text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Hero Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div 
              className="relative z-10"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1725203653092-494c7eec1a30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlZHVjYXRpb24lMjB0ZWNobm9sb2d5JTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc1NzM5NDQ3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Modern education technology illustration"
                className="w-full h-auto rounded-2xl shadow-2xl hover-lift"
              />
            </motion.div>
            
            {/* Background Decoration */}
            <motion.div 
              className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-blue-200 to-teal-200 dark:from-blue-900/20 dark:to-teal-900/20 rounded-2xl -z-10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            />
            
            {/* Floating Cards */}
            <motion.div 
              className="absolute -top-4 sm:-top-8 -left-4 sm:-left-8 bg-card border border-border rounded-xl shadow-lg p-3 sm:p-4 z-20 glass-effect animate-float"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 sm:w-3 h-2 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-medium text-card-foreground">Live Sessions</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-4 sm:-bottom-8 -right-4 sm:-right-8 bg-card border border-border rounded-xl shadow-lg p-3 sm:p-4 z-20 glass-effect animate-float"
              style={{ animationDelay: '3s' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 sm:w-3 h-2 sm:h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-medium text-card-foreground">24/7 Support</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}