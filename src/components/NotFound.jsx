import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiAlertTriangle, FiHome, FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-[60vh] items-center justify-center">
      <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-9xl text-black font-black select-none -z-50 opacity-5'>404</div>
      <div className="mx-4 flex max-w-md flex-col items-center text-center">
        <FiAlertTriangle className="mb-3 h-12 w-12 text-rose-500" aria-hidden="true" />
        <h1 className="text-2xl font-semibold text-gray-900">Page not found</h1>
        <p className="mt-2 text-gray-500">
          The page you are looking for doesn’t exist or has been moved.
        </p>

      </div>
    </div>
  );
};

export default NotFound;


