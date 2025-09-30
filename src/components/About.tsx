import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CheckCircle } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { motion } from "motion/react";

export function About() {
  return (
    <section id="about" className="py-20 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - Image */}
          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1675664535114-99fcb3c80c82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwc3R1ZGVudHMlMjBsZWFybmluZyUyMG9ubGluZXxlbnwxfHx8fDE3NTczNDY2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Diverse students learning online"
              className="w-full h-auto rounded-2xl shadow-xl"
            />
            <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 bg-gradient-to-br from-blue-600 to-teal-600 text-white p-4 sm:p-6 rounded-xl shadow-xl">
              <div className="text-xl sm:text-2xl font-bold">2+</div>
              <div className="text-xs sm:text-sm opacity-90">Years Experience</div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                About
                <span className="block bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  KaushalHub NaukriPath
                </span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                We're revolutionizing education by making high-quality learning accessible to everyone, 
                anywhere. Our platform combines cutting-edge technology with expert instruction to 
                deliver an unparalleled learning experience.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground">Expert Instructors</h4>
                  <p className="text-muted-foreground">Learn from industry professionals with real-world experience</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground">Hands-on Projects</h4>
                  <p className="text-muted-foreground">Build real projects that you can showcase in your portfolio</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground">Career Support</h4>
                  <p className="text-muted-foreground">Get personalized career guidance and job placement assistance</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground">Flexible Learning</h4>
                  <p className="text-muted-foreground">Study at your own pace with lifetime access to course materials</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-2">
                <span>Learn more about our mission</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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