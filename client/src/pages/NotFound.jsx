import { Link } from 'react-router-dom';

/**
 * @file NotFound.jsx
 * @description 404 Error page when a route is not found.
 */

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark text-white p-4">
      <div className="text-center space-y-6 relative">
        <h1 className="text-9xl font-extrabold text-red-600 tracking-widest">404</h1>
        <div className="bg-red-600 px-2 text-sm rounded rotate-12 absolute top-0 right-0 transform translate-x-4 -translate-y-2">
          Page Not Found
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl md:text-4xl font-semibold">Lost in the cinematic universe?</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>
        <Link
          to="/"
          className="inline-block px-8 py-3 border border-red-600 text-red-600 font-bold rounded-md hover:bg-red-600 hover:text-white transition-all duration-300"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
