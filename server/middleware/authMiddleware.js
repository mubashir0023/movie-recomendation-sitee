const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * @file authMiddleware.js
 * @description Middleware to verify JWT and protect routes.
 * 
 * Concept: This middleware checks the 'Authorization' header for a Bearer token. 
 * If valid, it decodes the token and attaches the user object to the request.
 */

const protect = async (req, res, next) => {
  let token;

  // Check if authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header (format: "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token and attach to req object (exclude password)
      req.user = await User.findById(decoded.id).select('-password');

      return next();
    } catch (error) {
      console.error(error);
      res.status(401);
      return next(new Error('Not authorized, token failed'));
    }
  }

  if (!token) {
    res.status(401);
    return next(new Error('Not authorized, no token'));
  }
};

module.exports = { protect };

/**
 * How to customize:
 * - You can add 'admin' middleware to check for admin roles.
 * - You could implement token blacklisting for logged-out tokens.
 */
