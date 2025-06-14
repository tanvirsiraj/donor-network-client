import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-orange-400 border-t-transparent animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-orange-200 border-t-transparent animate-spin-slow"></div>
      </div>
    </div>
  );
};

export default Loading;
