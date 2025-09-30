// src/pages/CourseDetailsPage.tsx - MODIFIED VERSION
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
    originalPrice: "₹49,999",
    price: "₹29,999",
    category: "Automation"
  },
  {
    id: "digital-marketing", 
    title: "Digital Marketing With AI & E-Commerce",
    description: "Complete digital marketing course covering SEO, social media, PPC, and analytics.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    duration: "3 Months",
    level: "Advanced",
    originalPrice: "₹49,999",
    price: "₹29,999",
    category: "Marketing"
  },
  {
    id: "tally-gst",
    title: "Tally with GST + Advanced Excel",
    description: "Master Tally accounting software with GST compliance and advanced financial reporting.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
    duration: "3 Months",
    level: "Advanced",
    originalPrice: "₹49,999",
    price: "₹29,999",
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Course Not Found
          </h1>
          <Button onClick={() => onNavigate && onNavigate("courses")}>
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  // ✅ MODIFIED: Course-specific curriculum data (without time durations)
  const getCourseCurriculum = (courseId: string): CurriculumModule[] => {
    const curriculumMap: Record<string, CurriculumModule[]> = {
      "plc-automation": [
        {
          id: "module-1",
          title: "PLC Fundamentals & Basics",
          lessons: [
            { id: "1-1", title: "Introduction to Industrial Automation", type: "video" },
            { id: "1-2", title: "PLC Hardware Components", type: "video" },
            { id: "1-3", title: "Ladder Logic Programming Basics", type: "video" },
            { id: "1-4", title: "PLC Wiring & Connections", type: "text" },
            { id: "1-5", title: "Basic Logic Gates Implementation", type: "quiz" }
          ]
        },
        {
          id: "module-2",
          title: "Advanced PLC Programming",
          lessons: [
            { id: "2-1", title: "Timers & Counters Programming", type: "video" },
            { id: "2-2", title: "Data Handling & Memory Management", type: "video" },
            { id: "2-3", title: "Analog I/O Programming", type: "video" },
            { id: "2-4", title: "PID Control Implementation", type: "video" },
            { id: "2-5", title: "Industrial Communication Protocols", type: "text" }
          ]
        },
        {
          id: "module-3",
          title: "SCADA & HMI Systems",
          lessons: [
            { id: "3-1", title: "SCADA System Architecture", type: "video" },
            { id: "3-2", title: "HMI Screen Design & Development", type: "video" },
            { id: "3-3", title: "Alarm Management Systems", type: "video" },
            { id: "3-4", title: "Data Logging & Reporting", type: "video" },
            { id: "3-5", title: "Final Automation Project", type: "project" }
          ]
        }
      ],
      "digital-marketing": [
        {
          id: "module-1",
          title: "Digital Marketing Fundamentals",
          lessons: [
            { id: "1-1", title: "Introduction to Digital Marketing", type: "video" },
            { id: "1-2", title: "Market Research & Analysis", type: "video" },
            { id: "1-3", title: "Customer Persona Development", type: "text" },
            { id: "1-4", title: "Digital Marketing Strategy", type: "quiz" }
          ]
        },
        {
          id: "module-2",
          title: "SEO & Content Marketing",
          lessons: [
            { id: "2-1", title: "On-Page SEO Techniques", type: "video" },
            { id: "2-2", title: "Off-Page SEO & Link Building", type: "video" },
            { id: "2-3", title: "Content Strategy & Creation", type: "video" },
            { id: "2-4", title: "Keyword Research & Analysis", type: "text" }
          ]
        },
        {
          id: "module-3",
          title: "Social Media & E-Commerce",
          lessons: [
            { id: "3-1", title: "Social Media Marketing Strategies", type: "video" },
            { id: "3-2", title: "E-Commerce Platform Setup", type: "video" },
            { id: "3-3", title: "PPC Advertising & Analytics", type: "video" },
            { id: "3-4", title: "Final Digital Marketing Project", type: "project" }
          ]
        }
      ],
      "tally-gst": [
        {
          id: "module-1",
          title: "Tally Prime Fundamentals",
          lessons: [
            { id: "1-1", title: "Introduction to Tally Prime", type: "video" },
            { id: "1-2", title: "Company Creation & Configuration", type: "video" },
            { id: "1-3", title: "Chart of Accounts Setup", type: "video" },
            { id: "1-4", title: "Basic Accounting Entries", type: "quiz" }
          ]
        },
        {
          id: "module-2",
          title: "GST & Taxation",
          lessons: [
            { id: "2-1", title: "GST Concepts & Slabs", type: "video" },
            { id: "2-2", title: "GST Invoice & Billing", type: "video" },
            { id: "2-3", title: "GST Return Filing Process", type: "video" },
            { id: "2-4", title: "Tax Calculation & Compliance", type: "text" }
          ]
        },
        {
          id: "module-3",
          title: "Advanced Accounting & Reporting",
          lessons: [
            { id: "3-1", title: "Advanced Financial Reports", type: "video" },
            { id: "3-2", title: "Inventory Management", type: "video" },
            { id: "3-3", title: "Payroll Processing", type: "video" },
            { id: "3-4", title: "Final Accounting Project", type: "project" }
          ]
        }
      ]
    };

    return curriculumMap[courseId] || [];
  };

  const curriculum = getCourseCurriculum(courseId);

  // Mock instructor data
  const instructor: Instructor = {
    name: "Dr. Sarah Johnson",
    title: "Excel & Data Analytics Expert",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b044?w=150&h=150&fit=crop&crop=face",
    rating: 4.9,
    students: "15K+",
    bio: "With over 10 years of experience in data analytics and business intelligence, Dr. Johnson has helped thousands of professionals master Excel and AI-powered analytics."
  };

  // Calculate total lessons
  const totalLessons = curriculum.reduce((total, module) => total + module.lessons.length, 0);

  // ✅ MODIFIED: Handle payment
  const handlePayment = () => {
    console.log("💳 Payment initiated for course:", course.title);
    // Yahan aap payment gateway integration add kar sakte hain
    alert(`Redirecting to payment for: ${course.title}\nAmount: ${course.price}`);
  };

  // ✅ MODIFIED: Handle course preview (agar koi preview video hai toh)
  const handlePreview = () => {
    console.log("👀 Previewing course content:", course.title);
    alert(`Showing preview content for: ${course.title}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <motion.header
        className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => onNavigate && onNavigate("courses")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Courses
            </Button>
            
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFavorited(!isFavorited)}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Course Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardContent className="p-0">
                  <div className="relative">
                    <ImageWithFallback
                      src={course.image}
                      alt={course.title}
                      className="w-full h-64 lg:h-80 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-t-lg" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <Badge className="mb-3 bg-blue-500 text-white">
                        {course.level}
                      </Badge>
                      <h1 className="text-2xl lg:text-4xl font-bold mb-2">
                        {course.title}
                      </h1>
                      <p className="text-blue-100 text-lg mb-4">
                        {course.description}
                      </p>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>4.9 (2,847 reviews)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>12,847 students</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                    </div>
                    {/* ✅ MODIFIED: Preview button replaced with small preview icon */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute bottom-6 right-6 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                      onClick={handlePreview}
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Course Content Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Tabs defaultValue="curriculum" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="instructor">Instructor</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                {/* Curriculum Tab */}
                <TabsContent value="curriculum" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-blue-500" />
                        Course Curriculum
                      </CardTitle>
                      <p className="text-muted-foreground">
                        {curriculum.length} modules • {totalLessons} lessons • {course.duration} Program
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {curriculum.map((module, moduleIndex) => (
                        <motion.div
                          key={module.id}
                          className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: moduleIndex * 0.1 }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-lg">
                              Module {moduleIndex + 1}: {module.title}
                            </h4>
                            <Badge variant="outline">{module.lessons.length} lessons</Badge>
                          </div>
                          <div className="space-y-2">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <div
                                key={lesson.id}
                                className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded"
                              >
                                <div className="flex items-center gap-3">
                                  {lesson.type === 'video' && <Video className="w-4 h-4 text-blue-500" />}
                                  {lesson.type === 'text' && <FileText className="w-4 h-4 text-green-500" />}
                                  {lesson.type === 'quiz' && <Trophy className="w-4 h-4 text-orange-500" />}
                                  {lesson.type === 'project' && <Award className="w-4 h-4 text-purple-500" />}
                                  <span className="text-sm">{lesson.title}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  {lesson.isCompleted && (
                                    <CheckCircle className="w-4 h-4 text-green-500" />
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

                {/* Instructor Tab */}
                <TabsContent value="instructor">
                  <Card>
                    <CardHeader>
                      <CardTitle>Meet Your Instructor</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-start gap-6">
                        <Avatar className="w-20 h-20">
                          <AvatarImage src={instructor.avatar} alt={instructor.name} />
                          <AvatarFallback>{instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-1">{instructor.name}</h3>
                          <p className="text-muted-foreground mb-3">{instructor.title}</p>
                          <div className="flex items-center gap-4 mb-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span>{instructor.rating} rating</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{instructor.students} students</span>
                            </div>
                          </div>
                          <p className="text-muted-foreground">{instructor.bio}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews">
                  <Card>
                    <CardHeader>
                      <CardTitle>Student Reviews</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Review Summary */}
                      <div className="flex items-center gap-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-center">
                          <div className="text-3xl font-bold">4.9</div>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">2,847 reviews</div>
                        </div>
                        <div className="flex-1">
                          {[5, 4, 3, 2, 1].map(stars => (
                            <div key={stars} className="flex items-center gap-2 mb-1">
                              <span className="text-sm w-8">{stars}★</span>
                              <Progress value={stars === 5 ? 85 : stars === 4 ? 12 : 3} className="flex-1 h-2" />
                              <span className="text-sm text-muted-foreground w-8">
                                {stars === 5 ? '85%' : stars === 4 ? '12%' : '3%'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Individual Reviews */}
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
                          className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-start gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="text-xs">
                                {review.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm">{review.name}</span>
                                <div className="flex items-center gap-1">
                                  {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                  ))}
                                </div>
                                <span className="text-xs text-muted-foreground">{review.date}</span>
                              </div>
                              <p className="text-sm text-muted-foreground">{review.comment}</p>
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
              className="sticky top-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{course.price}</div>
                    <div className="text-sm text-muted-foreground line-through mb-2">{course.originalPrice}</div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      Limited Time Offer • 40% OFF
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Course Features */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>{course.duration} Program</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <FileText className="w-4 h-4 text-green-500" />
                      <span>{totalLessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Download className="w-4 h-4 text-purple-500" />
                      <span>Downloadable resources</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Award className="w-4 h-4 text-orange-500" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Users className="w-4 h-4 text-teal-500" />
                      <span>Lifetime access</span>
                    </div>
                  </div>

                  {/* ✅ MODIFIED: Payment Button instead of Preview */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-6 text-lg font-semibold"
                      size="lg"
                      onClick={handlePayment}
                    >
                      <CreditCard className="w-5 h-5 mr-2" />
                      Enroll Now & Pay
                    </Button>
                  </motion.div>

                  {/* Payment Security Info */}
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      <div className="text-sm font-medium text-green-800 dark:text-green-300">
                        Secure Payment
                      </div>
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400">
                      100% Safe & Secure • SSL Encrypted
                    </div>
                  </div>

                  {/* Money Back Guarantee */}
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Check className="w-4 h-4 text-blue-600" />
                      <div className="text-sm font-medium text-blue-800 dark:text-blue-300">
                        7-Day Money Back Guarantee
                      </div>
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-400">
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