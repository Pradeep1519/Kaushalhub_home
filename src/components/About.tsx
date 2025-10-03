import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CheckCircle } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { motion } from "motion/react";

export function About() {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            
            {/* Left - Image Section */}
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1675664535114-99fcb3c80c82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwc3R1ZGVudHMlMjBsZWFybmluZyUyMG9ubGluZXxlbnwxfHx8fDE3NTczNDY2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Diverse students learning online"
                  className="w-full h-auto aspect-[4/3] object-cover"
                  fallbackSrc="/placeholder-image.jpg"
                />
              </div>
              
              {/* ✅ UPDATED: Experience Badge - Left side with up-down motion */}
              <motion.div 
                className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 lg:-bottom-6 lg:-left-6 bg-gradient-to-br from-blue-600 to-teal-600 text-white p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl shadow-xl"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold leading-tight">2+</div>
                <div className="text-xs sm:text-sm lg:text-base opacity-90 whitespace-nowrap">
                  Years Experience
                </div>
              </motion.div>
            </div>

            {/* Right - Content Section */}
            <div className="space-y-6 lg:space-y-8 order-1 lg:order-2">
              {/* Heading Section */}
              <div className="space-y-4 lg:space-y-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                  About
                  <span className="block bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mt-1 lg:mt-2">
                    KaushalHub NaukriPath
                  </span>
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed sm:leading-loose">
                  We're revolutionizing education by making high-quality learning accessible to everyone, 
                  anywhere. Our platform combines cutting-edge technology with expert instruction to 
                  deliver an unparalleled learning experience.
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4 lg:space-y-6">
                <div className="flex items-start gap-3 lg:gap-4">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground text-base sm:text-lg lg:text-xl">
                      Expert Instructors
                    </h4>
                    <p className="text-muted-foreground text-sm sm:text-base lg:text-lg mt-1 leading-relaxed">
                      Learn from industry professionals with real-world experience
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 lg:gap-4">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground text-base sm:text-lg lg:text-xl">
                      Hands-on Projects
                    </h4>
                    <p className="text-muted-foreground text-sm sm:text-base lg:text-lg mt-1 leading-relaxed">
                      Build real projects that you can showcase in your portfolio
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 lg:gap-4">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground text-base sm:text-lg lg:text-xl">
                      Career Support
                    </h4>
                    <p className="text-muted-foreground text-sm sm:text-base lg:text-lg mt-1 leading-relaxed">
                      Get personalized career guidance and job placement assistance
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 lg:gap-4">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground text-base sm:text-lg lg:text-xl">
                      Flexible Learning
                    </h4>
                    <p className="text-muted-foreground text-sm sm:text-base lg:text-lg mt-1 leading-relaxed">
                      Study at your own pace with lifetime access to course materials
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4 lg:pt-6">
                <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 group transition-colors duration-200 text-base sm:text-lg lg:text-xl">
                  <span>Learn more about our mission</span>
                  <svg 
                    className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}