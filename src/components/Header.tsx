// src/components/Header.tsx
import { Menu, X, LogOut, User, LayoutDashboard, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { AnimatedButton } from "./AnimatedButton";
import { motion, AnimatePresence } from "motion/react";
import { useScrollDirection } from "./hooks/useScrollDirection";
import { useUser } from "../contexts/UserContext";

interface HeaderProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
  logoSize?: string;
  logoNameSpacing?: string;
}

export function Header({
  currentPage = "home",
  onNavigate,
  logoSize = "55px",
  logoNameSpacing = "12px",
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const { scrollDirection, isScrolling } = useScrollDirection();
  const [logoError, setLogoError] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // ✅ NEW: Dropdown state

  // ✅ Get user data from context
  const { user, logout, isAuthenticated } = useUser();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window === 'undefined') return;

    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setWindowWidth(window.innerWidth);
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (scrollY < 100) {
      setIsVisible(true);
      return;
    }
    if (scrollDirection === "up") {
      setIsVisible(true);
    } else if (scrollDirection === "down" && scrollY > 100) {
      setIsVisible(false);
      setIsMenuOpen(false);
      setIsDropdownOpen(false); // ✅ Close dropdown on scroll
    }
  }, [scrollDirection, scrollY]);

  useEffect(() => {
    if (isScrolling && isMenuOpen) setIsMenuOpen(false);
  }, [isScrolling, isMenuOpen]);

  // ✅ NEW: Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (page: string, anchor?: string) => {
    setIsMenuOpen(false);
    if (anchor && !page) {
      if (currentPage === "home") {
        const element = document.getElementById(anchor);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      } else {
        if (onNavigate) {
          onNavigate("home");
          setTimeout(() => {
            const element = document.getElementById(anchor);
            if (element) element.scrollIntoView({ behavior: "smooth" });
          }, 300);
        }
      }
      return;
    }
    if (onNavigate) onNavigate(page);
    if (anchor && page === "home") {
      setTimeout(() => {
        const element = document.getElementById(anchor);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  // ✅ UPDATED: Auth click handler - now navigates to "login" page
  const handleAuthClick = () => {
    if (isAuthenticated) {
      // ✅ User is logged in - toggle dropdown
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      // ✅ User is not logged in - navigate to login page
      if (onNavigate) {
        onNavigate("login");
      }
    }
  };

  // ✅ NEW: Dropdown handlers
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleDashboardClick = () => {
    if (user?.enrolledCourses && user.enrolledCourses.length > 0) {
      // ✅ User has enrolled courses - navigate to dashboard
      if (onNavigate) {
        onNavigate("student-portal-dashboard");
      }
    } else {
      // ✅ User has no courses - show message
      console.log("No enrolled courses. Dashboard coming soon!");
      // Yahan aap toast message ya alert show kar sakte hain
    }
    setIsDropdownOpen(false);
  };

  const handleLogoutClick = () => {
    logout();
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
    if (onNavigate) {
      onNavigate("home");
    }
    console.log('Logged out successfully');
  };

  const handleLogoClick = () => {
    if (onNavigate) {
      onNavigate("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Dynamic logo font size - Responsive improvements
  const getLogoFontSize = () => {
    if (windowWidth < 400) return `calc(${logoSize} * 0.3)`;
    if (windowWidth < 500) return `calc(${logoSize} * 0.35)`;
    if (windowWidth < 600) return `calc(${logoSize} * 0.4)`;
    if (windowWidth < 768) return `calc(${logoSize} * 0.45)`;
    return `calc(${logoSize} * 0.5)`;
  };

  // Dynamic nav spacing - MORE SPACE BETWEEN NAV ITEMS
  const getNavSpacing = () => {
    if (windowWidth < 1024) return "space-x-8";
    if (windowWidth < 1280) return "space-x-10";
    return "space-x-12";
  };

  // ✅ UPDATED: Dynamic Auth button text and class - Now shows "Login" consistently
  const getAuthButtonText = () => {
    if (isAuthenticated) {
      if (windowWidth < 400) return user?.name ? `${user.name.split(' ')[0]}` : 'Account';
      if (windowWidth < 500) return user?.name ? `Hi, ${user.name.split(' ')[0]}` : 'Dashboard';
      return user?.name ? `Hi, ${user.name.split(' ')[0]}` : 'Dashboard';
    }
    if (windowWidth < 400) return 'Login';
    if (windowWidth < 500) return 'Login';
    return 'Login';
  };

  const getAuthButtonClass = () => {
    if (windowWidth < 400) return "text-xs px-3 py-1.5";
    if (windowWidth < 500) return "text-xs px-3 py-1.5";
    if (windowWidth < 640) return "text-sm px-3 py-2";
    return "text-sm px-4 py-2";
  };

  // Responsive logo container size
  const getLogoContainerSize = () => {
    if (windowWidth < 400) return "max(35px, 50px)";
    if (windowWidth < 500) return "max(40px, 55px)";
    if (windowWidth < 640) return "max(45px, 60px)";
    return `max(${logoSize}, 80px)`;
  };

  // ✅ IMPROVED: Dynamic navigation font size - MUCH LARGER for laptop/tablet
  const getNavFontSize = () => {
    if (windowWidth < 1024) return "text-base"; // For mobile
    if (windowWidth < 1280) return "text-xl";   // For tablet - LARGER
    return "text-xl";                          // For laptop/desktop - LARGER
  };

  // ✅ IMPROVED: Dynamic company name font size - SMALLER on mobile
  const getCompanyNameFontSize = () => {
    if (windowWidth < 400) return `calc(${logoSize} * 0.2)`; // MUCH SMALLER
    if (windowWidth < 500) return `calc(${logoSize} * 0.25)`; // SMALLER
    if (windowWidth < 640) return `calc(${logoSize} * 0.3)`; // SMALL
    if (windowWidth < 768) return `calc(${logoSize} * 0.35)`; // MEDIUM
    return `calc(${logoSize} * 0.4)`; // NORMAL
  };

  // ✅ NEW: Get company name based on screen size
  const getCompanyName = () => {
    if (windowWidth < 400) return "KH";
    if (windowWidth < 500) return "KaushalHub";
    if (windowWidth < 640) return "KaushalHub NP";
    return "KaushalHub NaukriPath";
  };

  // ✅ NEW: Check if user has enrolled courses
  const hasEnrolledCourses = user?.enrolledCourses && user.enrolledCourses.length > 0;

  return (
    <motion.header
      className="fixed top-0 z-50 w-full border-b border-border shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94], type: "tween" }}
      style={{
        backdropFilter: "blur(15px)",
        WebkitBackdropFilter: "blur(15px)",
        backgroundColor: "rgba(255, 255, 255, 0.65)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-5 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18">
          {/* Left: Logo + Name - Responsive improvements */}
          <div className="flex items-center flex-shrink-0" style={{ gap: logoNameSpacing }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={handleLogoClick}
              className="cursor-pointer flex items-center justify-center"
              style={{
                width: getLogoContainerSize(),
                height: getLogoContainerSize(),
                minWidth: "35px",
              }}
            >
              {!logoError ? (
                <img
                  src="/public/logo.svg"
                  alt="KaushalHub Logo"
                  className="object-contain w-full h-full"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <span
                  className="font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent"
                  style={{ fontSize: getLogoFontSize() }}
                >
                  KH
                </span>
              )}
            </motion.div>

            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent whitespace-nowrap cursor-pointer"
              style={{ fontSize: getCompanyNameFontSize() }}
              onClick={handleLogoClick}
            >
              {getCompanyName()}
            </motion.span>
          </div>

          {/* Center: Desktop Navigation - MUCH LARGER font sizes with PROPER SPACING */}
          <nav className={`hidden lg:flex flex-1 justify-center ${getNavSpacing()} mx-4 xl:mx-6`}>
            {[
              { id: "home", label: "Home", page: "home" },
              { id: "about", label: "About", anchor: "about" },
              { id: "courses", label: "Courses", page: "courses" },
              { id: "testimonials", label: "Testimonials", anchor: "testimonials" },
              { id: "careers", label: "Careers", page: "careers" },
              { id: "contact", label: "Contact", anchor: "contact" },
            ].map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.page || "", item.anchor)}
                className={`relative text-foreground/80 hover:text-blue-600 transition-colors duration-200 font-semibold ${getNavFontSize()} px-2 ${
                  item.id === currentPage || item.page === currentPage ? "text-blue-600 font-bold" : ""
                }`}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {item.label}
                {(item.id === currentPage || item.page === currentPage) && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>

          {/* Right: Theme + Auth + Menu - Responsive improvements */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 flex-shrink-0">
            <ThemeToggle />
            
            {/* ✅ UPDATED: User Dropdown for Authenticated Users */}
            {isAuthenticated ? (
              <div className="hidden sm:block relative user-dropdown">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 border border-transparent hover:border-gray-200"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 flex items-center justify-center text-white text-sm font-bold shadow-md">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm font-medium text-gray-700 max-w-24 truncate">
                    {getAuthButtonText()}
                  </span>
                  <ChevronDown 
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                {/* ✅ Dropdown Menu */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-semibold text-gray-900 truncate">{user?.name}</p>
                        <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                      </div>

                      {/* Dashboard Button */}
                      <button
                        onClick={handleDashboardClick}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors duration-200 ${
                          hasEnrolledCourses 
                            ? 'hover:bg-blue-50 text-gray-700 hover:text-blue-700' 
                            : 'text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={!hasEnrolledCourses}
                      >
                        <LayoutDashboard className={`w-4 h-4 ${
                          hasEnrolledCourses ? 'text-blue-600' : 'text-gray-400'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Go to Dashboard</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {hasEnrolledCourses 
                              ? 'Access your learning dashboard' 
                              : 'Enroll in a course to access dashboard'
                            }
                          </p>
                        </div>
                      </button>

                      {/* Logout Button */}
                      <button
                        onClick={handleLogoutClick}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors duration-200 border-t border-gray-100"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* ✅ Login Button for Non-Authenticated Users */
              <div className="hidden sm:block">
                <AnimatedButton
                  className={`bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 whitespace-nowrap text-white font-medium ${getAuthButtonClass()}`}
                  glowEffect
                  scaleOnHover={windowWidth > 400}
                  onClick={handleAuthClick}
                >
                  {getAuthButtonText()}
                </AnimatedButton>
              </div>
            )}
            
            {/* Mobile menu button - responsive sizing */}
            <button
              className="lg:hidden p-1.5 sm:p-2 text-foreground hover:text-blue-600 transition-colors duration-200 rounded-lg hover:bg-gray-100"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Enhanced with LARGER text and better spacing */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden py-4 border-t border-border glass-effect"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <nav className="flex flex-col space-y-4 sm:space-y-5">
                {[
                  { id: "home", label: "Home", page: "home" },
                  { id: "about", label: "About", anchor: "about" },
                  { id: "courses", label: "Courses", page: "courses" },
                  { id: "testimonials", label: "Testimonials", anchor: "testimonials" },
                  { id: "careers", label: "Careers", page: "careers" },
                  { id: "contact", label: "Contact", anchor: "contact" },
                ].map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.page || "home", item.anchor)}
                    className={`text-left text-foreground/80 hover:text-blue-600 transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-gray-50 text-xl sm:text-2xl font-bold ${
                      item.id === currentPage || item.page === currentPage ? "text-blue-600 font-extrabold bg-blue-50" : ""
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5, scale: 1.02 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                
                {/* ✅ UPDATED: Mobile Auth Section */}
                <div className="pt-4 border-t border-gray-200 space-y-4">
                  {isAuthenticated ? (
                    <>
                      {/* User Info */}
                      <div className="px-4 py-3 bg-gray-50 rounded-lg">
                        <p className="font-semibold text-gray-900">{user?.name}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>

                      <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        onClick={handleDashboardClick}
                        className={`w-full flex items-center space-x-3 py-4 px-4 rounded-lg text-xl font-bold transition-all duration-200 ${
                          hasEnrolledCourses
                            ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:from-blue-700 hover:to-teal-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!hasEnrolledCourses}
                      >
                        <LayoutDashboard className="w-5 h-5" />
                        <span>Go to Dashboard</span>
                      </motion.button>

                      <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        onClick={handleLogoutClick}
                        className="w-full bg-gray-500 text-white py-4 px-4 rounded-lg text-xl font-bold hover:bg-gray-600 transition-all duration-200 flex items-center space-x-3"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </motion.button>
                    </>
                  ) : (
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      onClick={handleAuthClick}
                      className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-4 px-4 rounded-lg text-xl font-bold hover:from-blue-700 hover:to-teal-700 transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Login
                    </motion.button>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}