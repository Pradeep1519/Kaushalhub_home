// src/services/api.js

class ApiService {
  constructor() {
    // Environment-based API URL
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    console.log('🔧 API Base URL:', this.baseURL);
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
      
      console.log(`📥 API Response:`, data);

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

  // ✅ ENROLLMENT APIS
  async createEnrollment(enrollmentData) {
    return this.request('/api/enrollments', {
      method: 'POST',
      data: enrollmentData,
    });
  }

  async getEnrollments(queryParams = {}) {
    const queryString = new URLSearchParams(queryParams).toString();
    return this.request(`/api/enrollments?${queryString}`);
  }

  async getEnrollmentStats() {
    return this.request('/api/enrollments/stats');
  }

  // ✅ NEW: Check Previous Enrollments by Email/Phone
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