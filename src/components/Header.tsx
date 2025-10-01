// src/components/Header.tsx
import { Menu, X } from "lucide-react";
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
  logoSize = "50px",
  logoNameSpacing = "12px",
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const { scrollDirection, isScrolling } = useScrollDirection();
  const [logoError, setLogoError] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

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
    }
  }, [scrollDirection, scrollY]);

  useEffect(() => {
    if (isScrolling && isMenuOpen) setIsMenuOpen(false);
  }, [isScrolling, isMenuOpen]);

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

  // ✅ UPDATED: Auth click handler - now handles both login and logout
  const handleAuthClick = () => {
    if (isAuthenticated) {
      // ✅ User is logged in - navigate to dashboard
      if (onNavigate) {
        onNavigate("student-portal");
      }
    } else {
      // ✅ User is not logged in - navigate to signin
      if (onNavigate) {
        onNavigate("signin");
      }
    }
  };

  // ✅ NEW: Logout handler
  const handleLogout = () => {
    logout();
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

  // ✅ UPDATED: Dynamic Auth button text and class - Responsive improvements
  const getAuthButtonText = () => {
    if (isAuthenticated) {
      if (windowWidth < 400) return user?.name ? `${user.name.split(' ')[0]}` : 'Account';
      if (windowWidth < 500) return user?.name ? `Hi, ${user.name.split(' ')[0]}` : 'Dashboard';
      return user?.name ? `Hi, ${user.name.split(' ')[0]}` : 'Dashboard';
    }
    if (windowWidth < 400) return 'Login';
    if (windowWidth < 500) return 'Sign In';
    return 'Sign In / Sign Up';
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
                  src="/src/public/logo.svg"
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
            
            {/* ✅ UPDATED: Auth Button - responsive text and sizing */}
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
                
                {/* ✅ UPDATED: Mobile Auth Section - LARGER text */}
                <div className="pt-4 border-t border-gray-200 space-y-4">
                  {isAuthenticated ? (
                    <>
                      <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        onClick={() => {
                          setIsMenuOpen(false);
                          if (onNavigate) onNavigate("student-portal");
                        }}
                        className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-4 px-4 rounded-lg text-xl font-bold hover:from-blue-700 hover:to-teal-700 transition-all duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Go to Dashboard
                      </motion.button>
                      <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        onClick={handleLogout}
                        className="w-full bg-gray-500 text-white py-4 px-4 rounded-lg text-xl font-bold hover:bg-gray-600 transition-all duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Logout
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
                      Sign In / Sign Up
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