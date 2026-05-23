import { createContext, useState, useContext, useEffect } from 'react';
import API from '../services/api';
import { useAuth } from './AuthContext';
import { toast } from 'react-hot-toast';

/**
 * @file MovieContext.jsx
 * @description Context to manage user's movie lists (favorites, watchlist).
 */

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  // Fetch lists when user logs in
  useEffect(() => {
    if (user) {
      fetchUserLists();
    } else {
      setFavorites([]);
      setWatchlist([]);
    }
  }, [user]);

  const fetchUserLists = async () => {
    try {
      const { data } = await API.get('/api/users/profile');
      setFavorites(data.favorites || []);
      setWatchlist(data.watchlist || []);
    } catch (error) {
      console.error('Error fetching user lists', error);
    }
  };

  const toggleFavorite = async (movie) => {
    try {
      const isFavorite = favorites.find((f) => f.id === movie.id);
      if (isFavorite) {
        const { data } = await API.delete(`/api/users/favorites/${movie.id}`);
        setFavorites(data);
        toast.success('Removed from favorites');
      } else {
        const { data } = await API.post('/api/users/favorites', {
          id: movie.id,
          title: movie.title || movie.name,
          poster_path: movie.poster_path,
        });
        setFavorites(data);
        toast.success('Added to favorites');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  const toggleWatchlist = async (movie) => {
    try {
      const isInWatchlist = watchlist.find((w) => w.id === movie.id);
      if (isInWatchlist) {
        const { data } = await API.delete(`/api/users/watchlist/${movie.id}`);
        setWatchlist(data);
        toast.success('Removed from watchlist');
      } else {
        const { data } = await API.post('/api/users/watchlist', {
          id: movie.id,
          title: movie.title || movie.name,
          poster_path: movie.poster_path,
        });
        setWatchlist(data);
        toast.success('Added to watchlist');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <MovieContext.Provider value={{ favorites, watchlist, toggleFavorite, toggleWatchlist }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);
