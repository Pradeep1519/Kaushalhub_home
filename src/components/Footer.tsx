import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [email, setEmail] = useState("");

  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log("Subscribed with email:", email);
    setEmail("");
    // You can add toast notification here
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const quickLinks = [
    { label: 'Home', page: 'home' },
    { label: 'About Us', page: 'about' },
    { label: 'Courses', page: 'courses' },
    { label: 'Careers', page: 'careers' },
    { label: 'Contact', page: 'contact' },
    { label: 'Blog', page: 'blog' }
  ];

  const popularCourses = [
    'PLC & Automation',
    'Digital Marketing With AI',
    'Tally with GST + Excel',
    'Web Development',
    'Data Science & Analytics',
    'Mobile App Development'
  ];

  const socialLinks = [
    { 
      icon: Facebook, 
      href: "https://www.facebook.com/share/14RquNzDJJP/", 
      color: "hover:bg-blue-600",
      label: "Facebook"
    },
    { 
      icon: Instagram, 
      href: "#", 
      color: "hover:bg-pink-600",
      label: "Instagram"
    },
    { 
      icon: Linkedin, 
      href: "#", 
      color: "hover:bg-blue-700",
      label: "LinkedIn"
    }
  ];

  const policies = [
    { label: 'Privacy Policy', page: 'privacy-policy' },
    { label: 'Terms & Conditions', page: 'terms' },
    { label: 'Refund Policy', page: 'refund' }
  ];

  const recognitions = [
    {
      title: "Ministry of Corporate Affairs",
      subtitle: "Government of India",
      description: "Registered Company"
    },
    {
      title: "Ministry of MSME",
      subtitle: "Government of India",
      description: "MSME Registered"
    },
    {
      title: "Startup India",
      subtitle: "Recognized Startup",
      description: "DIPP Certified"
    }
  ];

  return (
    <footer id="contact" className="bg-gray-900 text-white w-full relative">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 max-w-7xl mx-auto w-full">
          
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex flex-col items-start space-y-4">
              <div className="flex flex-row items-center space-x-4">
                <div className="flex-shrink-0">
                  <img 
                    src="/logo/logo.svg" 
                    alt="KaushalHub Logo" 
                    className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 object-contain transition-all duration-300 hover:scale-105 hover:rotate-3"
                    loading="lazy"
                  />
                </div>
                
                <div className="text-left">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent leading-tight">
                    KaushalHub NaukriPath
                  </h3>
                  <p className="text-gray-400 text-sm mt-2 font-medium">
                    Education • Technology • Innovation
                  </p>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm leading-relaxed text-left max-w-md">
                Empowering learners worldwide with cutting-edge education technology. 
                Transform your career with our expert-led courses and industry-relevant curriculum.
              </p>
              
              <div className="flex justify-start space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.color} group`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links - Moved to right side with reduced gap */}
          <div className="space-y-4 lg:ml-4">
            <h4 className="font-semibold text-lg border-l-4 border-blue-500 pl-3">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => handleNavigation(link.page)} 
                    className="text-gray-400 hover:text-white text-sm transition-all duration-200 hover:translate-x-2 w-full text-left py-1 px-3 rounded-lg hover:bg-gray-800/50 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Courses */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg border-l-4 border-teal-500 pl-3">Our Courses</h4>
            <ul className="space-y-2">
              {popularCourses.map((course, index) => (
                <li key={index}>
                  <button 
                    onClick={() => handleNavigation('courses')} 
                    className="text-gray-400 hover:text-white text-sm transition-all duration-200 hover:translate-x-2 w-full text-left py-1 px-3 rounded-lg hover:bg-gray-800/50 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-teal-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {course}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info & Newsletter */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg border-l-4 border-green-500 pl-3">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 group cursor-pointer">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0 group-hover:text-green-400 transition-colors" />
                  <div className="text-gray-400 text-sm leading-relaxed group-hover:text-white transition-colors">
                    <div className="font-medium">B - 7 Noida sector 2</div>
                    <div>Noida, Uttar Pradesh 201301</div>
                  </div>
                </div>
                
                <a href="tel:+917274803306" className="flex items-center space-x-3 group transition-colors">
                  <Phone className="w-5 h-5 text-gray-400 flex-shrink-0 group-hover:text-green-400 transition-colors" />
                  <span className="text-gray-400 text-sm group-hover:text-white transition-colors">
                    +91 72748 03306
                  </span>
                </a>
                
                <a href="mailto:info@kaushalhub.com" className="flex items-center space-x-3 group transition-colors">
                  <Mail className="w-5 h-5 text-gray-400 flex-shrink-0 group-hover:text-green-400 transition-colors" />
                  <span className="text-gray-400 text-sm group-hover:text-white transition-colors break-all">
                    info@kaushalhub.com
                  </span>
                </a>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="space-y-3">
              <h5 className="font-semibold text-sm">Stay Updated with Our Courses</h5>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none text-white placeholder-gray-400 text-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg hover:from-blue-700 hover:to-teal-700 text-sm font-semibold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Subscribe to Newsletter
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Government Recognition */}
        <div className="border-t border-gray-800 mt-8 lg:mt-12 pt-8 lg:pt-12 max-w-7xl mx-auto w-full">
          <div className="text-center space-y-6">
            <p className="text-gray-400 text-sm font-medium">Recognized & Certified By</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recognitions.map((recognition, index) => (
                <div 
                  key={index}
                  className="p-4 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 border border-gray-700/50 hover:border-gray-600/50 group cursor-pointer"
                >
                  <div className="text-gray-300 text-sm font-semibold group-hover:text-white transition-colors">
                    {recognition.title}
                  </div>
                  <div className="text-blue-400 text-xs font-medium mt-1">
                    {recognition.subtitle}
                  </div>
                  <div className="text-gray-500 text-xs mt-2">
                    {recognition.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-6 pt-6 max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-gray-400 text-sm text-center lg:text-left order-2 lg:order-1">
              © 2024 KaushalHub NaukriPath Private Limited. All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm order-1 lg:order-2">
              {policies.map((policy, index) => (
                <button 
                  key={index}
                  onClick={() => handleNavigation(policy.page)} 
                  className="text-gray-400 hover:text-white transition-all duration-200 hover:scale-105 px-3 py-1 rounded-lg hover:bg-gray-800/50"
                >
                  {policy.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}