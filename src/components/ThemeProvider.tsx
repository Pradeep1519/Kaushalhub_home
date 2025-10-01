import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: 'dark' | 'light';
  isTransitioning: boolean;
};

const ThemeProviderContext = createContext<ThemeProviderContextType | undefined>(undefined);

// Smooth transition class for theme changes
const SMOOTH_TRANSITION_CLASS = 'theme-transition';
const TRANSITION_DURATION = 300; // milliseconds

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'kaushal-hub-theme',
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [actualTheme, setActualTheme] = useState<'dark' | 'light'>('light');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Memoized theme setter for better performance
  const handleSetTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
  }, []);

  // Apply smooth theme transition
  const applyThemeTransition = useCallback((callback: () => void) => {
    const root = window.document.documentElement;
    
    // Add transition class
    root.classList.add(SMOOTH_TRANSITION_CLASS);
    setIsTransitioning(true);
    
    // Execute the theme change
    callback();
    
    // Remove transition class after animation
    setTimeout(() => {
      root.classList.remove(SMOOTH_TRANSITION_CLASS);
      setIsTransitioning(false);
    }, TRANSITION_DURATION);
  }, []);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const initializeTheme = () => {
      try {
        const storedTheme = localStorage.getItem(storageKey) as Theme;
        if (storedTheme) {
          setTheme(storedTheme);
        } else {
          // Use system preference as default
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          setActualTheme(systemTheme);
        }
      } catch (error) {
        console.warn('Failed to access localStorage:', error);
        // Fallback to system preference
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setActualTheme(systemTheme);
      }
    };

    initializeTheme();
  }, [storageKey]);

  // Apply theme changes with smooth transitions
  useEffect(() => {
    const applyTheme = () => {
      const root = window.document.documentElement;
      
      // Remove previous theme classes
      root.classList.remove('light', 'dark');
      
      let systemTheme: 'dark' | 'light' = 'light';
      
      if (theme === 'system') {
        systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else {
        systemTheme = theme;
      }
      
      // Apply theme with transition
      applyThemeTransition(() => {
        root.classList.add(systemTheme);
        setActualTheme(systemTheme);
      });
      
      // Store theme preference
      try {
        localStorage.setItem(storageKey, theme);
      } catch (error) {
        console.warn('Failed to save theme preference:', error);
      }
    };

    applyTheme();
  }, [theme, storageKey, applyThemeTransition]);

  // Listen for system theme changes with debouncing
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    let timeoutId: NodeJS.Timeout;
    
    const handleChange = () => {
      // Debounce rapid system theme changes
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (theme === 'system') {
          const systemTheme = mediaQuery.matches ? 'dark' : 'light';
          const root = window.document.documentElement;
          
          applyThemeTransition(() => {
            root.classList.remove('light', 'dark');
            root.classList.add(systemTheme);
            setActualTheme(systemTheme);
          });
        }
      }, 100); // 100ms debounce
    };

    // Modern event listener with better performance
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    return () => {
      clearTimeout(timeoutId);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [theme, applyThemeTransition]);

  // Add responsive CSS for smooth transitions
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .theme-transition * {
        transition-duration: ${TRANSITION_DURATION}ms !important;
        transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform !important;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important;
      }
      
      /* Optimize transitions for different devices */
      @media (prefers-reduced-motion: reduce) {
        .theme-transition * {
          transition-duration: 0ms !important;
        }
      }
      
      /* Mobile performance optimizations */
      @media (max-width: 768px) {
        .theme-transition * {
          transition-duration: ${TRANSITION_DURATION * 0.8}ms !important;
        }
      }
      
      /* High-performance devices get smoother transitions */
      @media (min-width: 1024px) and (prefers-reduced-motion: no-preference) {
        .theme-transition * {
          transition-duration: ${TRANSITION_DURATION * 1.2}ms !important;
        }
      }
    `;
    
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Handle page visibility changes (tab switching)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && theme === 'system') {
        // Re-check system theme when tab becomes visible
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        if (systemTheme !== actualTheme) {
          applyThemeTransition(() => {
            const root = window.document.documentElement;
            root.classList.remove('light', 'dark');
            root.classList.add(systemTheme);
            setActualTheme(systemTheme);
          });
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [theme, actualTheme, applyThemeTransition]);

  const value = {
    theme,
    setTheme: handleSetTheme,
    actualTheme,
    isTransitioning,
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

// Additional hook for theme-aware responsive design
export const useThemeAwareResponsive = () => {
  const { actualTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return {
    actualTheme,
    isMobile,
    isTablet,
    isDesktop,
    // Theme-aware breakpoints
    breakpoints: {
      mobile: isMobile,
      tablet: isTablet,
      desktop: isDesktop,
    },
    // Theme-specific responsive helpers
    themeClass: `theme-${actualTheme} ${isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'}`,
  };
};

// Utility function for theme-aware styling
export const getThemeAwareStyle = (lightStyle: string, darkStyle: string, actualTheme: 'dark' | 'light') => {
  return actualTheme === 'dark' ? darkStyle : lightStyle;
};