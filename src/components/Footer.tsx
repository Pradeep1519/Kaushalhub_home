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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-4">
              {/* ✅ COMPANY LOGO - EXTRA LARGE SIZE */}
              <div className="flex-shrink-0">
                <img 
                  src="/src/public/logo.svg" 
                  alt="KaushalHub Logo" 
                  className="w-32 h-32 object-contain" // ✅ w-32 h-32 (128px × 128px)
                />
              </div>
              
              {/* Company Name */}
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                  KaushalHub NaukriPath Private Limited
                </span>
                <p className="text-gray-400 text-sm mt-1">
                  Education • Technology • Innovation
                </p>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering learners worldwide with cutting-edge education technology. 
              Transform your career with our expert-led courses and hands-on projects.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              <a href="https://www.facebook.com/share/14RquNzDJJP/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Rest of the footer code remains same... */}
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleNavigation('home')} 
                  className="text-gray-400 hover:text-white text-sm text-left transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('about')} 
                  className="text-gray-400 hover:text-white text-sm text-left transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('courses')} 
                  className="text-gray-400 hover:text-white text-sm text-left transition-colors"
                >
                  Courses
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('careers')} 
                  className="text-gray-400 hover:text-white text-sm text-left transition-colors"
                >
                  Careers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('contact')} 
                  className="text-gray-400 hover:text-white text-sm text-left transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Courses */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Our Courses</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleNavigation('courses')} 
                  className="text-gray-400 hover:text-white text-sm text-left transition-colors"
                >
                  PLC & Automation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('courses')} 
                  className="text-gray-400 hover:text-white text-sm text-left transition-colors"
                >
                  Digital Marketing With AI
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('courses')} 
                  className="text-gray-400 hover:text-white text-sm text-left transition-colors"
                >
                  Tally with GST + Excel
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('courses')} 
                  className="text-gray-400 hover:text-white text-sm text-left transition-colors"
                >
                  Full Stack Development
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('courses')} 
                  className="text-gray-400 hover:text-white text-sm text-left transition-colors"
                >
                  Data Science & AI
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
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
                <a href="tel:+917274803306" className="text-gray-400 hover:text-white text-sm transition-colors">
                  +91 72748 03306
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <a href="mailto:info@kaushalhub.com" className="text-gray-400 hover:text-white text-sm transition-colors">
                  info@kaushalhub.com
                </a>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="pt-4">
              <h5 className="font-medium text-sm mb-2">Stay Updated</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 rounded-l-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none text-white placeholder-gray-400 text-sm"
                />
                <button className="px-4 py-2 bg-blue-600 rounded-r-lg hover:bg-blue-700 text-sm transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="text-gray-400 text-xs text-center md:text-left">
              © 2024 KaushalHub NaukriPath Private Limited. All rights reserved.
            </div>
            
            <div className="flex space-x-4 text-xs">
              <button 
                onClick={() => handleNavigation('privacy-policy')} 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => handleNavigation('terms')} 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms & Conditions
              </button>
              <button 
                onClick={() => handleNavigation('refund')} 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Refund Policy
              </button>
            </div>
          </div>
        </div>

        {/* Government Recognition */}
        <div className="border-t border-gray-800 mt-6 pt-6">
          <div className="text-center">
            <p className="text-gray-400 text-xs mb-3">Recognized By</p>
            <div className="flex justify-center items-center space-x-6">
              <div className="text-center">
                <div className="text-gray-300 text-xs font-medium">Ministry of Corporate Affairs</div>
                <div className="text-gray-400 text-xs">Government of India</div>
              </div>
              <div className="text-center">
                <div className="text-gray-300 text-xs font-medium">Ministry of MSME</div>
                <div className="text-gray-400 text-xs">Government of India</div>
              </div>
              <div className="text-center">
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