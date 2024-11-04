import React from "react";

interface LoadingModalProps {
  loading: boolean;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ loading }) => {
  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-100">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
              <p className="text-gray-800 mt-4">Mengunggah, silakan tunggu...</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoadingModal;
