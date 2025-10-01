import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Main Grid - Responsive but same structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section - Same design, responsive sizing */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
              {/* ✅ COMPANY LOGO - RESPONSIVE BUT LARGE SIZE MAINTAINED */}
              <div className="flex-shrink-0">
                <img 
                  src="/src/public/logo.svg" 
                  alt="KaushalHub Logo" 
                  className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>
              
              {/* Company Name - Responsive text */}
              <div className="text-center sm:text-left">
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                  KaushalHub NaukriPath Private Limited
                </span>
                <p className="text-gray-400 text-sm mt-1 lg:mt-2">
                  Education • Technology • Innovation
                </p>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed text-center sm:text-left">
              Empowering learners worldwide with cutting-edge education technology. 
              Transform your career with our expert-led courses and hands-on projects.
            </p>
            
            {/* Social Links - Same hover effects, responsive sizing */}
            <div className="flex justify-center sm:justify-start space-x-3">
              <a href="https://www.facebook.com/share/14RquNzDJJP/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-110">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-all duration-300 hover:scale-110">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-all duration-300 hover:scale-110">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-all duration-300 hover:scale-110">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-300 hover:scale-110">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links - Same structure, responsive text */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleNavigation('home')} 
                  className="text-gray-400 hover:text-white text-sm text-left transition-all duration-200 hover:translate-x-1 w-full"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('about')} 
                  className="text-gray-400 hover:text-white text-sm text-left transition-all duration-200 hover:translate-x-1 w-full"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('courses')} 
                  className="text-gray-400 hover:text-white text-sm text-left transition-all duration-200 hover:translate-x-1 w-full"
                >
                  Courses
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('careers')} 
                  className="text-gray-400 hover:text-white text-sm text-left transition-all duration-200 hover:translate-x-1 w-full"
                >
                  Careers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('contact')} 
                  className="text-gray-400 hover:text-white text-sm text-left transition-all duration-200 hover:translate-x-1 w-full"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Courses - Same structure */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Our Courses</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleNavigation('courses')} 
                  className="text-gray-400 hover:text-white text-sm text-left transition-all duration-200 hover:translate-x-1 w-full"
                >
                  PLC & Automation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('courses')} 
                  className="text-gray-400 hover:text-white text-sm text-left transition-all duration-200 hover:translate-x-1 w-full"
                >
                  Digital Marketing With AI
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('courses')} 
                  className="text-gray-400 hover:text-white text-sm text-left transition-all duration-200 hover:translate-x-1 w-full"
                >
                  Tally with GST + Excel
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('courses')} 
                  className="text-gray-400 hover:text-white text-sm text-left transition-all duration-200 hover:translate-x-1 w-full"
                >
                  Full Stack Development
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('courses')} 
                  className="text-gray-400 hover:text-white text-sm text-left transition-all duration-200 hover:translate-x-1 w-full"
                >
                  Data Science & AI
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info - Same structure, responsive layout */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="text-gray-400 text-sm">
                  <div>B - 7 Noida sector 2</div>
                  <div>Noida Uttar Pradesh</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <a href="tel:+917274803306" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  +91 72748 03306
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <a href="mailto:info@kaushalhub.com" className="text-gray-400 hover:text-white text-sm transition-colors duration-200 break-all">
                  info@kaushalhub.com
                </a>
              </div>
            </div>

            {/* Newsletter Subscription - Same design, responsive */}
            <div className="pt-4">
              <h5 className="font-medium text-sm mb-2">Stay Updated</h5>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 rounded-lg sm:rounded-l-lg sm:rounded-r-none bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none text-white placeholder-gray-400 text-sm transition-all duration-200"
                />
                <button className="px-4 py-2 bg-blue-600 rounded-lg sm:rounded-l-none sm:rounded-r-lg hover:bg-blue-700 text-sm transition-all duration-200 font-medium hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Same structure, responsive layout */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="text-gray-400 text-xs text-center md:text-left">
              © 2024 KaushalHub NaukriPath Private Limited. All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <button 
                onClick={() => handleNavigation('privacy-policy')} 
                className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-105"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => handleNavigation('terms')} 
                className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-105"
              >
                Terms & Conditions
              </button>
              <button 
                onClick={() => handleNavigation('refund')} 
                className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-105"
              >
                Refund Policy
              </button>
            </div>
          </div>
        </div>

        {/* Government Recognition - Same design, responsive grid */}
        <div className="border-t border-gray-800 mt-6 pt-6">
          <div className="text-center">
            <p className="text-gray-400 text-xs mb-3">Recognized By</p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="text-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all duration-200">
                <div className="text-gray-300 text-xs font-medium">Ministry of Corporate Affairs</div>
                <div className="text-gray-400 text-xs">Government of India</div>
              </div>
              <div className="text-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all duration-200">
                <div className="text-gray-300 text-xs font-medium">Ministry of MSME</div>
                <div className="text-gray-400 text-xs">Government of India</div>
              </div>
              <div className="text-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all duration-200">
                <div className="text-gray-300 text-xs font-medium">Startup India</div>
                <div className="text-gray-400 text-xs">Recognized Startup</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}