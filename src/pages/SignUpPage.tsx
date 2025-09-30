import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { AnimatedButton } from '../components/AnimatedButton';
import { Eye, EyeOff, User, ArrowLeft, ShoppingCart } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { SuccessConfetti } from '../components/SuccessConfetti';

interface SignUpPageProps {
  onNavigate: (page: string) => void;
}

export function SignUpPage({ onNavigate }: SignUpPageProps) {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pendingCourse, setPendingCourse] = useState<any>(null);

  // ✅ Check for pending course on component mount
  useEffect(() => {
    const storedPendingCourse = localStorage.getItem('pendingCourse');
    if (storedPendingCourse) {
      setPendingCourse(JSON.parse(storedPendingCourse));
    }
  }, []);

  const { login } = useUser();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 chars';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ REAL FLOW: Handle signup form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // ✅ REAL API CALL: Signup user
      const response = await fetch('http://localhost:8000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: 'student'
        }),
      });

      const result = await response.json();

      if (result.success) {
        // ✅ Signup successful - update context and localStorage
        login(result.user, result.token);
        
        // ✅ STUDENT PORTAL INTEGRATION: Transfer auth to student portal
        localStorage.setItem('studentToken', result.token);
        localStorage.setItem('studentUser', JSON.stringify(result.user));

        // ✅ Check if there's a pending course enrollment
        if (pendingCourse) {
          // ✅ Enroll user in the pending course
          await enrollInPendingCourse(result.user, result.token, pendingCourse);
        } else {
          // ✅ No pending course - redirect to courses
          setShowSuccess(true);
          setTimeout(() => {
            onNavigate("courses");
          }, 2000);
        }
        
      } else {
        // ❌ Signup failed - show error message from backend
        setErrors({ general: result.message || 'Sign up failed. Email might already exist.' });
      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ general: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ REAL FLOW: Enroll user in pending course after signup
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

  // ✅ Handle input changes and clear field-specific errors
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
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
          {/* Header */}
          <CardHeader className="space-y-1 text-center pb-2">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center shadow-md mb-3">
              <User className="w-7 h-7 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">
              {pendingCourse ? 'Complete Your Enrollment' : 'Join KaushalHub'}
            </CardTitle>
            <CardDescription className="text-gray-500">
              {pendingCourse 
                ? `Create account to enroll in ${pendingCourse.courseTitle}`
                : 'Create your account to start learning'
              }
            </CardDescription>
          </CardHeader>

          {/* Form */}
          <CardContent>
            {/* Pending Course Info */}
            {pendingCourse && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <p className="font-semibold text-green-800 text-sm">
                      {pendingCourse.courseTitle}
                    </p>
                    <p className="text-green-600 text-xs">
                      Price: {pendingCourse.coursePrice}
                    </p>
                  </div>
                </div>
                <p className="text-green-700 text-xs mt-2">
                  Create account to complete enrollment and access Student Portal
                </p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {errors.general && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                  {errors.general}
                </div>
              )}

              <div className="space-y-2 text-left">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={e => handleInputChange('name', e.target.value)}
                  disabled={isLoading}
                  className="h-11"
                />
                {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
              </div>

              <div className="space-y-2 text-left">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  disabled={isLoading}
                  className="h-11"
                />
                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
              </div>

              <div className="space-y-2 text-left">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
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

              <div className="space-y-2 text-left">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={e => handleInputChange('confirmPassword', e.target.value)}
                    disabled={isLoading}
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>

              {/* Create Account Button */}
              <AnimatedButton 
                type="submit" 
                disabled={isLoading} 
                className="w-full h-11 text-base"
              >
                {isLoading 
                  ? (pendingCourse ? 'Creating Account & Enrolling...' : 'Creating Account...') 
                  : (pendingCourse ? 'Create Account & Enroll' : 'Create Account')
                }
              </AnimatedButton>
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

            {/* Student Portal Access Info */}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700 text-center">
                After signup, access your courses in <strong>Student Portal</strong>
              </p>
            </div>

            {/* Footer Actions */}
            <div className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => onNavigate('signin')}
                className="text-blue-600 font-medium hover:underline"
                disabled={isLoading}
              >
                Sign in
              </button>
            </div>

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

      {/* Success Confetti */}
      <SuccessConfetti 
        isVisible={showSuccess} 
        onComplete={() => setShowSuccess(false)}
        message={pendingCourse ? "🎉 Account Created & Enrolled! Redirecting to Student Portal..." : "✅ Account Created Successfully!"}
      />
    </div>
  );
}