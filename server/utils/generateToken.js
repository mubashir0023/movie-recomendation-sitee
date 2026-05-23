const jwt = require('jsonwebtoken');

/**
 * @file generateToken.js
 * @description Utility function to generate a JSON Web Token (JWT).
 * 
 * Concept: JWT is an open standard (RFC 7519) that defines a compact and 
 * self-contained way for securely transmitting information between parties 
 * as a JSON object. We use it here to authenticate users.
 */

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expires in 30 days
  });
};

module.exports = generateToken;

/**
 * How to customize:
 * - Change 'expiresIn' to a shorter duration for better security (e.g., '1h').
 * - Add more payload data if needed, but keep it minimal to save space.
 */
