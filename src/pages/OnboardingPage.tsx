import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ArrowRight, ShoppingBag, Heart, ShieldCheck, User, ChevronRight } from 'lucide-react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

const STEPS = [
  {
    title: "You plan the gathering.",
    subtitle: "sofra. sets the table.",
    description: "Discover a neighborhood of dedicated home cooks crafting authentic, heart-felt meals just for you.",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071&auto=format&fit=crop",
    color: "bg-burgundy",
    icon: <ShoppingBag className="h-8 w-8" />
  },
  {
    title: "Hand-crafted with love.",
    subtitle: "Artisanal quality, home soul.",
    description: "Every dish is prepared individually using family recipes and local ingredients. No assembly lines, just real kitchens.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop",
    color: "bg-terracotta",
    icon: <Heart className="h-8 w-8" />
  },
  {
    title: "Trust in every bite.",
    subtitle: "Verified & Secured.",
    description: "Your security is our secret ingredient. Escrow protected payments and personally verified kitchens in your neighborhood.",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2070&auto=format&fit=crop",
    color: "bg-text-dark",
    icon: <ShieldCheck className="h-8 w-8" />
  }
];

export const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-cream overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="h-full w-full flex flex-col"
        >
          {/* Top Image Section */}
          <div className="flex-1 relative overflow-hidden">
            <motion.img
              initial={{ scale: 1.2, rotate: 2 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src={STEPS[currentStep].image}
              className="h-full w-full object-cover grayscale-[0.2]"
              alt="Onboarding"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-transparent" />
            
            <div className="absolute top-12 left-0 w-full px-8 flex justify-between items-center">
               <div className="flex items-center gap-2">
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center text-cream shadow-2xl ${STEPS[currentStep].color}`}>
                    {STEPS[currentStep].icon}
                  </div>
                  <span className="text-xl font-serif tracking-tight text-white drop-shadow-md">
                    sofra<span className="text-terracotta">.</span>
                  </span>
               </div>
               <button 
                onClick={() => navigate('/')}
                className="text-xs font-bold uppercase tracking-widest text-white/80 hover:text-white transition-colors"
               >
                 Skip intro
               </button>
            </div>
          </div>

          {/* Bottom Content Section */}
          <div className="h-[45vh] bg-cream px-8 pb-12 flex flex-col">
            <div className="mt-8 flex gap-2 mb-12">
               {STEPS.map((_, i) => (
                 <div 
                  key={i} 
                  className={`h-1 rounded-full transition-all duration-500 ${i === currentStep ? 'w-12 bg-burgundy' : 'w-4 bg-gray-200'}`} 
                 />
               ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex-1"
            >
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-terracotta mb-4">{STEPS[currentStep].subtitle}</h2>
              <h1 className="text-6xl font-serif text-text-dark leading-tight mb-8">
                {STEPS[currentStep].title}
              </h1>
              <p className="text-xl text-gray-400 font-light leading-relaxed max-w-sm">
                {STEPS[currentStep].description}
              </p>
            </motion.div>

            <div className="flex items-center justify-between">
               <div className="flex items-center gap-4 text-gray-300">
                  <User className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Join 12k Neighborhoods</span>
               </div>
               <Button 
                size="xl" 
                className={`h-20 w-20 rounded-[28px] p-0 flex items-center justify-center border-none shadow-2xl transition-all ${STEPS[currentStep].color} text-cream hover:scale-110`}
                onClick={handleNext}
               >
                 <ChevronRight className="h-8 w-8" />
               </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
