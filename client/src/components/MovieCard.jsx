import { Link } from 'react-router-dom';
import { Heart, Play, Plus } from 'lucide-react';
import { useMovies } from '../context/MovieContext';

/**
 * @file MovieCard.jsx
 * @description A card component to display movie details in a list.
 */

const MovieCard = ({ movie }) => {
  const { favorites, watchlist, toggleFavorite, toggleWatchlist } = useMovies();
  
  const isFavorite = favorites.some((f) => f.id === movie.id);
  const isInWatchlist = watchlist.some((w) => w.id === movie.id);

  const posterBaseUrl = 'https://image.tmdb.org/t/p/w500';

  return (
    <div className="relative group min-w-[160px] md:min-w-[240px] h-auto transition-all duration-300 hover:scale-105 hover:z-10">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={movie.poster_path ? `${posterBaseUrl}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster'}
          alt={movie.title || movie.name}
          className="rounded-md object-cover w-full h-full shadow-lg"
        />
      </Link>

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md flex flex-col justify-end p-4">
        <h3 className="text-white font-bold text-sm md:text-base line-clamp-2 mb-2">
          {movie.title || movie.name}
        </h3>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => toggleFavorite(movie)}
            className={`p-2 rounded-full transition ${isFavorite ? 'text-primary' : 'text-white hover:bg-white/20'}`}
          >
            <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
          <button 
            onClick={() => toggleWatchlist(movie)}
            className={`p-2 rounded-full transition ${isInWatchlist ? 'text-green-500' : 'text-white hover:bg-white/20'}`}
          >
            <Plus size={18} className={isInWatchlist ? 'rotate-45' : ''} />
          </button>
          <Link 
            to={`/movie/${movie.id}`}
            className="ml-auto p-2 bg-white text-black rounded-full hover:bg-gray-200 transition"
          >
            <Play size={16} fill="black" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
