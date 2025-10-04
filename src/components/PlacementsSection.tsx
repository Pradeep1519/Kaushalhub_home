import { motion } from "motion/react";
import { useState, useEffect } from "react";
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
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl p-4">
        <div className="text-white font-bold text-lg text-center leading-tight mb-1">
          {company.name.split(' ')[0]}
        </div>
        <div className="text-white text-xs text-center opacity-80">
          {company.type}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
      <img
        src={company.logo}
        alt={company.name}
        className="max-w-full max-h-20 object-contain"
        loading="lazy"
        title={company.name}
        onError={handleError}
      />
    </div>
  );
};

export function PlacementsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Create 5 different marquee sets
  const marquee1 = [...nonTechCompanies.slice(0, 6), ...nonTechCompanies.slice(0, 6)];
  const marquee2 = [...nonTechCompanies.slice(6, 12), ...nonTechCompanies.slice(6, 12)];
  const marquee3 = [...nonTechCompanies.slice(12, 18), ...nonTechCompanies.slice(12, 18)];
  const marquee4 = [...nonTechCompanies.slice(18), ...nonTechCompanies.slice(0, 6)];
  const marquee5 = [...nonTechCompanies, ...nonTechCompanies.slice(0, 3)];

  const stats = [
    { icon: Users, number: "10,000+", label: "Students Placed", color: "from-blue-500 to-cyan-500" },
    { icon: Target, number: "50+", label: "Partner Companies", color: "from-purple-500 to-pink-500" },
    { icon: Award, number: "99%", label: "Placement Rate", color: "from-green-500 to-emerald-500" },
    { icon: TrendingUp, number: "₹5L+", label: "Average Package", color: "from-orange-500 to-red-500" }
  ];

  return (
    <section id="placements" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-white via-blue-50/30 to-teal-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 rounded-full border border-blue-200 mb-6"
          >
            <Building2 className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">
              Placement Partners
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our Students Work at
            <motion.span 
              className="block bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mt-2"
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
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
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
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 lg:mb-20 max-w-5xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 group"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 5 Line Animated Logo Marquee */}
        <div className="space-y-6">
          {/* Line 1 - Right to Left */}
          <div className="relative">
            <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-white to-transparent z-10" />
            
            <motion.div
              className="flex gap-8 lg:gap-10"
              animate={{
                x: [0, -1400],
              }}
              transition={{
                x: {
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {marquee1.map((company, index) => (
                <motion.div
                  key={`line1-${index}`}
                  className="flex-shrink-0 w-48 h-32"
                  whileHover={{ 
                    scale: 1.05,
                    y: -3
                  }}
                >
                  <CompanyLogo company={company} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Line 2 - Left to Right */}
          <div className="relative">
            <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-white to-transparent z-10" />
            
            <motion.div
              className="flex gap-8 lg:gap-10"
              animate={{
                x: [-1400, 0],
              }}
              transition={{
                x: {
                  duration: 35,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {marquee2.map((company, index) => (
                <motion.div
                  key={`line2-${index}`}
                  className="flex-shrink-0 w-48 h-32"
                  whileHover={{ 
                    scale: 1.05,
                    y: -3
                  }}
                >
                  <CompanyLogo company={company} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Line 3 - Right to Left */}
          <div className="relative">
            <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-white to-transparent z-10" />
            
            <motion.div
              className="flex gap-8 lg:gap-10"
              animate={{
                x: [0, -1300],
              }}
              transition={{
                x: {
                  duration: 32,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {marquee3.map((company, index) => (
                <motion.div
                  key={`line3-${index}`}
                  className="flex-shrink-0 w-48 h-32"
                  whileHover={{ 
                    scale: 1.05,
                    y: -3
                  }}
                >
                  <CompanyLogo company={company} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Line 4 - Left to Right */}
          <div className="relative">
            <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-white to-transparent z-10" />
            
            <motion.div
              className="flex gap-8 lg:gap-10"
              animate={{
                x: [-1300, 0],
              }}
              transition={{
                x: {
                  duration: 38,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {marquee4.map((company, index) => (
                <motion.div
                  key={`line4-${index}`}
                  className="flex-shrink-0 w-48 h-32"
                  whileHover={{ 
                    scale: 1.05,
                    y: -3
                  }}
                >
                  <CompanyLogo company={company} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Line 5 - Right to Left */}
          <div className="relative">
            <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-white to-transparent z-10" />
            
            <motion.div
              className="flex gap-8 lg:gap-10"
              animate={{
                x: [0, -1350],
              }}
              transition={{
                x: {
                  duration: 34,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {marquee5.map((company, index) => (
                <motion.div
                  key={`line5-${index}`}
                  className="flex-shrink-0 w-48 h-32"
                  whileHover={{ 
                    scale: 1.05,
                    y: -3
                  }}
                >
                  <CompanyLogo company={company} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Success Stories CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16 lg:mt-20"
        >
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl p-8 lg:p-12 text-white shadow-2xl">
            <div className="max-w-2xl mx-auto">
              <Star className="w-12 h-12 mx-auto mb-4 text-yellow-300 fill-current" />
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Start Your Success Story
              </h3>
              <p className="text-blue-100 text-lg mb-6 leading-relaxed">
                Join thousands of students who transformed their careers with our industry-focused training programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold text-lg px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Placement Details
                </motion.button>
                <motion.button
                  className="border-2 border-white text-white hover:bg-white/10 font-semibold text-lg px-8 py-3 rounded-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
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