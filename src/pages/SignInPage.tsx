// src/pages/SignInPage.tsx
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { AnimatedButton } from '../components/AnimatedButton';
import { Eye, EyeOff, ArrowLeft, LogIn, ShoppingCart } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { SuccessConfetti } from '../components/SuccessConfetti';

interface SignInPageProps {
  onNavigate: (page: string) => void;
}

export function SignInPage({ onNavigate }: SignInPageProps) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pendingCourse, setPendingCourse] = useState<any>(null);

  // ✅ Check for pending course on component mount
  useEffect(() => {
    const storedPendingCourse = localStorage.getItem('pendingCourse');
    if (storedPendingCourse) {
      setPendingCourse(JSON.parse(storedPendingCourse));
    }
  }, []);

  // ✅ Use UserContext for authentication
  const { login } = useUser();

  // ✅ Client-side form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ BACKEND INTEGRATION: Handle login form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // ✅ First validate form on client side
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // ✅ Make API call to backend login endpoint
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const result = await response.json();

      if (result.success) {
        // ✅ Login successful - update context and localStorage
        login(result.user, result.token);
        
        // ✅ STUDENT PORTAL INTEGRATION: Transfer auth to student portal
        localStorage.setItem('studentToken', result.token);
        localStorage.setItem('studentUser', JSON.stringify(result.user));

        // ✅ Check if there's a pending course enrollment
        if (pendingCourse) {
          // ✅ Enroll user in the pending course
          await enrollInPendingCourse(result.user, result.token, pendingCourse);
        } else {
          // ✅ No pending course - redirect based on user status
          setShowSuccess(true);
          setTimeout(() => {
            redirectAfterLogin(result.user);
          }, 2000);
        }
        
      } else {
        // ❌ Login failed - show error message from backend
        setErrors({ general: result.message || 'Invalid email or password. Please try again.' });
      }
    } catch (error) {
      console.error('Login error:', error);
      // ❌ Network error
      setErrors({ general: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ REAL FLOW: Enroll user in pending course after login
  const enrollInPendingCourse = async (user: any, token: string, course: any) => {
    try {
      const response = await fetch('http://localhost:8000/api/courses/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          courseId: course.courseId,
          courseTitle: course.courseTitle,
          coursePrice: course.coursePrice
        }),
      });

      const result = await response.json();

      if (result.success) {
        // ✅ Update user data with new course
        const updatedUser = {
          ...user,
          enrolledCourses: [...(user.enrolledCourses || []), course.courseId]
        };
        
        // Update context and localStorage
        login(updatedUser, token);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // ✅ Clear pending course
        localStorage.removeItem('pendingCourse');
        setPendingCourse(null);
        
        // ✅ Show success and redirect to student portal
        setShowSuccess(true);
        setTimeout(() => {
          redirectToStudentPortal();
        }, 2000);
      }
    } catch (error) {
      console.error('Enrollment error:', error);
      // Fallback - redirect to courses page
      setShowSuccess(true);
      setTimeout(() => {
        onNavigate("courses");
      }, 2000);
    }
  };

  // ✅ REAL FLOW: Redirect to student portal
  const redirectToStudentPortal = () => {
    onNavigate("student-portal-dashboard");
  };

  // ✅ REAL FLOW: Redirect user after login
  const redirectAfterLogin = (user: any) => {
    if (user.role === 'instructor') {
      onNavigate("instructor-dashboard");
    } else if (user.enrolledCourses && user.enrolledCourses.length === 0) {
      onNavigate("courses");
    } else {
      redirectToStudentPortal();
    }
  };

  // ✅ Handle input changes and clear field-specific errors
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // ✅ Clear pending course and go to courses
  const handleContinueWithoutEnrollment = () => {
    localStorage.removeItem('pendingCourse');
    setPendingCourse(null);
    onNavigate('courses');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        whileHover={{ scale: 1.02, y: -5 }}
        className="w-full max-w-md"
      >
        <Card className="border border-blue-100 shadow-xl rounded-2xl bg-white">
          {/* Header Section */}
          <CardHeader className="space-y-1 text-center pb-2">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center shadow-md mb-3">
              <LogIn className="w-7 h-7 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">
              {pendingCourse ? 'Complete Your Enrollment' : 'Welcome Back'}
            </CardTitle>
            <CardDescription className="text-gray-500">
              {pendingCourse 
                ? `Sign in to enroll in ${pendingCourse.courseTitle}`
                : 'Sign in to continue your learning journey'
              }
            </CardDescription>
          </CardHeader>

          {/* Form Section */}
          <CardContent>
            {/* Pending Course Info */}
            {pendingCourse && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-5 h-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="font-semibold text-blue-800 text-sm">
                      {pendingCourse.courseTitle}
                    </p>
                    <p className="text-blue-600 text-xs">
                      Price: {pendingCourse.coursePrice}
                    </p>
                  </div>
                </div>
                <p className="text-blue-700 text-xs mt-2">
                  Login to complete your enrollment and access Student Portal
                </p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message Display */}
              {errors.general && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                  {errors.general}
                </div>
              )}

              {/* Email Input */}
              <div className="space-y-2 text-left">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  disabled={isLoading}
                  className="h-11"
                />
                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Password Input */}
              <div className="space-y-2 text-left">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={e => handleInputChange('password', e.target.value)}
                    disabled={isLoading}
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
              </div>

              {/* Sign In Button */}
              <div className="pt-3">
                <AnimatedButton 
                  type="submit" 
                  disabled={isLoading} 
                  className="w-full h-11 text-base"
                >
                  {isLoading 
                    ? (pendingCourse ? 'Enrolling...' : 'Signing In...') 
                    : (pendingCourse ? 'Enroll Now' : 'Sign In')
                  }
                </AnimatedButton>
              </div>
            </form>

            {/* Continue without enrollment */}
            {pendingCourse && (
              <div className="mt-4 text-center">
                <button
                  onClick={handleContinueWithoutEnrollment}
                  className="text-sm text-gray-600 hover:text-gray-800 underline"
                  disabled={isLoading}
                >
                  Continue without enrolling
                </button>
              </div>
            )}

            {/* Footer Links */}
            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => onNavigate('signup')}
                className="text-blue-600 font-medium hover:underline"
                disabled={isLoading}
              >
                Sign up
              </button>
            </div>

            {/* Student Portal Access Info */}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700 text-center">
                After login, access your courses in <strong>Student Portal</strong>
              </p>
            </div>

            {/* Back to Home Button */}
            <Button
              variant="ghost"
              onClick={() => onNavigate('home')}
              className="w-full mt-5 flex items-center justify-center gap-2 text-gray-700 hover:text-blue-600"
              disabled={isLoading}
            >
              <ArrowLeft size={18} /> Back to Home
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Success Confetti Animation */}
      <SuccessConfetti 
        isVisible={showSuccess} 
        onComplete={() => setShowSuccess(false)}
        message={pendingCourse ? "🎉 Enrollment Successful! Redirecting to Student Portal..." : "✅ Login Successful!"}
      />
    </div>
  );
}