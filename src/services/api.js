// src/services/api.js - UPDATED VERSION

class ApiService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    console.log('🔧 API Base URL:', this.baseURL);
  }

  // ✅ Get authentication token
  getAuthToken() {
    return localStorage.getItem('token');
  }

  // ✅ Check if user is authenticated
  isAuthenticated() {
    const token = this.getAuthToken();
    const user = localStorage.getItem('user');
    return !!(token && user);
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add authentication token
    const token = this.getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Add body if present
    if (options.body) {
      config.body = options.body;
    } else if (options.data) {
      config.body = JSON.stringify(options.data);
    }

    console.log(`🌐 API Call: ${config.method || 'GET'} ${url}`);

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      console.log(`📥 API Response for ${endpoint}:`, data);

      if (!response.ok) {
        throw new Error(data.error || data.message || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('❌ API Request failed:', {
        url,
        error: error.message,
        endpoint
      });
      throw error;
    }
  }

  // ✅ ENROLLMENT APIS - FIXED WITH DUPLICATE CHECK
  async createEnrollment(enrollmentData) {
    console.log('🎯 Creating enrollment for course:', enrollmentData.courseId);
    
    // ✅ First check for existing enrollment using email
    try {
      await this.checkExistingEnrollment(enrollmentData.courseId, enrollmentData.email);
      console.log('✅ Enrollment check passed, creating enrollment...');
    } catch (error) {
      // If already enrolled, throw error
      console.log('❌ Enrollment check failed:', error.message);
      throw error;
    }

    // ✅ Then create new enrollment
    return this.request('/api/enrollments', {
      method: 'POST',
      data: enrollmentData,
    });
  }

  // ✅ CHECK EXISTING ENROLLMENT - UPDATED
  async checkExistingEnrollment(courseId, email) {
    if (!courseId || !email) {
      throw new Error('Course ID and email are required');
    }

    console.log('🔍 Checking existing enrollment for course:', courseId, 'email:', email);

    try {
      const response = await this.request(`/api/enrollments/check/${courseId}?email=${encodeURIComponent(email)}`, {
        method: 'GET',
      });

      console.log('📊 Enrollment check response:', response);

      if (response.isEnrolled || response.isPending) {
        throw new Error('You are already enrolled or have a pending enrollment for this course.');
      }

      return response;
    } catch (error) {
      console.log('🔍 Enrollment check result:', error.message);
      
      // If specific enrollment error, throw it
      if (error.message.includes('already enrolled')) {
        throw error;
      }

      // For other errors, assume no enrollment exists
      console.log('⚠️ Assuming no existing enrollment due to error');
      return { isEnrolled: false, isPending: false };
    }
  }

  async getEnrollments(queryParams = {}) {
    const queryString = new URLSearchParams(queryParams).toString();
    return this.request(`/api/enrollments?${queryString}`);
  }

  async getEnrollmentStats() {
    return this.request('/api/enrollments/stats/summary');
  }

  // ✅ Check enrollments by email/phone
  async getEnrollmentsCheck(queryParams = {}) {
    const queryString = new URLSearchParams(queryParams).toString();
    return this.request(`/api/enrollments/check?${queryString}`);
  }

  // ✅ AUTH APIS
  async signup(userData) {
    return this.request('/api/auth/signup', {
      method: 'POST',
      data: userData,
    });
  }

  async login(credentials) {
    return this.request('/api/auth/login', {
      method: 'POST',
      data: credentials,
    });
  }

  async enrollCourse(courseData) {
    return this.request('/api/courses/enroll', {
      method: 'POST',
      data: courseData,
    });
  }

  // ✅ HEALTH CHECK
  async healthCheck() {
    return this.request('/api/health');
  }
}

// Create singleton instance
export const apiService = new ApiService();

// Default export
export default apiService;