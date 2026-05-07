import { Search, MapPin, ShoppingBag, User, Menu, Heart, SlidersHorizontal, LayoutDashboard, LogOut, ChevronDown } from 'lucide-react';
import { Button } from './Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, location, logout, updateLocation } = useAuth();

  return (
    <nav className="sticky top-0 z-[100] w-full border-b border-gray-100 bg-cream/80 backdrop-blur-xl">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-3 group transition-transform active:scale-95">
            <div className="flex h-12 w-12 items-center justify-center rounded-[20px] bg-burgundy text-cream shadow-2xl shadow-burgundy/20 group-hover:rotate-12 transition-transform">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <span className="text-3xl font-serif tracking-tight text-text-dark">
              sofra<span className="text-terracotta">.</span>
            </span>
          </Link>

          <div 
            className="hidden items-center gap-3 rounded-[20px] bg-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 md:flex group relative shadow-sm ring-1 ring-gray-100 hover:ring-burgundy/20 transition-all cursor-pointer hover:shadow-xl"
            onClick={() => {
              const newLocation = prompt('Neighbor, enter your preferred table coordinate:', location);
              if (newLocation) updateLocation(newLocation);
            }}
          >
            <MapPin className="h-4 w-4 text-terracotta" />
            <span className="truncate max-w-[150px]">{location}</span>
            <ChevronDown className="h-3 w-3 opacity-30 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        <div className="hidden max-w-lg flex-1 px-12 md:block">
          <div className="relative group">
            <Search className="absolute top-1/2 left-6 h-5 w-5 -translate-y-1/2 text-gray-300 group-focus-within:text-burgundy transition-colors" />
            <input
              type="text"
              placeholder="Finding trüf, kuzu incik, heart..."
              className="w-full h-14 rounded-2xl border-none bg-white py-3 pr-14 pl-16 text-sm font-light shadow-sm ring-1 ring-gray-100 focus:ring-2 focus:ring-burgundy transition-all placeholder:text-gray-200"
            />
            <button 
              onClick={() => navigate('/explore?filter=true')}
              className="absolute top-1/2 right-4 -translate-y-1/2 rounded-xl p-2 text-gray-300 hover:bg-burgundy/5 hover:text-burgundy transition-all"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden lg:flex items-center gap-6 mr-4">
             <Link to="/explore" className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-burgundy transition-colors">Discovery</Link>
             <Link to="/trust" className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-burgundy transition-colors">Security</Link>
          </div>
          
          <button className="rounded-2xl p-3 text-gray-400 hover:bg-white hover:text-terracotta transition-all">
            <Heart className="h-6 w-6" />
          </button>
          
          <Link to="/cart">
            <button className="relative rounded-2xl p-3 text-gray-400 hover:bg-white hover:text-burgundy transition-all">
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-lg bg-terracotta text-[10px] font-bold text-white shadow-lg">
                2
              </span>
            </button>
          </Link>
          
          <div className="h-8 w-px bg-gray-100" />
          
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest leading-none mb-1">Welcome back</span>
                <span className="text-xs font-bold text-text-dark leading-none">{user.name.split(' ')[0]}</span>
              </div>
              
              <div className="group relative">
                <div className="h-12 w-12 overflow-hidden rounded-[18px] ring-2 ring-white shadow-xl cursor-pointer group-hover:ring-burgundy/20 transition-all overflow-hidden" onClick={() => navigate('/orders')}>
                  <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                </div>
                
                <div className="absolute top-full right-0 mt-2 w-56 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-[200]">
                  <div className="rounded-[28px] bg-white p-3 shadow-2xl ring-1 ring-gray-100 border-b-4 border-burgundy/10">
                    <button onClick={() => navigate('/orders')} className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-xs font-bold text-gray-500 hover:bg-burgundy/5 hover:text-burgundy transition-all">
                      <ShoppingBag className="h-4 w-4" /> My Traditions
                    </button>
                    {user.role === 'seller' && (
                      <button onClick={() => navigate('/seller/dashboard')} className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-xs font-bold text-gray-500 hover:bg-burgundy/5 hover:text-burgundy transition-all">
                        <LayoutDashboard className="h-4 w-4" /> Chef Portal
                      </button>
                    )}
                    <div className="my-2 h-px bg-gray-50" />
                    <button onClick={logout} className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-xs font-bold text-red-400 hover:bg-red-50 transition-all">
                      <LogOut className="h-4 w-4" /> Finalize Session
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="hidden sm:flex text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-burgundy" onClick={() => navigate('/seller/onboarding')}>
                Host a Kitchen
              </Button>
              <Button size="lg" className="hidden sm:flex bg-burgundy hover:bg-burgundy/90 text-cream rounded-2xl px-8 h-12 shadow-xl shadow-burgundy/10 border-none font-bold text-[10px] uppercase tracking-widest" onClick={() => navigate('/login')}>
                Enter sofra.
              </Button>
            </div>
          )}
          
          <button className="rounded-2xl p-3 text-gray-400 hover:bg-white sm:hidden transition-all">
            <Menu className="h-7 w-7" />
          </button>
        </div>
      </div>
    </nav>
  );
};
