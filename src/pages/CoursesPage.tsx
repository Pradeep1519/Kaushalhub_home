// src/pages/CoursesPage.tsx - COMPLETE VERSION
import { motion } from "motion/react";
import { Search, Grid, List, Clock, Users, Star, BadgePercent } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { AnimatedCard } from "../components/AnimatedCard";
import { AnimatedButton } from "../components/AnimatedButton";
import { useState } from "react";

// ✅ COURSES DATA - YAHI FILE MEIN
const coursesData = [
  {
    id: 1,
    title: "PLC & Automation",
    description: "Learn industrial automation with PLC programming, ladder logic, and SCADA systems.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop",
    duration: "3 Months",
    students: "2,847",
    rating: "4.8",
    discount: "40% OFF",
    price: "₹29,999",
    originalPrice: "₹49,999",
    category: "Automation",
    level: "Advanced"
  },
  {
    id: 2,
    title: "Digital Marketing With AI & E-Commerce",
    description: "Complete digital marketing course covering SEO, social media, PPC, and analytics.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    duration: "3 Months",
    students: "3,521",
    rating: "4.9",
    discount: "40% OFF",
    price: "₹29,999",
    originalPrice: "₹49,999",
    category: "Marketing",
    level: "Advanced"
  },
  {
    id: 3,
    title: "Tally with GST + Advanced Excel",
    description: "Master Tally accounting software with GST compliance and advanced financial reporting.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
    duration: "3 Months",
    students: "1,956",
    rating: "4.7",
    discount: "40% OFF",
    price: "₹29,999",
    originalPrice: "₹49,999",
    category: "Accounting",
    level: "Advanced"
  }
];

const categories = ["All", "Office Skills", "Automation", "Marketing", "Accounting", "General"];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];

interface CoursesPageProps {
  onNavigate?: (page: string) => void;
}

// ✅ COURSE CARD COMPONENT - YAHI FILE MEIN
function CourseCard({ course, index = 0, onViewCourse }: { 
  course: any; 
  index?: number; 
  onViewCourse?: (courseId: string) => void; 
}) {
  
  // ✅ Course ID mapping
  const getCourseId = (title: string): string => {
    const courseIdMap: Record<string, string> = {
      'Advanced Excel with AI': 'excel-ai',
      'PLC & Automation': 'plc-automation', 
      'Digital Marketing With AI & E-Commerce': 'digital-marketing',
      'Tally with GST + Advanced Excel': 'tally-gst'
    };
    return courseIdMap[title] || title.toLowerCase().replace(/\s+/g, '-');
  };

  const courseId = getCourseId(course.title);
  
  // ✅ SIMPLE View Course function
  const handleViewCourseClick = () => {
    console.log('🎯 CourseCard: View Course clicked - ID:', courseId);
    if (onViewCourse) {
      onViewCourse(courseId);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <AnimatedCard className="overflow-hidden bg-card border-border group cursor-pointer" hoverScale={1.03}>
        <CardHeader className="p-0">
          <div className="relative overflow-hidden">
            <ImageWithFallback
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-4 left-4">
              <Badge className="bg-background/90 text-foreground border border-border/50 backdrop-blur-sm">
                {course.category}
              </Badge>
            </div>
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-blue-100/90 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 backdrop-blur-sm">
                {course.level}
              </Badge>
            </div>
            {/* ✅ DISCOUNT BADGE - Top right corner mein */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-red-500 text-white border-0">
                {course.discount}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors duration-300">
              {course.title}
            </h3>
            <p className="text-muted-foreground line-clamp-3 leading-relaxed text-sm">
              {course.description}
            </p>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground">
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
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0 flex flex-col gap-3">
          {/* ✅ PRICE SECTION - Discount aur original price dikhane ke liye */}
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-blue-600">{course.price}</span>
                <span className="text-sm text-muted-foreground line-through">{course.originalPrice}</span>
              </div>
              <div className="text-xs text-green-600 font-medium mt-1">
                {course.discount} • Save ₹20,000
              </div>
            </div>
            <AnimatedButton 
              className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white"
              glowEffect
              onClick={handleViewCourseClick}
            >
              View Course Details
            </AnimatedButton>
          </div>
        </CardFooter>
      </AnimatedCard>
    </motion.div>
  );
}

// ✅ MAIN COURSES PAGE COMPONENT
export function CoursesPage({ onNavigate }: CoursesPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // ✅ SIMPLE: Course details navigation
  const handleViewCourse = (courseId: string) => {
    console.log('🚀 CoursesPage: Navigating to course details -', courseId);
    
    if (onNavigate) {
      onNavigate(`course-details-${courseId}`);
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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <motion.h1 
              className="text-4xl font-bold leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Explore Our
              <span className="block bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Premium Courses
              </span>
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Browse our specialized courses and click "View Course" to see detailed information.
            </motion.p>
            
            {/* Stats */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="text-center">
                <div className="font-bold text-blue-600 mb-1">15K+</div>
                <div className="text-sm text-muted-foreground">Active Students</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-teal-600 mb-1">{coursesData.length}</div>
                <div className="text-sm text-muted-foreground">Specialized Courses</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-purple-600 mb-1">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters & Search Section */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex flex-wrap items-center gap-4">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className={`cursor-pointer transition-all duration-200 ${
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

                <div className="h-6 w-px bg-border" />

                {/* Level Filter */}
                <div className="flex flex-wrap gap-2">
                  {levels.map((level) => (
                    <Badge
                      key={level}
                      variant={selectedLevel === level ? "secondary" : "outline"}
                      className={`cursor-pointer transition-all duration-200 ${
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
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="hover:scale-105 transition-transform duration-200"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="hover:scale-105 transition-transform duration-200"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-center text-muted-foreground">
              Showing {filteredCourses.length} of {coursesData.length} courses
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div 
            className={`grid gap-8 ${
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
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
            <div className="text-center py-20">
              <div className="text-muted-foreground mb-4 text-lg">
                No courses found matching your criteria
              </div>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setSelectedLevel("All");
                }}
                className="hover:scale-105 transition-transform duration-200"
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