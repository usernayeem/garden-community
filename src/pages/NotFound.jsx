import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="p-6 md:p-12 bg-gray-50 dark:bg-gray-800 min-h-screen">
      <div className="max-w-3xl mx-auto text-center">
        {/* 404 Header */}
        <h1 className="text-8xl md:text-9xl font-bold text-primary mb-6">
          404
        </h1>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Page Not Found
        </h2>

        {/* Underline (matching the style from other pages) */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-1 bg-primary rounded-full" />
        </div>

        {/* Message */}
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
          Oops! It seems the garden path you're looking for doesn't exist. This
          area hasn't been planted yet or may have been moved.
        </p>

        {/* Back button */}
        <Link to="/" className="btn btn-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Go Back Home
        </Link>
      </div>
    </div>
  );
};
