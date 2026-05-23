import { useState, useEffect } from 'react';
import API from '../services/api';
import MovieRow from '../components/MovieRow';
import { Play, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * @file Home.jsx
 * @description The landing page with a featured hero movie and multiple movie rows.
 */

const Home = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await API.get('/api/movies/popular');
        // Pick a random movie from the first 10 popular ones
        const randomMovie = data.results[Math.floor(Math.random() * 10)];
        setFeaturedMovie(randomMovie);
      } catch (error) {
        console.error('Error fetching featured movie', error);
      }
    };
    fetchFeatured();
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  return (
    <div className="relative pb-20">
      {/* Hero Section */}
      <header className="relative h-[80vh] md:h-[95vh] w-full">
        {featuredMovie && (
          <>
            <div className="absolute inset-0">
              <img
                src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`}
                alt={featuredMovie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent"></div>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 px-4 md:px-12 space-y-4 md:space-y-6 max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                {featuredMovie.title}
              </h1>
              <p className="text-gray-200 text-sm md:text-lg drop-shadow-md line-clamp-3">
                {featuredMovie.overview}
              </p>
              
              <div className="flex items-center gap-4">
                <Link 
                  to={`/movie/${featuredMovie.id}`}
                  className="flex items-center gap-2 bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded-md font-bold hover:bg-white/80 transition"
                >
                  <Play fill="black" /> Play
                </Link>
                <Link 
                  to={`/movie/${featuredMovie.id}`}
                  className="flex items-center gap-2 bg-gray-500/50 text-white px-6 md:px-8 py-2 md:py-3 rounded-md font-bold hover:bg-gray-500/70 transition backdrop-blur-sm"
                >
                  <Info /> More Info
                </Link>
              </div>
            </div>
          </>
        )}
      </header>

      {/* Movie Rows */}
      <div className="-mt-32 md:-mt-48 relative z-20 space-y-4">
        <MovieRow title="Popular on CineMatch" fetchUrl="/api/movies/popular" />
        <MovieRow title="Trending Now" fetchUrl="/api/movies/trending" />
        <MovieRow title="Top Rated" fetchUrl="/api/movies/top-rated" />
        <MovieRow title="Upcoming Releases" fetchUrl="/api/movies/upcoming" />
      </div>
    </div>
  );
};

export default Home;
