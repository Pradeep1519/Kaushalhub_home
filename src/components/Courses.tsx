import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock, Users, Star, BadgePercent } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ScrollReveal } from "./ScrollReveal";
import { AnimatedCard } from "./AnimatedCard";
import { AnimatedButton } from "./AnimatedButton";
import React from "react";

interface CoursesProps {
  onNavigate?: (page: string, courseId?: string) => void;
}

// ✅ FIXED: Course IDs matched with CourseDetailsPage
const coursesData = [
  {
    id: "plc-automation",
    title: "PLC & Automation",
    description: "Learn industrial automation with PLC programming, ladder logic, and SCADA systems.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop",
    duration: "3 Months",
    students: "200+",
    rating: "4.8",
    price: "₹49,999",
    category: "Automation",
    level: "Advanced"
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing With AI & E-Commerce",
    description: "Complete digital marketing course covering SEO, social media, PPC, and analytics.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    duration: "3 Months",
    students: "150+",
    rating: "4.9",
    price: "₹49,999",
    category: "Marketing", 
    level: "Advanced"
  },
  {
    id: "tally-gst",
    title: "Tally with GST + Advanced Excel",
    description: "Master Tally accounting software with GST compliance and advanced financial reporting.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
    duration: "3 Months",
    students: "150+",
    rating: "4.7",
    price: "₹49,999",
    category: "Accounting",
    level: "Advanced"
  }
];

export function Courses({ onNavigate }: CoursesProps) {
  const handleViewCourse = (courseId: string) => {
    console.log('🎯 Courses Component: View Course clicked - ID:', courseId);
    if (onNavigate) {
      onNavigate("course-details", courseId);
    }
  };

  const handleViewAllCourses = () => {
    console.log('📚 Courses Component: View All Courses clicked');
    if (onNavigate) {
      onNavigate("courses");
    }
  };

  return (
    <section id="courses" className="py-16 sm:py-20 lg:py-24 bg-muted/30 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
              Popular
              <span className="block bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mt-1 lg:mt-2">
                Courses
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl lg:max-w-3xl mx-auto leading-relaxed sm:leading-loose px-4 sm:px-0">
              Choose from our wide range of expert-led courses designed to help you master new skills and advance your career.
            </p>
          </div>
        </ScrollReveal>

        {/* Courses Grid - Improved Responsive Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20 justify-items-center">
          {coursesData.map((course, index) => (
            <ScrollReveal key={course.id} delay={index * 100}>
              <div className="w-full max-w-sm sm:max-w-none">
                <AnimatedCard 
                  className="overflow-hidden bg-card border-border group w-full h-full flex flex-col"
                  glowEffect
                  hoverScale={1.03}
                  hoverY={-4}
                >
                  <CardHeader className="p-0 flex-shrink-0">
                    <div className="relative overflow-hidden">
                      <ImageWithFallback
                        src={course.image}
                        alt={course.title}
                        className="w-full h-40 sm:h-48 lg:h-52 object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        fallbackSrc="/course-placeholder.jpg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                        <Badge className="bg-background/90 text-foreground border border-border/50 backdrop-blur-sm text-xs sm:text-sm">
                          {course.category}
                        </Badge>
                      </div>
                      
                      {/* Level Badge */}
                      <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                        <Badge variant="secondary" className="bg-blue-100/90 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 backdrop-blur-sm text-xs sm:text-sm">
                          {course.level}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-4 sm:p-5 lg:p-6 flex-1 flex flex-col">
                    <div className="space-y-3 sm:space-y-4 flex-1">
                      {/* Course Title */}
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold leading-tight line-clamp-2">
                        {course.title}
                      </h3>
                      
                      {/* Course Description */}
                      <p className="text-sm sm:text-base text-muted-foreground line-clamp-3 leading-relaxed flex-1">
                        {course.description}
                      </p>

                      {/* Course Stats - Improved Responsive Layout */}
                      <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="truncate">{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Users className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="truncate">{course.students}</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                          <span className="truncate">{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <BadgePercent className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                          <span className="truncate">Best Price</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 sm:p-5 lg:p-6 pt-0 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 flex-shrink-0">
                    {/* Pricing Section - Only Original Price */}
                    <div className="flex flex-col justify-center w-full sm:w-auto">
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 leading-none">
                        {course.price}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Pay as you want
                      </div>
                    </div>
                    
                    {/* View Course Button */}
                    <AnimatedButton 
                      className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-medium text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-2.5"
                      glowEffect
                      responsiveSize="auto"
                      onClick={() => handleViewCourse(course.id)}
                    >
                      View Course
                    </AnimatedButton>
                  </CardFooter>
                </AnimatedCard>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* View All Button */}
        <ScrollReveal>
          <div className="text-center">
            <AnimatedButton 
              variant="outline" 
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
              responsiveSize="lg"
              onClick={handleViewAllCourses}
            >
              View All Courses
            </AnimatedButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}