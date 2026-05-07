import { motion } from 'motion/react';
import { Star, Clock, ShieldCheck, MapPin, ChevronRight, MessageSquare, ShoppingCart, ArrowLeft, Info, ChefHat, Heart, Share2, Scale, AlertTriangle } from 'lucide-react';
import { Button } from '../components/Button';
import { MOCK_FOOD_ITEMS, MOCK_SELLERS } from '../data';
import { formatCurrency } from '../lib/utils';
import { useParams, useNavigate, Link } from 'react-router-dom';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const item = MOCK_FOOD_ITEMS.find(i => i.id === id) || MOCK_FOOD_ITEMS[0];
  const seller = MOCK_SELLERS.find(s => s.id === item.sellerId) || MOCK_SELLERS[0];

  return (
    <div className="min-h-screen bg-cream pb-32">
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 text-sm font-bold text-gray-400 hover:text-burgundy transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 group-hover:ring-burgundy/20">
              <ArrowLeft className="h-5 w-5" />
            </div>
            Back to Discovery
          </button>
          <div className="flex gap-4">
            <button className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 hover:text-terracotta transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 hover:text-terracotta transition-colors">
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left: Image Gallery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="aspect-[1/1] overflow-hidden rounded-[60px] bg-white shadow-2xl">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-3xl bg-white ring-2 ring-transparent hover:ring-terracotta cursor-pointer transition-all shadow-sm">
                  <img src={item.image} alt="Gallery" className="h-full w-full object-cover opacity-80 hover:opacity-100" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Info & Checkout */}
          <div className="flex flex-col">
            <div className="mb-6 flex items-center gap-2">
              <span className="rounded-full bg-burgundy/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-burgundy ring-1 ring-burgundy/10">
                {item.category}
              </span>
              <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-green-600">
                <ShieldCheck className="h-4 w-4" />
                Verified Kitchen
              </span>
            </div>
            
            <h1 className="mb-4 text-5xl text-text-dark lg:text-6xl font-serif">{item.title}</h1>
            
            <div className="mb-8 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`h-4 w-4 ${s <= Math.floor(item.rating) ? 'fill-terracotta text-terracotta' : 'text-gray-200'}`} />
                  ))}
                </div>
                <span className="text-sm font-bold text-text-dark">{item.rating}</span>
                <span className="text-sm text-gray-400">({item.reviewCount} reviews)</span>
              </div>
              <div className="h-4 w-px bg-gray-200" />
              <div className="flex items-center gap-2 text-gray-500">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">{item.prepTime} min</span>
              </div>
              <div className="h-4 w-px bg-gray-200" />
              <div className="flex items-center gap-2 text-gray-500">
                <Scale className="h-4 w-4" />
                <span className="text-sm font-medium">Standard Portion</span>
              </div>
            </div>

            <p className="mb-10 text-xl leading-relaxed text-gray-500 font-light">
              {item.description}
            </p>

            {/* Ingredients & Allergens */}
            <div className="mb-10 grid grid-cols-2 gap-6">
              <div className="rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <div className="mb-4 flex items-center gap-2 text-burgundy">
                  <Info className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Ingredients</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">Pirinç, Dana Kıyma, Zeytinyağı, Özel Baharat Karışımı, Taze Yeşillikler.</p>
              </div>
              <div className="rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <div className="mb-4 flex items-center gap-2 text-terracotta">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Allergens</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">Gluten içerir. Eser miktarda ceviz ve süt ürünü bulunabilir.</p>
              </div>
            </div>

            {/* Seller Card */}
            <div className="mb-10 rounded-[40px] bg-white p-8 shadow-sm ring-1 ring-gray-100 hover:shadow-md transition-all group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="h-20 w-20 overflow-hidden rounded-[28px] bg-cream shadow-inner ring-4 ring-cream group-hover:ring-terracotta/20 transition-all">
                    <img src={seller.avatar} alt={seller.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif text-text-dark">{seller.name}</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-400 font-medium">
                      <MapPin className="h-4 w-4 text-terracotta" />
                      <span>{seller.location}</span>
                    </div>
                  </div>
                </div>
                <Link to={`/cook/${seller.id}`}>
                  <Button variant="outline" size="lg" className="rounded-2xl border-burgundy text-burgundy">Visit Kitchen</Button>
                </Link>
              </div>
            </div>

            {/* Price & Action */}
            <div className="sticky bottom-8 mt-auto flex items-center justify-between rounded-[40px] bg-burgundy px-10 py-8 shadow-2xl shadow-burgundy/20">
              <div>
                <p className="text-xs font-bold text-cream/60 uppercase tracking-widest mb-1 text-center">Total Appreciation</p>
                <p className="text-4xl font-serif text-cream">{formatCurrency(item.price)}</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center rounded-3xl bg-white/10 p-1 backdrop-blur-md">
                  <button className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl font-serif text-cream hover:bg-white/20 transition-all">-</button>
                  <span className="w-12 text-center font-bold text-cream text-xl">1</span>
                  <button className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl font-serif text-cream hover:bg-white/20 transition-all">+</button>
                </div>
                <Button size="xl" className="px-12 h-16 rounded-[28px] bg-cream text-burgundy hover:bg-white text-lg font-bold gap-3 border-none">
                  <ShoppingCart className="h-6 w-6" />
                  Reserve Meal
                </Button>
              </div>
            </div>

            {/* Escrow Badge */}
            <div className="mt-8 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-300">
              <ShieldCheck className="h-4 w-4" />
              Escrow Protection: Payment held safely by sofra.
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-32">
          <div className="mb-16 flex items-end justify-between border-b border-gray-100 pb-8">
            <div>
              <h2 className="mb-4 text-5xl text-text-dark font-serif">Kitchen Table Gossip</h2>
              <p className="text-xl text-gray-400 font-light">Real reactions from fellow neighbors.</p>
            </div>
            <Button variant="outline" className="rounded-2xl border-burgundy text-burgundy">Read All Stories</Button>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {[1, 2].map((i) => (
              <div key={i} className="relative rounded-[48px] bg-white p-12 shadow-sm ring-1 ring-gray-100">
                <div className="absolute -top-6 left-12 h-12 w-12 rounded-2xl bg-terracotta flex items-center justify-center text-cream shadow-lg">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={`https://i.pravatar.cc/150?u=${i+30}`} className="h-14 w-14 rounded-2xl object-cover" alt="User" />
                    <div>
                      <p className="text-xl font-serif text-text-dark">Mehmet Yuzuncu</p>
                      <p className="text-sm text-gray-400">Authentic Lover • 2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-4 w-4 fill-terracotta text-terracotta" />
                    ))}
                  </div>
                </div>
                <p className="text-lg text-gray-500 italic leading-relaxed font-light">
                  "Gerçekten annemin yaptığı sarmalar gibiydi. Ellerinize sağlık Ayşe Teyze. Paketleme de çok özenliydi, sıcacık geldi. sofra escrow sistemi de içimi çok rahatlattı."
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
