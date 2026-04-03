import { Search, MapPin, ShoppingBag, User, Menu, Heart, SlidersHorizontal, LayoutDashboard, LogOut } from 'lucide-react';
import { Button } from './Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, location, logout, updateLocation } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600 text-white shadow-lg shadow-orange-200">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <span className="text-xl font-black tracking-tight text-gray-900">
              Ev<span className="text-orange-600">Lezzeti</span>
            </span>
          </Link>

          <div className="hidden items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 md:flex group relative">
            <MapPin className="h-4 w-4 text-orange-600" />
            <button 
              onClick={() => {
                const newLocation = prompt('Yeni konumunuzu girin:', location);
                if (newLocation) updateLocation(newLocation);
              }}
              className="hover:text-orange-600 transition-colors"
            >
              {location}
            </button>
            <div className="absolute left-0 top-full mt-2 hidden group-hover:block bg-white p-2 rounded-xl shadow-xl ring-1 ring-gray-100 text-[10px] whitespace-nowrap z-50">
              Konumu değiştirmek için tıkla
            </div>
          </div>
        </div>

        <div className="hidden max-w-md flex-1 px-8 md:block">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Yemek veya satıcı ara..."
              className="w-full rounded-full border-none bg-gray-100 py-2 pr-4 pl-10 text-sm focus:ring-2 focus:ring-orange-500"
            />
            <button 
              onClick={() => navigate('/explore?filter=true')}
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-orange-600"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button className="rounded-full p-2 text-gray-600 hover:bg-gray-100">
            <Heart className="h-6 w-6" />
          </button>
          <Link to="/cart">
            <button className="relative rounded-full p-2 text-gray-600 hover:bg-gray-100">
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-600 text-[10px] font-bold text-white">
                2
              </span>
            </button>
          </Link>
          <div className="h-8 w-px bg-gray-200" />
          
          {user ? (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="hidden sm:flex" onClick={() => navigate('/orders')}>
                Siparişlerim
              </Button>
              {user.role === 'seller' && (
                <Button variant="outline" size="sm" className="hidden sm:flex gap-2" onClick={() => navigate('/seller/dashboard')}>
                  <LayoutDashboard className="h-4 w-4" />
                  Panel
                </Button>
              )}
              <div className="h-8 w-8 overflow-hidden rounded-full ring-2 ring-orange-100">
                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
              </div>
              <button onClick={logout} className="rounded-full p-2 text-gray-400 hover:bg-red-50 hover:text-red-500">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <>
              <Button variant="ghost" size="sm" className="hidden sm:flex" onClick={() => navigate('/seller/onboarding')}>
                Satıcı Ol
              </Button>
              <Button size="sm" className="hidden sm:flex" onClick={() => navigate('/login')}>
                Giriş Yap
              </Button>
            </>
          )}
          
          <button className="rounded-full p-2 text-gray-600 hover:bg-gray-100 sm:hidden">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};
