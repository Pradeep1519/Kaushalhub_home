import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { Building2, Users, Target, Award, Star, TrendingUp } from "lucide-react";

const nonTechCompanies = [
  // FMCG Companies
  { name: "Hindustan Unilever", logo: "/companieslogo/unilever.png", type: "FMCG" },
  { name: "ITC Limited", logo: "/companieslogo/itc.png", type: "FMCG" },
  { name: "Nestlé India", logo: "/companieslogo/nestle.png", type: "FMCG" },
  { name: "Britannia", logo: "/companieslogo/britannia.png", type: "FMCG" },
  { name: "Dabur India", logo: "/companieslogo/dabur.png", type: "FMCG" },
  { name: "Colgate Palmolive", logo: "/companieslogo/colgate.png", type: "FMCG" },
  
  // Pharmaceuticals
  { name: "Sun Pharmaceutical", logo: "/companieslogo/sunpharma.png", type: "Pharma" },
  { name: "Dr. Reddy's", logo: "/companieslogo/dr-reddys.jpg", type: "Pharma" },
  { name: "Cipla", logo: "/companieslogo/cipla.png", type: "Pharma" },
  { name: "Lupin", logo: "/companieslogo/lupin.webp", type: "Pharma" },
  { name: "Biocon", logo: "/companieslogo/biocon.jpg", type: "Pharma" },
  
  // Cement & Construction
  { name: "UltraTech Cement", logo: "/companieslogo/ultratech.png", type: "Cement" },
  { name: "Ambuja Cements", logo: "/companieslogo/ambuja.webp", type: "Cement" },
  { name: "ACC Limited", logo: "/companieslogo/acc.png", type: "Cement" },
  
  // Paints & Chemicals
  { name: "Asian Paints", logo: "/companieslogo/asianpaints.webp", type: "Paints" },
  { name: "Berger Paints", logo: "/companieslogo/bergerpaints.png", type: "Paints" },
  { name: "Pidilite Industries", logo: "/companieslogo/pidilite.png", type: "Chemicals" },
  
  // Automotive
  { name: "Mahindra & Mahindra", logo: "/companieslogo/mahindra.png", type: "Auto" },
  { name: "Tata Motors", logo: "/companieslogo/tata.png", type: "Auto" },
  { name: "Bajaj Auto", logo: "/companieslogo/bajaj.png", type: "Auto" },
  
  // Retail
  { name: "DMart", logo: "/companieslogo/dmart.svg", type: "Retail" },
  
  // Food & Dairy
  { name: "Amul", logo: "/companieslogo/amul.png", type: "Dairy" },
  { name: "Parle Products", logo: "/companieslogo/parle.png", type: "Food" },
  
  // Textiles
  { name: "Raymond", logo: "/companieslogo/raymond.png", type: "Textiles" }
];

// Company Logo Component
const CompanyLogo = ({ company, index }) => {
  const [imgError, setImgError] = useState(false);

  const handleError = () => {
    console.log(`Logo not found: ${company.name}`);
    setImgError(true);
  };

  if (imgError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg p-2 sm:p-3">
        <div className="text-white font-bold text-xs sm:text-sm text-center leading-tight mb-1">
          {company.name.split(' ')[0]}
        </div>
        <div className="text-white text-[10px] sm:text-xs text-center opacity-80">
          {company.type}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-2 sm:p-3 md:p-4 lg:p-4 bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm sm:shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-md sm:hover:shadow-lg transition-all duration-300">
      <img
        src={company.logo}
        alt={company.name}
        className="w-auto h-auto max-w-[80%] max-h-[80%] object-contain"
        loading="lazy"
        title={company.name}
        onError={handleError}
      />
    </div>
  );
};

