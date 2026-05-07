import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Mail, Lock, ArrowRight, Chrome, ChevronLeft } from 'lucide-react';
import { Button } from '../components/Button';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { MOCK_SELLERS } from '../data';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<React.ReactNode>('');
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const origin = event.origin;
      if (!origin.endsWith('.run.app') && !origin.includes('localhost')) {
        return;
      }
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        login(event.data.user);
        navigate('/');
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [login, navigate]);

  const handleGoogleLogin = async () => {
    setError('');
    try {
      const response = await fetch('/api/auth/google/url');
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.details || data.error || 'Google connection details not configured.');
      }
      const { url } = await response.json();
      
      const authWindow = window.open(
        url,
        'oauth_popup',
        'width=600,height=700'
      );

      if (!authWindow) {
        alert('Please allow pop-ups to continue with Google.');
      }
    } catch (error: any) {
      console.error('OAuth error:', error);
      setError(
        <div className="space-y-4">
          <p className="font-medium text-red-700">{error.message || 'Error connecting to Google.'}</p>
          <div className="pt-2 border-t border-red-100 italic text-[10px] text-red-500">
             Investor Note: OAuth requires Secrets (Client ID/Secret) to be configured in the panel.
          </div>
          <Button 
            onClick={() => handleDemoLogin('customer')}
            variant="outline"
            className="w-full h-12 rounded-xl border-red-200 text-red-700 hover:bg-red-50"
          >
            Enter via Neighborhood Demo
          </Button>
        </div>
      );
    }
  };

  const handleDemoLogin = async (role: 'customer' | 'seller') => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/auth/mock-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });
      if (response.ok) {
        const data = await response.json();
        login(data.user);
        navigate(role === 'seller' ? '/seller/dashboard' : '/');
      }
    } catch (error) {
      console.error('Demo login failed:', error);
      setError('Neighborly demo entry failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simple mock login logic
    const mockSeller = MOCK_SELLERS.find((s) => s.email === email);

    if (mockSeller) {
      login(mockSeller);
      navigate('/seller/dashboard');
    } else if (email && password) {
      login({
        id: 'c-' + Date.now(),
        name: email.split('@')[0],
        email: email,
        role: 'customer',
        avatar: `https://ui-avatars.com/api/?name=${email}&background=random`,
      });
      navigate('/');
    } else {
      setError('Please provide a valid neighborhood registry email.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-center py-20 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center items-center gap-3 mb-10 group">
          <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-burgundy text-cream shadow-2xl shadow-burgundy/20 group-hover:scale-110 transition-transform">
            <ShoppingBag className="h-7 w-7" />
          </div>
          <span className="text-3xl font-serif tracking-tight text-text-dark">
            sofra<span className="text-terracotta">.</span>
          </span>
        </Link>
        <h2 className="text-center text-4xl font-serif text-text-dark">Welcome to the Table</h2>
        <p className="mt-4 text-center text-gray-400 font-light text-lg">
          Or{' '}
          <Link to="/seller/onboarding" className="font-bold text-burgundy hover:underline">
            become a verified host
          </Link>
        </p>
      </div>

      <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white py-12 px-8 shadow-2xl shadow-burgundy/5 ring-1 ring-gray-100 rounded-[48px] sm:px-12"
        >
          <form className="space-y-8" onSubmit={handleLogin}>
            {error && (
              <div className="rounded-2xl bg-red-50 p-6 text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 mb-2 ml-2">Neighbor Registry (Email)</label>
                <div className="relative">
                  <Mail className="absolute top-1/2 left-6 h-5 w-5 -translate-y-1/2 text-gray-300" />
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Grandma's secret email"
                    className="w-full h-16 rounded-2xl border-none bg-cream pr-6 pl-16 text-lg font-light focus:ring-2 focus:ring-burgundy outline-none transition-all placeholder:text-gray-200 shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 mb-2 ml-2">Passcode</label>
                <div className="relative">
                  <Lock className="absolute top-1/2 left-6 h-5 w-5 -translate-y-1/2 text-gray-300" />
                  <input
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-16 rounded-2xl border-none bg-cream pr-6 pl-16 text-lg font-light focus:ring-2 focus:ring-burgundy outline-none transition-all placeholder:text-gray-200 shadow-inner"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-2">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-5 w-5 rounded-lg border-gray-200 text-burgundy focus:ring-burgundy cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-400 font-medium cursor-pointer">
                  Remember my seat
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-bold text-burgundy hover:underline">
                  Forgotten?
                </a>
              </div>
            </div>

            <Button type="submit" size="xl" className="w-full h-18 rounded-2xl bg-burgundy text-cream shadow-xl shadow-burgundy/10 border-none font-bold text-xs uppercase tracking-widest gap-3" isLoading={isLoading}>
              Take my Seat
              <ArrowRight className="h-5 w-5" />
            </Button>
          </form>

          <div className="mt-12">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100" />
              </div>
              <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-[0.2em]">
                <span className="bg-white px-4 text-gray-300">Community Entry</span>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4">
              <Button 
                variant="outline"
                size="xl"
                onClick={handleGoogleLogin}
                className="w-full h-18 rounded-2xl border-gray-100 bg-white text-gray-500 shadow-sm font-bold text-xs uppercase tracking-widest gap-4 group hover:border-burgundy/20"
              >
                <div className="h-10 w-10 flex items-center justify-center bg-gray-50 rounded-xl group-hover:bg-red-50 transition-colors">
                  <Chrome className="h-5 w-5 text-red-500" />
                </div>
                Continue with Google
              </Button>
              <Button 
                variant="outline"
                size="xl"
                onClick={() => handleDemoLogin('customer')}
                className="w-full h-18 rounded-2xl border-terracotta/10 bg-terracotta/5 text-terracotta font-bold text-xs uppercase tracking-widest hover:bg-terracotta hover:text-white transition-all"
              >
                Neighborhood Demo
              </Button>
            </div>
          </div>
        </motion.div>
        
        <button 
            onClick={() => navigate(-1)}
            className="mt-12 w-full flex items-center justify-center gap-2 text-gray-300 hover:text-burgundy transition-colors uppercase tracking-[0.2em] text-[10px] font-bold"
        >
            <ChevronLeft className="h-4 w-4" /> Return to the World
        </button>
      </div>
    </div>
  );
};
