import { Button } from "./ui/button";
import { Users, Clock, Trophy, Star, CheckCircle, ArrowUpRight } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { AnimatedButton } from "./AnimatedButton";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface CTABannerProps {
  onNavigate?: (page: string) => void;
}

export function CTABanner({ onNavigate }: CTABannerProps) {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGetStarted = () => {
    if (user) {
      onNavigate?.("dashboard");
    } else {
      onNavigate?.("signup");
    }
  };

  const features = [
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from industry professionals with 10+ years experience",
      color: "from-blue-500 to-cyan-500",
      stats: "50+ Experts"
    },
    {
      icon: Clock,
      title: "Flexible Learning",
      description: "Study at your own pace with lifetime access",
      color: "from-purple-500 to-pink-500",
      stats: "Self-Paced"
    },
    {
      icon: Trophy,
      title: "Career Growth",
      description: "Get job-ready with practical skills and projects",
      color: "from-green-500 to-emerald-500",
      stats: "98% Success"
    }
  ];

  const benefits = [
    "Industry-recognized certificates",
    "Hands-on projects & assignments",
    "1-on-1 mentorship sessions",
    "Career guidance & placement support",
    "Lifetime community access",
    "Flexible payment options"
  ];

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#374151_1px,transparent_1px),linear-gradient(to_bottom,#374151_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 dark:opacity-20" />
        
        {/* Animated Gradients */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-full blur-3xl opacity-50 dark:opacity-30"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full blur-3xl opacity-50 dark:opacity-30"
          animate={{
            x: [0, -15, 0],
            y: [0, 15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-100 dark:border-blue-800"
                >
                  <Star className="w-4 h-4 text-blue-600 dark:text-blue-400 fill-current" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    Trusted by 10,000+ Students
                  </span>
                </motion.div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                  Ready to Advance
                  <motion.span 
                    className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mt-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    Your Career?
                  </motion.span>
                </h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                >
                  Join thousands of professionals who transformed their careers with our industry-focused courses. Get the skills that employers are looking for.
                </motion.p>
              </div>

              {/* Benefits List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="space-y-3"
              >
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <AnimatedButton
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={handleGetStarted}
                >
                  Start Learning Today
                </AnimatedButton>
                
                <Button
                  variant="outline"
                  className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-lg px-8 py-4 rounded-xl transition-all duration-300 group"
                  onClick={() => onNavigate?.("courses")}
                >
                  Browse Courses
                  <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="pt-6 border-t border-gray-200 dark:border-gray-700"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Trusted by professionals at</p>
                <div className="flex flex-wrap gap-6 opacity-60 dark:opacity-70">
                  {["TCS", "Infosys", "Wipro", "Accenture", "Amazon", "Microsoft"].map((company, index) => (
                    <motion.span
                      key={company}
                      className="text-gray-700 dark:text-gray-300 font-semibold text-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={isVisible ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                    >
                      {company}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Features Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-500 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  {/* Background Gradient on Hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />
                  
                  <div className="relative z-10 flex items-start gap-4">
                    {/* Icon */}
                    <motion.div
                      className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                      whileHover={{ scale: 1.05, rotate: 5 }}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                          {feature.title}
                        </h3>
                        <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                          {feature.stats}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Animated Border */}
                  <motion.div
                    className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${feature.color} group-hover:w-full transition-all duration-500`}
                  />
                </motion.div>
              ))}

              {/* Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="bg-gradient-to-br from-gray-900 to-blue-900 dark:from-gray-800 dark:to-blue-800 rounded-2xl p-6 text-white shadow-xl"
              >
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { number: "10K+", label: "Students" },
                    { number: "98%", label: "Success Rate" },
                    { number: "50+", label: "Courses" }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                    >
                      <div className="text-2xl font-bold text-white mb-1">
                        {stat.number}
                      </div>
                      <div className="text-sm text-blue-200 dark:text-blue-300">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}