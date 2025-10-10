// src/App.tsx - COMPLETE FIXED VERSION
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./components/ThemeProvider";
import { AuthProvider } from "./contexts/AuthContext";
import { LoadingScreen } from "./components/LoadingScreen";
import { HomePage } from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import { CareersPage } from "./pages/CareersPage";
import { motion, AnimatePresence } from "motion/react";
import styles from "./App.module.css";
import { PrivacyPolicy } from "./pages/privacy-policy";
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from "./pages/SignUpPage";
import { CourseDetailsPage } from "./pages/CourseDetailsPage";
import { AboutPage } from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import TermAndConditions from "./pages/TermsAndConditions";
import { RefundPolicy } from "./pages/RefundPolicy";
import EnrollmentFormPage from "./pages/EnrollmentFormPage";
import PaymentPage from "./pages/PaymentPage";
import { useState, useEffect } from "react";

// Main App Component - Router REMOVED
export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="kaushal-hub-theme">
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

// App Content with Navigation
function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => setIsLoading(false);

  // ✅ FIXED: Navigation handler with proper routes
  const handleNavigate = (page: string, courseId?: string) => {
    console.log("🚀 App Navigation:", page, "Course ID:", courseId);
    
    switch (page) {
      case "home":
        navigate("/");
        break;
      case "courses":
        navigate("/courses");
        break;
      case "careers":
        navigate("/careers");
        break;
      case "signup":
        navigate("/signup");
        break;
      case "login":
        navigate("/login");
        break;
      case "privacy-policy":
        navigate("/privacy-policy");
        break;
      case "about":
        navigate("/about");
        break;
      case "contact":
        navigate("/contact");
        break;
      case "terms":
        navigate("/terms");
        break;
      case "refund":
        navigate("/refund");
        break;
      case "course-details":
        if (courseId) {
          navigate(`/course/${courseId}`);
        }
        break;
      case "enrollment-form":
        if (courseId) {
          navigate(`/enroll/${courseId}`);
        }
        break;
      case "payment":
        if (courseId) {
          navigate(`/payment/${courseId}`);
        }
        break;
      // ✅ Support for old format
      case "course-details-plc-automation":
        navigate("/course/plc-automation");
        break;
      case "course-details-digital-marketing":
        navigate("/course/digital-marketing");
        break;
      case "course-details-tally-gst":
        navigate("/course/tally-gst");
        break;
      case "enrollment-form-plc-automation":
        navigate("/enroll/plc-automation");
        break;
      case "enrollment-form-digital-marketing":
        navigate("/enroll/digital-marketing");
        break;
      case "enrollment-form-tally-gst":
        navigate("/enroll/tally-gst");
        break;
      case "payment-page-plc-automation":
        navigate("/payment/plc-automation");
        break;
      case "payment-page-digital-marketing":
        navigate("/payment/digital-marketing");
        break;
      case "payment-page-tally-gst":
        navigate("/payment/tally-gst");
        break;
      default:
        navigate("/");
    }
    
    window.scrollTo({ 
      top: 0, 
      behavior: isMobile ? "auto" : "smooth"
    });
  };

  // ✅ Get current page from URL for header/footer
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === "/") return "home";
    if (path === "/courses") return "courses";
    if (path === "/careers") return "careers";
    if (path === "/signup") return "signup";
    if (path === "/login") return "login";
    if (path === "/privacy-policy") return "privacy-policy";
    if (path === "/about") return "about";
    if (path === "/contact") return "contact";
    if (path === "/terms") return "terms";
    if (path === "/refund") return "refund";
    if (path.startsWith("/course/")) return "course-details";
    if (path.startsWith("/enroll/")) return "enrollment-form";
    if (path.startsWith("/payment/")) return "payment";
    return "home";
  };

  const currentPage = getCurrentPage();
  const noHeaderFooterPages = ["signup", "login"];
  const shouldShowHeaderFooter = !noHeaderFooterPages.includes(currentPage);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      <motion.div
        className={`${styles.appContainer} bg-background text-foreground min-h-screen flex flex-col w-full max-w-full overflow-x-hidden`}
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* ✅ FIXED HEADER */}
        {shouldShowHeaderFooter && (
          <Header currentPage={currentPage} onNavigate={handleNavigate} />
        )}

        {/* ✅ FIXED MAIN CONTENT WITH ROUTES */}
        <main className="flex-1 w-full max-w-full overflow-x-hidden pt-20 sm:pt-22 lg:pt-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              className={`${styles.pageContainer} w-full max-w-full overflow-x-hidden mx-auto`}
              initial={{ opacity: 0, x: isMobile ? 0 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isMobile ? 0 : -20 }}
              transition={{ 
                duration: isMobile ? 0.3 : 0.4, 
                ease: [0.25, 0.46, 0.45, 0.94] 
              }}
            >
              <Routes>
                <Route path="/" element={<HomePage onNavigate={handleNavigate} />} />
                <Route path="/courses" element={<CoursesPage onNavigate={handleNavigate} />} />
                <Route path="/careers" element={<CareersPage onNavigate={handleNavigate} />} />
                <Route path="/signup" element={<SignUpPage onNavigate={handleNavigate} />} />
                <Route path="/login" element={<LoginPage onNavigate={handleNavigate} />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy onNavigate={handleNavigate} />} />
                <Route path="/about" element={<AboutPage onNavigate={handleNavigate} />} />
                <Route path="/contact" element={<ContactPage onNavigate={handleNavigate} />} />
                <Route path="/terms" element={<TermAndConditions onNavigate={handleNavigate} />} />
                <Route path="/refund" element={<RefundPolicy onNavigate={handleNavigate} />} />
                
                {/* ✅ Course Routes with Parameters */}
                <Route path="/course/:courseId" element={<CourseDetailsPage onNavigate={handleNavigate} />} />
                <Route path="/enroll/:courseId" element={<EnrollmentFormPage onNavigate={handleNavigate} />} />
                <Route path="/payment/:courseId" element={<PaymentPage onNavigate={handleNavigate} />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* ✅ FIXED FOOTER */}
        {shouldShowHeaderFooter && (
          <Footer onNavigate={handleNavigate} />
        )}
      </motion.div>
    </>
  );
}