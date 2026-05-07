import React from 'react';
import { motion } from 'motion/react';
import { Package, ArrowRight, Clock, MapPin, ShoppingBag, MessageSquare, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { formatCurrency } from '../lib/utils';

export const OrdersPage = () => {
  const { orders } = useAuth();
  const navigate = useNavigate();

  if (orders.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center p-8 text-center bg-cream">
        <div className="mb-8 rounded-[48px] bg-white p-12 shadow-inner ring-1 ring-gray-100">
          <ShoppingBag className="h-20 w-20 text-burgundy/20" />
        </div>
        <h2 className="text-4xl font-serif text-text-dark">Your Table is Empty</h2>
        <p className="mt-4 text-xl text-gray-400 font-light max-w-xs mx-auto">
          You haven't reserved any neighborhood delicacies yet. Why not discover something authentic?
        </p>
        <Link to="/explore" className="mt-12">
          <Button size="xl" className="bg-burgundy text-cream px-12 h-16 rounded-[28px] shadow-2xl shadow-burgundy/20 border-none">
            Discover Flavors
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-16 pb-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h1 className="text-6xl font-serif text-text-dark">My Traditions</h1>
          <p className="mt-4 text-xl text-gray-400 font-light">A history of meals shared with your community.</p>
        </div>

        <div className="space-y-10">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="overflow-hidden rounded-[52px] bg-white shadow-sm ring-1 ring-gray-100 group hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-50 p-10">
                <div className="flex items-center gap-6">
                  <div className="h-16 w-16 rounded-[20px] bg-cream flex items-center justify-center text-burgundy">
                    <Package className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 mb-1">Reservation #{order.id.slice(-6).toUpperCase()}</p>
                    <p className="text-sm text-gray-400 font-medium">{new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>
                <div className="mt-6 sm:mt-0">
                  <span className={`inline-flex items-center rounded-2xl px-5 py-2 text-[10px] font-bold uppercase tracking-widest ring-1
                    ${order.status === 'delivered' ? 'bg-green-50 text-green-700 ring-green-100' : 
                      order.status === 'pending' ? 'bg-burgundy/5 text-burgundy ring-burgundy/10' : 
                      'bg-terracotta/5 text-terracotta ring-terracotta/10'}
                  `}>
                    {order.status === 'pending' && 'Awaiting Confirmation'}
                    {order.status === 'preparing' && 'In the Kitchen'}
                    {order.status === 'on_way' && 'In Transit'}
                    {order.status === 'arrived' && 'At the Door'}
                    {order.status === 'delivered' && 'Enjoyed'}
                  </span>
                </div>
              </div>

              <div className="p-10">
                <div className="flex flex-wrap gap-6">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="h-20 w-20 overflow-hidden rounded-[24px] bg-cream shadow-inner ring-4 ring-white">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <p className="text-xl font-serif text-text-dark">{item.name}</p>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest leading-loose">{item.quantity} Servings</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-8 border-t border-gray-50 pt-10">
                  <div className="text-center sm:text-left">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 mb-1">Total Appreciation</p>
                    <span className="text-4xl font-serif text-burgundy">{formatCurrency(order.totalAmount)}</span>
                  </div>
                  
                  <div className="flex gap-4 w-full sm:w-auto">
                    {order.status === 'delivered' ? (
                      <Button variant="outline" className="flex-1 sm:flex-none h-14 rounded-2xl border-burgundy/10 text-burgundy px-8 gap-3 font-bold text-xs uppercase tracking-widest hover:border-burgundy">
                        <Star className="h-4 w-4" /> Share the Story
                      </Button>
                    ) : (
                      <Link to={`/order-tracking/${order.id}`} className="flex-1 sm:flex-none">
                        <Button variant="outline" className="w-full h-14 rounded-2xl border-burgundy/10 text-burgundy px-8 gap-3 font-bold text-xs uppercase tracking-widest hover:border-burgundy">
                           Live Tracking <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                    <Button variant="outline" className="h-14 w-14 rounded-2xl border-gray-100 text-gray-400 p-0 hover:border-burgundy hover:text-burgundy">
                      <MessageSquare className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
