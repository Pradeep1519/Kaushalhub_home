// src/pages/EnrollmentFormPage.tsx - COMPLETE FIXED VERSION
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  BookOpen, 
  CreditCard, 
  CheckCircle, 
  X,
  AlertCircle,
  Loader2,
  Save,
  Lock,
  LogIn,
  GraduationCap,
  Briefcase,
  Heart
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { apiService } from "../services/api";

interface EnrollmentFormPageProps {
  onNavigate?: (page: string, courseId?: string) => void;
  courseId?: string;
}

// Course data
const coursesData = [
  {
    id: "plc-automation",
    title: "PLC & Automation",
    price: 49999,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop",
  },
  {
    id: "digital-marketing", 
    title: "Digital Marketing With AI & E-Commerce",
    price: 49999,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
  },
  {
    id: "tally-gst",
    title: "Tally with GST + Advanced Excel",
    price: 49999,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
  }
];

// Validation types
interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  gender?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  couponCode?: string;
  dateOfBirth?: string;
  emergencyContact?: string;
}

export function EnrollmentFormPage({ onNavigate, courseId = "plc-automation" }: EnrollmentFormPageProps) {
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "", 
    phone: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "", 
    pincode: "",
    education: "",
    occupation: "",
    couponCode: "",
    emergencyContact: "",
    reference: "",
    previousExperience: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [showErrors, setShowErrors] = useState(false);
  
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);

  // Course details
  const course = coursesData.find(c => c.id === courseId);

  // Check authentication and existing enrollment on component mount
  useEffect(() => {
    checkAuthenticationAndEnrollment();
  }, [courseId]);

  // ✅ FIXED: Check if user is logged in and already enrolled
  const checkAuthenticationAndEnrollment = async () => {
    try {
      setIsCheckingAuth(true);
      
      // Check authentication from localStorage
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      console.log('🔐 Auth Check:', { token: !!token, user: !!user, courseId });
      
      if (token && user) {
        setIsAuthenticated(true);
        
        try {
          // Auto-fill user data
          const userData = JSON.parse(user);
          setFormData(prev => ({
            ...prev,
            fullName: userData.name || userData.fullName || '',
            email: userData.email || ''
          }));
          
          // Check existing enrollment ONLY if authenticated
          await checkExistingEnrollment();
        } catch (error) {
          console.log('Error parsing user data:', error);
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log('Auth check failed:', error);
      setIsAuthenticated(false);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  // ✅ FIXED: Check existing enrollment - ONLY BLOCK IF ACTUALLY ENROLLED
  const checkExistingEnrollment = async () => {
    if (!isAuthenticated || !courseId) {
      console.log('Skipping enrollment check - not authenticated or no courseId');
      return;
    }
    
    try {
      console.log('🔍 Checking existing enrollment for course:', courseId);
      const response = await apiService.checkExistingEnrollment(courseId);
      console.log('Enrollment check response:', response);
      
      // ✅ FIXED LOGIC: Only block if actually enrolled, not if pending payment
      if (response && response.isEnrolled) {
        setIsAlreadyEnrolled(true);
        console.log('❌ User already ENROLLED in this course - BLOCKING');
      } else if (response && response.isPending) {
        // ✅ PENDING PAYMENT - DON'T BLOCK, ALLOW TO CONTINUE
        setIsAlreadyEnrolled(false);
        console.log('📝 User has pending enrollment - can proceed to payment');
        
        // ✅ Auto-enable payment button if pending enrollment exists
        setIsSaved(true);
      } else {
        setIsAlreadyEnrolled(false);
        console.log('✅ User can enroll in this course');
      }
    } catch (error: any) {
      console.log('Enrollment check error:', error.message);
      
      // ✅ SPECIFIC ERROR HANDLING
      if (error.message.includes('already enrolled')) {
        setIsAlreadyEnrolled(true);
        console.log('❌ User already enrolled (from error)');
      } else {
        // Other errors - assume user can enroll
        setIsAlreadyEnrolled(false);
        console.log('✅ User can enroll (error but not enrollment related)');
      }
    }
  };

  // Initial price set
  useEffect(() => {
    if (course) {
      setFinalPrice(course.price);
    }
  }, [course]);

  // Form Validation
  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    // Required field validation
    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = "Full name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      errors.phone = "Please enter a valid 10-digit Indian phone number";
    }

    if (!formData.gender) {
      errors.gender = "Please select your gender";
    }

    if (!formData.address.trim()) {
      errors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      errors.city = "City is required";
    }

    if (!formData.state.trim()) {
      errors.state = "State is required";
    }

    if (!formData.pincode.trim()) {
      errors.pincode = "PIN code is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      errors.pincode = "Please enter a valid 6-digit PIN code";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Real-time validation
  const validateField = (field: string, value: string) => {
    if (!showErrors) return;

    const errors = { ...formErrors };

    switch (field) {
      case 'email':
        if (!value.trim()) {
          errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = "Please enter a valid email address";
        } else {
          delete errors.email;
        }
        break;

      case 'phone':
        if (!value.trim()) {
          errors.phone = "Phone number is required";
        } else if (!/^[6-9]\d{9}$/.test(value)) {
          errors.phone = "Please enter a valid 10-digit Indian phone number";
        } else {
          delete errors.phone;
        }
        break;

      case 'pincode':
        if (!value.trim()) {
          errors.pincode = "PIN code is required";
        } else if (!/^\d{6}$/.test(value)) {
          errors.pincode = "Please enter a valid 6-digit PIN code";
        } else {
          delete errors.pincode;
        }
        break;

      default:
        if (!value.trim()) {
          errors[field as keyof FormErrors] = "This field is required";
        } else {
          delete errors[field as keyof FormErrors];
        }
    }

    setFormErrors(errors);
  };

  // Discount calculation
  const calculateDiscount = (gender: string, couponCode: string) => {
    let discountPercentage = 0;
    
    if (couponCode === "SPECIAL40" && gender === "male") {
      discountPercentage = 40;
    }
    else if (couponCode === "SPECIAL40" && gender === "female") {
      discountPercentage = 45;
    }
    
    return discountPercentage;
  };

  // Input change handler
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (showErrors && ['email', 'phone', 'pincode', 'fullName', 'address', 'city', 'state'].includes(field)) {
      validateField(field, value);
    }
    
    if (field === "gender" && couponApplied) {
      const discountPercentage = calculateDiscount(value, formData.couponCode);
      setDiscount(discountPercentage);
      if (course) {
        const discountedPrice = course.price * (1 - discountPercentage / 100);
        setFinalPrice(Math.round(discountedPrice));
      }
    }
  };

  // Coupon apply with validation
  const applyCoupon = () => {
    if (!formData.couponCode.trim()) {
      setFormErrors(prev => ({ ...prev, couponCode: "Please enter a coupon code" }));
      return;
    }

    if (formData.couponCode === "SPECIAL40") {
      const discountPercentage = calculateDiscount(formData.gender, "SPECIAL40");
      setDiscount(discountPercentage);
      setCouponApplied(true);
      setFormErrors(prev => ({ ...prev, couponCode: undefined }));
      
      if (course) {
        const discountedPrice = course.price * (1 - discountPercentage / 100);
        setFinalPrice(Math.round(discountedPrice));
      }
      
      setShowCongrats(true);
      setTimeout(() => setShowCongrats(false), 5000);
      
    } else {
      setFormErrors(prev => ({ 
        ...prev, 
        couponCode: "Invalid coupon code. Please use 'SPECIAL40' for discount." 
      }));
    }
  };

  // Coupon remove
  const removeCoupon = () => {
    setDiscount(0);
    setCouponApplied(false);
    if (course) {
      setFinalPrice(course.price);
    }
    setFormData(prev => ({ ...prev, couponCode: "" }));
    setFormErrors(prev => ({ ...prev, couponCode: undefined }));
  };

  // ✅ FIXED: Save Enrollment Data - DON'T SET isAlreadyEnrolled to true
  const handleSaveEnrollment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is authenticated
    if (!isAuthenticated) {
      if (onNavigate) {
        onNavigate('login');
      }
      return;
    }

    // ✅ REMOVED: Don't check isAlreadyEnrolled here - allow form submission
    // if (isAlreadyEnrolled) {
    //   alert('You are already enrolled or have a pending enrollment for this course.');
    //   return;
    // }

    setShowErrors(true);
    
    // Final validation
    if (!validateForm()) {
      const firstErrorField = Object.keys(formErrors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const currentCourse = coursesData.find(c => c.id === courseId);
      
      if (!currentCourse) {
        throw new Error('Course not found');
      }

      const enrollmentData = {
        // Personal Information
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        emergencyContact: formData.emergencyContact,
        
        // Address Information
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        
        // Education & Career
        education: formData.education,
        occupation: formData.occupation,
        previousExperience: formData.previousExperience,
        reference: formData.reference,
        
        // ✅ COURSE INFORMATION - PROPERLY SET
        courseId: courseId,
        courseTitle: currentCourse.title,
        originalPrice: currentCourse.price,
        finalPrice: finalPrice,
        
        // Discount Information
        couponCode: formData.couponCode || "",
        discountPercentage: discount,

        // ✅ ADD TIMESTAMP AND STATUS
        enrollmentDate: new Date().toISOString(),
        status: 'pending_payment' // ✅ FIXED: Use correct status
      };

      console.log("📤 Sending enrollment data for course:", courseId, enrollmentData);

      const responseData = await apiService.createEnrollment(enrollmentData);

      if (responseData.success) {
        setIsSaved(true);
        // ✅ FIXED: DON'T set isAlreadyEnrolled to true - this blocks payment button
        // setIsAlreadyEnrolled(true); // ❌ REMOVED THIS LINE
        console.log("✅ Enrollment saved successfully for course:", courseId);
        
        // Show success message
        setTimeout(() => {
          alert('Enrollment data saved successfully! You can now proceed to payment.');
        }, 500);
        
      } else {
        throw new Error(responseData.error || 'Enrollment failed');
      }
    } catch (error: any) {
      console.error('❌ Error saving enrollment:', error);
      
      let errorMessage = 'Failed to save enrollment data. Please try again.';
      
      if (error.message?.includes('already enrolled')) {
        errorMessage = 'You are already enrolled in this course.';
        setIsAlreadyEnrolled(true);
      } else if (error.message?.includes('Validation failed')) {
        errorMessage = 'Please check all required fields and try again.';
      } else if (error.message?.includes('Please login')) {
        errorMessage = 'Please login to enroll in this course.';
        if (onNavigate) {
          onNavigate('login');
        }
        return;
      }
      
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Payment Navigation
  const handleProceedToPayment = () => {
    if (!isAuthenticated) {
      if (onNavigate) {
        onNavigate('login');
      }
      return;
    }

    if (onNavigate) {
      onNavigate('payment', courseId);
    }
  };

  // Handle Login Redirect
  const handleLoginRedirect = () => {
    if (onNavigate) {
      onNavigate('login');
    }
  };

  // Loading state
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 dark:text-gray-300">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // ✅ FIXED: Already enrolled case - ONLY show for actually enrolled, not pending
  if (isAlreadyEnrolled) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-yellow-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Already Enrolled</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            You are already enrolled in this course.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => onNavigate && onNavigate('courses')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Browse Other Courses
            </button>
            <button
              onClick={() => onNavigate && onNavigate('home')}
              className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition duration-200"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Not authenticated case
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-blue-500 text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Login Required</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Please login to enroll in this course. Your enrollment will be saved to your account.
          </p>
          <div className="space-y-3">
            <button
              onClick={handleLoginRedirect}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-medium flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              Login Now
            </button>
            <button
              onClick={() => onNavigate && onNavigate('signup')}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-200 font-medium"
            >
              Create Account
            </button>
            <button
              onClick={() => onNavigate && onNavigate('course-details', courseId)}
              className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition duration-200"
            >
              Back to Course
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Course not found case
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

  // MAIN FORM CONTENT WITH ALL FIELDS
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-x-hidden">
      {/* Congratulations Popup */}
      <AnimatePresence>
        {showCongrats && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-auto shadow-2xl"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  🎉 Congratulations!
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  You got {discount}% discount on this course! 
                  {formData.gender === 'female' && " Extra 5% for female students applied!"}
                </p>
                <div className="text-lg font-bold text-green-600 mb-4">
                  You saved ₹{Math.round(course.price * (discount / 100)).toLocaleString('en-IN')}
                </div>
                <Button
                  onClick={() => setShowCongrats(false)}
                  className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white"
                >
                  Continue Enrollment
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <motion.header
        className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => onNavigate && onNavigate(`course-details`, courseId)}
              className="flex items-center gap-2 text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden xs:inline">Back to Course</span>
              <span className="xs:hidden">Back</span>
            </Button>
            
            <div className="text-center">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                Enrollment Form
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                Complete your enrollment
              </p>
            </div>
            
            <div className="flex items-center gap-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-3 py-1 rounded-full text-sm">
              <CheckCircle className="w-4 h-4" />
              Logged In
            </div>
          </div>
        </div>
      </motion.header>

      {/* MAIN FORM CONTENT WITH ALL FIELDS */}
      <main className="container mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Enrollment Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <User className="w-5 h-5 text-blue-500" />
                    Student Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveEnrollment} className="space-y-6">
                    {/* Personal Information Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <User className="w-5 h-5 text-blue-500" />
                        Personal Information
                      </h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name *</Label>
                          <Input
                            id="fullName"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange("fullName", e.target.value)}
                            required
                            placeholder="Enter your full name"
                            className={showErrors && formErrors.fullName ? "border-red-500" : ""}
                          />
                          {showErrors && formErrors.fullName && (
                            <div className="flex items-center gap-1 text-red-500 text-sm">
                              <AlertCircle className="w-4 h-4" />
                              {formErrors.fullName}
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            required
                            placeholder="Enter your email"
                            className={showErrors && formErrors.email ? "border-red-500" : ""}
                          />
                          {showErrors && formErrors.email && (
                            <div className="flex items-center gap-1 text-red-500 text-sm">
                              <AlertCircle className="w-4 h-4" />
                              {formErrors.email}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            required
                            placeholder="Enter 10-digit phone number"
                            maxLength={10}
                            className={showErrors && formErrors.phone ? "border-red-500" : ""}
                          />
                          {showErrors && formErrors.phone && (
                            <div className="flex items-center gap-1 text-red-500 text-sm">
                              <AlertCircle className="w-4 h-4" />
                              {formErrors.phone}
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="gender">Gender *</Label>
                          <Select 
                            value={formData.gender} 
                            onValueChange={(value) => handleInputChange("gender", value)}
                          >
                            <SelectTrigger className={showErrors && formErrors.gender ? "border-red-500" : ""}>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          {showErrors && formErrors.gender && (
                            <div className="flex items-center gap-1 text-red-500 text-sm">
                              <AlertCircle className="w-4 h-4" />
                              {formErrors.gender}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="dateOfBirth">Date of Birth</Label>
                          <Input
                            id="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="emergencyContact">
                            <span className="flex items-center gap-1">
                              <Heart className="w-4 h-4 text-red-500" />
                              Emergency Contact
                            </span>
                          </Label>
                          <Input
                            id="emergencyContact"
                            value={formData.emergencyContact}
                            onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                            placeholder="Emergency contact number"
                            maxLength={10}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Address Information Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-blue-500" />
                        Address Information
                      </h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Complete Address *</Label>
                        <Textarea
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          required
                          placeholder="Enter your complete address with street, area, etc."
                          rows={3}
                          className={showErrors && formErrors.address ? "border-red-500" : ""}
                        />
                        {showErrors && formErrors.address && (
                          <div className="flex items-center gap-1 text-red-500 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {formErrors.address}
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                            required
                            placeholder="Enter your city"
                            className={showErrors && formErrors.city ? "border-red-500" : ""}
                          />
                          {showErrors && formErrors.city && (
                            <div className="flex items-center gap-1 text-red-500 text-sm">
                              <AlertCircle className="w-4 h-4" />
                              {formErrors.city}
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="state">State *</Label>
                          <Input
                            id="state"
                            value={formData.state}
                            onChange={(e) => handleInputChange("state", e.target.value)}
                            required
                            placeholder="Enter your state"
                            className={showErrors && formErrors.state ? "border-red-500" : ""}
                          />
                          {showErrors && formErrors.state && (
                            <div className="flex items-center gap-1 text-red-500 text-sm">
                              <AlertCircle className="w-4 h-4" />
                              {formErrors.state}
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="pincode">PIN Code *</Label>
                          <Input
                            id="pincode"
                            value={formData.pincode}
                            onChange={(e) => handleInputChange("pincode", e.target.value)}
                            required
                            placeholder="Enter 6-digit PIN"
                            maxLength={6}
                            className={showErrors && formErrors.pincode ? "border-red-500" : ""}
                          />
                          {showErrors && formErrors.pincode && (
                            <div className="flex items-center gap-1 text-red-500 text-sm">
                              <AlertCircle className="w-4 h-4" />
                              {formErrors.pincode}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Education & Career Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-blue-500" />
                        Education & Career
                      </h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="education">Education Qualification</Label>
                          <Select 
                            value={formData.education} 
                            onValueChange={(value) => handleInputChange("education", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select education level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="high-school">High School (10th)</SelectItem>
                              <SelectItem value="intermediate">Intermediate (12th)</SelectItem>
                              <SelectItem value="diploma">Diploma</SelectItem>
                              <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                              <SelectItem value="master">Master's Degree</SelectItem>
                              <SelectItem value="phd">PhD</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="occupation">
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4 text-blue-500" />
                              Current Occupation
                            </span>
                          </Label>
                          <Input
                            id="occupation"
                            value={formData.occupation}
                            onChange={(e) => handleInputChange("occupation", e.target.value)}
                            placeholder="e.g., Student, Engineer, etc."
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="previousExperience">Previous Experience (if any)</Label>
                        <Textarea
                          id="previousExperience"
                          value={formData.previousExperience}
                          onChange={(e) => handleInputChange("previousExperience", e.target.value)}
                          placeholder="Briefly describe your previous work experience..."
                          rows={2}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reference">How did you hear about us?</Label>
                        <Select 
                          value={formData.reference} 
                          onValueChange={(value) => handleInputChange("reference", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select reference source" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="friend">Friend/Family</SelectItem>
                            <SelectItem value="social-media">Social Media</SelectItem>
                            <SelectItem value="google">Google Search</SelectItem>
                            <SelectItem value="website">Website</SelectItem>
                            <SelectItem value="advertisement">Advertisement</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Coupon Code Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-green-500" />
                        Discount & Payment
                      </h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="couponCode">Coupon Code</Label>
                        <div className="flex gap-2">
                          <Input
                            id="couponCode"
                            value={formData.couponCode}
                            onChange={(e) => handleInputChange("couponCode", e.target.value)}
                            placeholder="Enter coupon code"
                            disabled={couponApplied}
                            className={showErrors && formErrors.couponCode ? "border-red-500" : ""}
                          />
                          {couponApplied ? (
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={removeCoupon}
                              className="text-red-600 border-red-300 hover:bg-red-50"
                            >
                              <X className="w-4 h-4 mr-1" />
                              Remove
                            </Button>
                          ) : (
                            <Button type="button" variant="outline" onClick={applyCoupon}>
                              Apply Coupon
                            </Button>
                          )}
                        </div>
                        {showErrors && formErrors.couponCode ? (
                          <div className="flex items-center gap-1 text-red-500 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {formErrors.couponCode}
                          </div>
                        ) : (
                          <p className="text-xs text-gray-500">
                            Use coupon code "SPECIAL40" for special discounts (40% for males, 45% for females)
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                      {/* Save Button */}
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-base font-semibold"
                          size="lg"
                          disabled={isSubmitting || isSaved}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Saving Enrollment...
                            </>
                          ) : isSaved ? (
                            <>
                              <CheckCircle className="w-5 h-5 mr-2" />
                              Enrollment Saved!
                            </>
                          ) : (
                            <>
                              <Save className="w-5 h-5 mr-2" />
                              Save Enrollment Data
                            </>
                          )}
                        </Button>
                      </motion.div>

                      {/* Proceed to Payment Button */}
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          type="button"
                          onClick={handleProceedToPayment}
                          className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white py-4 text-base font-semibold"
                          size="lg"
                          disabled={!isSaved}
                        >
                          {isSaved ? (
                            <>
                              <CreditCard className="w-5 h-5 mr-2" />
                              Proceed to Payment
                            </>
                          ) : (
                            <>
                              <Lock className="w-5 h-5 mr-2" />
                              Complete Enrollment First
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </div>

                    {/* Status Messages */}
                    {showErrors && Object.keys(formErrors).length > 0 && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="w-5 h-5 text-red-500" />
                          <p className="text-red-800 font-semibold">
                            Please fix the following errors:
                          </p>
                        </div>
                        <ul className="text-sm text-red-700 list-disc list-inside space-y-1">
                          {Object.values(formErrors).map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {isSaved && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <p className="text-green-800 font-semibold">
                            ✅ Enrollment data saved successfully! You can now proceed to payment.
                          </p>
                        </div>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Course Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                    Course Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <ImageWithFallback
                      src={course.image}
                      alt={course.title}
                      className="w-16 h-16 rounded-lg object-cover"
                      fallbackSrc="/course-placeholder.jpg"
                    />
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base">{course.title}</h3>
                      <p className="text-xs text-gray-500">3 Months Program</p>
                    </div>
                  </div>

                  <div className="space-y-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span>Original Price:</span>
                      <span className="font-semibold">₹{course.price.toLocaleString('en-IN')}</span>
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Discount ({discount}%):</span>
                        <span className="font-semibold text-green-600">
                          -₹{Math.round(course.price * (discount / 100)).toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Final Price:</span>
                      <span className="text-blue-600">₹{finalPrice.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {discount > 0 && (
                    <Badge className="w-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-center py-2">
                      🎉 You saved {discount}% on this course!
                    </Badge>
                  )}

                  <div className="space-y-2 text-xs text-gray-500">
                    <p>✅ Lifetime access to course materials</p>
                    <p>✅ Certificate of completion</p>
                    <p>✅ Downloadable resources & projects</p>
                    <p>✅ 24/7 support access</p>
                    <p>✅ Placement assistance</p>
                    <p>✅ 7-day money back guarantee</p>
                  </div>

                  {/* Enrollment Progress */}
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Enrollment Progress</h4>
                    <div className="space-y-2 text-xs">
                      <div className={`flex items-center gap-2 ${isSaved ? 'text-green-600' : 'text-gray-500'}`}>
                        <div className={`w-2 h-2 rounded-full ${isSaved ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        <span>Form Completion {isSaved ? '✓ Completed' : 'Pending'}</span>
                      </div>
                      <div className={`flex items-center gap-2 ${isSaved ? 'text-blue-600' : 'text-gray-400'}`}>
                        <div className={`w-2 h-2 rounded-full ${isSaved ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                        <span>Payment {isSaved ? 'Ready' : 'Locked'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                        <span>Course Access {isSaved ? 'After Payment' : 'Pending'}</span>
                      </div>
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

export default EnrollmentFormPage;