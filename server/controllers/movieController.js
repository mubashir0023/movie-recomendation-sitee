const { fetchFromTMDB } = require('../utils/tmdb');

/**
 * @file movieController.js
 * @description Logic for movie-related API endpoints using TMDb.
 */

/**
 * @desc    Get popular movies from TMDb
 * @route   GET /api/movies/popular
 * @access  Public
 */
const getPopularMovies = async (req, res, next) => {
  try {
    const data = await fetchFromTMDB('/movie/popular');
    res.json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Search movies on TMDb
 * @route   GET /api/movies/search
 * @access  Public
 */
const searchMovies = async (req, res, next) => {
  try {
    const { query, page } = req.query;
    if (!query) {
      res.status(400);
      throw new Error('Search query is required');
    }

    const data = await fetchFromTMDB('/search/movie', { query, page: page || 1 });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get movie details by ID
 * @route   GET /api/movies/:id
 * @access  Public
 */
const getMovieDetails = async (req, res, next) => {
  try {
    const data = await fetchFromTMDB(`/movie/${req.params.id}`, {
      append_to_response: 'credits,videos,recommendations,similar',
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get trending movies from TMDb
 * @route   GET /api/movies/trending
 * @access  Public
 */
const getTrendingMovies = async (req, res, next) => {
  try {
    const data = await fetchFromTMDB('/trending/movie/day');
    res.json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get top rated movies from TMDb
 * @route   GET /api/movies/top-rated
 * @access  Public
 */
const getTopRatedMovies = async (req, res, next) => {
  try {
    const data = await fetchFromTMDB('/movie/top_rated');
    res.json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get upcoming movies from TMDb
 * @route   GET /api/movies/upcoming
 * @access  Public
 */
const getUpcomingMovies = async (req, res, next) => {
  try {
    const data = await fetchFromTMDB('/movie/upcoming');
    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPopularMovies,
  getTrendingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  searchMovies,
  getMovieDetails,
};
