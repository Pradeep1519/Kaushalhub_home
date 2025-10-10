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

  // Enhanced Leadership Team Data with professional details
  const leadershipTeam = [
    {
      id: 1,
      name: "Ankit Singh",
      role: "Founder & Director",
      department: "Strategic Partnerships & Growth",
      intro: "A visionary entrepreneur leading KaushalHub NaukriPath Pvt. Ltd. with a mission to make India's youth job-ready through practical, industry-driven education. Ankit heads the company's strategic partnerships, institutional collaborations, and growth initiatives, building alliances with colleges, MSMEs, and corporate partners across India.",
      summary: "Driving growth and partnerships with a vision to make every learner employable.",
      expertise: ["Strategic Partnerships", "Business Development", "Institutional Collaborations", "Growth Strategy"],
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
      achievements: "Transforming Tier-2 & Tier-3 students into skilled professionals"
    },
    {
      id: 2,
      name: "Abhayjot Singh",
      role: "Director",
      department: "Academics, Training & Placement",
      qualification: "IIT Alumnus",
      intro: "An accomplished IIT alumnus and academic strategist, Abhayjot leads the academic and training operations at KaushalHub NaukriPath Pvt. Ltd. He is responsible for curriculum design, faculty coordination, and placement outcomes, ensuring every course meets industry benchmarks and provides real career impact.",
      summary: "IIT alumnus shaping careers through industry-aligned learning and placement excellence.",
      expertise: ["Curriculum Design", "Faculty Management", "Placement Strategy", "Quality Assurance"],
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      achievements: "Ensuring industry-aligned education with measurable career impact"
    },
    {
      id: 3,
      name: "Pradeep Kumar",
      role: "Technology & Portal Manager",
      department: "Digital Infrastructure",
      intro: "A tech innovator who has built KaushalHub's digital learning ecosystem from the ground up. Pradeep manages the website, LMS portal, and automation systems — ensuring smooth digital experiences for students, trainers, and partners.",
      summary: "The tech architect ensuring seamless learning through innovation and reliability.",
      expertise: ["LMS Development", "System Architecture", "Digital Automation", "Platform Scalability"],
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      achievements: "Built complete digital learning ecosystem from ground up"
    },
    {
      id: 4,
      name: "Suraj Yadav",
      role: "Marketing & Corporate Relations Lead",
      department: "Growth & Outreach",
      intro: "A dynamic growth leader driving KaushalHub's marketing, corporate outreach, and enrollment success across multiple regions. Suraj plays a pivotal role in building college partnerships, managing campaigns, and ensuring student conversions through structured strategies.",
      summary: "Fueling KaushalHub's expansion through strategic marketing and partnership excellence.",
      expertise: ["Digital Marketing", "Corporate Relations", "Partnership Development", "Student Enrollment"],
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
      achievements: "Connecting thousands of students to meaningful career opportunities"
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
    <div className="min-h-screen bg-gray-50">
      {/* Contact Form Section */}
      <div className="py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Professional Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact KaushalHub</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get in touch with us for career guidance and support
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
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
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
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
            </div>
          </div>
        </div>
      </div>

      {/* FULL-WIDTH Leadership Team Section (Without Mission Statement) */}
      <div className="bg-white py-16 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The visionary leaders driving KaushalHub's mission to transform India's youth into industry-ready professionals
            </p>
          </div>
          
          {/* Leadership Team Grid - Full Width */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {leadershipTeam.map((member) => (
              <div key={member.id} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                
                {/* Header with LARGE CIRCULAR Photo */}
                <div className="flex flex-col items-center p-8 border-b border-gray-100">
                  {/* Large Circular Photo */}
                  <div className="mb-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden shadow-2xl border-4 border-white group-hover:border-blue-100 transition-all duration-300">
                      <img 
                        src={member.photo} 
                        alt={member.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>
                  
                  {/* Member Info */}
                  <div className="text-center">
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h4>
                    <p className="text-blue-600 font-semibold text-lg mb-1">{member.role}</p>
                    <p className="text-gray-700 font-medium mb-3">{member.department}</p>
                    {member.qualification && (
                      <span className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-sm font-bold px-4 py-1 rounded-full mb-4 shadow-lg">
                        {member.qualification}
                      </span>
                    )}
                  </div>
                  
                  {/* Summary Quote */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mt-4 border border-blue-100 w-full">
                    <p className="text-blue-800 text-sm font-semibold italic text-center">"{member.summary}"</p>
                  </div>
                </div>

                {/* Detailed Information */}
                <div className="p-6">
                  {/* Introduction */}
                  <p className="text-gray-700 mb-4 leading-relaxed text-sm">{member.intro}</p>
                  
                  {/* Key Achievements */}
                  <div className="mb-4">
                    <h5 className="font-bold text-gray-900 mb-2 flex items-center text-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Key Achievement
                    </h5>
                    <p className="text-gray-600 text-xs">{member.achievements}</p>
                  </div>

                  {/* Expertise Areas */}
                  <div>
                    <h5 className="font-bold text-gray-900 mb-3 flex items-center text-sm">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      Areas of Expertise
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, index) => (
                        <span 
                          key={index}
                          className="bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full border border-gray-200 shadow-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;