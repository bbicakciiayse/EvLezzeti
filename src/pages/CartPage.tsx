import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Trash2, ArrowRight, ShieldCheck, Truck, CreditCard, X, Loader2, Calendar, MapPin, Lock } from 'lucide-react';
import { Button } from '../components/Button';
import { MOCK_FOOD_ITEMS } from '../data';
import { formatCurrency } from '../lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Order } from '../types';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from '../components/CheckoutForm';

const stripePromise = loadStripe((import.meta as any).env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

export const CartPage = () => {
  const { user, createOrder, updateOrderStatus } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Mock cart items
  const cartItems = MOCK_FOOD_ITEMS.slice(0, 1);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const deliveryFee = 25;
  const serviceFee = 15;
  const total = subtotal + deliveryFee + serviceFee;

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ödeme başlatılamadı.');
      }

      const data = await response.json();
      
      if (data.mock) {
        setTimeout(() => {
          handlePaymentSuccess();
          setIsProcessing(false);
        }, 1500);
        return;
      }

      setClientSecret(data.clientSecret);
      setShowPaymentModal(true);
    } catch (error: any) {
      console.error('Checkout error:', error);
      alert(error.message || 'Bir hata oluştu.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentSuccess = () => {
    const newOrder: Order = {
      id: 'ord-' + Math.random().toString(36).substr(2, 9),
      customerId: user!.id,
      sellerId: cartItems[0].sellerId,
      items: cartItems.map(item => ({
        foodId: item.id,
        quantity: 1,
        price: item.price,
        name: item.title,
        image: item.image
      })),
      totalAmount: total,
      status: 'pending',
      createdAt: new Date().toISOString(),
      deliveryAddress: user!.location || 'Beşiktaş, İstanbul',
      estimatedDeliveryTime: 35,
      courier: {
        name: 'Ahmet Yılmaz',
        phone: '0555 123 45 67',
        lat: 41.0082,
        lng: 28.9784
      }
    };

    createOrder(newOrder);
    setShowPaymentModal(false);
    navigate(`/order-tracking/${newOrder.id}`);

    setTimeout(() => updateOrderStatus(newOrder.id, 'preparing'), 5000);
    setTimeout(() => updateOrderStatus(newOrder.id, 'on_way'), 15000);
    setTimeout(() => updateOrderStatus(newOrder.id, 'arrived'), 30000);
    setTimeout(() => updateOrderStatus(newOrder.id, 'delivered'), 45000);
  };

  return (
    <div className="min-h-screen bg-cream pt-12 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-12 text-5xl font-serif text-text-dark">Your Reservation</h1>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-[40px] bg-white p-8 shadow-sm ring-1 ring-gray-100">
              <h2 className="text-xl font-serif mb-8 text-gray-400 uppercase tracking-widest text-sm">Selected Dishes</h2>
              <div className="space-y-8">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    className="flex items-center gap-6"
                  >
                    <div className="h-32 w-32 shrink-0 overflow-hidden rounded-[32px] bg-cream shadow-inner">
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-2xl font-serif text-text-dark">{item.title}</h3>
                          <p className="text-sm text-gray-400 font-medium">{item.sellerName}'s Kitchen</p>
                        </div>
                        <button className="rounded-2xl p-3 text-gray-300 hover:bg-red-50 hover:text-red-500 transition-all">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xl font-serif text-burgundy">{formatCurrency(item.price)}</span>
                        <div className="flex items-center rounded-2xl bg-cream p-1 ring-1 ring-gray-100">
                          <button className="h-8 w-8 rounded-xl font-serif hover:bg-white transition-all">-</button>
                          <span className="w-8 text-center text-sm font-bold">1</span>
                          <button className="h-8 w-8 rounded-xl font-serif hover:bg-white transition-all">+</button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Delivery Details */}
            <div className="rounded-[40px] bg-white p-8 shadow-sm ring-1 ring-gray-100">
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-8">Reservation Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-terracotta/10 text-terracotta">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-dark">Date & Time</h4>
                    <p className="text-sm text-gray-500">Today, 19:30 - 20:00</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-burgundy/10 text-burgundy">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-dark">Delivery Address</h4>
                    <p className="text-sm text-gray-500">{user?.location || 'Select Address'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary & Trust */}
          <div className="space-y-8">
            <div className="rounded-[40px] bg-white p-8 shadow-xl ring-1 ring-gray-100 border-b-4 border-burgundy/10">
              <h2 className="mb-8 text-2xl font-serif text-text-dark">Order Summary</h2>
              
              <div className="space-y-4 border-b border-gray-100 pb-8">
                <div className="flex justify-between text-gray-500 font-light">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-light">
                  <span>Chef Delivery Fee</span>
                  <span>{formatCurrency(deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-light">
                  <span>sofra Service Fee</span>
                  <span>{formatCurrency(serviceFee)}</span>
                </div>
              </div>

              <div className="mt-8 flex justify-between items-end">
                <span className="text-sm font-bold uppercase tracking-widest text-gray-400">Total</span>
                <span className="text-5xl font-serif text-burgundy">{formatCurrency(total)}</span>
              </div>

              <Button 
                size="xl" 
                className="mt-10 w-full h-20 rounded-[28px] bg-burgundy hover:bg-burgundy/90 text-cream text-lg shadow-2xl shadow-burgundy/20 gap-3 border-none" 
                onClick={handleCheckout}
                isLoading={isProcessing}
              >
                Confirm Reservation
                <ArrowRight className="h-6 w-6" />
              </Button>
            </div>

            {/* Escrow System Visualization */}
            <div className="rounded-[40px] bg-burgundy p-10 text-cream shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-white/5 blur-2xl group-hover:scale-150 transition-all duration-700" />
              <div className="relative">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-cream text-burgundy shadow-lg">
                    <Lock className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif">Escrow Protection</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-cream/50">Level 1 Security</p>
                  </div>
                </div>
                <p className="text-cream/70 leading-relaxed font-light mb-8">
                  Your payment is safely held by sofra and exclusively released to the cook 
                  <span className="text-cream font-bold"> only after </span> 
                  you confirm the delivery.
                </p>
                <div className="flex items-center gap-3 text-xs font-bold text-terracotta bg-cream/5 p-4 rounded-2xl border border-cream/10">
                  <ShieldCheck className="h-4 w-4" />
                  100% Secure Transaction
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && clientSecret && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-burgundy/40 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="w-full max-w-md rounded-[60px] bg-white p-12 shadow-[0_64px_128px_-16px_rgba(107,27,27,0.3)] relative"
            >
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="absolute right-8 top-8 rounded-2xl p-3 text-gray-300 hover:bg-gray-50 hover:text-gray-600 transition-all"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="mb-10 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[32px] bg-cream text-burgundy shadow-inner">
                  <CreditCard className="h-10 w-10" />
                </div>
                <h2 className="text-3xl font-serif text-text-dark">Safe Checkout</h2>
                <p className="text-gray-400 font-light mt-2">Enter your details to secure this meal.</p>
              </div>

              <Elements 
                stripe={stripePromise} 
                options={{ 
                  clientSecret,
                  appearance: {
                    theme: 'stripe',
                    variables: {
                      colorPrimary: '#6B1B1B',
                      colorBackground: '#FFFAF5',
                      borderRadius: '20px',
                    }
                  }
                }}
              >
                <CheckoutForm amount={total} onSuccess={handlePaymentSuccess} />
              </Elements>

              <div className="mt-10 pt-8 border-t border-gray-100 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">
                <ShieldCheck className="h-5 w-5" />
                PCI-DSS Compliant • 256-bit SSL
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
