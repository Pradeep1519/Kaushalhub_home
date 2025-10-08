// src/pages/EnrollmentFormPage.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, BookOpen, CreditCard, CheckCircle, X, Search, Clock, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { apiService } from "../services/api";
import { PaymentModal } from "../components/PaymentModal";

interface EnrollmentFormPageProps {
  onNavigate?: (page: string) => void;
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
    emergencyContact: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  // ✅ NEW: Previous Enrollments State
  const [showPreviousEnrollments, setShowPreviousEnrollments] = useState(false);
  const [previousEnrollments, setPreviousEnrollments] = useState<any[]>([]);
  const [checkingEnrollments, setCheckingEnrollments] = useState(false);
  const [enrollmentError, setEnrollmentError] = useState("");

  // Course details
  const course = coursesData.find(c => c.id === courseId);

  // Initial price set
  useEffect(() => {
    if (course) {
      setFinalPrice(course.price);
    }
  }, [course]);

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
    
    if (field === "gender" && couponApplied) {
      const discountPercentage = calculateDiscount(value, formData.couponCode);
      setDiscount(discountPercentage);
      if (course) {
        const discountedPrice = course.price * (1 - discountPercentage / 100);
        setFinalPrice(Math.round(discountedPrice));
      }
    }
  };

  // Coupon apply
  const applyCoupon = () => {
    if (formData.couponCode === "SPECIAL40") {
      const discountPercentage = calculateDiscount(formData.gender, "SPECIAL40");
      setDiscount(discountPercentage);
      setCouponApplied(true);
      
      if (course) {
        const discountedPrice = course.price * (1 - discountPercentage / 100);
        setFinalPrice(Math.round(discountedPrice));
      }
      
      setShowCongrats(true);
      setTimeout(() => setShowCongrats(false), 5000);
      
    } else if (formData.couponCode) {
      alert("Invalid coupon code. Please use 'SPECIAL40' for discount.");
    } else {
      alert("Please enter a coupon code.");
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
  };

  // ✅ NEW: Check Previous Enrollments
  const checkPreviousEnrollments = async () => {
    if (!formData.email && !formData.phone) {
      alert('Please enter email or phone number to check previous enrollments');
      return;
    }

    setCheckingEnrollments(true);
    setEnrollmentError("");
    try {
      const response = await apiService.getEnrollmentsCheck({
        email: formData.email,
        phone: formData.phone
      });

      if (response.success) {
        setPreviousEnrollments(response.data);
        setShowPreviousEnrollments(true);
        
        // ✅ Auto-show modal if there are pending enrollments for same course
        const sameCoursePending = response.data.find(
          (enrollment: any) => 
            enrollment.courseId === courseId && 
            enrollment.status === 'pending_payment'
        );
        
        if (sameCoursePending) {
          setEnrollmentError(`You already have a pending enrollment for ${course?.title}. Click "Continue Payment" to complete.`);
        }
      }
    } catch (error) {
      console.error('Error checking enrollments:', error);
      alert('Error checking previous enrollments');
    } finally {
      setCheckingEnrollments(false);
    }
  };

  // ✅ UPDATED: FORM SUBMIT HANDLER with Previous Enrollment Check
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setEnrollmentError("");

    try {
      const currentCourse = coursesData.find(c => c.id === courseId);
      
      if (!currentCourse) {
        throw new Error('Course not found');
      }

      // ✅ Check if already enrolled in same course
      const existingEnrollment = previousEnrollments.find(
        (enrollment: any) => 
          enrollment.courseId === courseId && 
          enrollment.status === 'pending_payment'
      );

      if (existingEnrollment) {
        setEnrollmentError(`You already have a pending enrollment for this course. Please click "Continue Payment" to complete.`);
        setIsSubmitting(false);
        return;
      }

      const enrollmentData = {
        // Personal Information
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        
        // Course Information
        courseId: courseId,
        courseTitle: currentCourse.title,
        originalPrice: currentCourse.price,
        finalPrice: finalPrice,
        
        // Optional Fields
        dateOfBirth: formData.dateOfBirth || undefined,
        education: formData.education || "",
        occupation: formData.occupation || "",
        emergencyContact: formData.emergencyContact || "",
        couponCode: formData.couponCode || "",
        discountPercentage: discount,
      };

      console.log("📤 Sending enrollment data:", enrollmentData);

      const responseData = await apiService.createEnrollment(enrollmentData);

      console.log("📥 Backend response:", responseData);

      if (responseData.success) {
        setIsSaved(true);
        console.log("✅ Enrollment saved successfully!");
        
        // ✅ Show Payment Modal with Discounted Price
        setTimeout(() => {
          setShowPaymentModal(true);
        }, 1000);
        
      } else {
        throw new Error(responseData.error || 'Enrollment failed');
      }
    } catch (error: any) {
      console.error('❌ Error saving enrollment:', error);
      
      // ✅ Handle duplicate enrollment error
      if (error.message?.includes('already enrolled') || error.message?.includes('duplicate')) {
        setEnrollmentError('You are already enrolled or have a pending enrollment for this course. Please check your previous enrollments.');
        // Auto-check previous enrollments
        if (formData.email || formData.phone) {
          checkPreviousEnrollments();
        }
      } else {
        alert(`Error: ${error.message || 'Failed to save enrollment data. Please try again.'}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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

      {/* ✅ Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={() => {
          console.log("✅ Payment successful!");
          setShowPaymentModal(false);
          if (onNavigate) {
            onNavigate(`payment-success-${courseId}`);
          }
        }}
        course={{
          title: course.title,
          originalPrice: course.price,
          finalPrice: finalPrice,
          duration: "3 Months",
          discountPercentage: discount
        }}
      />

      {/* ✅ Previous Enrollments Modal */}
      <AnimatePresence>
        {showPreviousEnrollments && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowPreviousEnrollments(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: -20 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">📋 Your Previous Enrollments</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPreviousEnrollments(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {previousEnrollments.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No previous enrollments found.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {previousEnrollments.map((enrollment, index) => (
                    <Card key={enrollment._id || index} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg">{enrollment.courseTitle}</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-sm">
                              <p className="text-gray-500">
                                <strong>Enrolled:</strong> {new Date(enrollment.enrollmentDate).toLocaleDateString('en-IN')}
                              </p>
                              <p className="text-gray-500">
                                <strong>Amount:</strong> ₹{enrollment.finalPrice?.toLocaleString('en-IN') || 'N/A'}
                              </p>
                              <p className="text-gray-500">
                                <strong>Status:</strong> 
                                <Badge 
                                  variant={
                                    enrollment.status === 'enrolled' ? 'default' :
                                    enrollment.status === 'payment_completed' ? 'secondary' : 'outline'
                                  }
                                  className="ml-2"
                                >
                                  {enrollment.status.replace('_', ' ').toUpperCase()}
                                </Badge>
                              </p>
                              {enrollment.discountPercentage > 0 && (
                                <p className="text-green-600">
                                  <strong>Discount:</strong> {enrollment.discountPercentage}% OFF
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 ml-4">
                            {/* ✅ Continue Payment for Same Course & Pending Status */}
                            {enrollment.courseId === courseId && enrollment.status === 'pending_payment' && (
                              <Button
                                size="sm"
                                onClick={() => {
                                  setShowPreviousEnrollments(false);
                                  setShowPaymentModal(true);
                                }}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Continue Payment
                              </Button>
                            )}
                            
                            {/* ✅ View Course for Different Course */}
                            {enrollment.courseId !== courseId && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setShowPreviousEnrollments(false);
                                  if (onNavigate) {
                                    onNavigate(`course-details-${enrollment.courseId}`);
                                  }
                                }}
                              >
                                View Course
                              </Button>
                            )}
                            
                            {/* ✅ View Details for Completed/Enrolled */}
                            {(enrollment.status === 'enrolled' || enrollment.status === 'payment_completed') && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  // Navigate to course dashboard or details
                                  console.log('View course details:', enrollment);
                                  alert('Redirecting to course dashboard...');
                                }}
                              >
                                View Details
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
              
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  💡 <strong>Tip:</strong> You can continue pending payments or enroll in new courses. 
                  Each course requires separate enrollment.
                </p>
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
              onClick={() => onNavigate && onNavigate(`course-details-${courseId}`)}
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
            
            {/* ✅ Check Previous Enrollments Button */}
            <Button
              variant="outline"
              onClick={checkPreviousEnrollments}
              disabled={checkingEnrollments || (!formData.email && !formData.phone)}
              className="flex items-center gap-2 text-sm"
            >
              {checkingEnrollments ? (
                <>
                  <Clock className="w-4 h-4 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Check Previous
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
        {/* ✅ Enrollment Error Alert */}
        {enrollmentError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-yellow-800 font-medium">{enrollmentError}</p>
                <Button
                  variant="link"
                  onClick={checkPreviousEnrollments}
                  className="p-0 h-auto text-yellow-700 underline"
                >
                  Click here to view your previous enrollments
                </Button>
              </div>
            </div>
          </motion.div>
        )}

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
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    {/* Personal Information */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          required
                          placeholder="Enter your full name"
                        />
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
                        />
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
                          placeholder="Enter your phone number"
                          maxLength={11}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender *</Label>
                        <Select 
                          value={formData.gender} 
                          onValueChange={(value) => handleInputChange("gender", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
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
                        <Label htmlFor="emergencyContact">Emergency Contact</Label>
                        <Input
                          id="emergencyContact"
                          value={formData.emergencyContact}
                          onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                          placeholder="Emergency contact number"
                        />
                      </div>
                    </div>

                    {/* Address Information */}
                    <div className="space-y-2">
                      <Label htmlFor="address">Address *</Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        required
                        placeholder="Enter your complete address"
                        rows={3}
                      />
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
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => handleInputChange("state", e.target.value)}
                          required
                          placeholder="Enter your state"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="pincode">PIN Code *</Label>
                        <Input
                          id="pincode"
                          value={formData.pincode}
                          onChange={(e) => handleInputChange("pincode", e.target.value)}
                          required
                          placeholder="Enter PIN code"
                        />
                      </div>
                    </div>

                    {/* Education & Occupation */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="education">Education Qualification</Label>
                        <Select 
                          value={formData.education} 
                          onValueChange={(value) => handleInputChange("education", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select education" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high-school">High School</SelectItem>
                            <SelectItem value="diploma">Diploma</SelectItem>
                            <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                            <SelectItem value="master">Master's Degree</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="occupation">Occupation</Label>
                        <Input
                          id="occupation"
                          value={formData.occupation}
                          onChange={(e) => handleInputChange("occupation", e.target.value)}
                          placeholder="Enter your occupation"
                        />
                      </div>
                    </div>

                    {/* Coupon Code */}
                    <div className="space-y-2">
                      <Label htmlFor="couponCode">Coupon Code</Label>
                      <div className="flex gap-2">
                        <Input
                          id="couponCode"
                          value={formData.couponCode}
                          onChange={(e) => handleInputChange("couponCode", e.target.value)}
                          placeholder="Enter coupon code"
                          disabled={couponApplied}
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
                            Apply
                          </Button>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">
                        Use coupon code "SPECIAL40" for special discounts
                      </p>
                    </div>

                    {/* Submit Button */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-4 sm:py-6 text-base sm:text-lg font-semibold"
                        size="lg"
                        disabled={isSubmitting || isSaved}
                      >
                        {isSubmitting ? (
                          "Saving..."
                        ) : isSaved ? (
                          <>
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Data Saved Successfully!
                          </>
                        ) : (
                          <>
                            <CreditCard className="w-5 h-5 mr-2" />
                            Save & Proceed to Payment
                          </>
                        )}
                      </Button>
                    </motion.div>
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
                    <p>✅ Lifetime access</p>
                    <p>✅ Certificate of completion</p>
                    <p>✅ Downloadable resources</p>
                    <p>✅ 7-day money back guarantee</p>
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