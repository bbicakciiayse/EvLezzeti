import { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Store, Utensils, Camera, MapPin, ArrowRight, CheckCircle2, ChefHat, Heart, Shield } from 'lucide-react';
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
        isVerified: true,
      };
      login(newUser);
      navigate('/seller/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-cream py-12 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-20 flex items-center justify-between px-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-1 items-center last:flex-none">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl font-serif text-xl border-2 transition-all duration-500 shadow-sm ${
                step >= i ? 'bg-burgundy border-burgundy text-cream' : 'bg-white border-gray-100 text-gray-300'
              }`}>
                {step > i ? <CheckCircle2 className="h-6 w-6" /> : i}
              </div>
              {i < 3 && (
                <div className={`h-[2px] flex-1 mx-4 rounded-full transition-all duration-700 ${step > i ? 'bg-burgundy' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[60px] bg-white p-10 shadow-2xl shadow-burgundy/5 ring-1 ring-gray-100 sm:p-16"
        >
          {step === 1 && (
            <div className="space-y-10">
              <div className="text-center">
                <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-[32px] bg-burgundy/5 text-burgundy shadow-inner">
                  <ChefHat className="h-10 w-10" />
                </div>
                <h1 className="text-5xl font-serif text-text-dark">Enter the Atelier</h1>
                <p className="mt-4 text-xl text-gray-400 font-light">Join our community of artisanal home cooks. Share the art of your kitchen.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 ml-2">Personal Identity</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Your Full Name"
                    className="w-full rounded-[24px] border-none bg-cream h-16 px-8 text-lg font-light focus:ring-2 focus:ring-burgundy outline-none transition-all placeholder:text-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 ml-2">Direct Correspondence</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="chef@atelier.com"
                    className="w-full rounded-[24px] border-none bg-cream h-16 px-8 text-lg font-light focus:ring-2 focus:ring-burgundy outline-none transition-all placeholder:text-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 ml-2">Name of your Kitchen</label>
                  <input
                    type="text"
                    value={formData.kitchenName}
                    onChange={(e) => setFormData({...formData, kitchenName: e.target.value})}
                    placeholder="e.g. Grandma's Secret Table"
                    className="w-full rounded-[24px] border-none bg-cream h-16 px-8 text-lg font-light focus:ring-2 focus:ring-burgundy outline-none transition-all placeholder:text-gray-300"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-10">
              <div className="text-center">
                <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-[32px] bg-terracotta/5 text-terracotta shadow-inner">
                  <MapPin className="h-10 w-10" />
                </div>
                <h1 className="text-5xl font-serif text-text-dark">The Coordinate</h1>
                <p className="mt-4 text-xl text-gray-400 font-light">Where does the magic happen? Let your neighbors find your table.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 ml-2">Selection of Neighborhood</label>
                  <div className="relative">
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full rounded-[24px] border-none bg-cream h-16 px-8 text-lg font-light focus:ring-2 focus:ring-burgundy outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option>Beşiktaş, İstanbul</option>
                      <option>Kadıköy, İstanbul</option>
                      <option>Şişli, İstanbul</option>
                      <option>Üsküdar, İstanbul</option>
                    </select>
                    <ArrowRight className="absolute right-6 top-1/2 -translate-y-1/2 h-5 w-5 text-burgundy rotate-90 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 ml-2">Kitchen Soul & Bio</label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Tell your neighbor the story of your flavors. What makes your table unique?"
                    className="w-full rounded-[32px] border-none bg-cream p-8 text-lg font-light focus:ring-2 focus:ring-burgundy outline-none resize-none transition-all placeholder:text-gray-300"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-10">
              <div className="text-center">
                <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-[32px] bg-green-50 text-green-600 shadow-inner border border-green-100">
                  <ShieldCheck className="h-10 w-10" />
                </div>
                <h1 className="text-5xl font-serif text-text-dark">The Promise</h1>
                <p className="mt-4 text-xl text-gray-400 font-light">Join our circles of trust. By finishing, you join the sofra. community.</p>
              </div>

              <div className="space-y-6 rounded-[40px] bg-cream p-8 shadow-inner border border-burgundy/5">
                {[
                  "I commit to the highest neighborhood hygiene standards.",
                  "I will craft each dish with the same love as my own family.",
                  "Deliveries will be timed with respect to the neighbor's hunger.",
                  "Personal information is treated as a neighbor's secret."
                ].map((text, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="h-6 w-6 rounded-lg bg-green-500 flex items-center justify-center shrink-0 mt-1 shadow-md">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-lg text-gray-500 font-light leading-snug">{text}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-terracotta/5 rounded-2xl border border-terracotta/10">
                 <Shield className="h-5 w-5 text-terracotta" />
                 <p className="text-[10px] font-bold uppercase tracking-widest text-terracotta/70">Escrow Payment System Active</p>
              </div>
            </div>
          )}

          <div className="mt-16 flex gap-6">
            {step > 1 && (
              <Button size="xl" variant="outline" className="flex-1 rounded-2xl h-18 border-burgundy/10 text-burgundy font-bold text-xs uppercase tracking-widest" onClick={() => setStep(step - 1)}>Back</Button>
            )}
            <Button className="flex-[2] h-18 rounded-2xl bg-burgundy text-cream shadow-xl shadow-burgundy/20 font-bold text-xs uppercase tracking-widest border-none gap-3" onClick={handleNext} disabled={step === 1 && !formData.name}>
              {step === 3 ? 'Inaugurate My Kitchen' : 'Continue Journey'}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
