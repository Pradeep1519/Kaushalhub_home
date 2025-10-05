import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ScrollReveal } from "./ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Financial Analyst at TCS",
    image: "https://images.unsplash.com/photo-1561065533-316e3142d586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHN0dWRlbnQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTczMTk3OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    testimonial: "The Advanced Excel with AI course revolutionized how I work with data. The AI integration techniques and advanced formulas helped me become more efficient and get promoted to a senior analyst role.",
    rating: 5,
    course: "Advanced Excel with AI"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    role: "Automation Engineer at L&T",
    image: "https://images.unsplash.com/photo-1561065533-316e3142d586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHN0dWRlbnQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTczMTk3OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    testimonial: "The PLC Programming course was incredibly comprehensive. The hands-on projects with real industrial scenarios prepared me perfectly for my current role. The instructors have genuine industry experience.",
    rating: 5,
    course: "PLC Programming"
  },
  {
    id: 3,
    name: "Sneha Patel",
    role: "Digital Marketing Manager at Flipkart",
    image: "https://images.unsplash.com/photo-1561065533-316e3142d586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHN0dWRlbnQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTczMTk3OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    testimonial: "EduTech's Digital Marketing course gave me practical skills that I use daily. The real campaign projects and latest industry trends covered in the course helped me secure my dream job at Flipkart.",
    rating: 5,
    course: "Digital Marketing"
  },
  {
    id: 4,
    name: "Amit Verma",
    role: "Accounts Manager at Reliance",
    image: "https://images.unsplash.com/photo-1561065533-316e3142d586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHN0dWRlbnQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTczMTk3OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    testimonial: "The Tally with GST course was exactly what I needed. The practical approach to learning Tally ERP and GST compliance gave me the confidence to handle complex accounting tasks in my new role.",
    rating: 5,
    course: "Tally with GST"
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  // Animation variants for smooth transitions
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    })
  };

  return (
    <section id="testimonials" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
              What Our
              <span className="block bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mt-1 lg:mt-2">
                Students Say
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground dark:text-gray-300 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed sm:leading-loose px-4 sm:px-0">
              Don't just take our word for it. Hear from our successful graduates who have transformed their careers.
            </p>
          </div>
        </ScrollReveal>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <Card className="overflow-hidden shadow-2xl bg-white dark:bg-gray-800">
            <CardContent className="p-4 sm:p-6 lg:p-8 xl:p-12">
              <div className="relative h-64 sm:h-72 lg:h-80">
                <AnimatePresence mode="popLayout" custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 items-center h-full">
                      {/* Student Image - Responsive sizing */}
                      <div className="lg:col-span-1 flex justify-center order-2 lg:order-1">
                        <div className="relative">
                          <ImageWithFallback
                            src={currentTestimonial.image}
                            alt={currentTestimonial.name}
                            className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 rounded-full object-cover shadow-xl"
                            fallbackSrc="/student-placeholder.jpg"
                          />
                          <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full p-2 sm:p-3">
                            <Quote className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Testimonial Content */}
                      <div className="lg:col-span-2 space-y-4 sm:space-y-6 order-1 lg:order-2">
                        {/* Rating - Responsive alignment */}
                        <div className="flex justify-center lg:justify-start">
                          {[...Array(currentTestimonial.rating)].map((_, i) => (
                            <Star 
                              key={i} 
                              className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 fill-yellow-400 text-yellow-400" 
                            />
                          ))}
                        </div>

                        {/* Testimonial Text - Responsive typography */}
                        <blockquote className="text-base sm:text-lg lg:text-xl text-muted-foreground dark:text-gray-300 leading-relaxed sm:leading-loose text-center lg:text-left">
                          "{currentTestimonial.testimonial}"
                        </blockquote>

                        {/* Student Info - Responsive typography */}
                        <div className="text-center lg:text-left space-y-1 sm:space-y-2">
                          <div className="font-bold text-lg sm:text-xl lg:text-2xl text-foreground dark:text-white">
                            {currentTestimonial.name}
                          </div>
                          <div className="text-sm sm:text-base text-muted-foreground dark:text-gray-400">
                            {currentTestimonial.role}
                          </div>
                          <div className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium">
                            Graduate of {currentTestimonial.course}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons - Responsive sizing */}
          <div className="flex justify-center space-x-3 sm:space-x-4 mt-6 sm:mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full border-border dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 w-10 h-10 sm:w-12 sm:h-12 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full border-border dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 w-10 h-10 sm:w-12 sm:h-12 transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>

          {/* Dots Indicator - Increased margin top for more space */}
          <div className="flex justify-center space-x-2 sm:space-x-3 mt-8 sm:mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const newDirection = index > currentIndex ? 1 : -1;
                  setDirection(newDirection);
                  setCurrentIndex(index);
                }}
                className={`transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-blue-600 to-teal-600' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                style={{
                  width: index === currentIndex ? '24px' : '12px',
                  height: '12px',
                  borderRadius: '6px'
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats - Enhanced responsive grid */}
        <ScrollReveal delay={200}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-16 lg:mt-20 max-w-4xl mx-auto">
            {[
              { value: "100%", label: "Job Placement Rate" },
              { value: "4.8", label: "Average Rating" },
              { value: "10K+", label: "Graduates" },
              { value: "₹5L+", label: "Avg. Starting Salary" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center p-4 sm:p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-300"
              >
                <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}