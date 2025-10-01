import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { ArrowLeft, Shield, Lock, Eye, UserCheck, FileText, Download, Mail, Phone, MapPin } from "lucide-react";

interface PrivacyPolicyProps {
  onBack?: () => void;
}

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  const lastUpdated = "September, 2025";
  const companyName = "KaushalHub NaukriPath Private Limited";
  const companyEmail = "privacy@kaushalhub.com";
  const companyPhone = "+91 72748 03306";
  const companyAddress = "B-7 Noida Sector 2, Noida, Uttar Pradesh 201301";
  const website = "www.kaushalhub.com";

  const handleDownloadPDF = () => {
    // PDF download functionality can be implemented here
    console.log("Downloading PDF version...");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          {onBack && (
            <div className="flex flex-col xs:flex-row justify-between items-center gap-3 mb-4 sm:mb-6">
              <Button
                onClick={onBack}
                variant="ghost"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm sm:text-base w-full xs:w-auto justify-center sm:justify-start"
              >
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                Back to Website
              </Button>
              <Button
                onClick={handleDownloadPDF}
                variant="outline"
                className="flex items-center gap-2 text-sm sm:text-base w-full xs:w-auto justify-center sm:justify-end"
              >
                <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                Download PDF
              </Button>
            </div>
          )}

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-blue-100 rounded-full">
                <Shield className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-600" />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  Privacy Policy
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 mt-1 sm:mt-2">
                  {companyName}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center gap-1 sm:gap-2">
                <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Last updated: {lastUpdated}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>GDPR & Indian IT Act Compliant</span>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Quick Navigation */}
        <motion.nav
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 sm:mb-8"
        >
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5 lg:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Quick Navigation</h3>
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3 text-xs sm:text-sm">
              {[
                { section: 'information-collection', label: 'Data Collection' },
                { section: 'data-usage', label: 'How We Use Data' },
                { section: 'data-sharing', label: 'Data Sharing' },
                { section: 'your-rights', label: 'Your Rights' },
                { section: 'security', label: 'Security' },
                { section: 'cookies', label: 'Cookies' },
                { section: 'contact', label: 'Contact Us' },
                { section: 'grievance', label: 'Grievance Officer' }
              ].map((item) => (
                <a
                  key={item.section}
                  href={`#${item.section}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline text-center py-2 px-2 sm:px-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors break-words"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </motion.nav>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* Sidebar - Table of Contents */}
          <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5 lg:p-6 sticky top-4 sm:top-6 lg:top-8">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Table of Contents</h3>
              <nav className="space-y-1 sm:space-y-2">
                {[
                  { id: 'introduction', title: '1. Introduction' },
                  { id: 'information-collection', title: '2. Information Collection' },
                  { id: 'data-usage', title: '3. How We Use Information' },
                  { id: 'data-sharing', title: '4. Information Sharing' },
                  { id: 'data-security', title: '5. Data Security' },
                  { id: 'your-rights', title: '6. Your Rights' },
                  { id: 'cookies', title: '7. Cookies & Tracking' },
                  { id: 'third-party', title: '8. Third-Party Services' },
                  { id: 'children-privacy', title: '9. Children\'s Privacy' },
                  { id: 'international', title: '10. International Transfers' },
                  { id: 'changes', title: '11. Policy Changes' },
                  { id: 'contact', title: '12. Contact Information' },
                  { id: 'grievance', title: '13. Grievance Officer' }
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-xs sm:text-sm text-gray-600 hover:text-blue-600 hover:underline py-1 transition-colors leading-tight"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>
          </motion.aside>

          {/* Policy Content */}
          <motion.main
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3 space-y-4 sm:space-y-6 lg:space-y-8"
          >
            {/* Introduction */}
            <section id="introduction" className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 scroll-mt-4 sm:scroll-mt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
                1. Introduction & Scope
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                  <strong className="text-gray-900">{companyName}</strong> ("we," "our," "us") is committed to protecting 
                  the privacy and security of your personal information. This Privacy Policy 
                  outlines our practices concerning the collection, use, storage, and disclosure 
                  of your information when you use our website, mobile applications, and educational 
                  services (collectively, the "Services").
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 my-4 sm:my-6">
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    <strong>Important:</strong> By accessing or using our Services, you acknowledge 
                    that you have read, understood, and agree to be bound by this Privacy Policy. 
                    If you do not agree with any part of this policy, please discontinue use of our Services immediately.
                  </p>
                </div>
              </div>
            </section>

            {/* Information Collection */}
            <section id="information-collection" className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 scroll-mt-4 sm:scroll-mt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200 flex items-center gap-2 sm:gap-3">
                <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
                2. Information We Collect
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                    Personal Information
                  </h3>
                  <ul className="space-y-1 sm:space-y-2 text-gray-700 text-sm sm:text-base">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Full name, contact details, and identification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Educational qualifications and employment history</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Payment information and transaction records</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Government-issued ID documents (for verification)</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" />
                    Automated Collection
                  </h3>
                  <ul className="space-y-1 sm:space-y-2 text-gray-700 text-sm sm:text-base">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Device information and IP addresses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Usage patterns and browsing behavior</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Learning progress and assessment data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Cookies and similar tracking technologies</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Usage */}
            <section id="data-usage" className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 scroll-mt-4 sm:scroll-mt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200 flex items-center gap-2 sm:gap-3">
                <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
                3. How We Use Your Information
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Primary Purposes</h3>
                  <ul className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                    {[
                      "Service delivery and course enrollment",
                      "Personalized learning experience",
                      "Payment processing and financial transactions",
                      "Customer support and communication",
                      "Quality improvement and service optimization"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2 sm:gap-3">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-blue-600 text-xs sm:text-sm font-semibold">{index + 1}</span>
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Secondary Purposes</h3>
                  <ul className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                    {[
                      "Analytics and business intelligence",
                      "Legal compliance and regulatory requirements",
                      "Fraud prevention and security monitoring",
                      "Marketing communications (with consent)",
                      "Employment assistance and career services"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2 sm:gap-3">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-green-600 text-xs sm:text-sm font-semibold">{index + 1}</span>
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Sharing */}
            <section id="data-sharing" className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 scroll-mt-4 sm:scroll-mt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
                4. Information Sharing & Disclosure
              </h2>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6">
                <h4 className="font-semibold text-yellow-800 mb-1 sm:mb-2 text-sm sm:text-base">Our Commitment</h4>
                <p className="text-yellow-700 text-xs sm:text-sm leading-relaxed">
                  We do not sell, trade, or rent your personal information to third parties for 
                  marketing purposes. Data sharing occurs only under specific circumstances as outlined below.
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {[
                  {
                    title: "With Your Consent",
                    description: "When you explicitly authorize specific data sharing for particular purposes"
                  },
                  {
                    title: "Service Providers",
                    description: "Trusted partners who assist in delivering our services under strict confidentiality agreements"
                  },
                  {
                    title: "Legal Requirements",
                    description: "When required by law, court order, or governmental regulations"
                  },
                  {
                    title: "Business Transfers",
                    description: "In connection with mergers, acquisitions, or business restructuring"
                  },
                  {
                    title: "Employment Partners",
                    description: "With potential employers only when you opt-in for placement services"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-semibold text-xs sm:text-sm">{index + 1}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">{item.title}</h4>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Data Security */}
            <section id="data-security" className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 scroll-mt-4 sm:scroll-mt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200 flex items-center gap-2 sm:gap-3">
                <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
                5. Data Security Measures
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Technical Safeguards</h3>
                  <ul className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                    {[
                      "256-bit SSL encryption for data transmission",
                      "Secure cloud infrastructure with regular audits",
                      "Multi-factor authentication for administrative access",
                      "Regular security patches and vulnerability assessments",
                      "Data encryption at rest and in transit"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2 sm:gap-3">
                        <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Organizational Measures</h3>
                  <ul className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                    {[
                      "Employee training on data protection",
                      "Strict access controls and role-based permissions",
                      "Regular privacy impact assessments",
                      "Incident response and breach notification procedures",
                      "Data retention and disposal policies"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2 sm:gap-3">
                        <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section id="your-rights" className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 scroll-mt-4 sm:scroll-mt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
                6. Your Rights & Choices
              </h2>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6">
                <h4 className="font-semibold text-green-800 mb-1 sm:mb-2 text-sm sm:text-base">Your Data, Your Control</h4>
                <p className="text-green-700 text-xs sm:text-sm leading-relaxed">
                  Under applicable data protection laws including the Indian IT Act and GDPR, 
                  you have specific rights regarding your personal information.
                </p>
              </div>

              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                {[
                  { right: "Access", description: "Request copies of your personal data" },
                  { right: "Rectification", description: "Correct inaccurate or incomplete information" },
                  { right: "Erasure", description: "Request deletion of your personal data" },
                  { right: "Restriction", description: "Limit processing of your information" },
                  { right: "Portability", description: "Receive your data in a portable format" },
                  { right: "Objection", description: "Object to certain processing activities" },
                  { right: "Withdraw Consent", description: "Revoke consent at any time" },
                  { right: "Lodge Complaint", description: "File complaints with regulatory authorities" }
                ].map((item, index) => (
                  <div key={index} className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                    <h4 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">{item.right}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-700 text-xs sm:text-sm leading-relaxed">
                  <strong>To exercise these rights:</strong> Contact our Privacy Team at{" "}
                  <a href={`mailto:${companyEmail}`} className="underline font-semibold">
                    {companyEmail}
                  </a>{" "}
                  with your request. We will respond within 30 days as required by law.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section id="contact" className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 scroll-mt-4 sm:scroll-mt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
                12. Contact Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Privacy Team</h3>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">Email</p>
                        <a href={`mailto:${companyEmail}`} className="text-blue-600 hover:underline text-xs sm:text-sm break-all">
                          {companyEmail}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">Phone</p>
                        <a href={`tel:${companyPhone}`} className="text-blue-600 hover:underline text-xs sm:text-sm">
                          {companyPhone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">Address</p>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{companyAddress}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Quick Links</h3>
                  <div className="space-y-1 sm:space-y-2">
                    <a href="#" className="block text-blue-600 hover:underline py-1 text-sm sm:text-base">Data Access Request Form</a>
                    <a href="#" className="block text-blue-600 hover:underline py-1 text-sm sm:text-base">Consent Management Portal</a>
                    <a href="#" className="block text-blue-600 hover:underline py-1 text-sm sm:text-base">Cookie Preferences</a>
                    <a href="#" className="block text-blue-600 hover:underline py-1 text-sm sm:text-base">FAQ - Privacy Questions</a>
                  </div>
                </div>
              </div>
            </section>

            {/* Grievance Officer */}
            <section id="grievance" className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 scroll-mt-4 sm:scroll-mt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
                13. Grievance Officer
              </h2>

              <div className="bg-gray-50 rounded-lg p-4 sm:p-5 lg:p-6">
                <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
                  In accordance with the Information Technology Act, 2000 and rules made thereunder, 
                  we have appointed a Grievance Officer to address your concerns regarding:
                </p>
                
                <ul className="list-disc list-inside text-gray-700 space-y-1 sm:space-y-2 mb-4 sm:mb-6 text-sm sm:text-base">
                  <li>Data protection and privacy concerns</li>
                  <li>Consent withdrawal requests</li>
                  <li>Data accuracy and rectification</li>
                  <li>Privacy policy related grievances</li>
                </ul>

                <div className="border-t border-gray-200 pt-4 sm:pt-6">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Grievance Officer Details</h4>
                  <div className="space-y-1 sm:space-y-2 text-gray-700 text-sm sm:text-base">
                    <p><strong>Name:</strong> Privacy Officer</p>
                    <p><strong>Email:</strong> grievance@kaushalhub.com</p>
                    <p><strong>Phone:</strong> {companyPhone}</p>
                    <p><strong>Address:</strong> {companyAddress}</p>
                    <p><strong>Response Time:</strong> 30 days as mandated by law</p>
                  </div>
                </div>
              </div>
            </section>
          </motion.main>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 sm:mt-10 lg:mt-12 text-center"
        >
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5 lg:p-6">
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              © {new Date().getFullYear()} {companyName}. All rights reserved. | 
              Version 2.1 | Compliant with Indian IT Act, 2000 & GDPR
            </p>
            <p className="text-gray-500 text-xs mt-1 sm:mt-2">
              This document is electronically generated and does not require a physical signature.
            </p>
          </div>
        </motion.footer>
      </div>
    </motion.div>
  );
}