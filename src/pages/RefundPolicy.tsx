// src/pages/RefundPolicy.tsx
import { motion } from 'motion/react';
import { ArrowLeft, Shield, Clock, Mail, Phone, MapPin, Award, Briefcase } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

interface RefundPolicyProps {
  onNavigate: (page: string) => void;
}

export function RefundPolicy({ onNavigate }: RefundPolicyProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => onNavigate('home')}
            className="mb-6 flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Button>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                <Award className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Refund & Job Guarantee Policy
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Guarantee Program */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <Briefcase className="w-5 h-5" />
                    Job Guarantee Program
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-700">
                  <p className="font-semibold text-green-800 text-lg">
                    🎯 No Job Within 2 Months After Course Completion? Get 30% Refund!
                  </p>
                  <p>
                    At KaushalHub, we are committed to your career success. If you don't get a job within 
                    <strong> 2 months</strong> of completing your course, you are eligible for a <strong>30% refund</strong>.
                  </p>
                </CardContent>
              </Card>
            </motion.section>

            {/* Refund Conditions */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <Shield className="w-5 h-5" />
                    Refund Conditions & Eligibility
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-gray-700">
                  
                  {/* 30% Job Guarantee Refund */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-3">
                      💼 30% Job Guarantee Refund Eligibility
                    </h4>
                    <ul className="list-disc list-inside space-y-2 text-blue-700 text-sm">
                      <li>No job placement within <strong>2 months</strong> of course completion</li>
                      <li>Student must have <strong>completed 100%</strong> of the course content</li>
                      <li>All assignments and projects must be submitted</li>
                      <li>Regular attendance in career support sessions</li>
                      <li>Minimum <strong>5 job applications</strong> submitted through our portal</li>
                      <li>Refund amount: <strong>30% of course fee</strong></li>
                    </ul>
                  </div>

                  {/* 30-Day Money Back */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-3">
                      ⏰ 30-Day Money Back Guarantee
                    </h4>
                    <ul className="list-disc list-inside space-y-2 text-green-700 text-sm">
                      <li>Within <strong>30 days</strong> of purchase date</li>
                      <li>If not satisfied with course content</li>
                      <li>Must have completed <strong>less than 20%</strong> of the course</li>
                      <li>Full refund available</li>
                    </ul>
                  </div>

                  {/* Not Eligible */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-3">❌ Refund Not Eligible In These Cases:</h4>
                    <ul className="list-disc list-inside space-y-2 text-red-700 text-sm">
                      <li>After completing more than 20% of course content</li>
                      <li>After 30-day period (for regular refund)</li>
                      <li>If job interviews are not attended</li>
                      <li>If career support sessions are ignored</li>
                      <li>After receiving course completion certificate</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            {/* Refund Process */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-purple-600">
                    Refund Process & Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-700">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-purple-600 text-sm font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Submit Refund Request</h4>
                        <p className="text-sm text-gray-600">
                          Email your course details, completion proof, and job applications to support@kaushalhub.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-purple-600 text-sm font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Verification & Approval</h4>
                        <p className="text-sm text-gray-600">
                          We verify your course completion and job applications. Process takes <strong>3-5 business days</strong>.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-purple-600 text-sm font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Refund Processing</h4>
                        <p className="text-sm text-gray-600">
                          After approval, <strong>30% refund</strong> will be processed to your original payment method 
                          within <strong>7-10 business days</strong>.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Important Notes */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">📝 Important Notes:</h4>
                    <ul className="list-disc list-inside space-y-1 text-yellow-700 text-sm">
                      <li>100% course completion is mandatory for Job Guarantee Refund</li>
                      <li>Regular attendance in career support sessions required</li>
                      <li>Minimum 5 job applications must be submitted through our portal</li>
                      <li>Refund is limited to 30% of the course fee only</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.section>
          </div>

          {/* Sidebar - Contact & Support */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6 sticky top-8"
            >
              {/* Contact Info */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-800 text-center">
                    Contact for Refunds
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">Email</p>
                      <p className="text-sm text-blue-600">support@kaushalhub.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">Phone</p>
                      <p className="text-sm text-blue-600">+91-XXXXXXXXXX</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">Office Hours</p>
                      <p className="text-sm text-blue-600">Mon - Sat: 9:00 AM - 6:00 PM IST</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Job Guarantee Highlight */}
              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardContent className="p-6 text-center">
                  <Briefcase className="w-12 h-12 text-white mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Job Guarantee</h3>
                  <p className="text-sm text-green-100">
                    Course Complete + 2 Months = No Job?<br />
                    <strong>Get 30% Refund!</strong>
                  </p>
                </CardContent>
              </Card>

              {/* Quick Refund Info */}
              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-6 text-center">
                  <Clock className="w-10 h-10 text-orange-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-orange-800 mb-2">Fast Refund Processing</h3>
                  <p className="text-sm text-orange-700">
                    Refund processed within<br />
                    <strong>7-10 business days</strong> after approval
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-gray-600 text-sm border-t pt-6"
        >
          <p>
            This refund policy applies to all KaushalHub courses. Any updates will be reflected on this page. 
            Contact us for any clarification or questions.
          </p>
        </motion.div>
      </div>
    </div>
  );
}