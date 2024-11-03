import React from "react";

const Error500: React.FC = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="px-4 text-center min-h-screen flex flex-col justify-center items-center">
      <div className="animate-fade-in-up">
        <h1 className="text-9xl font-extrabold text-red-500 drop-shadow-lg">500</h1>
        <p className="text-4xl font-semibold text-gray-800 mt-2">
          Internal Server Error
        </p>
        <p className="text-lg text-gray-600 mt-4">
          Kami mohon maaf atas ketidaknyamanannya. Silakan coba lagi nanti.
        </p>
      </div>
      
      <button
        onClick={handleRetry}
        className="mt-8 px-6 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition duration-300 ease-in-out shadow-md transform hover:scale-105 focus:outline-none"
      >
        Coba Lagi
      </button>
    </div>
  );
};

export default Error500;
