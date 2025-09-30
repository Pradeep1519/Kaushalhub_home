'use client';

import React from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { X } from "lucide-react";

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
  if (!isOpen) return null;

  const handlePayment = () => {
    // Payment processing logic yahan ayegi
    console.log("Payment processing for:", course.title);
    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl">Complete Your Enrollment</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Course Details */}
          <div className="space-y-2">
            <h3 className="font-semibold">{course.title}</h3>
            <div className="flex justify-between text-sm">
              <span>Original Price:</span>
              <span className="line-through text-muted-foreground">{course.originalPrice}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Discounted Price:</span>
              <span className="text-green-600 font-bold">{course.price}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Duration:</span>
              <span>{course.duration}</span>
            </div>
          </div>

          {/* Payment Options */}
          <div className="space-y-2">
            <h4 className="font-medium">Select Payment Method</h4>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                💳 Credit/Debit Card
              </Button>
              <Button variant="outline" className="w-full justify-start">
                📱 UPI Payment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                🏦 Net Banking
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-4">
            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={handlePayment}
            >
              Pay {course.price} & Enroll
            </Button>
            <Button variant="outline" className="w-full" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}