import { CheckCircle, BookOpen, Users, Trophy, Briefcase } from "lucide-react";

const journeySteps = [
  {
    id: 1,
    icon: BookOpen,
    title: "Start Learning",
    description: "Begin your journey with our comprehensive curriculum designed by industry experts.",
    color: "blue"
  },
  {
    id: 2,
    icon: Users,
    title: "Join Community",
    description: "Connect with fellow learners, participate in discussions, and collaborate on projects.",
    color: "green"
  },
  {
    id: 3,
    icon: Trophy,
    title: "Build Projects",
    description: "Apply your knowledge by building real-world projects that showcase your skills.",
    color: "purple"
  },
  {
    id: 4,
    icon: Briefcase,
    title: "Land Your Dream Job",
    description: "Get career support and job placement assistance to secure your ideal position.",
    color: "teal"
  }
];

interface StudentJourneyProps {
  onNavigate?: (page: string) => void;
}

export function StudentJourney({ onNavigate }: StudentJourneyProps) {
  // ✅ Button aur navigation code completely remove kar diya

  return (
    <section className="py-20 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Your Learning
            <span className="block bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow our proven path to success. From beginner to professional, we'll guide you every step of the way.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-200 via-green-200 via-purple-200 to-teal-200 hidden lg:block"></div>

          {/* Steps */}
          <div className="space-y-12 lg:space-y-24">
            {journeySteps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={step.id} className="relative">
                  {/* Desktop Layout */}
                  <div className={`hidden lg:flex items-center ${isEven ? '' : 'flex-row-reverse'}`}>
                    {/* Content */}
                    <div className="w-5/12 space-y-4">
                      <div className={`p-8 rounded-2xl shadow-lg bg-card border-2 ${
                        step.color === 'blue' ? 'border-blue-100 hover:border-blue-200 dark:border-blue-900/20 dark:hover:border-blue-800/30' :
                        step.color === 'green' ? 'border-green-100 hover:border-green-200 dark:border-green-900/20 dark:hover:border-green-800/30' :
                        step.color === 'purple' ? 'border-purple-100 hover:border-purple-200 dark:border-purple-900/20 dark:hover:border-purple-800/30' :
                        'border-teal-100 hover:border-teal-200 dark:border-teal-900/20 dark:hover:border-teal-800/30'
                      } transition-colors duration-300`}>
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>

                    {/* Center Icon */}
                    <div className="w-2/12 flex justify-center">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${
                        step.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                        step.color === 'green' ? 'bg-gradient-to-br from-green-500 to-green-600' :
                        step.color === 'purple' ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                        'bg-gradient-to-br from-teal-500 to-teal-600'
                      }`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Step Number */}
                    <div className="w-5/12 flex justify-center">
                      <div className={`text-6xl font-bold ${
                        step.color === 'blue' ? 'text-blue-100' :
                        step.color === 'green' ? 'text-green-100' :
                        step.color === 'purple' ? 'text-purple-100' :
                        'text-teal-100'
                      }`}>
                        {step.id.toString().padStart(2, '0')}
                      </div>
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="lg:hidden flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg flex-shrink-0 ${
                      step.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                      step.color === 'green' ? 'bg-gradient-to-br from-green-500 to-green-600' :
                      step.color === 'purple' ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                      'bg-gradient-to-br from-teal-500 to-teal-600'
                    }`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className={`flex-1 p-6 rounded-2xl shadow-lg bg-card border-2 ${
                      step.color === 'blue' ? 'border-blue-100 dark:border-blue-900/20' :
                      step.color === 'green' ? 'border-green-100 dark:border-green-900/20' :
                      step.color === 'purple' ? 'border-purple-100 dark:border-purple-900/20' :
                      'border-teal-100 dark:border-teal-900/20'
                    }`}>
                      <h3 className="font-bold mb-2">{step.title}</h3>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ✅ CTA SECTION COMPLETELY REMOVED */}
        {/* No button, no CTA, nothing - clean section */}
      </div>
    </section>
  );
}