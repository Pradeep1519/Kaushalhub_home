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
    students: "2,847",
    rating: "4.8",
    price: "₹29,999",
    originalPrice: "₹49,999",
    category: "Automation",
    level: "Advanced",
    discount: "40% OFF"
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing With AI & E-Commerce",
    description: "Complete digital marketing course covering SEO, social media, PPC, and analytics.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    duration: "3 Months",
    students: "3,521",
    rating: "4.9",
    price: "₹29,999",
    originalPrice: "₹49,999",
    category: "Marketing", 
    level: "Advanced",
    discount: "40% OFF"
  },
  {
    id: "tally-gst",
    title: "Tally with GST + Advanced Excel",
    description: "Master Tally accounting software with GST compliance and advanced financial reporting.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
    duration: "3 Months",
    students: "1,956",
    rating: "4.7",
    price: "₹29,999",
    originalPrice: "₹49,999",
    category: "Accounting",
    level: "Advanced",
    discount: "40% OFF"
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
    <section id="courses" className="py-20 bg-muted/30 transition-colors duration-300">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Popular
              <span className="block bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Courses
              </span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our wide range of expert-led courses designed to help you master new skills and advance your career.
            </p>
          </div>
        </ScrollReveal>

        {/* Courses Grid */}
        <div className="grid gap-6 sm:gap-8 mb-12 
          grid-cols-1 sm:grid-cols-2 
          lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] justify-items-center">
          {coursesData.map((course, index) => (
            <ScrollReveal key={course.id} delay={index * 100}>
              <AnimatedCard className="overflow-hidden bg-card border-border group w-full max-w-sm" glowEffect>
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-background/90 text-foreground border border-border/50 backdrop-blur-sm">{course.category}</Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-blue-100/90 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 backdrop-blur-sm">
                        {course.level}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold">{course.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground line-clamp-3">{course.description}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BadgePercent className="w-4 h-4 text-green-600" />
                        <span>{course.discount}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-4 sm:p-6 pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                  <div className="flex flex-col">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600">{course.price}</div>
                    <div className="text-sm text-muted-foreground line-through">{course.originalPrice}</div>
                    <div className="text-xs text-green-600 font-medium">40% OFF</div>
                  </div>
                  <AnimatedButton 
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 hover-lift"
                    glowEffect
                    onClick={() => handleViewCourse(course.id)}
                  >
                    View Course
                  </AnimatedButton>
                </CardFooter>
              </AnimatedCard>
            </ScrollReveal>
          ))}
        </div>

        {/* View All Button */}
        <ScrollReveal>
          <div className="text-center">
            <AnimatedButton 
              variant="outline" 
              size="lg" 
              className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30"
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