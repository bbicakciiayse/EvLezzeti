import React from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, Package, DollarSign, Star, Settings, Plus, TrendingUp, Users, Bike, CheckCircle2, Clock, ChevronRight } from 'lucide-react';
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
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center">
        <div className="mb-6 rounded-full bg-orange-100 p-8 text-orange-600">
          <LayoutDashboard className="h-16 w-16" />
        </div>
        <h1 className="text-3xl font-black text-gray-900">Giriş Yapmalısınız</h1>
        <p className="mt-2 text-gray-600">Satıcı panelini görüntülemek için lütfen giriş yapın veya satıcı kaydı oluşturun.</p>
        <Button className="mt-8" onClick={() => navigate('/seller/onboarding')}>Satıcı Ol</Button>
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
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Dashboard Header */}
      <div className="bg-white border-b border-gray-100 pt-8 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-black text-gray-900">Satıcı Paneli</h1>
              <p className="text-gray-600">Hoş geldin {user.name}! Bugün harika bir gün.</p>
            </div>
            <Button className="gap-2" onClick={() => navigate('/seller/add-product')}>
              <Plus className="h-5 w-5" />
              Yeni Ürün Ekle
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Toplam Kazanç', value: formatCurrency(12450), icon: <DollarSign />, color: 'bg-green-50 text-green-600' },
            { label: 'Ürün Sayısı', value: myProducts.length.toString(), icon: <Package />, color: 'bg-orange-50 text-orange-600' },
            { label: 'Müşteri Puanı', value: user.rating?.toString() || '5.0', icon: <Star />, color: 'bg-amber-50 text-amber-600' },
            { label: 'Aktif Sipariş', value: activeOrders.length.toString(), icon: <Clock />, color: 'bg-blue-50 text-blue-600' },
          ].map((stat, i) => (
            <div key={i} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <div className="mb-4 flex items-center justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  +12%
                </div>
              </div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-black text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Active Orders */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h2 className="mb-6 text-xl font-bold text-gray-900">Aktif Siparişler</h2>
              <div className="space-y-4">
                {activeOrders.length > 0 ? (
                  activeOrders.map((order) => (
                    <div key={order.id} className="rounded-2xl bg-gray-50 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">#{order.id.slice(-6).toUpperCase()}</p>
                          <p className="font-bold text-gray-900">{order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-orange-600">{formatCurrency(order.totalAmount)}</p>
                          <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 border-t border-gray-200 pt-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`h-2 w-2 rounded-full ${order.status === 'pending' ? 'bg-blue-500' : 'bg-orange-500 animate-pulse'}`} />
                            <span className="text-sm font-bold text-gray-700">
                              {order.status === 'pending' && 'Sipariş Onay Bekliyor'}
                              {order.status === 'preparing' && 'Yemek Hazırlanıyor'}
                              {order.status === 'on_way' && 'Kurye Yolda'}
                              {order.status === 'arrived' && 'Kurye Kapıda'}
                            </span>
                          </div>
                          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-orange-600 transition-all duration-500" 
                              style={{ width: `${(statusFlow.indexOf(order.status) + 1) * 25}%` }}
                            />
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="gap-2"
                          onClick={() => handleStatusUpdate(order.id, order.status)}
                        >
                          {order.status === 'pending' && 'Hazırlamaya Başla'}
                          {order.status === 'preparing' && 'Kuryeye Ver'}
                          {order.status === 'on_way' && 'Teslim Edildi İşaretle'}
                          {order.status === 'arrived' && 'Tamamla'}
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center text-gray-500">
                    Aktif siparişiniz bulunmuyor.
                  </div>
                )}
              </div>
            </div>

            {/* My Products */}
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Ürünlerim</h2>
                <Button variant="ghost" size="sm" onClick={() => navigate('/seller/add-product')}>Tümünü Gör</Button>
              </div>
              <div className="space-y-4">
                {myProducts.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 overflow-hidden rounded-xl bg-gray-200">
                        <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.category} • {formatCurrency(item.price)}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Düzenle</Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions / Tips */}
          <div className="space-y-6">
            <div className="rounded-3xl bg-orange-600 p-6 text-white shadow-lg shadow-orange-200">
              <h3 className="mb-2 text-lg font-bold">Kurye Çağır</h3>
              <p className="mb-6 text-sm text-orange-100">
                Sipariş hazır olduğunda sistem otomatik kurye atar. Acil durumlar için butonu kullanabilirsin.
              </p>
              <Button size="sm" className="bg-white text-orange-600 hover:bg-orange-50 gap-2">
                <Bike className="h-4 w-4" />
                Kurye Çağır
              </Button>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h3 className="mb-4 text-lg font-bold text-gray-900">Hızlı Menü</h3>
              <div className="space-y-2">
                {[
                  { label: 'Siparişlerim', icon: <Package className="h-4 w-4" /> },
                  { label: 'Kazanç Detayları', icon: <DollarSign className="h-4 w-4" /> },
                  { label: 'Yorumlar', icon: <Star className="h-4 w-4" /> },
                  { label: 'Ayarlar', icon: <Settings className="h-4 w-4" /> },
                ].map((item, i) => (
                  <button key={i} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50">
                    {item.icon}
                    {item.label}
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
