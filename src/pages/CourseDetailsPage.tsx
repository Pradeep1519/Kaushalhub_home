// src/pages/CourseDetailsPage.tsx - RESPONSIVE VERSION
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  Star, 
  Play, 
  CheckCircle, 
  Award, 
  Download,
  Share2,
  Heart,
  BookOpen,
  Video,
  FileText,
  Trophy,
  CreditCard,
  Shield,
  Check
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Progress } from "../components/ui/progress";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// Define props interface for CourseDetailsPage
interface CourseDetailsPageProps {
  onNavigate?: (page: string) => void;
  courseId?: string;
}

// Course curriculum structure
interface CurriculumModule {
  id: string;
  title: string;
  lessons: {
    id: string;
    title: string;
    type: 'video' | 'text' | 'quiz' | 'project';
    isCompleted?: boolean;
  }[];
}

// Instructor interface
interface Instructor {
  name: string;
  title: string;
  avatar: string;
  rating: number;
  students: string;
  bio: string;
}

// ✅ COURSES DATA - YAHI FILE MEIN
const coursesData = [
  {
    id: "plc-automation",
    title: "PLC & Automation",
    description: "Learn industrial automation with PLC programming, ladder logic, and SCADA systems.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop",
    duration: "3 Months",
    level: "Advanced",
    price: "₹49,999",
    category: "Automation"
  },
  {
    id: "digital-marketing", 
    title: "Digital Marketing With AI & E-Commerce",
    description: "Complete digital marketing course covering SEO, social media, PPC, and analytics.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    duration: "3 Months",
    level: "Advanced",
    price: "₹49,999",
    category: "Marketing"
  },
  {
    id: "tally-gst",
    title: "Tally with GST + Advanced Excel",
    description: "Master Tally accounting software with GST compliance and advanced financial reporting.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
    duration: "3 Months",
    level: "Advanced",
    price: "₹49,999",
    category: "Accounting"
  }
];

