import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Financial Analyst at TCS",
    image: "https://images.unsplash.com/photo-1561065533-316e3142d586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHN0dWRlbnQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTczMTk3OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    testimonial: "The Advanced Excel with AI course revolutionized how I work with data. The AI integration techniques and advanced formulas helped me become more efficient and get promoted to a senior analyst role.",
    rating: 5,
    course: "Advanced Excel with AI"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    role: "Automation Engineer at L&T",
    image: "https://images.unsplash.com/photo-1561065533-316e3142d586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHN0dWRlbnQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTczMTk3OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    testimonial: "The PLC Programming course was incredibly comprehensive. The hands-on projects with real industrial scenarios prepared me perfectly for my current role. The instructors have genuine industry experience.",
    rating: 5,
    course: "PLC Programming"
  },
  {
    id: 3,
    name: "Sneha Patel",
    role: "Digital Marketing Manager at Flipkart",
    image: "https://images.unsplash.com/photo-1561065533-316e3142d586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHN0dWRlbnQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTczMTk3OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    testimonial: "EduTech's Digital Marketing course gave me practical skills that I use daily. The real campaign projects and latest industry trends covered in the course helped me secure my dream job at Flipkart.",
    rating: 5,
    course: "Digital Marketing"
  },
  {
    id: 4,
    name: "Amit Verma",
    role: "Accounts Manager at Reliance",
    image: "https://images.unsplash.com/photo-1561065533-316e3142d586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHN0dWRlbnQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTczMTk3OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    testimonial: "The Tally with GST course was exactly what I needed. The practical approach to learning Tally ERP and GST compliance gave me the confidence to handle complex accounting tasks in my new role.",
    rating: 5,
    course: "Tally with GST"
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            What Our
            <span className="block bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Students Say
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from our successful graduates who have transformed their careers.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <Card className="overflow-hidden shadow-2xl">
            <CardContent className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                {/* Student Image */}
                <div className="lg:col-span-1 flex justify-center">
                  <div className="relative">
                    <ImageWithFallback
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      className="w-32 h-32 lg:w-48 lg:h-48 rounded-full object-cover shadow-xl"
                    />
                    <div className="absolute -top-4 -right-4 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full p-3">
                      <Quote className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Rating */}
                  <div className="flex justify-center lg:justify-start">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed text-center lg:text-left">
                    "{currentTestimonial.testimonial}"
                  </blockquote>

                  {/* Student Info */}
                  <div className="text-center lg:text-left">
                    <div className="font-bold text-xl">{currentTestimonial.name}</div>
                    <div className="text-gray-600">{currentTestimonial.role}</div>
                    <div className="text-sm text-blue-600 mt-1">
                      Graduate of {currentTestimonial.course}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full border-gray-300 hover:border-blue-500 hover:bg-blue-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full border-gray-300 hover:border-blue-500 hover:bg-blue-50"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-blue-600 to-teal-600' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-12 sm:mt-16 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              100%
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Job Placement Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              4.8
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              10K+
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Graduates</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              ₹5L+
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Avg. Starting Salary</div>
          </div>
        </div>
      </div>
    </section>
  );
}