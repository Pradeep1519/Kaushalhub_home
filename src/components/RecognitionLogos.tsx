'use client';

import React from 'react';

const RecognitionLogos = () => {
  const logos = [
    {
      src: "/src/public/mca.png",
      alt: "Ministry of Corporate Affairs, Government of India", 
      href: "https://www.mca.gov.in"
    },
    {
      src: "/src/public/msme.jpg",
      alt: "Ministry of MSME, Government of India",
      href: "https://msme.gov.in"
    },
    {
      src: "/src/public/startupindia.png",
      alt: "Startup India",
      href: "https://www.startupindia.gov.in"
    }
  ];

  // Duplicate logos for seamless animation
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-16 overflow-hidden">
      <div className="max-w-8xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          We Are Recognized By
        </h2>
        
        {/* Animated Container */}
        <div className="relative">
          <div 
            className="flex space-x-16 md:space-x-20 lg:space-x-24 animate-marquee"
            style={{
              animation: 'marquee 15s linear infinite'
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 p-8 rounded-lg transition-all duration-300 w-[320px] hover:scale-105"
              >
                <a
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-24 md:h-28 w-auto object-contain mx-auto"
                  />
                </a>
              </div>
            ))}
          </div>
          
          {/* Gradient Overlays for smooth edges */}
          <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-background to-transparent z-10"></div>
        </div>
      </div>

      {/* Custom Animation Styles - Without jsx attribute */}
      <style>
        {`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-marquee {
            animation: marquee 15s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>
    </section>
  );
};

export default RecognitionLogos;