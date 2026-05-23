import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import { Play, Plus, Heart, Star, Clock, Calendar, ChevronRight, Loader2 } from 'lucide-react';
import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

/**
 * @file MovieDetails.jsx
 * @description Detailed page for a single movie.
 */

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { favorites, watchlist, toggleFavorite, toggleWatchlist } = useMovies();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      try {
        const { data } = await API.get(`/api/movies/${id}`);
        setMovie(data);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Error fetching movie details', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

  if (!movie) return <div className="pt-24 text-center">Movie not found</div>;

  const isFavorite = favorites.some((f) => f.id === movie.id);
  const isInWatchlist = watchlist.some((w) => w.id === movie.id);
  const trailer = movie.videos?.results?.find((v) => v.type === 'Trailer' && v.site === 'YouTube');

  return (
    <div className="bg-dark min-h-screen text-white">
      {/* Backdrop Section */}
      <div className="relative h-[50vh] md:h-[70vh]">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          className="w-full h-full object-cover"
          alt={movie.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 -mt-32 md:-mt-64 relative z-10 pb-20">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="w-64 md:w-80 flex-shrink-0 mx-auto md:mx-0">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              className="w-full rounded-lg shadow-2xl border border-gray-800"
              alt={movie.title}
            />
          </div>

          {/* Info */}
          <div className="flex-1 space-y-6 pt-10 md:pt-32">
            <h1 className="text-4xl md:text-5xl font-bold">{movie.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-300 font-medium">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star size={20} fill="currentColor" />
                <span>{movie.vote_average?.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={20} />
                <span>{movie.runtime} min</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={20} />
                <span>{new Date(movie.release_date).getFullYear()}</span>
              </div>
              <div className="flex gap-2">
                {movie.genres?.map((g) => (
                  <span key={g.id} className="px-3 py-1 bg-gray-800 rounded-full text-xs uppercase tracking-wider">
                    {g.name}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
              {movie.overview}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              {trailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-md font-bold hover:bg-red-700 transition"
                >
                  <Play fill="white" /> Watch Trailer
                </a>
              )}
              <button 
                onClick={() => toggleFavorite(movie)}
                className={`flex items-center gap-2 px-6 py-3 rounded-md font-bold transition border ${isFavorite ? 'bg-white text-black border-white' : 'bg-transparent text-white border-gray-500 hover:bg-white/10'}`}
              >
                <Heart fill={isFavorite ? 'black' : 'none'} /> {isFavorite ? 'Favorited' : 'Favorite'}
              </button>
              <button 
                onClick={() => toggleWatchlist(movie)}
                className={`flex items-center gap-2 px-6 py-3 rounded-md font-bold transition border ${isInWatchlist ? 'bg-green-600 border-green-600 text-white' : 'bg-transparent text-white border-gray-500 hover:bg-white/10'}`}
              >
                <Plus className={isInWatchlist ? 'rotate-45' : ''} /> {isInWatchlist ? 'In Watchlist' : 'Watchlist'}
              </button>
            </div>
          </div>
        </div>

        {/* Cast */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-8">Top Billed Cast</h2>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {movie.credits?.cast?.slice(0, 10).map((person) => (
              <div key={person.id} className="min-w-[140px] text-center space-y-2">
                <img
                  src={person.profile_path ? `https://image.tmdb.org/t/p/w200${person.profile_path}` : 'https://via.placeholder.com/200x300?text=No+Photo'}
                  className="w-full h-48 object-cover rounded-lg"
                  alt={person.name}
                />
                <p className="font-bold text-sm">{person.name}</p>
                <p className="text-gray-400 text-xs">{person.character}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Movies */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-8">More Like This</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {movie.recommendations?.results?.slice(0, 12).map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
