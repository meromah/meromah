import React, { useEffect } from "react";
import { FaCheckCircle, FaInfoCircle, FaTimes } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const types = {
    success: {
      bg: "bg-green-50 border-green-500",
      icon: <FaCheckCircle className="w-6 h-6 text-green-500" />,
      text: "text-green-800",
    },
    info: {
      bg: "bg-blue-50 border-blue-500",
      icon: <FaInfoCircle className="w-6 h-6 text-blue-500" />,
      text: "text-blue-800",
    },
    error: {
      bg: "bg-red-50 border-red-500",
      icon: <MdErrorOutline className="w-6 h-6 text-red-500" />,
      text: "text-red-800",
    },
  };

  const style = types[type] || types.success;
  return (
    <>
      <div className="fixed top-4 right-4 z-50 animate-slide-in">
        <div
          className={`${style.bg} border-l-4 rounded-lg shadow-lg p-4 max-w-md flex items-start gap-3`}
        >
          {style.icon}
          <div className="flex-1">
            <p className={`${style.text} font-medium text-sm`}>{message}</p>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              onClose;
            }}
            className={`${style.text} hover:opacity-70 transition-opacity cursor-pointer`}
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Toast;
