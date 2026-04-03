import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Package, 
  ChefHat, 
  Bike, 
  CheckCircle2, 
  Clock, 
  Phone, 
  MapPin, 
  ArrowLeft,
  Navigation
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/Button';

const STATUS_STEPS = [
  { id: 'pending', label: 'Sipariş Alındı', icon: Package, description: 'Mutfak siparişinizi onayladı.' },
  { id: 'preparing', label: 'Hazırlanıyor', icon: ChefHat, description: 'Yemeğiniz sevgiyle hazırlanıyor.' },
  { id: 'on_way', label: 'Yolda', icon: Bike, description: 'Kuryemiz yola çıktı, size geliyor.' },
  { id: 'arrived', label: 'Kapıda', icon: Navigation, description: 'Kuryemiz adresinize ulaştı.' },
  { id: 'delivered', label: 'Teslim Edildi', icon: CheckCircle2, description: 'Afiyet olsun!' },
];

export const OrderTrackingPage = () => {
  const { id } = useParams();
  const { orders } = useAuth();
  const [timeLeft, setTimeLeft] = useState(25);
  
  const order = orders.find(o => o.id === id);

  useEffect(() => {
    if (order?.status === 'on_way' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => Math.max(0, prev - 1));
      }, 60000); // Update every minute
      return () => clearInterval(timer);
    }
  }, [order?.status, timeLeft]);

  if (!order) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-4 text-center">
        <Package className="mb-4 h-16 w-16 text-gray-300" />
        <h2 className="text-2xl font-bold text-gray-900">Sipariş Bulunamadı</h2>
        <p className="mt-2 text-gray-600">Aradığınız sipariş sistemde kayıtlı değil.</p>
        <Link to="/" className="mt-6">
          <Button>Ana Sayfaya Dön</Button>
        </Link>
      </div>
    );
  }

  const currentStepIndex = STATUS_STEPS.findIndex(s => s.id === order.status);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-24">
      <div className="mx-auto max-w-3xl px-4">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-orange-600">
          <ArrowLeft className="h-4 w-4" />
          Geri Dön
        </Link>

        <div className="overflow-hidden rounded-[32px] bg-white shadow-xl ring-1 ring-gray-100">
          {/* Header */}
          <div className="bg-orange-600 p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">Sipariş No: #{order.id.slice(-6).toUpperCase()}</p>
                <h1 className="mt-1 text-3xl font-black">Sipariş Takibi</h1>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                <Clock className="h-8 w-8" />
              </div>
            </div>
            
            {order.status === 'on_way' && (
              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-3xl font-black">{timeLeft}</div>
                <div className="text-sm font-bold leading-tight">
                  Dakika İçinde<br />Kapınızda
                </div>
              </div>
            )}
          </div>

          {/* Tracking Steps */}
          <div className="p-8">
            <div className="relative space-y-8">
              {/* Vertical Line */}
              <div className="absolute left-[23px] top-2 h-[calc(100%-40px)] w-0.5 bg-gray-100" />
              
              {STATUS_STEPS.map((step, index) => {
                const isCompleted = index < currentStepIndex;
                const isCurrent = index === currentStepIndex;
                const Icon = step.icon;

                return (
                  <div key={step.id} className="relative flex items-start gap-6">
                    <div className={`
                      relative z-10 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-500
                      ${isCompleted ? 'bg-green-500 text-white shadow-lg shadow-green-100' : 
                        isCurrent ? 'bg-orange-600 text-white shadow-lg shadow-orange-200 scale-110' : 
                        'bg-gray-100 text-gray-400'}
                    `}>
                      {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                    </div>
                    
                    <div className="flex-1 pt-1">
                      <h3 className={`text-lg font-black ${isCurrent ? 'text-orange-600' : isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                        {step.label}
                      </h3>
                      <p className={`text-sm ${isCurrent ? 'text-gray-600' : 'text-gray-400'}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Courier Info */}
          {order.status === 'on_way' && (
            <div className="border-t border-gray-100 bg-gray-50 p-8">
              <h4 className="mb-4 text-sm font-black uppercase tracking-wider text-gray-400">Kurye Bilgileri</h4>
              <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                    <Bike className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Ahmet Yılmaz</p>
                    <p className="text-xs text-gray-500">EvLezzeti Kuryesi</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors">
                    <Phone className="h-5 w-5" />
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors">
                    <MapPin className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Order Summary */}
          <div className="border-t border-gray-100 p-8">
            <h4 className="mb-4 text-sm font-black uppercase tracking-wider text-gray-400">Sipariş Özeti</h4>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.quantity}x {item.name}</span>
                  <span className="font-bold text-gray-900">{item.price * item.quantity} TL</span>
                </div>
              ))}
              <div className="mt-4 flex justify-between border-t border-gray-100 pt-4 text-lg font-black">
                <span>Toplam</span>
                <span className="text-orange-600">{order.totalAmount} TL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
