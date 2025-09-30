// src/contexts/UserContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  enrolledCourses?: any[];
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (userData: User, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  // ✅ STUDENT PORTAL: New functions
  redirectToStudentPortal: () => void;
  transferAuthToStudentPortal: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ PERMANENT FIX: Enhanced authentication check
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const savedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        // ✅ Check if both user and token exist
        if (savedUser && token) {
          const userData = JSON.parse(savedUser);
          
          // ✅ VALIDATE USER DATA - PERMANENT FIX
          if (isValidUserData(userData)) {
            setUser(userData);
            console.log('✅ User restored from localStorage:', userData.name);
          } else {
            // ❌ Invalid or demo data - clear it permanently
            console.warn('❌ Invalid/demo user data found, clearing...');
            clearAuthData();
          }
        } else {
          // ✅ No saved data or partial data - clear everything
          clearAuthData();
        }
      } catch (error) {
        console.error('❌ Error checking auth status:', error);
        // ✅ Error case - clear all data
        clearAuthData();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // ✅ PERMANENT FIX: Validate user data structure and block demo
  const isValidUserData = (data: any): data is User => {
    // Check basic structure
    const isValidStructure = (
      data &&
      typeof data.id === 'string' &&
      typeof data.name === 'string' && 
      typeof data.email === 'string' &&
      typeof data.role === 'string'
    );
    
    // ✅ EXPLICITLY BLOCK DEMO DATA
    const isNotDemo = data.email !== 'demo@example.com';
    
    return isValidStructure && isNotDemo;
  };

  // ✅ PERMANENT FIX: Clear all authentication data
  const clearAuthData = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('studentToken');
    localStorage.removeItem('studentUser');
    setUser(null);
  };

  // ✅ Login function with validation
  const login = (userData: User, token: string) => {
    // ✅ Validate before saving
    if (!isValidUserData(userData)) {
      console.error('❌ Invalid user data provided to login');
      clearAuthData();
      return;
    }
    
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    
    // ✅ STUDENT PORTAL: Also store in student portal storage
    localStorage.setItem('studentToken', token);
    localStorage.setItem('studentUser', JSON.stringify(userData));
    
    console.log('✅ User logged in:', userData.name);
  };

  // ✅ Logout function
  const logout = () => {
    console.log('✅ User logged out:', user?.name);
    clearAuthData();
  };

  // ✅ STUDENT PORTAL: Redirect to student portal
  const redirectToStudentPortal = () => {
    if (user && user.role === 'student') {
      transferAuthToStudentPortal();
      // This will be handled by the navigation in App.tsx
      return true;
    }
    return false;
  };

  // ✅ STUDENT PORTAL: Transfer authentication to student portal
  const transferAuthToStudentPortal = () => {
    if (user) {
      localStorage.setItem('studentToken', localStorage.getItem('token')!);
      localStorage.setItem('studentUser', JSON.stringify(user));
      console.log('✅ Auth transferred to student portal for:', user.name);
    }
  };

  const value: UserContextType = {
    user,
    setUser,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
    redirectToStudentPortal,
    transferAuthToStudentPortal,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};