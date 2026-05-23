# CineMatch - Movie Recommendation Web Application

CineMatch is a production-quality movie discovery and recommendation platform inspired by premium streaming services like Netflix. It features a modern, responsive UI built with React and Tailwind CSS, powered by a robust Node.js/Express backend and MongoDB.

## 🚀 Features

- **User Authentication**: Secure signup and login using JWT and bcrypt.
- **User Profile**: Update your name and password from your personalized dashboard.
- **Movie Discovery**: Browse popular, trending, top-rated, and upcoming movies fetched from the TMDb API.
- **Smart Search**: Debounced search functionality to find movies quickly.
- **Detailed Movie Pages**: View posters, trailers, cast information, and similar recommendations.
- **Personalized Lists**: Manage your own "Favorites" and "Watchlist".
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.
- **Premium UI/UX**: Dark mode by default, smooth animations, and Netflix-inspired aesthetics.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, React Router, Context API, Axios, Lucide React, Framer Motion, React Hot Toast.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose).
- **External API**: The Movie Database (TMDb) API.

## 📁 Project Structure

```text
/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Full-page components (Home, MovieDetails, etc.)
│   │   ├── context/        # State management (Auth, Movie)
│   │   ├── hooks/          # Custom React hooks (useDebounce)
│   │   ├── services/       # API services (axios instance)
│   │   └── utils/          # Helper functions
│   └── ...
└── server/                 # Backend Node.js/Express application
    ├── config/             # Database connection
    ├── controllers/        # Request handling logic
    ├── middleware/         # Auth and error handling
    ├── models/             # Mongoose schemas (User)
    ├── routes/             # API endpoints
    ├── utils/              # Helper functions (JWT, TMDb)
    └── server.js           # Entry point
```

## ⚙️ Setup Instructions

### 1. Prerequisites
- Node.js installed on your machine.
- A MongoDB database (local or Atlas).
- A TMDb API Key (get one at [themoviedb.org](https://www.themoviedb.org/documentation/api)).

### 2. Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and fill in your secrets:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   TMDB_API_KEY=your_tmdb_key
   NODE_ENV=development
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000
   ```
4. Start the frontend:
   ```bash
   npm run dev
   ```

## 🎓 Beginner Learning Guide

Every major file in this project contains detailed comments explaining:
- **What it does**: Its role in the architecture.
- **Key Concepts**: The underlying principles (e.g., Middleware, Context, Interceptors).
- **Code Sections**: Why specific logic was implemented.
- **Customization**: How you can extend the feature yourself.

## 🔮 Future Improvements

- **Recommendation Engine**: Implement a more advanced "Because you watched..." algorithm based on user genre preferences.
- **Reviews & Ratings**: Allow users to leave comments and star ratings on movies.
- **Trailer Modal**: Use a modal to play YouTube trailers directly on the site.
- **Infinite Scrolling**: Implement infinite scroll on the Search and Browse pages.
- **Social Sharing**: Add buttons to share movie links on social media.
