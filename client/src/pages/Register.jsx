import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User as UserIcon, Loader2 } from 'lucide-react';

/**
 * @file Register.jsx
 * @description User registration page.
 */

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await register(name, email, password);
      navigate('/');
    } catch (error) {
      // Error handled by toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bca1-0744f902144f/af6a7044-2ece-432d-905c-d38a8e1b764c/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      
      <div className="relative w-full max-w-md p-8 bg-black/80 rounded-lg shadow-2xl">
        <h1 className="text-3xl font-bold mb-8">Sign Up</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <UserIcon className="absolute left-3 top-3.5 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-[#333] border-none rounded-md py-3.5 pl-12 pr-4 text-white focus:ring-2 focus:ring-primary outline-none transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-500" size={20} />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-[#333] border-none rounded-md py-3.5 pl-12 pr-4 text-white focus:ring-2 focus:ring-primary outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-500" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-[#333] border-none rounded-md py-3.5 pl-12 pr-4 text-white focus:ring-2 focus:ring-primary outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-red-700 text-white font-bold py-3.5 rounded-md transition flex items-center justify-center gap-2"
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : 'Sign Up'}
          </button>
        </form>

        <div className="mt-12 text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-white hover:underline font-medium">
            Sign in now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
