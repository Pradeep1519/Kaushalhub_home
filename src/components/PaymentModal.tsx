'use client';

import React from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  course: {
    title: string;
    originalPrice: string;
    price: string;
    duration: string;
  };
}

export function PaymentModal({ isOpen, onClose, onSuccess, course }: PaymentModalProps) {
  const handlePayment = () => {
    // Payment processing logic yahan ayegi
    console.log("Payment processing for:", course.title);
    onSuccess();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4 lg:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.3 
            }}
          >
            <Card className="w-full max-h-[90vh] sm:max-h-[85vh] lg:max-h-[80vh] overflow-hidden flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 sm:pb-4 flex-shrink-0">
                <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold">
                  Complete Your Enrollment
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onClose}
                  className="h-8 w-8 sm:h-9 sm:w-9 p-0 flex-shrink-0"
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </CardHeader>
              
              <CardContent className="space-y-4 sm:space-y-6 flex-1 overflow-y-auto pb-4 sm:pb-6">
                {/* Course Details */}
                <div className="space-y-3 sm:space-y-4 p-3 sm:p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-semibold text-base sm:text-lg lg:text-xl leading-tight">
                    {course.title}
                  </h3>
                  <div className="space-y-2 text-sm sm:text-base">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Original Price:</span>
                      <span className="line-through text-muted-foreground font-medium">
                        {course.originalPrice}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Discounted Price:</span>
                      <span className="text-green-600 font-bold text-base sm:text-lg">
                        {course.price}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Options */}
                <div className="space-y-3 sm:space-y-4">
                  <h4 className="font-medium text-base sm:text-lg">Select Payment Method</h4>
                  <div className="space-y-2 sm:space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start py-3 sm:py-4 text-sm sm:text-base h-auto min-h-[44px]"
                    >
                      <span className="mr-2 text-base">💳</span>
                      Credit/Debit Card
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start py-3 sm:py-4 text-sm sm:text-base h-auto min-h-[44px]"
                    >
                      <span className="mr-2 text-base">📱</span>
                      UPI Payment
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start py-3 sm:py-4 text-sm sm:text-base h-auto min-h-[44px]"
                    >
                      <span className="mr-2 text-base">🏦</span>
                      Net Banking
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 sm:space-y-3 pt-2 sm:pt-4 flex-shrink-0">
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 sm:py-4 text-sm sm:text-base h-auto min-h-[44px]"
                    onClick={handlePayment}
                  >
                    Pay {course.price} & Enroll Now
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full py-3 sm:py-4 text-sm sm:text-base h-auto min-h-[44px]"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                </div>

                {/* Security Badge */}
                <div className="text-center pt-2 sm:pt-4 border-t border-border">
                  <p className="text-xs sm:text-sm text-muted-foreground flex items-center justify-center gap-1 sm:gap-2">
                    <span className="text-green-500">🔒</span>
                    Secure & Encrypted Payment
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}