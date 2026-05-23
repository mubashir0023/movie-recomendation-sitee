/**
 * @file errorMiddleware.js
 * @description This file contains middleware functions to handle errors in our Express application.
 * 
 * Concept: Middleware are functions that have access to the request (req), response (res), 
 * and the next middleware function in the application’s request-response cycle.
 */

/**
 * Custom 404 handler for routes that don't exist
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Global error handler to catch any errors thrown in the app
 */
const errorHandler = (err, req, res, next) => {
  // If status code is 200, set it to 500 (Internal Server Error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    message: err.message,
    // Only show stack trace in development mode for security
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };

/**
 * How to customize:
 * - You can add logging (like Winston or Morgan) to log these errors to a file or external service.
 * - You can create specific error types for validation errors or database errors.
 */
