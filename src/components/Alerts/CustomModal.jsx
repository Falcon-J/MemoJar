import React from "react";

const CustomModal = ({ message, onClose, isLoading, actions }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-purple-600 text-center">
          {isLoading ? "Processing" : "Message"}
        </h2>
        <div className="text-center text-gray-700">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <div className="w-8 h-8 border-4 border-t-4 border-purple-600 rounded-full animate-spin"></div>
            </div>
          ) : typeof message === "string" ? (
            <p>{message}</p>
          ) : (
            message
          )}
        </div>
        {actions
          ? actions
          : !isLoading && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-300"
                >
                  Close
                </button>
              </div>
            )}
      </div>
    </div>
  );
};

export default CustomModal;
