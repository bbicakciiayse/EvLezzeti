import { motion } from 'motion/react';
import { ShieldCheck, Lock, Heart, Eye, Award, CheckCircle2, AlertCircle, Info, ArrowLeft, Shield } from 'lucide-react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

export const TrustPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cream pb-32 pt-24">
      <div className="mx-auto max-w-4xl px-4">
        <button 
          onClick={() => navigate(-1)}
          className="group mb-12 inline-flex items-center gap-3 text-sm font-bold text-gray-400 hover:text-burgundy transition-all"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 group-hover:ring-burgundy/20">
            <ArrowLeft className="h-5 w-5" />
          </div>
          Return
        </button>

        <div className="text-center mb-20">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[40px] bg-burgundy text-cream shadow-2xl shadow-burgundy/20">
            <Shield className="h-12 w-12" />
          </div>
          <h1 className="text-6xl font-serif text-text-dark lg:text-7xl">Trust at the Center</h1>
          <p className="mt-8 text-2xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
            sofra. isn't just a marketplace. It's a neighborhood promise of quality, safety, and security.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {/* Pillar 1: Escrow */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[60px] bg-white p-12 shadow-sm ring-1 ring-gray-100 flex flex-col md:flex-row gap-12 items-center"
          >
            <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-[48px] bg-burgundy/5 text-burgundy shadow-inner">
              <Lock className="h-12 w-12" />
            </div>
            <div>
              <h2 className="text-3xl font-serif text-text-dark mb-4">Escrow Guaranteed Payments</h2>
              <p className="text-lg text-gray-500 font-light leading-relaxed">
                Your payment is held securely in our independent trust account. We only release funds to the home cook 
                <span className="font-bold text-burgundy"> after </span> you confirm that your meal has arrived and you are satisfied.
                If anything goes wrong, we're here to mediate the resolution.
              </p>
            </div>
          </motion.div>

          {/* Pillar 2: Verification */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[60px] bg-white p-12 shadow-sm ring-1 ring-gray-100 flex flex-col md:flex-row gap-12 items-center"
          >
            <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-[48px] bg-terracotta/5 text-terracotta shadow-inner">
              <ShieldCheck className="h-12 w-12" />
            </div>
            <div>
              <h2 className="text-3xl font-serif text-text-dark mb-4">Verified Kitchens</h2>
              <p className="text-lg text-gray-500 font-light leading-relaxed">
                Every chef on sofra undergoes a multi-step verification process, including identity checks, kitchen photo verification, 
                and initial tasting reviews. We ensure that your food is being crafted in a safe and loving environment.
              </p>
            </div>
          </motion.div>

          {/* Pillar 3: Food Safety */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[60px] bg-white p-12 shadow-sm ring-1 ring-gray-100 flex flex-col md:flex-row gap-12 items-center"
          >
            <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-[48px] bg-green-50 text-green-600 shadow-inner">
              <Award className="h-12 w-12" />
            </div>
            <div>
              <h2 className="text-3xl font-serif text-text-dark mb-4">Safety & Excellence</h2>
              <p className="text-lg text-gray-500 font-light leading-relaxed">
                All sofra chefs are required to follow our "Table Manners" code of conduct. This includes strict adherence to food safety 
                protocols, allergen transparency, and the highest standards of hygiene.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Support Section */}
        <div className="mt-32 rounded-[60px] bg-burgundy p-16 text-cream text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 -ml-16 -mt-16 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <div className="relative z-10">
            <h3 className="text-4xl font-serif mb-6">Need assistance?</h3>
            <p className="text-xl text-cream/70 font-light mb-12 max-w-xl mx-auto">
              Our neighborly support team is available 24/7 to help with any concerns about your order, food quality, or safety.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="xl" className="rounded-[28px] bg-cream text-burgundy px-12 h-20 shadow-xl shadow-black/20 font-serif text-xl border-none">Chat with Neighborhood Support</Button>
              <Button size="xl" variant="outline" className="rounded-[28px] border-cream/20 text-cream px-12 h-20 bg-white/5 hover:bg-white/10 font-serif text-xl">Safety Protocols</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
