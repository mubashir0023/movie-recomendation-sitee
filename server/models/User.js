const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * @file User.js
 * @description The Mongoose schema for our User model.
 * 
 * Concept: A Schema defines the structure of the document, default values, 
 * validators, etc., whereas a Model provides an interface to the database 
 * for creating, querying, updating, deleting records, etc.
 */

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false, // Don't return password by default
    },
    favorites: [
      {
        id: Number,
        title: String,
        poster_path: String,
      },
    ],
    watchlist: [
      {
        id: Number,
        title: String,
        poster_path: String,
        watched: {
          type: Boolean,
          default: false,
        },
        notes: String,
        priority: {
          type: String,
          enum: ['Low', 'Medium', 'High'],
          default: 'Medium',
        },
      },
    ],
    recentlyViewed: [
      {
        id: Number,
        title: String,
        poster_path: String,
        viewedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

/**
 * Middleware to hash password before saving to database
 */
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Method to check if entered password matches hashed password in database
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

/**
 * How to customize:
 * - Add more fields like 'avatar', 'bio', or 'preferences' (genres).
 * - Implement password reset tokens or email verification fields.
 */
