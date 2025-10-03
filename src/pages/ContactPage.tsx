import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: '',
    message: '',
    currentCompany: '',
    experience: '',
    currentSalary: '',
    expectedSalary: '',
    technicalIssue: '',
    placementSupport: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  // Direct online images with proper URLs
  const leadershipTeam = [
    {
      id: 1,
      name: "Ankit Singh",
      role: "Founder & Director",
      intro: "Education visionary with 10+ years experience in skill development and corporate training.",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Priya Singh",
      role: "Co-Founder & Director", 
      intro: "Expert in educational partnerships and industry collaborations with 8+ years experience.",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face"  
    },
    {
      id: 3,
      name: "Pradeep Kumar",
      role: "Head of Technology & Training",
      intro: "Seasoned technology professional specializing in industrial automation and digital solutions.",
      photo: "src/public/images/deep-kumar.jpeg" // Local image
    }
  ];

  const courses = [
    "PLC & Industrial Automation",
    "Digital Marketing with AI & E-commerce",
    "Tally with GST & Advanced Excel"
  ];

  const experienceLevels = [
    "Fresher (0-1 years)",
    "Junior (1-3 years)", 
    "Mid-Level (3-6 years)",
    "Senior (6+ years)"
  ];

  const technicalIssues = [
    "Course Access Problem",
    "Video Not Playing",
    "Assignment Submission",
    "Certificate Issue",
    "Payment Problem",
    "Other"
  ];

  const placementSupportTypes = [
    "Resume Building",
    "Interview Preparation", 
    "Job Search Assistance",
    "Career Counseling",
    "Mock Interviews"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form submitted:', formData);
    alert('Thank you! Our team will contact you within 24 hours.');
    
    // Reset form
    setFormData({
      name: '',
      phone: '',
      email: '',
      course: '',
      message: '',
      currentCompany: '',
      experience: '',
      currentSalary: '',
      expectedSalary: '',
      technicalIssue: '',
      placementSupport: ''
    });
    
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Render different form fields based on active tab
  const renderFormFields = () => {
    switch(activeTab) {
      case 'admissions':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Company
                </label>
                <input
                  type="text"
                  name="currentCompany"
                  value={formData.currentCompany}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Where do you currently work?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                </label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="">Select experience</option>
                  {experienceLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          </>
        );

      case 'technical-support':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Technical Issue Type
            </label>
            <select
              name="technicalIssue"
              value={formData.technicalIssue}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">Select issue type</option>
              {technicalIssues.map(issue => (
                <option key={issue} value={issue}>{issue}</option>
              ))}
            </select>
          </div>
        );

      case 'placement':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Salary (₹)
                </label>
                <input
                  type="text"
                  name="currentSalary"
                  value={formData.currentSalary}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Current monthly salary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Salary (₹)
                </label>
                <input
                  type="text"
                  name="expectedSalary"
                  value={formData.expectedSalary}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Expected monthly salary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Placement Support Needed
              </label>
              <select
                name="placementSupport"
                value={formData.placementSupport}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="">Select support type</option>
                {placementSupportTypes.map(support => (
                  <option key={support} value={support}>{support}</option>
                ))}
              </select>
            </div>
          </>
        );

      default: // general
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Professional Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact KaushalHub</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with us for career guidance and support
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Sidebar - Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Contact Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600">📞</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">Phone</h4>
                    <a href="tel:+91-7274803306" className="text-gray-600 hover:text-blue-600 text-sm">+91-7274803306</a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-600">💬</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">WhatsApp</h4>
                    <a href="https://wa.me/7274803306" className="text-gray-600 hover:text-green-600 text-sm">+91-7274803306</a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-600">📧</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">Email</h4>
                    <a href="mailto:info@kaushalhub.com" className="text-gray-600 hover:text-purple-600 text-sm">info@kaushalhub.com</a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-gray-600">📍</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">Address</h4>
                    <p className="text-gray-600 text-sm">KaushalHub Office, Noida sector 2</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Monday - Saturday</span>
                  <span className="font-medium text-gray-900 text-sm">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Sunday</span>
                  <span className="font-medium text-gray-900 text-sm">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            
            {/* Department Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'general', label: 'General Inquiry' },
                    { id: 'admissions', label: 'Admissions' },
                    { id: 'technical-support', label: 'Technical Support' },
                    { id: 'placement', label: 'Placement' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Contact Form */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {activeTab === 'general' && 'General Inquiry'}
                  {activeTab === 'admissions' && 'Admissions Form'}
                  {activeTab === 'technical-support' && 'Technical Support'}
                  {activeTab === 'placement' && 'Placement Assistance'}
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Common Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Interest {activeTab === 'admissions' && '*'}
                    </label>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      required={activeTab === 'admissions'}
                    >
                      <option value="">Select course</option>
                      {courses.map(course => (
                        <option key={course} value={course}>{course}</option>
                      ))}
                    </select>
                  </div>

                  {/* Dynamic Fields based on Tab */}
                  {renderFormFields()}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      rows={4}
                      placeholder={
                        activeTab === 'general' ? "Tell us how we can help you..." :
                        activeTab === 'admissions' ? "Tell us about your educational background and career goals..." :
                        activeTab === 'technical-support' ? "Describe your technical issue in detail..." :
                        "Tell us about your job preferences and career aspirations..."
                      }
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 rounded-lg font-medium transition-colors ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    } text-white`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                  </button>
                </form>
              </div>
            </div>

            {/* Leadership Team with FULL SIZE Photos - SIMPLIFIED */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Meet Our Leadership Team</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {leadershipTeam.map((member) => (
                  <div key={member.id} className="text-center group">
                    {/* Simple Image Container */}
                    <div className="w-full h-80 rounded-xl overflow-hidden mb-4 shadow-lg">
                      <img 
                        src={member.photo} 
                        alt={member.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    
                    {/* Member Info */}
                    <h4 className="font-bold text-gray-900 text-lg mb-1">{member.name}</h4>
                    <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.intro}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;