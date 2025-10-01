// Import React hooks for state management
import { useState, useEffect } from "react";
// Import motion components for smooth animations
import { motion, AnimatePresence } from "motion/react";
// Import icons for navigation items
import { 
  Home, 
  BookOpen, 
  Play, 
  Calendar, 
  FileText, 
  Award, 
  User, 
  Users, 
  Menu, 
  X,
  LogOut,
  Bell,
  Settings
} from "lucide-react";
// Import UI components
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
// Import authentication context
import { useAuth } from "../contexts/AuthContext";
// Import CSS module for student portal navigation
import styles from "./StudentPortalNav.module.css";

// Define props interface for StudentPortalNav component
interface StudentPortalNavProps {
  currentPage?: string; // Current active page for navigation highlighting
  onNavigate?: (page: string) => void; // Function to handle page navigation
}

// StudentPortalNav component for sidebar navigation in student portal
export function StudentPortalNav({
  currentPage = "dashboard",
  onNavigate,
}: StudentPortalNavProps) {
  // State to control mobile sidebar visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // State to track screen size
  const [isMobile, setIsMobile] = useState(false);
  // Get user data and auth functions from context
  const { user, signOut } = useAuth();

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Navigation items configuration with icons and labels
  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      badge: null,
    },
    {
      id: "my-courses",
      label: "My Courses",
      icon: BookOpen,
      badge: user?.enrolledCourses?.length || 0,
    },
    {
      id: "course-player",
      label: "Continue Learning",
      icon: Play,
      badge: null,
    },
    {
      id: "live-classes",
      label: "Live Classes",
      icon: Calendar,
      badge: 2,
    },
    {
      id: "assignments",
      label: "Assignments",
      icon: FileText,
      badge: 3,
    },
    {
      id: "certificates",
      label: "Certificates",
      icon: Award,
      badge: null,
    },
    {
      id: "community",
      label: "Community",
      icon: Users,
      badge: 5,
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
      badge: null,
    },
  ];

  // Function to handle navigation clicks
  const handleNavClick = (pageId: string) => {
    // Close mobile menu when navigation item is clicked
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
    // Call navigation handler if provided
    if (onNavigate) {
      onNavigate(pageId);
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    signOut();
    if (onNavigate) {
      onNavigate("home");
    }
  };

  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button - Responsive positioning */}
      <motion.button
        className={`${styles.mobileMenuButton} fixed top-4 left-4 z-50 lg:hidden bg-white dark:bg-gray-900 p-2 sm:p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700`}
        onClick={toggleMobileMenu}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isMobileMenuOpen ? (
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
        ) : (
          <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
        )}
      </motion.button>

      {/* Mobile Sidebar Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Mobile Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Mobile Sidebar */}
            <motion.aside
              className={`${styles.sidebar} fixed top-0 left-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-40 lg:hidden`}
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              {/* Sidebar Header with Logo and User Info */}
              <div className={`${styles.sidebarHeader} p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700`}>
                {/* Logo Section */}
                <motion.div 
                  className="flex items-center space-x-3 mb-4 sm:mb-6"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-orange-500 rounded-lg"></div>
                  <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">
                    KaushalHub
                  </span>
                </motion.div>

                {/* User Profile Section */}
                <motion.div 
                  className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                  whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                >
                  <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                    <AvatarImage src="" alt={user?.name || "Student"} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs sm:text-sm">
                      {user?.name?.charAt(0) || "S"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {user?.name || "Student"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user?.email || "student@kauschalhub.com"}
                    </p>
                  </div>
                  <Bell className="w-4 h-4 text-gray-400 hover:text-blue-500 cursor-pointer" />
                </motion.div>
              </div>

              {/* Navigation Items */}
              <nav className={`${styles.navigation} flex-1 px-3 sm:px-4 py-4 sm:py-6 overflow-y-auto`}>
                <ul className="space-y-1 sm:space-y-2">
                  {navigationItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    
                    return (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <motion.button
                          onClick={() => handleNavClick(item.id)}
                          className={`${styles.navItem} ${
                            isActive ? styles.navItemActive : ""
                          } w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 text-sm font-medium rounded-lg transition-all duration-200`}
                          whileHover={{ 
                            scale: 1.02,
                            backgroundColor: isActive 
                              ? "rgba(59, 130, 246, 0.2)" 
                              : "rgba(59, 130, 246, 0.1)"
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${
                              isActive 
                                ? "text-blue-600 dark:text-blue-400" 
                                : "text-gray-500 dark:text-gray-400"
                            }`} />
                            <span className={`text-xs sm:text-sm ${
                              isActive 
                                ? "text-blue-600 dark:text-blue-400" 
                                : "text-gray-700 dark:text-gray-300"
                            }`}>
                              {item.label}
                            </span>
                          </div>
                          {/* Notification Badge */}
                          {item.badge && item.badge > 0 && (
                            <Badge 
                              variant="destructive" 
                              className="bg-orange-500 hover:bg-orange-600 text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 min-w-[20px] sm:min-w-[24px] text-center"
                            >
                              {item.badge > 9 ? "9+" : item.badge}
                            </Badge>
                          )}
                        </motion.button>
                        
                        {/* Active Page Indicator */}
                        {isActive && (
                          <motion.div
                            className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 rounded-full mt-1 sm:mt-2"
                            layoutId="mobileActiveIndicator"
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 30,
                            }}
                          />
                        )}
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Sidebar Footer with Settings and Logout */}
              <div className={`${styles.sidebarFooter} p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700`}>
                <div className="space-y-1 sm:space-y-2">
                  {/* Settings Button */}
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-xs sm:text-sm py-2 sm:py-2 h-auto"
                  >
                    <Settings className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3" />
                    Settings
                  </Button>
                  
                  {/* Logout Button */}
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="w-full justify-start text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-xs sm:text-sm py-2 sm:py-2 h-auto"
                  >
                    <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3" />
                    Logout
                  </Button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar (Always Visible on Large Screens) */}
      <aside className={`${styles.desktopSidebar} hidden lg:block fixed top-0 left-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-30`}>
        {/* Same content as mobile sidebar but always visible on desktop */}
        <div className={`${styles.sidebarHeader} p-6 border-b border-gray-200 dark:border-gray-700`}>
          <motion.div 
            className="flex items-center space-x-3 mb-6"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-orange-500 rounded-lg"></div>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">
              KaushalHub
            </span>
          </motion.div>

          <motion.div 
            className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
            whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
          >
            <Avatar className="w-10 h-10">
              <AvatarImage src="" alt={user?.name || "Student"} />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                {user?.name?.charAt(0) || "S"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {user?.name || "Student"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.email || "student@kauschalhub.com"}
              </p>
            </div>
            <Bell className="w-4 h-4 text-gray-400 hover:text-blue-500 cursor-pointer" />
          </motion.div>
        </div>

        <nav className={`${styles.navigation} flex-1 px-4 py-6 overflow-y-auto`}>
          <ul className="space-y-2">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.button
                    onClick={() => handleNavClick(item.id)}
                    className={`${styles.navItem} ${
                      isActive ? styles.navItemActive : ""
                    } w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200`}
                    whileHover={{ 
                      scale: 1.02,
                      backgroundColor: isActive 
                        ? "rgba(59, 130, 246, 0.2)" 
                        : "rgba(59, 130, 246, 0.1)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-5 h-5 ${
                        isActive 
                          ? "text-blue-600 dark:text-blue-400" 
                          : "text-gray-500 dark:text-gray-400"
                      }`} />
                      <span className={`${
                        isActive 
                          ? "text-blue-600 dark:text-blue-400" 
                          : "text-gray-700 dark:text-gray-300"
                      }`}>
                        {item.label}
                      </span>
                    </div>
                    {item.badge && item.badge > 0 && (
                      <Badge 
                        variant="destructive" 
                        className="bg-orange-500 hover:bg-orange-600 text-xs px-2 py-1"
                      >
                        {item.badge > 9 ? "9+" : item.badge}
                      </Badge>
                    )}
                  </motion.button>
                  
                  {isActive && (
                    <motion.div
                      className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 rounded-full mt-2"
                      layoutId="desktopActiveIndicator"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.li>
              );
            })}
          </ul>
        </nav>

        <div className={`${styles.sidebarFooter} p-4 border-t border-gray-200 dark:border-gray-700`}>
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-sm"
            >
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </Button>
            
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}