import { useState } from "react";
import { PaymentModal } from "../components/PaymentModal";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

export function PaymentPage() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  // Example course (you can pass dynamically)
  const course = {
    title: "React + TypeScript Masterclass",
    originalPrice: "$100",
    price: "$85",
    duration: "4 weeks"
  };

  const handlePaymentSuccess = () => {
    // Update user enrolled courses after payment
    if (user) {
      setUser({ ...user, enrolled_courses: [...user.enrolled_courses, course] });
    }
    setIsOpen(false);
    navigate("/student-portal"); // redirect after successful payment
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Course Checkout</h1>
      <p className="mb-6">
        You are about to enroll in <strong>{course.title}</strong> for <strong>{course.price}</strong>.
      </p>

      <Button
        className="w-full bg-blue-600 text-white hover:bg-blue-700"
        onClick={() => setIsOpen(true)}
      >
        Proceed to Payment
      </Button>

      <PaymentModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={handlePaymentSuccess}
        course={course}
      />
    </div>
  );
}
