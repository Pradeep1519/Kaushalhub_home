'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  Target, 
  Eye, 
  Users, 
  Award, 
  Star, 
  TrendingUp, 
  Shield,
  Clock,
  BookOpen,
  GraduationCap,
  Heart,
  Rocket,
  Zap,
  Globe,
  Lightbulb,
  CheckCircle,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Play,
  Download,
  ShieldCheck,
  UsersRound,
  BookCheck,
  Laptop,
  Diamond
} from "lucide-react";
import { AnimatedButton } from "../components/AnimatedButton";
import { ScrollReveal } from "../components/ScrollReveal";

interface AboutPageProps {
  onNavigate?: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const [activeTab, setActiveTab] = useState('mission');
  const [counter, setCounter] = useState({
    students: 0,
    placement: 0,
    mentors: 0,
    courses: 0,
    hours: 0,
    countries: 0
  });

  // Animated counter effect
  useEffect(() => {
    const targets = {
      students: 12500,
      placement: 99,
      mentors: 20,
      courses: 3,
      hours: 5000,
      countries: 1
    };

    const duration = 3000;
    const steps = 60;
    const stepDuration = duration / steps;

    Object.keys(targets).forEach(key => {
      let current = 0;
      const target = targets[key as keyof typeof targets];
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounter(prev => ({
          ...prev,
          [key]: Math.floor(current)
        }));
      }, stepDuration);
    });
  }, []);

  // Mission, Vision, Values data
  const coreValues = [
    {
      icon: <GraduationCap className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Quality Education",
      description: "Industry-relevant curriculum designed by experts with latest technologies",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Users className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Student Success",
      description: "Personalized mentorship and 24/7 support for every learner",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <TrendingUp className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Career Growth",
      description: "100% placement assistance with top companies and startups",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Shield className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Trust & Integrity",
      description: "Transparent pricing and ethical practices since 2020",
      color: "from-orange-500 to-orange-600"
    }
  ];

  // Why Choose KaushalHub features
  const features = [
    {
      icon: <Award className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Govt. Recognized",
      description: "Recognized by Ministry of MSME, Startup India & MCA",
      delay: 0
    },
    {
      icon: <Clock className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Flexible Learning",
      description: "Self-paced courses with lifetime access and updates",
      delay: 100
    },
    {
      icon: <BookOpen className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Practical Projects",
      description: "50+ real-world projects and case studies",
      delay: 200
    },
    {
      icon: <UsersRound className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Expert Mentors",
      description: "Learn from industry professionals with 10+ years experience",
      delay: 300
    },
    {
      icon: <Heart className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Community Support",
      description: "12,500+ active students community network",
      delay: 400
    },
    {
      icon: <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Career Support",
      description: "Resume building, interview prep, and job referrals",
      delay: 500
    },
    {
      icon: <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Certificate",
      description: "Govt. recognized certificate with verification",
      delay: 600
    },
    {
      icon: <BookCheck className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Live Sessions",
      description: "Weekly live doubt clearing sessions",
      delay: 700
    },
    {
      icon: <Laptop className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Tech Support",
      description: "24/7 technical support and guidance",
      delay: 800
    }
  ];

  // Student testimonials
  const testimonials = [
    {
      name: "Priya Sharma",
      course: "Advanced Excel with AI",
      role: "Financial Analyst at Genpact",
      rating: 5,
      comment: "The Advanced Excel with AI course revolutionized how I work with data. The AI integration techniques and advanced formulas helped me become more efficient and get promoted to a senior analyst role.",
      avatar: "PS",
      delay: 0
    },
    {
      name: "Rajesh Kumar",
      course: "PLC Programming",
      role: "Automation Engineer at L&T",
      rating: 5,
      comment: "The PLC Programming course was incredibly comprehensive. The hands-on projects with real industrial scenarios prepared me perfectly for my current role. The instructors have genuine industry experience.",
      avatar: "RP",
      delay: 200
    },
    {
      name: "Sneha Patel",
      course: "Digital Marketing",
      role: "Digital Marketing Manager at ViralBulls Digital Media",
      rating: 5,
      comment: "EduTech's Digital Marketing course gave me practical skills that I use daily. The real campaign projects and latest industry trends covered in the course helped me secure my dream job at Flipkart.",
      avatar: "AG",
      delay: 400
    },
    {
      name: "Amit Verma",
      course: "Tally with GST",
      role: "Accounts Manager at Reliance",
      rating: 5,
      comment: "The Tally with GST course was exactly what I needed. The practical approach to learning Tally ERP and GST compliance gave me the confidence to handle complex accounting tasks in my new role.",
      avatar: "SK",
      delay: 600
    }
  ];

  // Learning methodology
  const learningMethods = [
    {
      step: "01",
      title: "Learn Concepts",
      description: "Interactive video lectures by industry experts",
      icon: <Play className="w-5 h-5 md:w-6 md:h-6" />
    },
    {
      step: "02",
      title: "Practice Skills",
      description: "Hands-on coding exercises and assignments",
      icon: <BookOpen className="w-5 h-5 md:w-6 md:h-6" />
    },
    {
      step: "03",
      title: "Build Projects",
      description: "Real-world projects for your portfolio",
      icon: <Laptop className="w-5 h-5 md:w-6 md:h-6" />
    },
    {
      step: "04",
      title: "Get Certified",
      description: "Govt. recognized certificate and placement",
      icon: <Award className="w-5 h-5 md:w-6 md:h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-x-hidden">
      {/* Animated Background Elements - Responsive */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-4 w-48 h-48 md:top-20 md:left-10 md:w-72 md:h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-20 right-4 w-64 h-64 md:top-40 md:right-10 md:w-96 md:h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
          animate={{
            y: [0, 30, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-10 left-1/4 w-56 h-56 md:bottom-20 md:left-1/3 md:w-80 md:h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
          animate={{
            y: [0, -25, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Hero Section - Responsive */}
      <section className="relative py-12 md:py-16 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <motion.div
              className="text-center max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Badge className="mb-4 md:mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-4 py-2 md:px-6 md:py-3 text-sm md:text-base">
                  <Rocket className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  🚀 Transforming Education Since 2020
                </Badge>
              </motion.div>
              
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 px-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                  Future
                </span>
                <br />
                <span className="bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Starts Here
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 md:mb-8 leading-relaxed max-w-4xl mx-auto px-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Where <span className="font-bold text-blue-600">innovation</span> meets {' '}
                <span className="font-bold text-purple-600">education</span>, creating {' '}
                <span className="font-bold text-teal-600">future-ready</span> professionals
                for the digital economy
              </motion.p>

              {/* Single Button */}
              <motion.div
                className="flex justify-center mb-8 md:mb-12 px-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <AnimatedButton
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-base md:text-lg px-6 py-3 md:px-8 md:py-4 w-full sm:w-auto"
                  onClick={() => onNavigate?.("courses")}
                  size="lg"
                  glowEffect
                >
                  <Zap className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                  Explore All Courses
                </AnimatedButton>
              </motion.div>

              {/* Quick Stats - Responsive Grid */}
              <motion.div
                className="grid grid-cols-3 gap-4 md:gap-6 max-w-2xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                {[
                  { number: "10K+", label: "Students" },
                  { number: "99%", label: "Success Rate" },
                  { number: "25+", label: "Mentors" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">{stat.number}</div>
                    <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Expanded Animated Statistics - Responsive Grid */}
      <section className="py-12 md:py-16 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-6 text-center">
            {[
              { number: counter.students, label: "Students Trained", icon: <Users className="w-5 h-5 md:w-6 md:h-6" />, color: "text-blue-600" },
              { number: `${counter.placement}%`, label: "Placement Rate", icon: <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />, color: "text-green-600" },
              { number: counter.mentors, label: "Expert Mentors", icon: <Award className="w-5 h-5 md:w-6 md:h-6" />, color: "text-purple-600" },
              { number: counter.courses, label: "Courses", icon: <BookOpen className="w-5 h-5 md:w-6 md:h-6" />, color: "text-orange-600" },
              { number: counter.hours, label: "Learning Hours", icon: <Clock className="w-5 h-5 md:w-6 md:h-6" />, color: "text-pink-600" },
              { number: counter.countries, label: "Countries", icon: <Globe className="w-5 h-5 md:w-6 md:h-6" />, color: "text-teal-600" }
            ].map((stat, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <motion.div
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-6 shadow-lg border border-white/20 hover-lift"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`${stat.color} mb-2 md:mb-3 flex justify-center`}>
                    {stat.icon}
                  </div>
                  <motion.div 
                    className="text-lg md:text-xl lg:text-2xl font-bold mb-1 md:mb-2 text-gray-900 dark:text-white"
                    key={stat.number}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300 font-medium leading-tight">
                    {stat.label}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Methodology */}
      <section className="py-12 md:py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white">
                Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Learning Journey</span>
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
                Step-by-step approach that guarantees your success in the tech industry
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {learningMethods.map((method, index) => (
              <ScrollReveal key={index} delay={index * 200}>
                <motion.div
                  className="text-center group"
                  whileHover={{ y: -5 }}
                >
                  <div className="relative mb-3 md:mb-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <div className="text-white">
                        {method.icon}
                      </div>
                    </div>
                    <div className="absolute -top-1 -left-1 md:-top-2 md:-left-2 w-5 h-5 md:w-6 md:h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {method.step}
                    </div>
                  </div>
                  <h3 className="text-base md:text-lg font-bold mb-1 md:mb-2 text-gray-900 dark:text-white">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm leading-relaxed px-2">
                    {method.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision with Tabs - Responsive */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white">
                Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Purpose & Vision</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto">
            {/* Responsive Tabs */}
            <div className="flex flex-wrap gap-2 md:gap-3 lg:gap-4 mb-6 md:mb-8 justify-center">
              {[
                { id: 'mission', label: '🚀 Mission', icon: <Target className="w-4 h-4 md:w-5 md:h-5" /> },
                { id: 'vision', label: '👁️ Vision', icon: <Eye className="w-4 h-4 md:w-5 md:h-5" /> },
                { id: 'values', label: '💎 Values', icon: <Diamond className="w-4 h-4 md:w-5 md:h-5" /> },
                { id: 'approach', label: '🎯 Approach', icon: <Lightbulb className="w-4 h-4 md:w-5 md:h-5" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-1 md:space-x-2 px-3 py-2 md:px-4 md:py-3 lg:px-6 lg:py-3 rounded-lg md:rounded-xl font-semibold transition-all duration-300 text-xs md:text-sm lg:text-base flex-1 sm:flex-none min-w-0 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                      : 'bg-white/80 dark:bg-gray-700/80 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-600 hover:shadow-md'
                  }`}
                >
                  {tab.icon}
                  <span className="truncate">{tab.label}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl md:rounded-2xl lg:rounded-3xl p-4 md:p-6 lg:p-8 shadow-xl border border-white/20"
              >
                {activeTab === 'mission' && (
                  <div className="text-center max-w-4xl mx-auto">
                    <Target className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mx-auto mb-4 md:mb-6 text-blue-500" />
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white">Our Mission</h3>
                    <p className="text-base md:text-lg font-bold text-gray-600 dark:text-gray-300 leading-relaxed mb-4 md:mb-6">
                      To Prepare student's with Imdustry-ready skills and connect them to jobs.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-left">
                      {[
                        "Make quality education accessible to all",
                        "Bridge industry-academia skill gap",
                        "Create job-ready professionals",
                        "Foster innovation and entrepreneurship"
                      ].map((item, index) => (
                        <div key={index} className="flex items-start space-x-2 md:space-x-3">
                          <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mt-0.5 md:mt-1 flex-shrink-0" />
                          <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'vision' && (
                  <div className="text-center max-w-4xl mx-auto">
                    <Eye className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mx-auto mb-4 md:mb-6 text-purple-500" />
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white">Our Vision</h3>
                    <p className="text-base md:text-lg font-bold text-gray-600 dark:text-gray-300 leading-relaxed mb-4 md:mb-6">
                    To be India’s most trusted job-oriented training platform, empowering 1 million learners by 2027.
                    </p>
                    <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg md:rounded-xl p-3 md:p-4">
                      <h4 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-gray-900 dark:text-white">Our 2025 Goals</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 text-sm">
                        {[
                          { label: "Students Empowered", value: "1M+" },
                          { label: "Course Offerings", value: "50+" },
                          { label: "Partner Companies", value: "500+" },
                          { label: "Global Reach", value: "25+ Countries" }
                        ].map((goal, index) => (
                          <div key={index} className="flex justify-between">
                            <span className="text-gray-700 dark:text-gray-300">{goal.label}</span>
                            <span className="font-bold text-purple-600">{goal.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'values' && (
                  <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-4 md:mb-6">
                      <Diamond className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mx-auto mb-3 md:mb-4 text-orange-500" />
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-gray-900 dark:text-white">Our Core Values</h3>
                      <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">The principles that guide everything we do</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {coreValues.map((value, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start space-x-3 md:space-x-4 p-3 md:p-4 rounded-lg md:rounded-xl bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 hover-lift"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r ${value.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                            <div className="text-white">
                              {value.icon}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-1">
                              {value.title}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm leading-relaxed">
                              {value.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'approach' && (
                  <div className="text-center max-w-4xl mx-auto">
                    <Lightbulb className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mx-auto mb-4 md:mb-6 text-yellow-500" />
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white">Our Unique Approach</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-left">
                      <div className="space-y-3 md:space-y-4">
                        <div>
                          <h4 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">🎯 Learn by Doing</h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                            Learn by building real-world projects that solve actual industry problems
                          </p>
                        </div>
                        <div>
                          <h4 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">🤝 Mentor-Led</h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                            1:1 guidance from industry experts throughout your learning journey
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3 md:space-y-4">
                        <div>
                          <h4 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">🚀 Career-First</h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                            Courses designed with input from top companies and hiring managers
                          </p>
                        </div>
                        <div>
                          <h4 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">🌍 Placement-Driven</h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                            Resume, LinkedIn & interview prep
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Why Choose KaushalHub - Responsive Grid */}
      <section className="py-12 md:py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white">
                Why <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">KaushalHub</span> Stands Out
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
                Discover the unique advantages that make us the preferred choice for thousands of learners worldwide
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <ScrollReveal key={index} delay={feature.delay}>
                <motion.div
                  className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-xl p-4 md:p-6 shadow-lg border border-white/20 hover-lift group"
                  whileHover={{ 
                    scale: 1.02,
                    rotateY: 2
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start space-x-3 md:space-x-4">
                    <motion.div 
                      className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base md:text-lg font-bold mb-1 md:mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors truncate">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Student Testimonials - Responsive */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white">
                Success <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Stories</span>
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
                Hear from our students who transformed their careers and lives through KaushalHub
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={index} delay={testimonial.delay}>
                <motion.div
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl border border-white/20 hover-lift"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start space-x-3 md:space-x-4 mb-3 md:mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-white text-xs md:text-sm">
                        {testimonial.avatar}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-1 truncate">
                        {testimonial.name}
                      </h4>
                      <p className="text-blue-600 dark:text-blue-400 font-semibold text-xs md:text-sm mb-1 truncate">
                        {testimonial.course}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-1 mb-2 md:mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic text-xs md:text-sm leading-relaxed">
                    "{testimonial.comment}"
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Banner - Responsive */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal>
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                Ready to Transform
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Your Career?
                </span>
              </h2>
              
              <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
                Take the first step towards your dream career today. Join India's most trusted learning platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <AnimatedButton
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-2xl text-base md:text-lg px-5 py-3 md:px-6 md:py-3 w-full sm:w-auto"
                  onClick={() => onNavigate?.("courses")}
                  size="lg"
                  glowEffect
                >
                  <Zap className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Start Learning Now
                </AnimatedButton>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}