// CourseDetailsPage component for displaying course information
export function CourseDetailsPage({ onNavigate, courseId = "plc-automation" }: CourseDetailsPageProps) {
  // State for favorites
  const [isFavorited, setIsFavorited] = useState(false);

  // Find the course details based on courseId
  const course = coursesData.find(c => c.id === courseId);

  // Redirect if course not found
  useEffect(() => {
    console.log("📖 CourseDetailsPage mounted with courseId:", courseId);
    if (!course && onNavigate) {
      console.warn("⚠️ Course not found, redirecting to courses");
      onNavigate("courses");
    }
  }, [course, courseId, onNavigate]);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Course Not Found
          </h1>
          <Button onClick={() => onNavigate && onNavigate("courses")}>
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  // ✅ UPDATED: Course-specific curriculum data with actual course modules
  const getCourseCurriculum = (courseId: string): CurriculumModule[] => {
    const curriculumMap: Record<string, CurriculumModule[]> = {
      "plc-automation": [
        {
          id: "module-1",
          title: "Introduction to Automation",
          lessons: [
            { id: "1-1", title: "Basics of Electrical & Control Systems", type: "video" },
            { id: "1-2", title: "PLC Hardware Overview (Siemens, Allen Bradley, FESTO)", type: "video" },
            { id: "1-3", title: "PLC Programming Basics (Ladder Logic, Inputs/Outputs)", type: "video" },
            { id: "1-4", title: "Electrical Safety Standards", type: "text" },
            { id: "1-5", title: "Basic Control Circuits Quiz", type: "quiz" }
          ]
        },
        {
          id: "module-2",
          title: "Timers & Counters in PLC",
          lessons: [
            { id: "2-1", title: "On-Delay / Off-Delay Timers", type: "video" },
            { id: "2-2", title: "Up/Down Counters Programming", type: "video" },
            { id: "2-3", title: "Timer Applications in Real Systems", type: "video" },
            { id: "2-4", title: "Counter Applications in Industry", type: "text" },
            { id: "2-5", title: "Traffic Light Automation Project", type: "project" }
          ]
        },
        {
          id: "module-3",
          title: "Advanced PLC Programming",
          lessons: [
            { id: "3-1", title: "Shift Registers & Data Handling", type: "video" },
            { id: "3-2", title: "Comparators & Math Functions", type: "video" },
            { id: "3-3", title: "Real-Time Project: Car Parking Module", type: "video" },
            { id: "3-4", title: "Safety Standards in Industrial Automation", type: "text" },
            { id: "3-5", title: "Advanced Logic Implementation Quiz", type: "quiz" }
          ]
        },
        {
          id: "module-4",
          title: "Practical PLC Applications",
          lessons: [
            { id: "4-1", title: "Motor Starter & Stopper Circuits", type: "video" },
            { id: "4-2", title: "Water Tank Level Control Project", type: "video" },
            { id: "4-3", title: "Conveyor Belt Control Simulation", type: "video" },
            { id: "4-4", title: "Industrial Sensor Integration", type: "text" },
            { id: "4-5", title: "Motor Control Practical Assignment", type: "project" }
          ]
        },
        {
          id: "module-5",
          title: "Industry-Oriented Projects",
          lessons: [
            { id: "5-1", title: "Lift / Elevator Control Logic", type: "video" },
            { id: "5-2", title: "Bottle Filling Plant Simulation", type: "video" },
            { id: "5-3", title: "Production Line Control Systems", type: "video" },
            { id: "5-4", title: "Online Hands-on Assignments with PLC Software", type: "text" },
            { id: "5-5", title: "Industrial Automation Case Studies", type: "quiz" }
          ]
        },
        {
          id: "module-6",
          title: "Capstone Project + Placement Prep",
          lessons: [
            { id: "6-1", title: "Final Project: Production Line Simulation", type: "project" },
            { id: "6-2", title: "Resume & LinkedIn for Core Jobs", type: "text" },
            { id: "6-3", title: "Mock Interviews with Industry Experts", type: "video" },
            { id: "6-4", title: "Career Guidance Session", type: "text" },
            { id: "6-5", title: "Placement Assistance Orientation", type: "text" }
          ]
        }
      ],
      "digital-marketing": [
        {
          id: "module-1",
          title: "Introduction to Digital Marketing",
          lessons: [
            { id: "1-1", title: "Basics of SEO, SEM, Google Search Console", type: "video" },
            { id: "1-2", title: "Social Media Platforms Overview (FB, Insta, LinkedIn)", type: "video" },
            { id: "1-3", title: "AI Tools for Content Creation (ChatGPT, Jasper, Canva AI)", type: "video" },
            { id: "1-4", title: "Digital Marketing Fundamentals Quiz", type: "quiz" },
            { id: "1-5", title: "Market Research Basics", type: "text" }
          ]
        },
        {
          id: "module-2",
          title: "SEO & Content Marketing",
          lessons: [
            { id: "2-1", title: "Keyword Research & On-Page SEO", type: "video" },
            { id: "2-2", title: "Off-Page SEO & Backlinking Strategies", type: "video" },
            { id: "2-3", title: "Writing Blogs & Optimizing with AI", type: "video" },
            { id: "2-4", title: "Content Strategy Development", type: "text" },
            { id: "2-5", title: "SEO Audit Project", type: "project" }
          ]
        },
        {
          id: "module-3",
          title: "Paid Marketing & Analytics",
          lessons: [
            { id: "3-1", title: "Google Ads (Search, Display, Video)", type: "video" },
            { id: "3-2", title: "Facebook & Instagram Ads Campaign Setup", type: "video" },
            { id: "3-3", title: "Analytics Tools (Google Analytics, Meta Business Suite)", type: "video" },
            { id: "3-4", title: "ROI Calculation & Performance Metrics", type: "text" },
            { id: "3-5", title: "Ad Campaign Analysis Quiz", type: "quiz" }
          ]
        },
        {
          id: "module-4",
          title: "E-commerce Marketing",
          lessons: [
            { id: "4-1", title: "Amazon, Flipkart, Shopify Store Setup", type: "video" },
            { id: "4-2", title: "Product Listing Optimization Techniques", type: "video" },
            { id: "4-3", title: "Running Ads for E-commerce Products", type: "video" },
            { id: "4-4", title: "E-commerce Analytics & Reporting", type: "text" },
            { id: "4-5", title: "E-commerce Store Optimization Project", type: "project" }
          ]
        },
        {
          id: "module-5",
          title: "Advanced Digital Marketing",
          lessons: [
            { id: "5-1", title: "Email Marketing Automation (Mailchimp, AI Tools)", type: "video" },
            { id: "5-2", title: "WhatsApp Business Marketing Strategies", type: "video" },
            { id: "5-3", title: "Influencer & Affiliate Marketing", type: "video" },
            { id: "5-4", title: "Marketing Automation Workflows", type: "text" },
            { id: "5-5", title: "Advanced Marketing Strategies Quiz", type: "quiz" }
          ]
        },
        {
          id: "module-6",
          title: "Capstone Project + Placement Prep",
          lessons: [
            { id: "6-1", title: "Create a Live Campaign for a Real Business", type: "project" },
            { id: "6-2", title: "Analyze Performance Report", type: "text" },
            { id: "6-3", title: "Resume Making & LinkedIn Profile Setup", type: "text" },
            { id: "6-4", title: "Mock Interview Preparation", type: "video" },
            { id: "6-5", title: "Portfolio Development Session", type: "text" }
          ]
        }
      ],
      "tally-gst": [
        {
          id: "module-1",
          title: "Accounting Fundamentals & Tally Basics",
          lessons: [
            { id: "1-1", title: "Basics of Accounting & Financial Statements", type: "video" },
            { id: "1-2", title: "Introduction to Tally Prime Interface", type: "video" },
            { id: "1-3", title: "Creating Ledgers & Vouchers", type: "video" },
            { id: "1-4", title: "Accounting Principles Overview", type: "text" },
            { id: "1-5", title: "Basic Accounting Quiz", type: "quiz" }
          ]
        },
        {
          id: "module-2",
          title: "GST & Compliance",
          lessons: [
            { id: "2-1", title: "GST Concepts (CGST, SGST, IGST)", type: "video" },
            { id: "2-2", title: "GST Filing & Returns in Tally", type: "video" },
            { id: "2-3", title: "E-Way Bills, TDS, Payroll Functions", type: "video" },
            { id: "2-4", title: "GST Compliance Guidelines", type: "text" },
            { id: "2-5", title: "GST Filing Practical Assignment", type: "project" }
          ]
        },
        {
          id: "module-3",
          title: "Advanced Excel Part 1",
          lessons: [
            { id: "3-1", title: "Excel Formulas, Functions (SUM, IF, COUNTIF)", type: "video" },
            { id: "3-2", title: "Lookup Functions (VLOOKUP, HLOOKUP, XLOOKUP)", type: "video" },
            { id: "3-3", title: "Pivot Tables & Charts Creation", type: "video" },
            { id: "3-4", title: "Data Analysis Techniques", type: "text" },
            { id: "3-5", title: "Excel Functions Practice Quiz", type: "quiz" }
          ]
        },
        {
          id: "module-4",
          title: "Advanced Excel Part 2",
          lessons: [
            { id: "4-1", title: "Dashboard Creation for Reports", type: "video" },
            { id: "4-2", title: "Data Validation & Conditional Formatting", type: "video" },
            { id: "4-3", title: "Excel for MIS Reports Generation", type: "video" },
            { id: "4-4", title: "Advanced Reporting Techniques", type: "text" },
            { id: "4-5", title: "Dashboard Development Project", type: "project" }
          ]
        },
        {
          id: "module-5",
          title: "MIS & Reporting",
          lessons: [
            { id: "5-1", title: "Creating Monthly Financial Reports", type: "video" },
            { id: "5-2", title: "Automating Reports with Excel Macros", type: "video" },
            { id: "5-3", title: "Case Study – Business Reporting", type: "video" },
            { id: "5-4", title: "Financial Analysis Methods", type: "text" },
            { id: "5-5", title: "MIS Reporting Quiz", type: "quiz" }
          ]
        },
        {
          id: "module-6",
          title: "Capstone Project + Placement Prep",
          lessons: [
            { id: "6-1", title: "Preparing GST Return & MIS Dashboard", type: "project" },
            { id: "6-2", title: "Resume Making & LinkedIn Profile", type: "text" },
            { id: "6-3", title: "Mock Interviews Preparation", type: "video" },
            { id: "6-4", title: "Career Guidance Session", type: "text" },
            { id: "6-5", title: "Placement Assistance Process", type: "text" }
          ]
        }
      ]
    };

    return curriculumMap[courseId] || [];
  };

  const curriculum = getCourseCurriculum(courseId);

  // Mock instructor data - course specific instructors
  const getInstructorData = (courseId: string): Instructor => {
    const instructors: Record<string, Instructor> = {
      "plc-automation": {
        name: "Rajesh Kumar",
        title: "Industrial Automation Expert",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        rating: 4.9,
        students: "8K+",
        bio: "With over 12 years of experience in industrial automation, Rajesh has trained thousands of engineers in PLC programming and automation systems across various industries."
      },
      "digital-marketing": {
        name: "Priya Sharma",
        title: "Digital Marketing Strategist",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b044?w=150&h=150&fit=crop&crop=face",
        rating: 4.8,
        students: "15K+",
        bio: "Digital marketing expert with 8+ years of experience helping brands grow online. Specialized in SEO, social media marketing, and AI-powered marketing strategies."
      },
      "tally-gst": {
        name: "Anil Verma",
        title: "Chartered Accountant & Tally Expert",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        rating: 4.9,
        students: "12K+",
        bio: "CA with 10+ years of experience in accounting and taxation. Expert in Tally software, GST compliance, and financial reporting with practical industry knowledge."
      }
    };

    return instructors[courseId] || instructors["plc-automation"];
  };

  const instructor = getInstructorData(courseId);

  // Calculate total lessons
  const totalLessons = curriculum.reduce((total, module) => total + module.lessons.length, 0);

  // ✅ Handle enrollment form navigation
  const handleEnrollment = () => {
    console.log("📝 Enrollment initiated for course:", course.title);
    if (onNavigate) {
      onNavigate(`enrollment-form-${courseId}`);
    }
  };

  // ✅ Handle course preview
  const handlePreview = () => {
    console.log("👀 Previewing course content:", course.title);
    alert(`Showing preview content for: ${course.title}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-x-hidden">
      {/* Header Section */}
      <motion.header
        className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <Button
              variant="ghost"
              onClick={() => onNavigate && onNavigate("courses")}
              className="flex items-center gap-2 text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden xs:inline">Back to Courses</span>
              <span className="xs:hidden">Back</span>
            </Button>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFavorited(!isFavorited)}
                className="p-2 sm:p-3"
              >
                <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 sm:p-3">
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content Section */}
      <main className="container mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Column - Course Details */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Course Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    {/* Course Image */}
                    <ImageWithFallback
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    {/* Course Info Overlay */}
                    <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white">
                      <Badge className="mb-2 sm:mb-3 bg-blue-500 text-white text-xs sm:text-sm">
                        {course.level}
                      </Badge>
                      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 leading-tight">
                        {course.title}
                      </h1>
                      <p className="text-blue-100 text-sm sm:text-base lg:text-lg mb-2 sm:mb-4 max-w-2xl leading-relaxed">
                        {course.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                          <span>4.9 (2,847)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>12,847 students</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                    </div>
                    {/* Preview Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm p-2 sm:p-3"
                      onClick={handlePreview}
                    >
                      <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Course Content Tabs Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Tabs defaultValue="curriculum" className="w-full">
                {/* Tab Navigation */}
                <TabsList className="grid w-full grid-cols-3 p-1 sm:p-2">
                  <TabsTrigger value="curriculum" className="text-xs sm:text-sm px-2 sm:px-4 py-2">
                    Curriculum
                  </TabsTrigger>
                  <TabsTrigger value="instructor" className="text-xs sm:text-sm px-2 sm:px-4 py-2">
                    Instructor
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="text-xs sm:text-sm px-2 sm:px-4 py-2">
                    Reviews
                  </TabsTrigger>
                </TabsList>

                {/* Curriculum Tab Content */}
                <TabsContent value="curriculum" className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
                  <Card>
                    <CardHeader className="pb-3 sm:pb-4">
                      <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                        <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                        Course Curriculum
                      </CardTitle>
                      <p className="text-muted-foreground text-sm sm:text-base">
                        {curriculum.length} modules • {totalLessons} lessons • {course.duration} Program
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-3 sm:space-y-4">
                      {/* Curriculum Modules */}
                      {curriculum.map((module, moduleIndex) => (
                        <motion.div
                          key={module.id}
                          className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: moduleIndex * 0.1 }}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 sm:mb-3">
                            <h4 className="font-semibold text-base sm:text-lg leading-tight">
                              Module {moduleIndex + 1}: {module.title}
                            </h4>
                            <Badge variant="outline" className="text-xs sm:text-sm w-fit">
                              {module.lessons.length} lessons
                            </Badge>
                          </div>
                          {/* Module Lessons */}
                          <div className="space-y-2">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <div
                                key={lesson.id}
                                className="flex items-center justify-between p-2 sm:p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded text-sm sm:text-base"
                              >
                                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                                  {/* Lesson Type Icons */}
                                  {lesson.type === 'video' && <Video className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />}
                                  {lesson.type === 'text' && <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />}
                                  {lesson.type === 'quiz' && <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0" />}
                                  {lesson.type === 'project' && <Award className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500 flex-shrink-0" />}
                                  <span className="truncate">{lesson.title}</span>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                                  {/* Completion Status */}
                                  {lesson.isCompleted && (
                                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Instructor Tab Content */}
                <TabsContent value="instructor" className="mt-4 sm:mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg sm:text-xl">Meet Your Instructor</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                        {/* Instructor Avatar */}
                        <Avatar className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                          <AvatarImage src={instructor.avatar} alt={instructor.name} />
                          <AvatarFallback className="text-sm">
                            {instructor.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {/* Instructor Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg sm:text-xl font-semibold mb-1">{instructor.name}</h3>
                          <p className="text-muted-foreground text-sm sm:text-base mb-2 sm:mb-3">{instructor.title}</p>
                          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                              <span>{instructor.rating} rating</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>{instructor.students} students</span>
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                            {instructor.bio}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Reviews Tab Content */}
                <TabsContent value="reviews" className="mt-4 sm:mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg sm:text-xl">Student Reviews</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 sm:space-y-6">
                      {/* Review Summary Section */}
                      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-center">
                          <div className="text-2xl sm:text-3xl font-bold">4.9</div>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground mt-1">2,847 reviews</div>
                        </div>
                        {/* Rating Distribution */}
                        <div className="flex-1 w-full sm:w-auto">
                          {[5, 4, 3, 2, 1].map(stars => (
                            <div key={stars} className="flex items-center gap-2 mb-1">
                              <span className="text-xs sm:text-sm w-6 sm:w-8">{stars}★</span>
                              <Progress value={stars === 5 ? 85 : stars === 4 ? 12 : 3} className="flex-1 h-1.5 sm:h-2" />
                              <span className="text-xs sm:text-sm text-muted-foreground w-6 sm:w-8">
                                {stars === 5 ? '85%' : stars === 4 ? '12%' : '3%'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Individual Reviews List */}
                      {[
                        {
                          name: "Priya Sharma",
                          rating: 5,
                          date: "2 days ago",
                          comment: "Excellent course! The concepts were explained very clearly and the practical exercises helped me understand everything better."
                        },
                        {
                          name: "Raj Patel",
                          rating: 5,
                          date: "1 week ago",
                          comment: "Best course I've taken. The instructor's teaching style is engaging and the course structure is perfect for professionals."
                        },
                        {
                          name: "Anita Gupta",
                          rating: 4,
                          date: "2 weeks ago",
                          comment: "Great content and well-structured modules. The only improvement would be more real-world case studies."
                        }
                      ].map((review, index) => (
                        <motion.div
                          key={index}
                          className="border-b border-gray-200 dark:border-gray-700 pb-3 sm:pb-4 last:border-b-0"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-start gap-2 sm:gap-3">
                            <Avatar className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0">
                              <AvatarFallback className="text-xs">
                                {review.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                                <span className="font-medium text-sm sm:text-base">{review.name}</span>
                                <div className="flex items-center gap-1">
                                  {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-yellow-400 text-yellow-400" />
                                  ))}
                                </div>
                                <span className="text-xs text-muted-foreground">{review.date}</span>
                              </div>
                              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                {review.comment}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          {/* Right Column - Course Info Card */}
          <div className="lg:col-span-1">
            <motion.div
              className="sticky top-4 sm:top-6 lg:top-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="text-center">
                    {/* Course Price */}
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-1 sm:mb-2">{course.price}</div>
                    <div className="text-sm text-muted-foreground mb-2">One-time payment</div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  {/* Course Features List */}
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                      <span>{course.duration} Program</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                      <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                      <span>{totalLessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                      <Download className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500 flex-shrink-0" />
                      <span>Downloadable resources</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                      <Award className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4 text-teal-500 flex-shrink-0" />
                      <span>Lifetime access</span>
                    </div>
                  </div>

                  {/* Enrollment Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-4 sm:py-6 text-base sm:text-lg font-semibold"
                      size="lg"
                      onClick={handleEnrollment}
                    >
                      <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                      Enroll & Pay
                    </Button>
                  </motion.div>

                  {/* Payment Security Information */}
                  <div className="text-center p-2 sm:p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                      <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                      <div className="text-xs sm:text-sm font-medium text-green-800 dark:text-green-300">
                        Secure Payment
                      </div>
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400 leading-tight">
                      100% Safe & Secure • SSL Encrypted
                    </div>
                  </div>

                  {/* Money Back Guarantee */}
                  <div className="text-center p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
                      <div className="text-xs sm:text-sm font-medium text-blue-800 dark:text-blue-300">
                        7-Day Money Back Guarantee
                      </div>
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 leading-tight">
                      Not satisfied? Get full refund within 7 days
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CourseDetailsPage;