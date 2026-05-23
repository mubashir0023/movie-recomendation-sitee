const axios = require('axios');

/**
 * @file tmdb.js
 * @description Utility functions to interact with The Movie Database (TMDb) API.
 * 
 * Concept: TMDb API provides a wealth of movie data. We use 'axios' to make HTTP 
 * requests to their endpoints. We abstract these calls into functions for reuse.
 */

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

/**
 * Helper function to make requests to TMDb
 * @param {string} endpoint - The API endpoint (e.g., '/movie/popular')
 * @param {object} params - Additional query parameters
 */
const fetchFromTMDB = async (endpoint, params = {}) => {
  const apiKey = process.env.TMDB_API_KEY;
  
  if (!apiKey) {
    throw new Error('TMDb API Key is missing. Please add it to your .env file.');
  }

  try {
    const response = await axios.get(`${TMDB_BASE_URL}${endpoint}`, {
      params: {
        api_key: apiKey,
        language: 'en-US',
        ...params,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`TMDb API Error: ${error.response?.data?.status_message || error.message}`);
    throw new Error('Failed to fetch data from TMDb');
  }
};

module.exports = { fetchFromTMDB };

/**
 * How to customize:
 * - You can add more default params like 'region' or 'include_adult'.
 * - You can create specific functions like 'getMovieDetails' or 'searchMovies' 
 *   to further abstract the API logic.
 */
