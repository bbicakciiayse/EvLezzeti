import React from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, Package, DollarSign, Star, Settings, Plus, TrendingUp, Users, Bike, CheckCircle2, Clock, ChevronRight, Share2, Eye, MessageSquare } from 'lucide-react';
import { Button } from '../components/Button';
import { formatCurrency } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { OrderStatus } from '../types';

export const SellerDashboard = () => {
  const { user, myProducts, orders, updateOrderStatus } = useAuth();
  const navigate = useNavigate();

  const sellerOrders = orders.filter(o => o.sellerId === user?.id);
  const activeOrders = sellerOrders.filter(o => o.status !== 'delivered');

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-cream p-4 text-center">
        <div className="mb-8 rounded-[40px] bg-white p-12 shadow-inner ring-1 ring-gray-100">
          <LayoutDashboard className="h-20 w-20 text-burgundy/20" />
        </div>
        <h1 className="text-4xl font-serif text-text-dark">Kitchen Portal</h1>
        <p className="mt-4 text-gray-400 font-light max-w-xs">Please sign in to manage your artisanal kitchen.</p>
        <Button className="mt-10 bg-burgundy text-cream px-10 h-14 rounded-2xl" onClick={() => navigate('/seller/onboarding')}>Join as Chef</Button>
      </div>
    );
  }

  const handleStatusUpdate = (orderId: string, currentStatus: OrderStatus) => {
    const statusFlow: OrderStatus[] = ['pending', 'preparing', 'on_way', 'arrived', 'delivered'];
    const currentIndex = statusFlow.indexOf(currentStatus);
    if (currentIndex < statusFlow.length - 1) {
      updateOrderStatus(orderId, statusFlow[currentIndex + 1]);
    }
  };

  return (
    <div className="min-h-screen bg-cream pb-32">
      {/* Dashboard Header */}
      <div className="bg-white border-b border-gray-100 pt-16 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Kitchen is Live</span>
              </div>
              <h1 className="text-5xl font-serif text-text-dark tracking-tight">Chef's Atelier</h1>
              <p className="mt-2 text-xl text-gray-400 font-light">Welcome back, {user.name}. Your neighbors are hungry for your art.</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="rounded-2xl h-14 border-burgundy text-burgundy gap-2">
                <Share2 className="h-5 w-5" />
                Share Profile
              </Button>
              <Button className="bg-burgundy text-cream rounded-2xl h-14 px-8 gap-3 border-none shadow-xl shadow-burgundy/20" onClick={() => navigate('/seller/add-product')}>
                <Plus className="h-6 w-6" />
                New Dish
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Total Appreciation', value: formatCurrency(12450), icon: <DollarSign />, color: 'bg-green-50 text-green-600' },
            { label: 'Active Menus', value: myProducts.length.toString(), icon: <Package />, color: 'bg-burgundy/5 text-burgundy' },
            { label: 'Neighbor Rating', value: user.rating?.toString() || '5.0', icon: <Star />, color: 'bg-terracotta/10 text-terracotta' },
            { label: 'Live Tables', value: activeOrders.length.toString(), icon: <Clock />, color: 'bg-blue-50 text-blue-600' },
          ].map((stat, i) => (
            <div key={i} className="rounded-[40px] bg-white p-8 shadow-sm ring-1 ring-gray-100 group hover:shadow-2xl transition-all">
              <div className="mb-6 flex items-center justify-between">
                <div className={`flex h-16 w-16 items-center justify-center rounded-[24px] shadow-sm ${stat.color} group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  <TrendingUp className="h-3 w-3" />
                  +12%
                </div>
              </div>
              <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
              <p className="text-3xl font-serif text-text-dark">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Active Orders */}
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-[48px] bg-white p-10 shadow-sm ring-1 ring-gray-100">
              <div className="mb-10 flex items-center justify-between">
                <h2 className="text-3xl font-serif text-text-dark">Current Reservations</h2>
                <span className="rounded-full bg-burgundy/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-burgundy ring-1 ring-burgundy/10">
                  {activeOrders.length} Pending
                </span>
              </div>
              <div className="space-y-6">
                {activeOrders.length > 0 ? (
                  activeOrders.map((order) => (
                    <div key={order.id} className="rounded-[32px] bg-cream/30 p-8 border border-gray-100 hover:border-burgundy/20 transition-all group">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 rounded-2xl overflow-hidden shadow-sm">
                            <img src={order.items[0]?.image} className="h-full w-full object-cover" alt="Order" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-1">Reservation #{order.id.slice(-6).toUpperCase()}</p>
                            <p className="text-xl font-serif text-text-dark">{order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-serif text-burgundy">{formatCurrency(order.totalAmount)}</p>
                          <p className="text-xs text-gray-400 font-medium">{new Date(order.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-8 border-t border-gray-100 pt-8">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`h-2 w-2 rounded-full ${order.status === 'pending' ? 'bg-blue-500' : 'bg-terracotta animate-pulse'}`} />
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                              {order.status === 'pending' && 'Awaiting Confirmation'}
                              {order.status === 'preparing' && 'Crafting in Progress'}
                              {order.status === 'on_way' && 'In Community Transit'}
                              {order.status === 'arrived' && 'Arrival Confirmed'}
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-burgundy transition-all duration-1000" 
                              style={{ width: `${(statusFlow.indexOf(order.status) + 1) * 25}%` }}
                            />
                          </div>
                        </div>
                        <Button 
                          size="lg" 
                          className="rounded-2xl h-14 px-8 bg-burgundy text-cream border-none shadow-lg shadow-burgundy/10 gap-2"
                          onClick={() => handleStatusUpdate(order.id, order.status)}
                        >
                          {order.status === 'pending' && 'Start Crafting'}
                          {order.status === 'preparing' && 'Hand to Courier'}
                          {order.status === 'on_way' && 'Mark Delivered'}
                          {order.status === 'arrived' && 'Complete Circle'}
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-20 text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-50 text-gray-200">
                      <Clock className="h-10 w-10" />
                    </div>
                    <p className="text-xl text-gray-300 font-serif italic">Your kitchen is calm right now.</p>
                  </div>
                )}
              </div>
            </div>

            {/* My Portfolio */}
            <div className="rounded-[48px] bg-white p-10 shadow-sm ring-1 ring-gray-100">
              <div className="mb-10 flex items-center justify-between">
                <h2 className="text-3xl font-serif text-text-dark">Menu Portfolio</h2>
                <Button variant="ghost" size="sm" className="text-burgundy hover:bg-burgundy/5 rounded-xl font-bold uppercase tracking-[0.2em] text-[10px]" onClick={() => navigate('/seller/add-product')}>All Dishes</Button>
              </div>
              <div className="space-y-6">
                {myProducts.slice(0, 4).map((item) => (
                  <div key={item.id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="h-20 w-20 overflow-hidden rounded-[24px] bg-cream shadow-inner ring-4 ring-white group-hover:ring-burgundy/10 transition-all">
                        <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <p className="text-lg font-serif text-text-dark group-hover:text-burgundy transition-colors">{item.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                           <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{item.category}</span>
                           <span className="text-xs text-terracotta font-serif">{formatCurrency(item.price)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:text-burgundy"><Settings className="h-4 w-4" /></button>
                      <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:text-burgundy"><Eye className="h-4 w-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions / Community */}
          <div className="space-y-8">
            <div className="rounded-[40px] bg-burgundy p-10 text-cream shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-white/5 blur-2xl group-hover:scale-150 transition-all duration-700" />
               <h3 className="text-2xl font-serif mb-4 relative z-10">Neighbor Logistics</h3>
               <p className="text-cream/70 font-light mb-8 relative z-10">
                 Need an immediate courier for a custom neighborhood delivery? 
               </p>
               <Button size="xl" className="w-full rounded-2xl bg-cream text-burgundy hover:bg-white border-none font-bold gap-3 relative z-10 shadow-xl shadow-burgundy/20">
                 <Bike className="h-5 w-5" />
                 Summon Courier
               </Button>
            </div>

            <div className="rounded-[40px] bg-white p-10 shadow-sm ring-1 ring-gray-100">
              <h3 className="mb-8 text-sm font-bold uppercase tracking-[0.2em] text-gray-300">Avenue Tools</h3>
              <div className="space-y-2">
                {[
                  { label: 'Past Revelations', icon: <Package className="h-5 w-5" /> },
                  { label: 'Earnings Registry', icon: <DollarSign className="h-5 w-5" /> },
                  { label: 'Neighbor Stories', icon: <Star className="h-5 w-5" /> },
                  { label: 'Kitchen Settings', icon: <Settings className="h-5 w-5" /> },
                  { label: 'Chef Messages', icon: <MessageSquare className="h-5 w-5" />, count: 3 },
                ].map((item, i) => (
                  <button key={i} className="flex w-full items-center justify-between rounded-2xl px-6 py-4 text-sm font-bold text-gray-500 hover:bg-burgundy hover:text-cream transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="text-gray-300 group-hover:text-cream transition-colors">
                        {item.icon}
                      </div>
                      {item.label}
                    </div>
                    {item.count && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-terracotta text-[10px] text-cream">
                        {item.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const statusFlow: OrderStatus[] = ['pending', 'preparing', 'on_way', 'arrived', 'delivered'];
