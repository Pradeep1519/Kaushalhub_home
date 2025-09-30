import { Button } from "./ui/button";
import { ArrowRight, Users, Clock, Trophy } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

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
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border-2 border-white rounded-lg rotate-45"></div>
        <div className="absolute bottom-20 left-32 w-12 h-12 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-32 right-10 w-24 h-24 border-2 border-white rounded-lg rotate-12"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white space-y-8">
          {/* Main Headline */}
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight">
            Ready to Transform
            <span className="block">Your Career?</span>
          </h2>
          
          <p className="text-lg sm:text-xl lg:text-2xl opacity-90 max-w-2xl mx-auto">
            Join thousands of successful students and start building the future you deserve today.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 py-6 sm:py-8">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="w-5 sm:w-6 h-5 sm:h-6" />
              </div>
              <div className="font-semibold text-sm sm:text-base">Expert Instructors</div>
              <div className="text-xs sm:text-sm opacity-80 text-center">Learn from industry professionals</div>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Clock className="w-5 sm:w-6 h-5 sm:h-6" />
              </div>
              <div className="font-semibold text-sm sm:text-base">Flexible Schedule</div>
              <div className="text-xs sm:text-sm opacity-80 text-center">Study at your own pace</div>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Trophy className="w-5 sm:w-6 h-5 sm:h-6" />
              </div>
              <div className="font-semibold text-sm sm:text-base">Career Support</div>
              <div className="text-xs sm:text-sm opacity-80 text-center">Job placement assistance</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8"
              onClick={() => window.location.href = user ? "/dashboard" : "/signup"}
            >
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10 font-semibold px-8"
              onClick={() => onNavigate?.("courses")}
            >
              View All Courses
            </Button>
          </div>

          {/* Special Offer */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mt-6 sm:mt-8">
            <div className="text-base sm:text-lg font-semibold mb-2">🎉 Limited Time Offer</div>
            <div className="text-xs sm:text-sm opacity-90">
              Get 40% off your first course when you enroll this month. Use code <span className="font-mono bg-white/20 px-2 py-1 rounded text-xs sm:text-sm">LEARN40</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}