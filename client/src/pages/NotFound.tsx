import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col items-center justify-center h-screen  text-center px-6 min-h-screen mb-130 lg:mb-80 relative z-30 bg-white">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="mt-4 text-lg text-gray-700">
        Oops! The page you’re searching for could not be found.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
      >
        Go Back Home
      </button>
    </main>
  );
};

export default NotFoundPage;
