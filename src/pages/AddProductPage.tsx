import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, Utensils, Clock, DollarSign, Tag, Info, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FoodItem } from '../types';

export const AddProductPage = () => {
  const navigate = useNavigate();
  const { user, addProduct } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Ana Yemekler',
    cuisineType: 'Türk Mutfağı',
    prepTime: '2 saat',
    dietaryPreferences: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newProduct: FoodItem = {
      id: 'f-' + Date.now(),
      sellerId: user.id,
      sellerName: user.name,
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      cuisineType: formData.cuisineType,
      dietaryPreferences: formData.dietaryPreferences,
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop', // Default placeholder
      rating: 5.0,
      reviewCount: 0,
      prepTime: formData.prepTime,
      isAvailable: true,
      location: user.location || 'İstanbul',
    };

    addProduct(newProduct);
    setIsLoading(false);
    navigate('/seller/dashboard');
  };

  const toggleDietary = (pref: string) => {
    setFormData(prev => ({
      ...prev,
      dietaryPreferences: prev.dietaryPreferences.includes(pref)
        ? prev.dietaryPreferences.filter(p => p !== pref)
        : [...prev.dietaryPreferences, pref]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Paneli Geri Dön
        </button>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="rounded-[40px] bg-white p-8 shadow-xl ring-1 ring-gray-100 sm:p-12">
            <div className="mb-10">
              <h1 className="text-3xl font-black text-gray-900">Yeni Lezzet Ekle</h1>
              <p className="text-gray-600">Mutfağının en sevilen yemeğini müşterilerinle paylaş.</p>
            </div>

            <div className="space-y-6">
              {/* Image Upload Placeholder */}
              <div className="group relative aspect-video cursor-pointer overflow-hidden rounded-3xl bg-gray-100 ring-2 ring-dashed ring-gray-300 transition-all hover:ring-orange-500">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 group-hover:text-orange-600">
                  <Camera className="mb-2 h-10 w-10" />
                  <span className="text-sm font-bold">Yemek Fotoğrafı Yükle</span>
                  <span className="mt-1 text-xs">En az 800x600px önerilir</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Yemek Adı</label>
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Örn: Zeytinyağlı Yaprak Sarma"
                    className="w-full rounded-2xl border-gray-200 bg-gray-50 p-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Açıklama</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Yemeğinizin içeriği, malzemeleri ve tadı hakkında bilgi verin."
                    className="w-full rounded-2xl border-gray-200 bg-gray-50 p-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Fiyat (₺)</label>
                  <div className="relative">
                    <DollarSign className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      required
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      placeholder="0.00"
                      className="w-full rounded-2xl border-gray-200 bg-gray-50 p-4 pl-10 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Hazırlama Süresi</label>
                  <div className="relative">
                    <Clock className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <select
                      value={formData.prepTime}
                      onChange={(e) => setFormData({...formData, prepTime: e.target.value})}
                      className="w-full rounded-2xl border-gray-200 bg-gray-50 p-4 pl-10 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none appearance-none"
                    >
                      <option>30 dk</option>
                      <option>1 saat</option>
                      <option>2 saat</option>
                      <option>3 saat</option>
                      <option>Aynı Gün</option>
                      <option>Ertesi Gün</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Kategori</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full rounded-2xl border-gray-200 bg-gray-50 p-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  >
                    <option>Ana Yemekler</option>
                    <option>Zeytinyağlılar</option>
                    <option>Hamur İşleri</option>
                    <option>Tatlılar</option>
                    <option>Çorbalar</option>
                    <option>Diyet & Fit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Mutfak Türü</label>
                  <select
                    value={formData.cuisineType}
                    onChange={(e) => setFormData({...formData, cuisineType: e.target.value})}
                    className="w-full rounded-2xl border-gray-200 bg-gray-50 p-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  >
                    <option>Türk Mutfağı</option>
                    <option>Ege Mutfağı</option>
                    <option>Anadolu Mutfağı</option>
                    <option>Gaziantep Mutfağı</option>
                    <option>Modern Mutfak</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Diyet Tercihleri</label>
                <div className="flex flex-wrap gap-2">
                  {['vejetaryen', 'vegan', 'glutensiz', 'şekersiz'].map((pref) => (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => toggleDietary(pref)}
                      className={`rounded-full px-4 py-2 text-sm font-bold transition-all capitalize ${
                        formData.dietaryPreferences.includes(pref)
                          ? 'bg-orange-600 text-white shadow-lg shadow-orange-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12">
              <Button type="submit" size="lg" className="w-full gap-2" isLoading={isLoading}>
                <CheckCircle2 className="h-5 w-5" />
                Yemeği Yayınla
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
