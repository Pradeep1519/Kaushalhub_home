// src/contexts/AuthContext.tsx (CLEAN VERSION)
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define User interface for user data structure
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  enrolledCourses: string[];
  phone?: string;
  dateOfBirth?: string;
  location?: string;
  bio?: string;
  avatar?: string;
  joinedDate: string;
}

// Define AuthContextType interface to type the authentication context
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  pendingEnrollment: string | null;
  setPendingEnrollment: (courseId: string | null) => void;
}

// Create authentication context with undefined initial value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component that provides authentication context to child components
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingEnrollment, setPendingEnrollment] = useState<string | null>(null);

  // Effect hook to check for existing user session on component mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        // Check for stored current user
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (storedUser && token) {
          setUser(JSON.parse(storedUser));
        }

        // Check for pending enrollment
        const storedPendingEnrollment = localStorage.getItem('pendingEnrollment');
        if (storedPendingEnrollment) {
          setPendingEnrollment(storedPendingEnrollment);
        }
      } catch (error) {
        console.error('Error loading stored auth data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Function to handle user login
  const login = (userData: User, token: string) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    
    // Also store for student portal
    localStorage.setItem('studentUser', JSON.stringify(userData));
    localStorage.setItem('studentToken', token);
  };

  // Function to handle user logout
  const logout = () => {
    setUser(null);
    setPendingEnrollment(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('studentUser');
    localStorage.removeItem('studentToken');
    localStorage.removeItem('pendingEnrollment');
  };

  // Function to set pending enrollment and persist it
  const setPendingEnrollmentWithStorage = (courseId: string | null) => {
    setPendingEnrollment(courseId);
    if (courseId) {
      localStorage.setItem('pendingEnrollment', courseId);
    } else {
      localStorage.removeItem('pendingEnrollment');
    }
  };

  // Return AuthContext.Provider to provide authentication context to child components
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
        pendingEnrollment,
        setPendingEnrollment: setPendingEnrollmentWithStorage
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use authentication context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}