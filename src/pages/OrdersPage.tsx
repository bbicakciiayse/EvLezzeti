import React from 'react';
import { motion } from 'motion/react';
import { Package, ArrowRight, Clock, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { formatCurrency } from '../lib/utils';

export const OrdersPage = () => {
  const { orders } = useAuth();

  if (orders.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-4 text-center">
        <Package className="mb-4 h-16 w-16 text-gray-300" />
        <h2 className="text-2xl font-bold text-gray-900">Henüz Siparişiniz Yok</h2>
        <p className="mt-2 text-gray-600">Lezzetli ev yemeklerini keşfetmeye ne dersiniz?</p>
        <Link to="/explore" className="mt-6">
          <Button>Yemekleri Keşfet</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-12 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-black text-gray-900">Siparişlerim</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="overflow-hidden rounded-[32px] bg-white shadow-sm ring-1 ring-gray-100"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-50 p-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Sipariş #{order.id.slice(-6).toUpperCase()}</p>
                  <p className="mt-1 text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold
                    ${order.status === 'delivered' ? 'bg-green-100 text-green-700' : 
                      order.status === 'pending' ? 'bg-blue-100 text-blue-700' : 
                      'bg-orange-100 text-orange-700'}
                  `}>
                    {order.status === 'pending' && 'Onay Bekliyor'}
                    {order.status === 'preparing' && 'Hazırlanıyor'}
                    {order.status === 'on_way' && 'Yolda'}
                    {order.status === 'arrived' && 'Kapıda'}
                    {order.status === 'delivered' && 'Teslim Edildi'}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="h-12 w-12 overflow-hidden rounded-xl bg-gray-100">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.quantity} Adet</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-50 pt-6">
                  <div className="text-lg font-black text-gray-900">
                    Toplam: <span className="text-orange-600">{formatCurrency(order.totalAmount)}</span>
                  </div>
                  <Link to={`/order-tracking/${order.id}`}>
                    <Button variant="outline" className="gap-2">
                      Siparişi Takip Et
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
