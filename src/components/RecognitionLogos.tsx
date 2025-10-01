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

  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-12 sm:py-16 lg:py-20 overflow-hidden bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-foreground mb-8 sm:mb-10 lg:mb-12">
          We Are Recognized By
        </h2>
        
        <div className="relative">
          <div className="flex marquee-container animate-marquee hover:pause-animation">
            {duplicatedLogos.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 p-4 sm:p-6 lg:p-8 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-background/50"
              >
                <a href={logo.href} target="_blank" rel="noopener noreferrer" className="block">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-16 sm:h-20 lg:h-24 xl:h-28 w-auto object-contain mx-auto"
                    loading="lazy"
                  />
                </a>
              </div>
            ))}
          </div>
          
          <div className="absolute left-0 top-0 w-16 sm:w-20 lg:w-24 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-16 sm:w-20 lg:w-24 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
        </div>

        <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
          
          .animate-marquee {
            animation: marquee 25s linear infinite;
          }
          
          .pause-animation {
            animation-play-state: paused;
          }
          
          .marquee-container {
            display: flex;
            width: max-content;
          }
          
          @media (max-width: 640px) {
            .marquee-container {
              gap: 2rem;
            }
            .animate-marquee {
              animation-duration: 20s;
            }
          }
          
          @media (min-width: 641px) and (max-width: 1024px) {
            .marquee-container {
              gap: 3rem;
            }
            .animate-marquee {
              animation-duration: 25s;
            }
          }
          
          @media (min-width: 1025px) {
            .marquee-container {
              gap: 4rem;
            }
            .animate-marquee {
              animation-duration: 30s;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default RecognitionLogos;