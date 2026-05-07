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
  Navigation,
  Heart,
  ShieldCheck,
  Lock,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/Button';

const STATUS_STEPS = [
  { id: 'pending', label: 'Order Recieved', icon: Package, description: 'Chef Meryem has confirmed your table.' },
  { id: 'preparing', label: 'In the Kitchen', icon: ChefHat, description: 'Hand-crafted with love, just as planned.' },
  { id: 'on_way', label: 'In Transit', icon: Bike, description: 'Our community courier is on the way.' },
  { id: 'arrived', label: 'Arrived', icon: Navigation, description: 'The warmth is at your doorstep.' },
  { id: 'delivered', label: 'Delivered', icon: CheckCircle2, description: 'Enjoy your artisanal culinary experience!' },
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
      }, 60000);
      return () => clearInterval(timer);
    }
  }, [order?.status, timeLeft]);

  if (!order) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-4 text-center bg-cream">
        <Package className="mb-6 h-20 w-20 text-gray-200" />
        <h2 className="text-3xl font-serif text-text-dark">Sipariş Bulunamadı</h2>
        <p className="mt-4 text-gray-400 font-light max-w-xs">Aradığınız sipariş sistemde kayıtlı değil.</p>
        <Link to="/" className="mt-10">
          <Button className="bg-burgundy text-cream px-10 rounded-2xl h-14">Return Home</Button>
        </Link>
      </div>
    );
  }

  const currentStepIndex = STATUS_STEPS.findIndex(s => s.id === order.status);

  return (
    <div className="min-h-screen bg-cream pb-32 pt-24">
      <div className="mx-auto max-w-4xl px-4">
        <Link to="/" className="group mb-10 inline-flex items-center gap-3 text-sm font-bold text-gray-400 hover:text-burgundy transition-all">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 group-hover:ring-burgundy/20">
            <ArrowLeft className="h-5 w-5" />
          </div>
          Return to Table
        </Link>

        <div className="overflow-hidden rounded-[60px] bg-white shadow-2xl ring-1 ring-gray-100">
          {/* Header */}
          <div className="bg-burgundy p-12 text-cream relative">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">Reservation #{order.id.slice(-6).toUpperCase()}</p>
                <h1 className="mt-2 text-4xl font-serif lg:text-5xl tracking-tight">Kitchen Tracking</h1>
              </div>
              <div className="flex h-20 w-20 items-center justify-center rounded-[32px] bg-white/10 backdrop-blur-md border border-white/10 ring-8 ring-white/5 shadow-2xl">
                <Clock className="h-10 w-10 text-terracotta" />
              </div>
            </div>
            
            {(order.status === 'on_way' || order.status === 'preparing') && (
              <div className="mt-10 flex items-center gap-6 rounded-[32px] bg-white/10 p-6 backdrop-blur-sm border border-white/10">
                <div className="text-5xl font-serif text-terracotta">{timeLeft}</div>
                <div className="text-sm font-bold leading-tight opacity-70 uppercase tracking-widest">
                  Minutes Until<br />Arrival
                </div>
                <div className="ml-auto flex items-center gap-2 rounded-full bg-cream/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-cream ring-1 ring-white/20">
                  <ShieldCheck className="h-4 w-4 text-terracotta" />
                  Escrow Active
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Tracking Steps */}
            <div className="lg:col-span-3 p-12 border-r border-gray-100">
              <h4 className="mb-10 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">Live Journey</h4>
              <div className="relative space-y-12">
                <div className="absolute left-[27px] top-2 h-[calc(100%-40px)] w-0.5 bg-gray-50" />
                
                {STATUS_STEPS.map((step, index) => {
                  const isCompleted = index < currentStepIndex;
                  const isCurrent = index === currentStepIndex;
                  const Icon = step.icon;

                  return (
                    <div key={step.id} className="relative flex items-start gap-8 group">
                      <div className={`
                        relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-700
                        ${isCompleted ? 'bg-green-50 text-green-600 shadow-sm border border-green-100' : 
                          isCurrent ? 'bg-burgundy text-cream shadow-2xl shadow-burgundy/20 scale-110 border border-burgundy' : 
                          'bg-gray-50 text-gray-300 border border-gray-100'}
                      `}>
                        {isCompleted ? <CheckCircle2 className="h-7 w-7" /> : <Icon className={`h-7 w-7 ${isCurrent ? 'text-terracotta' : ''}`} />}
                      </div>
                      
                      <div className="flex-1 pt-1">
                        <h3 className={`text-xl font-serif tracking-tight ${isCurrent ? 'text-text-dark' : isCompleted ? 'text-gray-400' : 'text-gray-300'}`}>
                          {step.label}
                        </h3>
                        <p className={`text-sm mt-1 font-light ${isCurrent ? 'text-gray-500' : 'text-gray-300'}`}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Side Column: Courier & Summary */}
            <div className="lg:col-span-2 flex flex-col">
              {/* Courier Info */}
              <div className="p-12 bg-gray-50/50 flex-1">
                <h4 className="mb-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">Your Courier</h4>
                <div className="rounded-[40px] bg-white p-8 shadow-sm ring-1 ring-gray-100">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-6">
                      <img src="https://i.pravatar.cc/150?u=courier" className="h-24 w-24 rounded-[32px] object-cover shadow-xl" alt="Courier" />
                      <div className="absolute -bottom-2 -right-2 h-10 w-10 flex items-center justify-center rounded-2xl bg-burgundy text-cream shadow-lg border-4 border-white">
                        <Bike className="h-5 w-5" />
                      </div>
                    </div>
                    <h5 className="text-xl font-serif text-text-dark">Ahmet Yilmaz</h5>
                    <p className="text-xs font-bold text-terracotta uppercase tracking-widest mt-1">Community Courier</p>
                    
                    <p className="mt-6 text-sm text-gray-500 font-light italic leading-relaxed">
                      "sofra'nın sıcaklığını size taşımaktan mutluluk duyuyorum!"
                    </p>

                    <div className="mt-8 flex gap-3 w-full">
                      <button className="flex-1 flex h-14 items-center justify-center rounded-2xl bg-burgundy/5 text-burgundy hover:bg-burgundy/10 transition-all font-bold text-sm gap-2">
                        <Phone className="h-4 w-4" /> Call
                      </button>
                      <button className="flex-1 flex h-14 items-center justify-center rounded-2xl bg-burgundy/5 text-burgundy hover:bg-burgundy/10 transition-all font-bold text-sm gap-2">
                        <MapPin className="h-4 w-4" /> Track
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="p-12 border-t border-gray-100">
                <h4 className="mb-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">Meal Summary</h4>
                <div className="space-y-6">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-center">
                      <div className="h-16 w-16 shrink-0 rounded-2xl overflow-hidden bg-cream">
                        <img src={item.image} className="h-full w-full object-cover" alt="Food" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-text-dark">{item.quantity}x {item.name}</p>
                        <p className="text-xs text-gray-400">{item.price} TL per unit</p>
                      </div>
                    </div>
                  ))}
                  <div className="mt-8 pt-8 border-t border-gray-100 flex justify-between items-end">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Total Charged</span>
                    <span className="text-3xl font-serif text-burgundy">{order.totalAmount} TL</span>
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-[9px] font-bold text-gray-300 uppercase tracking-widest leading-loose">
                    <Lock className="h-3 w-3" />
                    Encrypted with sofra Security
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="mt-12 flex flex-col md:flex-row gap-4">
          <Button variant="outline" className="flex-1 rounded-[28px] h-16 border-burgundy text-burgundy hover:bg-burgundy hover:text-cream text-lg font-bold gap-3">
            <Heart className="h-5 w-5" /> Favorite Chef
          </Button>
          <Button className="flex-1 rounded-[28px] h-16 bg-burgundy text-cream hover:bg-burgundy/90 text-lg font-bold gap-3 border-none">
            <MessageSquare className="h-5 w-5" /> Chat with Chef
          </Button>
        </div>
      </div>
    </div>
  );
};
