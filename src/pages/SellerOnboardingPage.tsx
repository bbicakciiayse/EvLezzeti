import { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Store, Utensils, Camera, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const SellerOnboardingPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: 'Beşiktaş, İstanbul',
    kitchenName: '',
    description: '',
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      // Simulate registration
      const newUser = {
        id: 'new-seller-' + Date.now(),
        name: formData.name,
        email: formData.email,
        role: 'seller' as const,
        avatar: `https://ui-avatars.com/api/?name=${formData.kitchenName}&background=random`,
        location: formData.location,
        rating: 5.0,
        reviewCount: 0,
        isVerified: false,
      };
      login(newUser);
      navigate('/seller/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-12 flex items-center justify-between">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-1 items-center">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full font-bold transition-all ${
                step >= i ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step > i ? <CheckCircle2 className="h-6 w-6" /> : i}
              </div>
              {i < 3 && (
                <div className={`h-1 flex-1 mx-2 rounded-full ${step > i ? 'bg-orange-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[40px] bg-white p-8 shadow-xl ring-1 ring-gray-100 sm:p-12"
        >
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                  <Store className="h-8 w-8" />
                </div>
                <h1 className="text-3xl font-black text-gray-900">Mutfak Kapılarını Aç</h1>
                <p className="mt-2 text-gray-600">Kendi mutfağının şefi olmaya hazır mısın? Temel bilgilerle başlayalım.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Adınız Soyadınız</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Örn: Ayşe Yılmaz"
                    className="w-full rounded-2xl border-gray-200 bg-gray-50 p-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">E-posta Adresiniz</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="ayse@örnek.com"
                    className="w-full rounded-2xl border-gray-200 bg-gray-50 p-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Mutfak Adı</label>
                  <input
                    type="text"
                    value={formData.kitchenName}
                    onChange={(e) => setFormData({...formData, kitchenName: e.target.value})}
                    placeholder="Örn: Ayşe Teyze'nin Mantı Evi"
                    className="w-full rounded-2xl border-gray-200 bg-gray-50 p-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                  <MapPin className="h-8 w-8" />
                </div>
                <h1 className="text-3xl font-black text-gray-900">Konum ve Detaylar</h1>
                <p className="mt-2 text-gray-600">Müşterilerin seni bulabilmesi için konumunu belirt.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Bulunduğunuz İlçe/Semt</label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full rounded-2xl border-gray-200 bg-gray-50 p-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  >
                    <option>Beşiktaş, İstanbul</option>
                    <option>Kadıköy, İstanbul</option>
                    <option>Şişli, İstanbul</option>
                    <option>Üsküdar, İstanbul</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Mutfağınızın Hikayesi</label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Yemeklerinizde ne kullanırsınız? Sizi özel kılan nedir?"
                    className="w-full rounded-2xl border-gray-200 bg-gray-50 p-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h1 className="text-3xl font-black text-gray-900">Güvenlik ve Onay</h1>
                <p className="mt-2 text-gray-600">EvLezzeti topluluk kurallarını kabul ederek hemen satışa başlayabilirsin.</p>
              </div>

              <div className="space-y-4 rounded-2xl bg-gray-50 p-6">
                <div className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                  <p className="text-sm text-gray-600">Hijyen kurallarına ve gıda güvenliği standartlarına uymayı taahhüt ediyorum.</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                  <p className="text-sm text-gray-600">Siparişleri belirtilen hazırlama süreleri içerisinde teslim edeceğim.</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                  <p className="text-sm text-gray-600">Müşteri memnuniyetini her zaman ön planda tutacağım.</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-10 flex gap-4">
            {step > 1 && (
              <Button variant="outline" className="flex-1" onClick={() => setStep(step - 1)}>Geri</Button>
            )}
            <Button className="flex-[2] gap-2" onClick={handleNext} disabled={step === 1 && !formData.name}>
              {step === 3 ? 'Kaydı Tamamla' : 'Devam Et'}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
