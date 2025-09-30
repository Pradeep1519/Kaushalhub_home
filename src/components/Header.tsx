// src/components/Header.tsx
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { AnimatedButton } from "./AnimatedButton";
import { motion, AnimatePresence } from "motion/react";
import { useScrollDirection } from "./hooks/useScrollDirection";
import { useUser } from "../contexts/UserContext"; // ✅ Import UserContext

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
    logout(); // ✅ Clear user from context and localStorage
    setIsMenuOpen(false);
    if (onNavigate) {
      onNavigate("home"); // ✅ Redirect to home after logout
    }
    // ✅ Optional: Show logout success message
    console.log('Logged out successfully');
  };

  const handleLogoClick = () => {
    if (onNavigate) {
      onNavigate("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Dynamic logo font size
  const getLogoFontSize = () => {
    if (windowWidth < 400) return `calc(${logoSize} * 0.35)`;
    if (windowWidth < 600) return `calc(${logoSize} * 0.45)`;
    return `calc(${logoSize} * 0.5)`;
  };

  // Dynamic nav spacing
  const getNavSpacing = () => {
    if (windowWidth < 400) return "space-x-2";
    if (windowWidth < 600) return "space-x-4";
    return "space-x-8";
  };

  // ✅ UPDATED: Dynamic Auth button text and class
  const getAuthButtonText = () => {
    if (isAuthenticated) {
      return user?.name ? `Hi, ${user.name.split(' ')[0]}` : 'Dashboard';
    }
    return 'Sign In / Sign Up';
  };

  const getAuthButtonClass = () => {
    if (windowWidth < 400) return "text-[10px] px-2 py-1";
    if (windowWidth < 600) return "text-xs px-3 py-1.5";
    return "text-xs sm:text-sm px-3 sm:px-4 py-2";
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
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo + Name */}
          <div className="flex items-center flex-shrink-0" style={{ gap: logoNameSpacing }}>
            <motion.div
              whileHover={{ scale: 1.05}}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={handleLogoClick}
              className="cursor-pointer flex items-center justify-center"
              style={{
                width: `max(${logoSize}, 90px)`,
                height: `max(${logoSize}, 70px)`,
                minWidth: "60px",
              }}
            >
              {!logoError ? (
                <img
                  src="src/public/logo.svg"
                  alt="KaushalHub Logo"
                  className="object-contain"
                  style={{ width: "150%", height: "150%" }}
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
              style={{ fontSize: getLogoFontSize() }}
              onClick={handleLogoClick}
            >
              KaushalHub NaukriPath
            </motion.span>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className={`hidden md:flex flex-1 justify-center ${getNavSpacing()}`}>
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
                className={`relative text-foreground/80 hover:text-blue-600 transition-colors ${
                  item.id === currentPage || item.page === currentPage ? "text-blue-600" : ""
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

          {/* Right: Theme + Auth + Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            <ThemeToggle />
            
            {/* ✅ UPDATED: Auth Button - shows different text based on login status */}
            <AnimatedButton
              className={`bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 whitespace-nowrap ${getAuthButtonClass()}`}
              glowEffect
              onClick={handleAuthClick}
            >
              {getAuthButtonText()}
            </AnimatedButton>
            
            <button
              className="md:hidden p-2 text-foreground hover:text-blue-600 transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden py-4 border-t border-border glass-effect"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <nav className="flex flex-col space-y-4">
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
                    className={`text-left text-foreground/80 hover:text-blue-600 transition-colors ${
                      item.id === currentPage || item.page === currentPage ? "text-blue-600 font-medium" : ""
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                
                {/* ✅ UPDATED: Mobile Auth Section - shows different options based on login status */}
                <div className="pt-4 border-t border-gray-200">
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
                        className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-2 px-4 rounded-lg text-sm font-medium mb-2"
                      >
                        Go to Dashboard
                      </motion.button>
                      <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        onClick={handleLogout}
                        className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg text-sm font-medium"
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
                      className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-2 px-4 rounded-lg text-sm font-medium"
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