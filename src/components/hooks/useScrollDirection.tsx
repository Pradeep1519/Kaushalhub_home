import { useState, useEffect, useRef } from "react";

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null);
  const prevScrollY = useRef(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      
      // Minimum scroll threshold to avoid micro-movements
      const threshold = 5;
      const scrollDifference = Math.abs(currentScrollY - prevScrollY.current);
      
      if (scrollDifference > threshold) {
        const direction = currentScrollY > prevScrollY.current ? "down" : "up";
        
        // Only update if direction actually changed
        if (direction !== scrollDirection) {
          setScrollDirection(direction);
        }
        
        prevScrollY.current = currentScrollY;
        setIsScrolling(true);
      }
    };

    // Debounce scroll end detection
    let scrollEndTimer: NodeJS.Timeout;
    const handleScrollEnd = () => {
      clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollDirection();
          handleScrollEnd();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initialize with current scroll position
    prevScrollY.current = window.scrollY;

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollEndTimer);
    };
  }, [scrollDirection]);

  return { scrollDirection, isScrolling };
}