import { useState, useEffect } from 'react';
import API from '../services/api';
import useDebounce from '../hooks/useDebounce';
import MovieCard from '../components/MovieCard';
import { Search as SearchIcon, Loader2 } from 'lucide-react';

/**
 * @file Search.jsx
 * @description Search page with debounced input and results grid.
 */

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const searchMovies = async () => {
      if (!debouncedQuery) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const { data } = await API.get(`/api/movies/search?query=${debouncedQuery}`);
        setResults(data.results);
      } catch (error) {
        console.error('Search error', error);
      } finally {
        setIsLoading(false);
      }
    };

    searchMovies();
  }, [debouncedQuery]);

  return (
    <div className="pt-24 px-4 md:px-12 min-h-screen">
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-3xl font-bold mb-6 text-center">Find Your Next Favorite</h1>
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          <input
            type="text"
            placeholder="Search for movies, TV shows..."
            className="w-full bg-[#333] border-none rounded-full py-4 pl-14 pr-6 text-white text-lg focus:ring-2 focus:ring-primary outline-none transition shadow-xl"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-primary" size={48} />
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : debouncedQuery ? (
        <div className="text-center text-gray-400 mt-20">
          <p className="text-xl">No results found for "{debouncedQuery}"</p>
          <p className="mt-2 text-sm">Try different keywords or check for typos.</p>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-20">
          <SearchIcon size={64} className="mx-auto mb-4 opacity-20" />
          <p className="text-xl italic">Search something to see results...</p>
        </div>
      )}
    </div>
  );
};

export default Search;
