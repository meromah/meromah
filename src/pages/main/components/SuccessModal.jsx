import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SuccessModal = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
      // Redirect to home after modal closes
      window.location.href = '/home';
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn">
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl animate-scale-in">
          <div className="text-center">
            {/* Success Icon */}
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <FaCheckCircle className="w-8 h-8 text-green-500" />
            </div>
            
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">
              Welcome to UniHub!
            </h2>
            <p className="text-neutral-600 mb-6">
              Your account has been created successfully. Redirecting you to home...
            </p>
            
            {/* Loading spinner */}
            <div className="flex justify-center">
              <AiOutlineLoading3Quarters className="animate-spin h-6 w-6 text-primary-yellow" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessModal;