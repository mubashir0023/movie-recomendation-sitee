import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import { Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * @file Watchlist.jsx
 * @description Page to display user's watchlist.
 */

const Watchlist = () => {
  const { watchlist } = useMovies();

  return (
    <div className="pt-24 px-4 md:px-12 min-h-screen">
      <div className="flex items-center gap-3 mb-10">
        <Bookmark className="text-green-500" size={32} fill="currentColor" />
        <h1 className="text-3xl font-bold">My Watchlist</h1>
      </div>

      {watchlist.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {watchlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center mt-32 space-y-4">
          <p className="text-gray-400 text-xl italic">Your watchlist is empty.</p>
          <Link to="/" className="inline-block bg-primary text-white px-8 py-3 rounded-md font-bold hover:bg-red-700 transition">
            Discover What to Watch
          </Link>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
