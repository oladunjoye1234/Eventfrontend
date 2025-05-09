import React from 'react';
import { Link } from 'react-router-dom';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4 py-8">
      <div className="text-center">
        {/* Icon */}
        <ExclamationCircleIcon className="w-24 h-24 text-gray-400 mx-auto mb-6" />

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          404 - Page Not Found
        </h1>

        {/* Message */}
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          Oops! It looks like the page you're looking for doesn't exist or has been moved.
        </p>

        {/* Call to Action */}
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>

      {/* Custom CSS for Media Queries */}
      <style jsx>{`
        @media (max-width: 768px) {
          .text-4xl {
            font-size: 2rem;
          }
          .text-lg {
            font-size: 1rem;
          }
          .w-24 {
            width: 5rem;
            height: 5rem;
          }
          .px-6 {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
          .py-3 {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
          }
          .mb-6 {
            margin-bottom: 1.5rem;
          }
          .mb-4 {
            margin-bottom: 1rem;
          }
        }
        @media (max-width: 640px) {
          .text-4xl {
            font-size: 1.75rem;
          }
          .text-lg {
            font-size: 0.875rem;
          }
          .w-24 {
            width: 4rem;
            height: 4rem;
          }
          .px-6 {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .py-3 {
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PageNotFound;