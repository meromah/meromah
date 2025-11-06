import React from 'react';
import { FiLoader } from 'react-icons/fi';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center">
        <FiLoader className="h-10 w-10 animate-spin text-indigo-500" aria-hidden="true" />
        <p className="text-sm text-gray-500">{message}</p>
      </div>
    </div>
  );
};

export default Loading;


