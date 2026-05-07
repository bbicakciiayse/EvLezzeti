import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, Utensils, Clock, DollarSign, Tag, Info, ArrowLeft, CheckCircle2, ChevronDown, Sparkles } from 'lucide-react';
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
    category: 'Ateş Üstü Lezzetler',
    cuisineType: 'Anadolu Seçkisi',
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
      flavorProfiles: [], // Default empty for now
      occasions: [], // Default empty for now
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
    <div className="min-h-screen bg-cream py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="group mb-12 inline-flex items-center gap-3 text-sm font-bold text-gray-400 hover:text-burgundy transition-all"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 group-hover:ring-burgundy/20">
            <ArrowLeft className="h-5 w-5" />
          </div>
          Return to Portal
        </button>

        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="rounded-[60px] bg-white p-10 shadow-2xl shadow-burgundy/5 ring-1 ring-gray-100 sm:p-20">
            <div className="mb-16 text-center">
              <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-[32px] bg-burgundy/5 text-burgundy shadow-inner">
                <Sparkles className="h-10 w-10" />
              </div>
              <h1 className="text-5xl font-serif text-text-dark">Offer a New Tradition</h1>
              <p className="mt-4 text-xl text-gray-400 font-light">Share your kitchen's most loved dish with the neighborhood.</p>
            </div>

            <div className="space-y-10">
              {/* Image Upload Placeholder */}
              <div className="group relative aspect-video cursor-pointer overflow-hidden rounded-[40px] bg-cream ring-2 ring-dashed ring-gray-200 transition-all hover:ring-burgundy shadow-inner">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 group-hover:text-burgundy transition-colors">
                  <div className="h-20 w-20 rounded-[32px] bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Camera className="h-10 w-10" />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-widest">Share the Visual</span>
                  <span className="mt-2 text-[10px] font-medium opacity-50 uppercase tracking-widest">Minimal 800x600px recommended</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 mb-4 ml-4">Title of the Dish</label>
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="e.g. Vişneli Ege Esintili Yaprak Sarma"
                    className="w-full rounded-[28px] border-none bg-cream h-20 px-10 text-xl font-light focus:ring-2 focus:ring-burgundy outline-none transition-all placeholder:text-gray-200 shadow-inner"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 mb-4 ml-4">The Story Behind (Description)</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Tell the neighbor about the ingredients, the process, and the heritage."
                    className="w-full rounded-[40px] border-none bg-cream p-10 text-xl font-light focus:ring-2 focus:ring-burgundy outline-none resize-none transition-all placeholder:text-gray-200 shadow-inner"
                  />
                </div>

                <div className="relative">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 mb-4 ml-4">Appreciation Value</label>
                  <div className="relative">
                    <div className="absolute top-1/2 left-8 h-8 w-8 -translate-y-1/2 flex items-center justify-center text-burgundy bg-white rounded-xl shadow-sm">
                        <DollarSign className="h-4 w-4" />
                    </div>
                    <input
                      required
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      placeholder="0.00"
                      className="w-full rounded-[28px] border-none bg-cream h-20 pl-20 pr-10 text-xl font-light focus:ring-2 focus:ring-burgundy outline-none transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 mb-4 ml-4">Crafting Time</label>
                  <div className="relative">
                    <div className="absolute top-1/2 left-8 h-8 w-8 -translate-y-1/2 flex items-center justify-center text-burgundy bg-white rounded-xl shadow-sm">
                        <Clock className="h-4 w-4" />
                    </div>
                    <select
                      value={formData.prepTime}
                      onChange={(e) => setFormData({...formData, prepTime: e.target.value})}
                      className="w-full rounded-[28px] border-none bg-cream h-20 pl-20 pr-10 text-xl font-light focus:ring-2 focus:ring-burgundy outline-none appearance-none cursor-pointer shadow-inner"
                    >
                      <option>30 min</option>
                      <option>1 hour</option>
                      <option>2 hours</option>
                      <option>3 hours</option>
                      <option>Same Day</option>
                      <option>Next Day</option>
                    </select>
                    <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300 pointer-events-none" />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 mb-4 ml-4">Palette Category</label>
                  <div className="relative">
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full rounded-[28px] border-none bg-cream h-20 px-10 text-xl font-light focus:ring-2 focus:ring-burgundy outline-none appearance-none cursor-pointer shadow-inner"
                    >
                      <option>Ateş Üstü Lezzetler</option>
                      <option>Zeytinyağlı Atölyesi</option>
                      <option>Hamur Sanatı</option>
                      <option>Tatlı Reçeteleri</option>
                      <option>Sıvı Cevherler</option>
                      <option>Bitkisel İmza</option>
                    </select>
                    <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300 pointer-events-none" />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 mb-4 ml-4">Cuisine Heritage</label>
                  <div className="relative">
                    <select
                      value={formData.cuisineType}
                      onChange={(e) => setFormData({...formData, cuisineType: e.target.value})}
                      className="w-full rounded-[28px] border-none bg-cream h-20 px-10 text-xl font-light focus:ring-2 focus:ring-burgundy outline-none appearance-none cursor-pointer shadow-inner"
                    >
                      <option>Anadolu Seçkisi</option>
                      <option>Ege Mirası</option>
                      <option>Mezopotamya Sanatı</option>
                      <option>Kapadokya Esintisi</option>
                      <option>Modern Anadolu</option>
                      <option>Akdeniz Güncesi</option>
                    </select>
                    <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 mb-6 ml-4">Dietary Narratives</label>
                <div className="flex flex-wrap gap-4 px-4">
                  {['vejetaryen', 'vegan', 'glutensiz', 'şekersiz'].map((pref) => (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => toggleDietary(pref)}
                      className={`rounded-2xl px-8 py-4 text-xs font-bold transition-all uppercase tracking-widest ${
                        formData.dietaryPreferences.includes(pref)
                          ? 'bg-burgundy text-cream shadow-xl shadow-burgundy/20 ring-4 ring-burgundy/10'
                          : 'bg-cream text-gray-400 hover:bg-gray-100 hover:text-burgundy'
                      }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-20">
              <Button type="submit" size="xl" className="w-full h-24 rounded-[32px] bg-burgundy text-cream shadow-2xl shadow-burgundy/20 border-none text-2xl font-serif gap-4" isLoading={isLoading}>
                {isLoading ? 'Inaugurating...' : 'Reveal to the Neighborhood'}
                {!isLoading && <Sparkles className="h-8 w-8" />}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
