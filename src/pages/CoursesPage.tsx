// src/pages/CoursesPage.tsx - COMPLETE FIXED VERSION
import { motion } from "motion/react";
import { Search, Grid, List, Clock, Users, Star } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { AnimatedCard } from "../components/AnimatedCard";
import { useState } from "react";

// ✅ COURSES DATA - YAHI FILE MEIN (Course IDs match with CourseDetailsPage)
const coursesData = [
  {
    id: "plc-automation", // ✅ Same ID as CourseDetailsPage
    title: "PLC & Automation",
    description: "Learn industrial automation with PLC programming, ladder logic, and SCADA systems.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop",
    duration: "3 Months",
    students: "2,847",
    rating: "4.8",
    price: "₹49,999",
    category: "Automation",
    level: "Advanced"
  },
  {
    id: "digital-marketing", // ✅ Same ID as CourseDetailsPage
    title: "Digital Marketing With AI & E-Commerce",
    description: "Complete digital marketing course covering SEO, social media, PPC, and analytics.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    duration: "3 Months",
    students: "3,521",
    rating: "4.9",
    price: "₹49,999",
    category: "Marketing",
    level: "Advanced"
  },
  {
    id: "tally-gst", // ✅ Same ID as CourseDetailsPage
    title: "Tally with GST + Advanced Excel",
    description: "Master Tally accounting software with GST compliance and advanced financial reporting.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
    duration: "3 Months",
    students: "1,956",
    rating: "4.7",
    price: "₹49,999",
    category: "Accounting",
    level: "Advanced"
  }
];

const categories = ["All", "Automation", "Marketing", "Accounting", "General"];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];

interface CoursesPageProps {
  onNavigate?: (page: string, data?: any) => void;
}

// ✅ FIXED COURSE CARD COMPONENT
function CourseCard({ course, index = 0, onViewCourse }: { 
  course: any; 
  index?: number; 
  onViewCourse?: (courseId: string) => void; 
}) {
  
  // ✅ FIXED: Simple click handler
  const handleViewCourseClick = () => {
    console.log('🎯 CourseCard: View Course clicked - ID:', course.id);
    if (onViewCourse) {
      onViewCourse(course.id); // ✅ Direct course.id pass karo
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <AnimatedCard className="overflow-hidden bg-card border-border group cursor-pointer h-full" hoverScale={1.03}>
        <CardHeader className="p-0">
          <div className="relative overflow-hidden">
            <ImageWithFallback
              src={course.image}
              alt={course.title}
              className="w-full h-40 xs:h-44 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
              <Badge className="bg-background/90 text-foreground border border-border/50 backdrop-blur-sm text-xs">
                {course.category}
              </Badge>
            </div>
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
              <Badge variant="secondary" className="bg-blue-100/90 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 backdrop-blur-sm text-xs">
                {course.level}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-5 lg:p-6">
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-bold group-hover:text-blue-600 transition-colors duration-300 leading-tight">
              {course.title}
            </h3>
            <p className="text-muted-foreground line-clamp-3 leading-relaxed text-xs sm:text-sm">
              {course.description}
            </p>
            
            <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{course.students}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                <span>{course.rating}</span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 sm:p-5 lg:p-6 pt-0 flex flex-col gap-3">
          {/* ✅ PRICE SECTION - Responsive layout */}
          <div className="flex flex-col xs:flex-row xs:items-center justify-between w-full gap-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold text-blue-600">{course.price}</span>
              </div>
              <div className="text-xs text-green-600 font-medium mt-1">
                One-time payment
              </div>
            </div>
            {/* ✅ FIXED: Button with proper click handler */}
            <button 
              className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white text-xs sm:text-sm px-3 sm:px-4 py-2 h-auto rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={handleViewCourseClick}
            >
              View Course
            </button>
          </div>
        </CardFooter>
      </AnimatedCard>
    </motion.div>
  );
}

// ✅ MAIN COURSES PAGE COMPONENT - FIXED NAVIGATION
export function CoursesPage({ onNavigate }: CoursesPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // ✅ FIXED: Course details navigation - CORRECT FORMAT
  const handleViewCourse = (courseId: string) => {
    console.log('🚀 CoursesPage: Navigating to course details -', courseId);
    
    if (onNavigate) {
      // ✅ CORRECT: Use "course-details" with courseId as second parameter
      onNavigate("course-details", courseId);
    } else {
      console.error('❌ onNavigate function not available');
    }
  };

  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "All" || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero Section - Responsive */}
      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 sm:space-y-6 max-w-4xl mx-auto">
            <motion.h1 
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight px-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Explore Our
              <span className="block bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mt-1 sm:mt-2">
                Premium Courses
              </span>
            </motion.h1>
            <motion.p 
              className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Browse our specialized courses and click "View Course" to see detailed information.
            </motion.p>
            
            {/* Stats - Responsive Grid */}
            <motion.div 
              className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pt-6 sm:pt-8 max-w-md sm:max-w-lg mx-auto px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="text-center">
                <div className="font-bold text-blue-600 text-sm sm:text-base lg:text-lg mb-1">2K+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Active Students</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-teal-600 text-sm sm:text-base lg:text-lg mb-1">{coursesData.length}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Courses</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-purple-600 text-sm sm:text-base lg:text-lg mb-1">99%</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Success Rate</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters & Search Section - Responsive */}
      <section className="py-8 sm:py-10 lg:py-12 border-b border-border">
        <div className="container mx-auto px-3 sm:px-4 lg:px-8">
          <div className="space-y-4 sm:space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto px-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Filters - Responsive Layout */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full lg:w-auto">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-1 sm:gap-2 justify-center sm:justify-start">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className={`cursor-pointer transition-all duration-200 text-xs sm:text-sm ${
                        selectedCategory === category 
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>

                <div className="hidden sm:block h-6 w-px bg-border" />

                {/* Level Filter */}
                <div className="flex flex-wrap gap-1 sm:gap-2 justify-center sm:justify-start">
                  {levels.map((level) => (
                    <Badge
                      key={level}
                      variant={selectedLevel === level ? "secondary" : "outline"}
                      className={`cursor-pointer transition-all duration-200 text-xs sm:text-sm ${
                        selectedLevel === level 
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setSelectedLevel(level)}
                    >
                      {level}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex items-center space-x-2 self-center">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="hover:scale-105 transition-transform duration-200 p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Grid className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="hover:scale-105 transition-transform duration-200 p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <List className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-center text-muted-foreground text-sm sm:text-base px-2">
              Showing {filteredCourses.length} of {coursesData.length} courses
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid - Responsive */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-3 sm:px-4 lg:px-8">
          <motion.div 
            className={`grid gap-4 sm:gap-6 lg:gap-8 ${
              viewMode === "grid" 
                ? "grid-cols-1 xs:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1 max-w-4xl mx-auto"
            }`}
            layout
            transition={{ duration: 0.3 }}
          >
            {filteredCourses.map((course, index) => (
              <CourseCard 
                key={course.id}
                course={course} 
                index={index}
                onViewCourse={handleViewCourse}
              />
            ))}
          </motion.div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-16 sm:py-20 px-4">
              <div className="text-muted-foreground mb-4 text-base sm:text-lg">
                No courses found matching your criteria
              </div>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setSelectedLevel("All");
                }}
                className="hover:scale-105 transition-transform duration-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default CoursesPage;