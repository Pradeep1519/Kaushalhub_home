import { useState, useEffect } from "react"; 
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
import { LoginPage } from './pages/LoginPage'; // ✅ Import LoginPage
import { SignUpPage } from "./pages/SignUpPage"; 
import { CourseDetailsPage } from "./pages/CourseDetailsPage";
import { AboutPage } from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import TermAndConditions from "./pages/TermsAndConditions";
import { RefundPolicy } from "./pages/RefundPolicy";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => setIsLoading(false);

  // ✅ FIXED: Updated navigation to handle both formats
  const handleNavigate = (page: string, courseId?: string) => {
    console.log("🚀 App Navigation:", page, "Course ID:", courseId);
    
    // ✅ Course details navigation - NEW FORMAT
    if (page === "course-details" && courseId) {
      setCurrentPage('course-details');
      setSelectedCourseId(courseId);
      console.log("✅ Course Details Page Set:", courseId);
      return;
    }
    
    // ✅ Course details navigation - OLD FORMAT (backward compatibility)
    if (page.startsWith('course-details-')) {
      const courseIdFromPage = page.replace('course-details-', '');
      setCurrentPage('course-details');
      setSelectedCourseId(courseIdFromPage);
      console.log("✅ Course Details Page Set (old format):", courseIdFromPage);
      return;
    }
    
    // ✅ OTHER PAGES
    setCurrentPage(page);
    setSelectedCourseId(""); // Reset course ID for other pages
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderCurrentPage = () => {
    console.log("📄 Rendering Page:", currentPage, "Course:", selectedCourseId);
    
    switch (currentPage) {
      case "courses":
        return <CoursesPage key="courses" onNavigate={handleNavigate} />;
      case "careers":
        return <CareersPage key="careers" onNavigate={handleNavigate} />;
      case "signup":
        return <SignUpPage key="signup" onNavigate={handleNavigate} />;
      case "login": // ✅ ADDED: Login case
        return <LoginPage key="login" onNavigate={handleNavigate} />;
      case "privacy-policy":
        return <PrivacyPolicy key="privacy-policy" onNavigate={handleNavigate} />;
      case "course-details":
        return <CourseDetailsPage key={`course-details-${selectedCourseId}`} onNavigate={handleNavigate} courseId={selectedCourseId} />;
      case "about":
        return <AboutPage key="about" onNavigate={handleNavigate} />;
      case "contact":
        return <ContactPage key="contact" onNavigate={handleNavigate} />;
      case "terms":
        return <TermAndConditions key="terms" onNavigate={handleNavigate} />;
      case "refund":
        return <RefundPolicy key="refund" onNavigate={handleNavigate} />;
      case "home":
      default:
        return <HomePage key="home" onNavigate={handleNavigate} />;
    }
  };

  return (
    <ThemeProvider defaultTheme="system" storageKey="kaushal-hub-theme">
      <AuthProvider>
        <AnimatePresence mode="wait">
          {isLoading && (
            <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
          )}
        </AnimatePresence>

        <motion.div
          className={`${styles.appContainer} bg-background text-foreground`}
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* ✅ UPDATED: Include "login" in pages where header should not show */}
          {!["signup", "signin", "login"].includes(currentPage) && (
            <Header currentPage={currentPage} onNavigate={handleNavigate} />
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              className={`${styles.pageContainer} ${
                // ✅ UPDATED: Include "login" in pages where padding should not apply
                !["signup", "signin", "login"].includes(currentPage)
                  ? styles.pageContainerWithPadding
                  : ""
              }`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {renderCurrentPage()}
            </motion.div>
          </AnimatePresence>

          {/* ✅ UPDATED: Include "login" in pages where footer should not show */}
          {!["signup", "signin", "login"].includes(currentPage) && (
            <Footer onNavigate={handleNavigate} />
          )}
        </motion.div>
      </AuthProvider>
    </ThemeProvider>
  );
}