import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, User, LogOut, Heart, Bookmark, Menu, X } from 'lucide-react';
import { useState } from 'react';

/**
 * @file Navbar.jsx
 * @description The navigation bar component with Netflix-inspired design.
 */

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent bg-secondary/90 backdrop-blur-sm px-4 py-4 md:px-12 flex items-center justify-between transition-all duration-300">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-primary text-3xl font-bold tracking-tighter uppercase italic">
          CineMatch
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/search" className="hover:text-white transition">Search</Link>
          {user && (
            <>
              <Link to="/watchlist" className="hover:text-white transition">Watchlist</Link>
              <Link to="/favorites" className="hover:text-white transition">Favorites</Link>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-5">
        <Link to="/search" className="text-gray-300 hover:text-white">
          <Search size={20} />
        </Link>

        {user ? (
          <div className="relative group">
            <button className="flex items-center gap-2 text-gray-300 hover:text-white">
              <User size={20} />
              <span className="hidden md:block">{user.name}</span>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-dark border border-gray-800 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link to="/profile" className="flex items-center gap-2 px-4 py-3 hover:bg-gray-800 transition">
                <User size={18} /> Profile
              </Link>
              <Link to="/favorites" className="flex items-center gap-2 px-4 py-3 hover:bg-gray-800 transition md:hidden">
                <Heart size={18} /> Favorites
              </Link>
              <Link to="/watchlist" className="flex items-center gap-2 px-4 py-3 hover:bg-gray-800 transition md:hidden">
                <Bookmark size={18} /> Watchlist
              </Link>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-gray-800 transition text-red-500"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>
        ) : (
          <Link 
            to="/login" 
            className="bg-primary text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-red-700 transition"
          >
            Sign In
          </Link>
        )}

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-dark/95 backdrop-blur-md flex flex-col items-center py-8 gap-6 md:hidden">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-lg">Home</Link>
          <Link to="/search" onClick={() => setIsOpen(false)} className="text-lg">Search</Link>
          {user && (
            <>
              <Link to="/watchlist" onClick={() => setIsOpen(false)} className="text-lg">Watchlist</Link>
              <Link to="/favorites" onClick={() => setIsOpen(false)} className="text-lg">Favorites</Link>
              <Link to="/profile" onClick={() => setIsOpen(false)} className="text-lg text-primary">Profile</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
