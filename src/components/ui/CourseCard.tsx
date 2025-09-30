// src/components/ui/CourseCard.tsx
import { Card, CardContent, CardFooter, CardHeader } from "./card";
import { Badge } from "./badge";
import { Clock, Users, Star } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { AnimatedCard } from "../AnimatedCard";
import { AnimatedButton } from "../AnimatedButton";
import { motion } from "motion/react";

export interface CourseData {
  id: number;
  title: string;
  description: string;
  image: string;
  duration: string;
  students: string;
  rating: string;
  price: string;
  category: string;
  level: string;
}

interface CourseCardProps {
  course: CourseData;
  index?: number;
  onViewCourse?: (courseId: string) => void; // ✅ ONLY courseId
  isEnrolled?: boolean;
  user?: any;
}

export function CourseCard({ course, index = 0, onViewCourse }: CourseCardProps) {
  
  // ✅ Course ID mapping - YEH HI USE KARO
  const getCourseId = (title: string): string => {
    const courseIdMap: Record<string, string> = {
      'Advanced Excel with AI': 'excel-ai',
      'PLC Programming': 'plc-programming', 
      'Digital Marketing': 'digital-marketing',
      'Tally with GST': 'tally-gst'
    };
    return courseIdMap[title] || title.toLowerCase().replace(/\s+/g, '-');
  };

  const courseId = getCourseId(course.title);
  
  // ✅ SIMPLE View Course function
  const handleViewCourseClick = () => {
    console.log('🎯 CourseCard: View Course clicked - ID:', courseId);
    if (onViewCourse) {
      onViewCourse(courseId); // ✅ ONLY courseId pass karo
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <AnimatedCard className="overflow-hidden bg-card border-border group cursor-pointer">
        <CardHeader className="p-0">
          <div className="relative overflow-hidden">
            <ImageWithFallback
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-background/90 text-foreground border border-border/50">
                {course.category}
              </Badge>
            </div>
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-blue-100/90 text-blue-700">
                {course.level}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{course.title}</h3>
            <p className="text-muted-foreground line-clamp-3">
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

        <CardFooter className="p-6 pt-0 flex items-center justify-between">
          <div className="font-bold text-blue-600">
            {course.price}
          </div>
          <button 
            onClick={handleViewCourseClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Course Details
          </button>
        </CardFooter>
      </AnimatedCard>
    </motion.div>
  );
}