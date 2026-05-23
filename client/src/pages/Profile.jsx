import { useAuth } from '../context/AuthContext';
import { useMovies } from '../context/MovieContext';
import { User, Mail, Shield, Settings, Heart, Bookmark, Loader2 } from 'lucide-react';
import { useState } from 'react';
import API from '../services/api';
import { toast } from 'react-hot-toast';

/**
 * @file Profile.jsx
 * @description User profile dashboard with stats and settings.
 */

const Profile = () => {
  const { user } = useAuth();
  const { favorites, watchlist } = useMovies();
  
  const [name, setName] = useState(user?.name || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  if (!user) return null;

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (password && password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    setIsUpdating(true);
    try {
      const { data } = await API.put('/api/users/profile', { name, password });
      // Update localStorage so AuthContext pick it up on next reload
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Profile updated successfully!');
      setPassword('');
      setConfirmPassword('');
      // Reload to reflect changes
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="pt-32 px-4 md:px-12 max-w-5xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Sidebar / Stats */}
        <div className="w-full md:w-80 space-y-6">
          <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 text-center">
            <div className="w-24 h-24 bg-primary rounded-full mx-auto flex items-center justify-center text-3xl font-bold mb-4">
              {user.name.charAt(0)}
            </div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-400 text-sm">{user.email}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 text-center">
              <Heart className="mx-auto mb-2 text-primary" size={24} />
              <p className="text-2xl font-bold">{favorites.length}</p>
              <p className="text-gray-400 text-xs uppercase tracking-widest">Favorites</p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 text-center">
              <Bookmark className="mx-auto mb-2 text-green-500" size={24} />
              <p className="text-2xl font-bold">{watchlist.length}</p>
              <p className="text-gray-400 text-xs uppercase tracking-widest">Watchlist</p>
            </div>
          </div>
        </div>

        {/* Main Content / Settings */}
        <form onSubmit={handleUpdate} className="flex-1 space-y-8 w-full">
          <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
            <div className="flex items-center gap-2 mb-8 border-b border-gray-800 pb-4">
              <Settings className="text-gray-400" />
              <h3 className="text-xl font-bold">Account Settings</h3>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col space-y-2">
                <label className="text-gray-400 text-sm font-medium">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-500" size={18} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#1c1c1c] border border-gray-800 rounded-lg py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-primary outline-none transition"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-gray-400 text-sm font-medium">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
                  <input
                    type="email"
                    defaultValue={user.email}
                    disabled
                    className="w-full bg-gray-800/50 border border-gray-800 rounded-lg py-3 pl-10 pr-4 text-gray-400 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
            <div className="flex items-center gap-2 mb-8 border-b border-gray-800 pb-4">
              <Shield className="text-gray-400" />
              <h3 className="text-xl font-bold">Security</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex flex-col space-y-2">
                <label className="text-gray-400 text-sm font-medium">New Password (leave blank to keep current)</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#1c1c1c] border border-gray-800 rounded-lg py-3 px-4 text-white focus:ring-2 focus:ring-primary outline-none transition"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-gray-400 text-sm font-medium">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#1c1c1c] border border-gray-800 rounded-lg py-3 px-4 text-white focus:ring-2 focus:ring-primary outline-none transition"
                />
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={isUpdating}
                  className="bg-primary hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition flex items-center gap-2"
                >
                  {isUpdating ? <Loader2 className="animate-spin" size={20} /> : 'Update Profile'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
