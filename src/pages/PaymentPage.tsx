import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, CreditCard, QrCode, Smartphone, CheckCircle, Shield } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

interface PaymentPageProps {
  onNavigate?: (page: string) => void;
  courseId?: string;
}

function PaymentPage({ onNavigate, courseId }: PaymentPageProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  
  // Course data based on courseId
  const getCourseData = (courseId?: string) => {
    const courses = {
      "plc-automation": {
        title: "PLC & Automation",
        price: "₹49,999",
        duration: "3 Months"
      },
      "digital-marketing": {
        title: "Digital Marketing With AI & E-Commerce", 
        price: "₹49,999",
        duration: "3 Months"
      },
      "tally-gst": {
        title: "Tally with GST + Advanced Excel",
        price: "₹49,999",
        duration: "3 Months"
      }
    };
    
    return courses[courseId as keyof typeof courses] || {
      title: "Selected Course",
      price: "₹49,999", 
      duration: "3 Months"
    };
  };

  const course = getCourseData(courseId);

  const handlePaymentSuccess = () => {
    alert("🎉 Payment Successful! Course access granted.");
    if (onNavigate) {
      onNavigate("courses");
    }
  };

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Pay with Visa, Mastercard, or RuPay"
    },
    {
      id: "upi",
      name: "UPI Payment", 
      icon: Smartphone,
      description: "Google Pay, PhonePe, Paytm"
    },
    {
      id: "qr",
      name: "QR Code",
      icon: QrCode,
      description: "Scan and pay with any UPI app"
    },
    {
      id: "netbanking",
      name: "Net Banking",
      icon: CreditCard, // Bank ki jagah CreditCard use karo
      description: "All major Indian banks"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => onNavigate && onNavigate(`enrollment-form-${courseId}`)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Enrollment
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Complete Your Payment
          </motion.h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Payment Methods</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method) => (
                  <motion.div
                    key={method.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className={`w-full justify-start p-4 h-auto ${
                        selectedMethod === method.id 
                          ? 'bg-blue-100 border-2 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:border-blue-400 dark:text-blue-300' 
                          : 'bg-white border border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
                      }`}
                      variant="outline"
                      onClick={() => setSelectedMethod(method.id)}
                    >
                      <div className="flex items-center gap-3 text-left w-full">
                        <method.icon className="w-5 h-5 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="font-semibold">{method.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {method.description}
                          </div>
                        </div>
                        {selectedMethod === method.id && (
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        )}
                      </div>
                    </Button>
                  </motion.div>
                ))}

                {/* Pay Now Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-4"
                >
                  <Button
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-4 text-lg font-semibold"
                    size="lg"
                    onClick={handlePaymentSuccess}
                    disabled={!selectedMethod}
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Pay {course.price} Now
                  </Button>
                </motion.div>

                {/* Security Info */}
                <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg mt-4">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Shield className="w-4 h-4 text-green-600" />
                    <div className="text-sm font-medium text-green-800 dark:text-green-300">
                      Secure Payment
                    </div>
                  </div>
                  <div className="text-xs text-green-600 dark:text-green-400">
                    100% Safe & Secure • SSL Encrypted
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Course Info */}
                  <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm sm:text-base">{course.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{course.duration} Program</p>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 text-sm sm:text-base">
                    <div className="flex justify-between">
                      <span>Course Price:</span>
                      <span className="font-semibold">{course.price}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Discount Applied:</span>
                      <span className="font-semibold">-₹0</span>
                    </div>
                    <div className="flex justify-between border-t pt-3">
                      <span className="font-semibold">Total Amount:</span>
                      <span className="text-xl font-bold text-blue-600">{course.price}</span>
                    </div>
                  </div>

                  {/* Features Included */}
                  <div className="pt-4 space-y-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Instant course access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Lifetime validity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Certificate included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Downloadable resources</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>24/7 support</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PaymentPage;