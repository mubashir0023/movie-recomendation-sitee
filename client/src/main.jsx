import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { MovieProvider } from './context/MovieContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <MovieProvider>
        <App />
        <Toaster position="top-center" reverseOrder={false} />
      </MovieProvider>
    </AuthProvider>
  </StrictMode>,
)
