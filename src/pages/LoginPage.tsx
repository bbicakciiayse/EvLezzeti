import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Mail, Lock, ArrowRight, Chrome } from 'lucide-react';
import { Button } from '../components/Button';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { MOCK_SELLERS } from '../data';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
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
        throw new Error(data.details || data.error || 'Google giriş URL\'i alınamadı.');
      }
      const { url } = await response.json();
      
      const authWindow = window.open(
        url,
        'oauth_popup',
        'width=600,height=700'
      );

      if (!authWindow) {
        alert('Lütfen Google ile giriş yapmak için pop-up pencerelere izin verin.');
      }
    } catch (error: any) {
      console.error('OAuth error:', error);
      setError(
        <span>
          {error.message || 'Google ile giriş yapılırken bir hata oluştu.'} 
          <br />
          <button 
            onClick={() => handleDemoLogin('customer')}
            className="mt-2 text-orange-600 underline font-bold"
          >
            Bunun yerine Demo Girişi yapın
          </button>
        </span>
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
      setError('Demo girişi başarısız oldu.');
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
      setError('Lütfen geçerli bir e-posta ve şifre girin.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center items-center gap-2 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-600 text-white shadow-lg shadow-orange-200">
            <ShoppingBag className="h-7 w-7" />
          </div>
          <span className="text-2xl font-black tracking-tight text-gray-900">
            Ev<span className="text-orange-600">Lezzeti</span>
          </span>
        </Link>
        <h2 className="text-center text-3xl font-black text-gray-900">Hesabınıza Giriş Yapın</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Veya{' '}
          <Link to="/seller/onboarding" className="font-bold text-orange-600 hover:text-orange-500">
            hemen satıcı hesabı oluşturun
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white py-8 px-4 shadow-xl ring-1 ring-gray-100 sm:rounded-[32px] sm:px-10"
        >
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">E-posta Adresi</label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="örnek@eposta.com"
                  className="w-full rounded-2xl border-gray-200 bg-gray-50 p-4 pl-12 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <p className="mt-1 text-[10px] text-gray-400 italic">Demo için: ayse@example.com</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Şifre</label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border-gray-200 bg-gray-50 p-4 pl-12 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Beni Hatırla
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-bold text-orange-600 hover:text-orange-500">
                  Şifremi Unuttum
                </a>
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full py-4 gap-2" isLoading={isLoading}>
                Giriş Yap
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Veya şununla devam et</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button 
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-gray-700 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 transition-all"
              >
                <Chrome className="h-5 w-5 text-red-500" />
                Google
              </button>
              <button 
                onClick={() => handleDemoLogin('customer')}
                className="flex items-center justify-center gap-2 rounded-2xl bg-orange-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-orange-200 hover:bg-orange-700 transition-all"
              >
                Demo Girişi
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
