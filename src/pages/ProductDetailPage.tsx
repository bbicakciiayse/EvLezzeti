import { motion } from 'motion/react';
import { Star, Clock, ShieldCheck, MapPin, ChevronRight, MessageSquare, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Button } from '../components/Button';
import { MOCK_FOOD_ITEMS, MOCK_SELLERS } from '../data';
import { formatCurrency } from '../lib/utils';
import { useParams, useNavigate } from 'react-router-dom';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // For demo, just pick the first item if id not found
  const item = MOCK_FOOD_ITEMS.find(i => i.id === id) || MOCK_FOOD_ITEMS[0];
  const seller = MOCK_SELLERS.find(s => s.id === item.sellerId) || MOCK_SELLERS[0];

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Geri Dön
        </button>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left: Image Gallery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-[32px] bg-gray-100 shadow-xl">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-2xl bg-gray-100 ring-2 ring-transparent hover:ring-orange-500 cursor-pointer transition-all">
                  <img src={item.image} alt="Gallery" className="h-full w-full object-cover opacity-60 hover:opacity-100" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Info & Checkout */}
          <div className="space-y-8">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
                  {item.category}
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-green-600">
                  <ShieldCheck className="h-4 w-4" />
                  Onaylı Satıcı
                </span>
              </div>
              <h1 className="mb-2 text-4xl font-black text-gray-900">{item.title}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <span className="text-lg font-bold text-gray-900">{item.rating}</span>
                  <span className="text-gray-500">({item.reviewCount} yorum)</span>
                </div>
                <div className="h-4 w-px bg-gray-200" />
                <div className="flex items-center gap-1 text-gray-500">
                  <Clock className="h-5 w-5" />
                  <span className="font-medium">{item.prepTime} hazırlama süresi</span>
                </div>
              </div>
            </div>

            <p className="text-lg leading-relaxed text-gray-600">
              {item.description}
            </p>

            {/* Seller Card */}
            <div className="rounded-3xl bg-gray-50 p-6 ring-1 ring-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 overflow-hidden rounded-2xl bg-white shadow-sm">
                    <img src={seller.avatar} alt={seller.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{seller.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="h-3 w-3" />
                      <span>{seller.location}</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">Profili Gör</Button>
              </div>
            </div>

            {/* Price & Action */}
            <div className="flex items-center justify-between rounded-3xl bg-white p-6 shadow-2xl shadow-orange-100 ring-1 ring-orange-50">
              <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Toplam Fiyat</p>
                <p className="text-4xl font-black text-orange-600">{formatCurrency(item.price)}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-full bg-gray-100 p-1">
                  <button className="flex h-10 w-10 items-center justify-center rounded-full text-xl font-bold hover:bg-white">-</button>
                  <span className="w-10 text-center font-bold">1</span>
                  <button className="flex h-10 w-10 items-center justify-center rounded-full text-xl font-bold hover:bg-white">+</button>
                </div>
                <Button size="lg" className="px-10 gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Sepete Ekle
                </Button>
              </div>
            </div>

            {/* Extra Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 rounded-2xl bg-blue-50 p-4 text-blue-700">
                <MessageSquare className="h-5 w-5" />
                <span className="text-sm font-bold">Satıcıya Soru Sor</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-green-50 p-4 text-green-700">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-sm font-bold">Gıda Güvenliği Garantisi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-24">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-black text-gray-900">Müşteri Yorumları</h2>
              <p className="text-gray-600">Bu lezzeti tadanların deneyimleri.</p>
            </div>
            <Button variant="outline">Tümünü Gör</Button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[1, 2].map((i) => (
              <div key={i} className="rounded-3xl bg-gray-50 p-8 ring-1 ring-gray-100">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200" />
                    <div>
                      <p className="font-bold text-gray-900">Mehmet Y.</p>
                      <p className="text-xs text-gray-500">2 gün önce</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Gerçekten annemin yaptığı sarmalar gibiydi. Ellerinize sağlık Ayşe Teyze. Paketleme de çok özenliydi, sıcacık geldi."
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
