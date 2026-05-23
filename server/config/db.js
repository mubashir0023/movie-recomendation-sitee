const mongoose = require('mongoose');

/**
 * @file db.js
 * @description This file handles the connection to our MongoDB database using Mongoose.
 * 
 * Concept: Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js. 
 * It manages relationships between data, provides schema validation, and is used to 
 * translate between objects in code and the representation of those objects in MongoDB.
 */

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;

/**
 * How to customize:
 * - If you use MongoDB Atlas (Cloud), change the MONGO_URI in your .env file to your Atlas connection string.
 * - You can add more connection options inside mongoose.connect() if needed for specific production environments.
 */
