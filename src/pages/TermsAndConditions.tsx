import React from 'react';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
          <p className="text-xl text-gray-600">
            Please read these terms carefully before using our services
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
        </div>

        {/* Last Updated */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <p className="text-blue-800 text-sm">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-IN', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Terms Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Welcome to KaushalHub NaukriPath Private Limited ("Company", "we", "our", "us"). These Terms and Conditions govern your use of our website, courses, and services. By accessing or using our services, you agree to be bound by these terms.
              </p>
            </section>

            {/* Enrollment and Payments */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Enrollment and Payments</h2>
              <div className="space-y-4 text-gray-700">
                <p><strong>2.1 Course Enrollment:</strong> Enrollment in any course is subject to availability and completion of the admission process.</p>
                <p><strong>2.2 Fees Payment:</strong> Course fees must be paid as per the payment schedule provided. We offer various payment plans including one-time payment and installment options.</p>
                <p><strong>2.3 Taxes:</strong> All fees are exclusive of applicable taxes unless stated otherwise.</p>
                <p><strong>2.4 Refund Policy:</strong> 
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>100% refund if cancellation is made 7 days before course start date</li>
                    <li>50% refund if cancellation is made 3 days before course start date</li>
                    <li>No refund after course commencement</li>
                    <li>All refund requests must be submitted in writing</li>
                  </ul>
                </p>
              </div>
            </section>

            {/* Student Conduct */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Student Conduct and Responsibilities</h2>
              <div className="space-y-4 text-gray-700">
                <p><strong>3.1 Academic Integrity:</strong> Students must maintain academic integrity and not engage in plagiarism or cheating.</p>
                <p><strong>3.2 Attendance:</strong> Regular attendance is expected for all scheduled classes and sessions.</p>
                <p><strong>3.3 Assignment Submission:</strong> All assignments must be submitted before the due date.</p>
                <p><strong>3.4 Code of Conduct:</strong> Students must maintain professional behavior and respect towards faculty and fellow students.</p>
              </div>
            </section>

            {/* Placement Assistance */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Placement Assistance</h2>
              <div className="space-y-4 text-gray-700">
                <p><strong>4.1 Eligibility:</strong> Placement assistance is provided to students who:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Successfully complete the course with minimum 75% attendance</li>
                  <li>Score minimum 60% in all assessments</li>
                  <li>Complete all assignments and projects</li>
                  <li>Maintain good conduct throughout the course</li>
                </ul>
                <p><strong>4.2 Placement Guarantee:</strong> While we strive for 100% placement, final employment depends on student performance in interviews and company requirements.</p>
                <p><strong>4.3 Interview Process:</strong> Students must attend all scheduled interviews and follow company protocols.</p>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>
              <div className="space-y-4 text-gray-700">
                <p><strong>5.1 Course Materials:</strong> All course materials, including videos, presentations, documents, and code are the intellectual property of KaushalHub.</p>
                <p><strong>5.2 Usage Rights:</strong> Students are granted limited license to use course materials for personal educational purposes only.</p>
                <p><strong>5.3 Restrictions:</strong> Distribution, sharing, or commercial use of course materials without written permission is strictly prohibited.</p>
              </div>
            </section>

            {/* Privacy Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Privacy and Data Protection</h2>
              <div className="space-y-4 text-gray-700">
                <p><strong>6.1 Data Collection:</strong> We collect personal information for educational and administrative purposes.</p>
                <p><strong>6.2 Data Usage:</strong> Your data may be used for:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Course administration and communication</li>
                  <li>Placement opportunities with partner companies</li>
                  <li>Improving our services</li>
                  <li>Legal and compliance requirements</li>
                </ul>
                <p><strong>6.3 Data Protection:</strong> We implement reasonable security measures to protect your personal information.</p>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <div className="space-y-4 text-gray-700">
                <p><strong>7.1 Service Availability:</strong> We strive to maintain 24/7 service availability but do not guarantee uninterrupted access.</p>
                <p><strong>7.2 Technical Issues:</strong> We are not liable for technical issues beyond our control including internet connectivity problems.</p>
                <p><strong>7.3 Employment:</strong> While we provide placement assistance, we do not guarantee employment to any student.</p>
              </div>
            </section>

            {/* Termination */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Termination</h2>
              <div className="space-y-4 text-gray-700">
                <p><strong>8.1 By Student:</strong> Students may withdraw from the course by written notice subject to refund policy.</p>
                <p><strong>8.2 By Institute:</strong> We reserve the right to terminate enrollment for:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Violation of code of conduct</li>
                  <li>Non-payment of fees</li>
                  <li>Academic dishonesty</li>
                  <li>Any illegal activities</li>
                </ul>
              </div>
            </section>

            {/* Changes to Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to Terms</h2>
              <p className="text-gray-700">
                We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>KaushalHub NaukriPath Private Limited</strong></p>
                <p className="text-gray-600 mb-1">Email: legal@kaushalhub.com</p>
                <p className="text-gray-600 mb-1">Phone: +91-XXXXXXXXXX</p>
                <p className="text-gray-600">Address: Your complete office address here</p>
              </div>
            </section>

            {/* Acceptance */}
            <section className="border-t border-gray-200 pt-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Acceptance of Terms</h3>
                <p className="text-green-700">
                  By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                </p>
              </div>
            </section>

          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <button 
            onClick={() => window.print()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Print Terms
          </button>
          <button 
            onClick={() => window.history.back()}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Go Back
          </button>
          <a 
            href="/contact"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Contact Support
          </a>
        </div>

      </div>
    </div>
  );
};

export default TermsAndConditions;