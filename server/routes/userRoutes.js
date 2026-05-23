const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  addFavorite,
  removeFavorite,
  addToWatchlist,
  removeFromWatchlist,
  updateWatchlistItem,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

/**
 * @file userRoutes.js
 * @description Routes for user operations.
 */

// Route to register a user
router.post('/', registerUser);

// Route to login a user
router.post('/login', loginUser);

// Route to get user profile (protected)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

// Favorites routes
router.post('/favorites', protect, addFavorite);
router.delete('/favorites/:id', protect, removeFavorite);

// Watchlist routes
router.post('/watchlist', protect, addToWatchlist);
router.delete('/watchlist/:id', protect, removeFromWatchlist);
router.put('/watchlist/:id', protect, updateWatchlistItem);

module.exports = router;

/**
 * How to customize:
 * - You can add more routes here, like for updating the profile.
 * - Use 'router.route('/').post(registerUser).get(protect, getUsers)' for cleaner code if adding many methods.
 */