// Marquee Line Component
const MarqueeLine = ({ companies, direction = "right", speed = 40, lineNumber }) => {
  const containerRef = useRef(null);
  
  // Calculate dynamic animation distance based on screen size
  const getAnimationDistance = () => {
    if (typeof window === 'undefined') return -1200;
    
    const screenWidth = window.innerWidth;
    if (screenWidth < 640) return -600;  // Mobile
    if (screenWidth < 768) return -800;  // Small tablet
    if (screenWidth < 1024) return -1000; // Tablet
    if (screenWidth < 1280) return -1200; // Small desktop
    return -1400; // Large desktop
  };

  const animationDistance = getAnimationDistance();
  
  const animationProps = direction === "right" 
    ? {
        x: [animationDistance, 0],
        transition: {
          x: {
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          },
        },
      }
    : {
        x: [0, animationDistance],
        transition: {
          x: {
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          },
        },
      };

  return (
    <div className="relative py-1 sm:py-2">
      <div className="absolute left-0 top-0 w-12 sm:w-16 md:w-20 lg:w-24 h-full bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10" />
      <div className="absolute right-0 top-0 w-12 sm:w-16 md:w-20 lg:w-24 h-full bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10" />
      
      <motion.div
        ref={containerRef}
        className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-6"
        animate={animationProps}
      >
        {companies.map((company, index) => (
          <motion.div
            key={`line${lineNumber}-${index}`}
            className="flex-shrink-0"
            style={{
              width: 'clamp(80px, 20vw, 160px)',
              height: 'clamp(60px, 15vw, 120px)'
            }}
            whileHover={{ 
              scale: 1.05,
              y: -2
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <CompanyLogo company={company} index={index} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export function PlacementsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Create marquee sets based on screen size
  const createMarqueeSet = (startIndex, count) => {
    const slice = nonTechCompanies.slice(startIndex, startIndex + count);
    return [...slice, ...slice]; // Double for smooth looping
  };

  // Adjust number of companies per line based on screen size
  const getCompaniesPerLine = () => {
    if (windowWidth < 640) return 4;   // Mobile
    if (windowWidth < 768) return 5;   // Small tablet
    if (windowWidth < 1024) return 6;  // Tablet
    if (windowWidth < 1280) return 7;  // Small desktop
    return 8; // Large desktop
  };

  const companiesPerLine = getCompaniesPerLine();

  const marqueeSets = [
    { 
      companies: createMarqueeSet(0, companiesPerLine), 
      direction: "left", 
      speed: windowWidth < 768 ? 35 : 45 
    },
    { 
      companies: createMarqueeSet(companiesPerLine, companiesPerLine), 
      direction: "right", 
      speed: windowWidth < 768 ? 38 : 50 
    },
    { 
      companies: createMarqueeSet(companiesPerLine * 2, companiesPerLine), 
      direction: "left", 
      speed: windowWidth < 768 ? 40 : 48 
    },
    { 
      companies: createMarqueeSet(companiesPerLine * 3, companiesPerLine), 
      direction: "right", 
      speed: windowWidth < 768 ? 42 : 52 
    },
  ];

  const stats = [
    { icon: Users, number: "2,000+", label: "Students Placed", color: "from-blue-500 to-cyan-500" },
    { icon: Target, number: "50+", label: "Partner Companies", color: "from-purple-500 to-pink-500" },
    { icon: Award, number: "100%", label: "Placement Rate", color: "from-green-500 to-emerald-500" },
    { icon: TrendingUp, number: "₹3L+", label: "Average Package", color: "from-orange-500 to-red-500" }
  ];

  return (
    <section id="placements" className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-white via-blue-50/30 to-teal-50/30 dark:from-gray-900 dark:via-blue-900/20 dark:to-teal-900/20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-800 mb-4 sm:mb-6"
          >
            <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-300">
              Placement Partners
            </span>
          </motion.div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            Our Students Work at
            <motion.span 
              className="block bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mt-2 sm:mt-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Top Companies
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            We have successfully placed our students in 200+ leading non-tech companies across various industries. 
            Join the league of successful professionals building careers at India's most respected organizations.
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20 max-w-5xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-500 group"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                {stat.number}
              </div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium text-center leading-tight">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated Logo Marquee */}
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          {marqueeSets.map((marquee, index) => (
            <MarqueeLine
              key={index}
              companies={marquee.companies}
              direction={marquee.direction}
              speed={marquee.speed}
              lineNumber={index + 1}
            />
          ))}
        </div>

        {/* Success Stories CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12 sm:mt-16 lg:mt-20"
        >
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12 text-white shadow-2xl">
            <div className="max-w-2xl mx-auto">
              <Star className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-4 sm:mb-6 text-yellow-300 fill-current" />
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                Start Your Success Story
              </h3>
              <p className="text-blue-100 text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 leading-relaxed">
                Join thousands of students who transformed their careers with our industry-focused training programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <motion.button
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold text-base sm:text-lg lg:text-xl px-8 sm:px-10 lg:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Placement Details
                </motion.button>
                <motion.button
                  className="border-2 border-white text-white hover:bg-white/10 font-semibold text-base sm:text-lg lg:text-xl px-8 sm:px-10 lg:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Download Brochure
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}