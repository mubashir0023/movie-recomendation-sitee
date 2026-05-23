const express = require('express');
const router = express.Router();
const {
  getPopularMovies,
  getTrendingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  searchMovies,
  getMovieDetails,
} = require('../controllers/movieController');

/**
 * @file movieRoutes.js
 * @description Routes for movie operations.
 */

// Route to get popular movies
router.get('/popular', getPopularMovies);

// Route to get trending movies
router.get('/trending', getTrendingMovies);

// Route to get top rated movies
router.get('/top-rated', getTopRatedMovies);

// Route to get upcoming movies
router.get('/upcoming', getUpcomingMovies);

// Route to search for movies
router.get('/search', searchMovies);

// Route to get movie details by ID
router.get('/:id', getMovieDetails);

module.exports = router;
