import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-2">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-70"></div>
        <p className="text-lg font-semibold text-gray-700">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loading;
