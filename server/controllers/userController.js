const User = require('../models/User');
const generateToken = require('../utils/generateToken');

/**
 * @file userController.js
 * @description Logic for user-related API endpoints.
 */

/**
 * @desc    Register a new user
 * @route   POST /api/users
 * @access  Public
 */
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Auth user & get token
 * @route   POST /api/users/login
 * @access  Public
 */
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        favorites: user.favorites,
        watchlist: user.watchlist,
        recentlyViewed: user.recentlyViewed,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add movie to favorites
 * @route   POST /api/users/favorites
 * @access  Private
 */
const addFavorite = async (req, res, next) => {
  try {
    const { id, title, poster_path } = req.body;
    const user = await User.findById(req.user._id);

    const alreadyFavorited = user.favorites.find((m) => m.id === id);
    if (alreadyFavorited) {
      res.status(400);
      throw new Error('Movie already in favorites');
    }

    user.favorites.push({ id, title, poster_path });
    await user.save();
    res.status(201).json(user.favorites);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Remove movie from favorites
 * @route   DELETE /api/users/favorites/:id
 * @access  Private
 */
const removeFavorite = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    user.favorites = user.favorites.filter((m) => m.id !== Number(req.params.id));
    await user.save();
    res.json(user.favorites);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add movie to watchlist
 * @route   POST /api/users/watchlist
 * @access  Private
 */
const addToWatchlist = async (req, res, next) => {
  try {
    const { id, title, poster_path, notes, priority } = req.body;
    const user = await User.findById(req.user._id);

    const alreadyInWatchlist = user.watchlist.find((m) => m.id === id);
    if (alreadyInWatchlist) {
      res.status(400);
      throw new Error('Movie already in watchlist');
    }

    user.watchlist.push({ id, title, poster_path, notes, priority });
    await user.save();
    res.status(201).json(user.watchlist);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Remove movie from watchlist
 * @route   DELETE /api/users/watchlist/:id
 * @access  Private
 */
const removeFromWatchlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    user.watchlist = user.watchlist.filter((m) => m.id !== Number(req.params.id));
    await user.save();
    res.json(user.watchlist);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update watchlist item (mark as watched, change notes/priority)
 * @route   PUT /api/users/watchlist/:id
 * @access  Private
 */
const updateWatchlistItem = async (req, res, next) => {
  try {
    const { watched, notes, priority } = req.body;
    const user = await User.findById(req.user._id);
    const item = user.watchlist.find((m) => m.id === Number(req.params.id));

    if (item) {
      item.watched = watched !== undefined ? watched : item.watched;
      item.notes = notes || item.notes;
      item.priority = priority || item.priority;
      await user.save();
      res.json(user.watchlist);
    } else {
      res.status(404);
      throw new Error('Movie not found in watchlist');
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  addFavorite,
  removeFavorite,
  addToWatchlist,
  removeFromWatchlist,
  updateWatchlistItem,
};

/**
 * How to customize:
 * - Add logic for updating profile (change password, name).
 * - Implement "Forgot Password" functionality.
 */
