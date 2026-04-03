import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Trash2, ArrowRight, ShieldCheck, Truck, CreditCard, X, Loader2 } from 'lucide-react';
import { Button } from '../components/Button';
import { MOCK_FOOD_ITEMS } from '../data';
import { formatCurrency } from '../lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Order } from '../types';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from '../components/CheckoutForm';

const stripePromise = loadStripe((import.meta as any).env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51P...placeholder');

export const CartPage = () => {
  const { user, createOrder, updateOrderStatus } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const cartItems = MOCK_FOOD_ITEMS.slice(0, 2);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const deliveryFee = 25;
  const total = subtotal + deliveryFee;

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
        // Simulate mock payment for demo purposes
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

    // SIMULATION: Automatically progress order status for demo
    setTimeout(() => updateOrderStatus(newOrder.id, 'preparing'), 5000);
    setTimeout(() => updateOrderStatus(newOrder.id, 'on_way'), 15000);
    setTimeout(() => updateOrderStatus(newOrder.id, 'arrived'), 30000);
    setTimeout(() => updateOrderStatus(newOrder.id, 'delivered'), 45000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-12 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-black text-gray-900">Sepetim</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                className="flex items-center gap-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-gray-100"
              >
                <div className="h-24 w-24 overflow-hidden rounded-2xl bg-gray-100">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.sellerName}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-orange-600">{formatCurrency(item.price)}</span>
                    <div className="flex items-center rounded-full bg-gray-100 p-1">
                      <button className="h-8 w-8 rounded-full hover:bg-white">-</button>
                      <span className="w-8 text-center text-sm font-bold">1</span>
                      <button className="h-8 w-8 rounded-full hover:bg-white">+</button>
                    </div>
                  </div>
                </div>
                <button className="rounded-full p-2 text-gray-400 hover:bg-red-50 hover:text-red-500">
                  <Trash2 className="h-5 w-5" />
                </button>
              </motion.div>
            ))}

            <Link to="/explore" className="inline-block pt-4 text-sm font-bold text-orange-600 hover:underline">
              + Daha fazla lezzet ekle
            </Link>
          </div>

          {/* Summary */}
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h2 className="mb-6 text-xl font-bold text-gray-900">Sipariş Özeti</h2>
              
              <div className="space-y-4 border-b border-gray-100 pb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Ara Toplam</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Teslimat Ücreti</span>
                  <span>{formatCurrency(deliveryFee)}</span>
                </div>
              </div>

              <div className="mt-6 flex justify-between text-xl font-black text-gray-900">
                <span>Toplam</span>
                <span>{formatCurrency(total)}</span>
              </div>

              <Button 
                size="lg" 
                className="mt-8 w-full gap-2" 
                onClick={handleCheckout}
                isLoading={isProcessing}
              >
                Siparişi Onayla
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="space-y-4 rounded-3xl bg-orange-50 p-6">
              <div className="flex items-center gap-3 text-orange-800">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-sm font-bold">Güvenli Ödeme Altyapısı</span>
              </div>
              <div className="flex items-center gap-3 text-orange-800">
                <Truck className="h-5 w-5" />
                <span className="text-sm font-bold">Sıcak Teslimat Garantisi</span>
              </div>
              <div className="flex items-center gap-3 text-orange-800">
                <CreditCard className="h-5 w-5" />
                <span className="text-sm font-bold">Kapıda Ödeme Seçeneği</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && clientSecret && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl relative"
            >
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="absolute right-6 top-6 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                  <CreditCard className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-black text-gray-900">Güvenli Ödeme</h2>
                <p className="text-gray-500">Siparişinizi tamamlamak için kart bilgilerinizi girin.</p>
              </div>

              <Elements 
                stripe={stripePromise} 
                options={{ 
                  clientSecret,
                  appearance: {
                    theme: 'stripe',
                    variables: {
                      colorPrimary: '#ea580c',
                    }
                  }
                }}
              >
                <CheckoutForm amount={total} onSuccess={handlePaymentSuccess} />
              </Elements>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                <ShieldCheck className="h-4 w-4" />
                Stripe ile 256-bit SSL güvenli ödeme
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
