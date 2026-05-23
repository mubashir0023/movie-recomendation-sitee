import { useState, useEffect, useRef } from 'react';
import API from '../services/api';
import MovieCard from './MovieCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * @file MovieRow.jsx
 * @description A horizontally scrollable row of movies.
 */

const MovieRow = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const rowRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get(fetchUrl);
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching row movies', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [fetchUrl]);

  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (isLoading) return <div className="h-40 bg-gray-900/20 animate-pulse m-4 rounded-lg"></div>;

  return (
    <div className="space-y-2 px-4 md:px-12 my-8">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-200 hover:text-white transition cursor-pointer">
        {title}
      </h2>
      
      <div className="group relative">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-40 bg-black/40 px-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
        >
          <ChevronLeft size={40} />
        </button>

        <div 
          ref={rowRef}
          className="flex gap-4 overflow-x-scroll scrollbar-hide py-4"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-40 bg-black/40 px-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
        >
          <ChevronRight size={40} />
        </button>
      </div>
    </div>
  );
};

export default MovieRow;
