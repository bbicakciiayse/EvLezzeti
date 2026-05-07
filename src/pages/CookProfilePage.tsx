import { motion } from 'motion/react';
import { Star, MapPin, ShieldCheck, Heart, Share2, MessageSquare, Clock, Utensils, Award, Instagram, Info, ArrowLeft } from 'lucide-react';
import { Button } from '../components/Button';
import { MOCK_FOOD_ITEMS, MOCK_SELLERS } from '../data';
import { formatCurrency } from '../lib/utils';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FoodCard } from '../components/FoodCard';

export const CookProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const seller = MOCK_SELLERS.find(s => s.id === id) || MOCK_SELLERS[0];
  const items = MOCK_FOOD_ITEMS.filter(item => item.sellerId === seller.id);

  return (
    <div className="min-h-screen bg-cream pb-32">
      {/* Cover Backdrop */}
      <div className="h-80 w-full bg-burgundy relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1600&h=800&fit=crop')] bg-cover bg-center opacity-30 grayscale-[0.8]" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-transparent" />
        
        <div className="mx-auto max-w-7xl px-4 h-full relative">
          <button 
            onClick={() => navigate(-1)}
            className="mt-12 group flex items-center gap-3 text-sm font-bold text-cream hover:text-white transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/20 group-hover:ring-white/40">
              <ArrowLeft className="h-5 w-5" />
            </div>
            Back
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-1">
            <div className="rounded-[60px] bg-white p-12 shadow-2xl shadow-burgundy/10 ring-1 ring-gray-100 sticky top-32">
              <div className="relative mb-8 text-center">
                <div className="mx-auto h-40 w-40 overflow-hidden rounded-[52px] bg-cream shadow-2xl ring-8 ring-white">
                  <img src={seller.avatar} alt={seller.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white ring-4 ring-white shadow-lg">
                  <ShieldCheck className="h-4 w-4" />
                  Verified Kitchen
                </div>
              </div>

              <div className="text-center">
                <h1 className="text-4xl font-serif text-text-dark">{seller.name}</h1>
                <div className="mt-2 flex items-center justify-center gap-2 text-sm text-gray-400 font-medium">
                  <MapPin className="h-4 w-4 text-terracotta" />
                  <span>{seller.location}</span>
                </div>
                
                <div className="mt-8 grid grid-cols-3 gap-4 border-y border-gray-100 py-8">
                  <div className="text-center">
                    <p className="text-xl font-serif text-text-dark">{seller.rating}</p>
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-1">Rating</p>
                  </div>
                  <div className="text-center border-x border-gray-100">
                    <p className="text-xl font-serif text-text-dark">{items.length}</p>
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-1">Dishes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-serif text-text-dark">3y</p>
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-1">Legacy</p>
                  </div>
                </div>

                <p className="mt-8 text-lg text-gray-500 font-light leading-relaxed italic">
                  "{seller.bio || "Crafting traditional flavors with shared love from my kitchen to your table."}"
                </p>

                <div className="mt-10 space-y-4">
                  <Button size="xl" className="w-full rounded-[28px] bg-burgundy text-cream shadow-xl shadow-burgundy/20 gap-3 border-none h-16">
                    <MessageSquare className="h-5 w-5" />
                    Send a Message
                  </Button>
                  <div className="flex gap-4">
                    <Button variant="outline" className="flex-1 rounded-2xl h-14 border-burgundy/20 text-text-dark hover:border-burgundy">
                      <Heart className="h-5 w-5 mr-2 text-terracotta" /> Favorite
                    </Button>
                    <Button variant="outline" className="flex-1 rounded-2xl h-14 border-burgundy/20 text-text-dark hover:border-burgundy">
                      <Share2 className="h-5 w-5 mr-2 text-burgundy" /> Share
                    </Button>
                  </div>
                </div>

                <div className="mt-10 flex items-center justify-center gap-6 text-gray-300">
                   <Instagram className="h-6 w-6 cursor-pointer hover:text-burgundy transition-colors" />
                   <Award className="h-6 w-6 cursor-pointer hover:text-burgundy transition-colors" />
                   <Info className="h-6 w-6 cursor-pointer hover:text-burgundy transition-colors" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Menu & Stories */}
          <div className="lg:col-span-2">
            <div className="space-y-16">
              {/* Introduction */}
              <div className="p-8">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-terracotta mb-4">The Artisan's Table</h2>
                <h3 className="text-5xl font-serif text-text-dark leading-tight">Hand-crafted menus <br />by {seller.name.split(' ')[0]}</h3>
                <p className="mt-8 text-xl text-gray-400 font-light leading-relaxed max-w-xl">
                  Each dish is prepared individually per order using local ingredients and family recipes passed through generations.
                </p>
                
                <div className="mt-12 flex flex-wrap gap-4">
                  <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 shadow-sm ring-1 ring-gray-100">
                    <Clock className="h-5 w-5 text-burgundy" />
                    <span className="text-sm font-bold text-text-dark">45-60 min prep</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 shadow-sm ring-1 ring-gray-100">
                    <Utensils className="h-5 w-5 text-burgundy" />
                    <span className="text-sm font-bold text-text-dark">Authentic Anatolian</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 shadow-sm ring-1 ring-gray-100">
                    <ShieldCheck className="h-5 w-5 text-burgundy" />
                    <span className="text-sm font-bold text-text-dark">Hygiene Certified</span>
                  </div>
                </div>
              </div>

              {/* Menu Grid */}
              <div>
                <div className="mb-10 flex items-end justify-between px-8">
                  <div>
                    <h4 className="text-3xl font-serif text-text-dark">Current Menus</h4>
                    <p className="text-gray-400 font-light mt-1">Available for neighborhood delivery</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {items.map(item => (
                    <FoodCard key={item.id} item={item} />
                  ))}
                </div>
              </div>

              {/* Kitchen Stories (Reviews) */}
              <div className="rounded-[60px] bg-white p-12 shadow-sm ring-1 ring-gray-100">
                <div className="mb-12 flex items-end justify-between">
                  <div>
                    <h4 className="text-3xl font-serif text-text-dark">Neighborhood Gossip</h4>
                    <p className="text-gray-400 font-light mt-1">Real reactions from the community</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className="h-4 w-4 fill-terracotta text-terracotta" />
                      ))}
                    </div>
                    <p className="text-sm font-bold text-text-dark">{seller.rating} Average</p>
                  </div>
                </div>

                <div className="space-y-10">
                  {[
                    {
                      name: "Merve Yılmaz",
                      date: "April 12, 2024",
                      avatar: "1438761681033-6461ffad8d80",
                      comment: "Every element of the meal felt intentional. The textures are sophisticated and the flavors are deeply evocative of Egean heritage."
                    },
                    {
                      name: "Hakan Demir",
                      date: "April 15, 2024",
                      avatar: "1500648767791-00dcc994a43e",
                      comment: "The packaging was as artisanal as the food itself. Arrived perfectly warm. This is not just a meal, it's a curated experience."
                    },
                    {
                      name: "Selma Koç",
                      date: "April 18, 2024",
                      avatar: "1494790108377-be9c29b29330",
                      comment: "I've been a regular patron for months. The consistency in quality is remarkable. {seller.name} truly honors the ingredients."
                    }
                  ].map((review, i) => (
                    <div key={i} className={`flex gap-8 ${i < 2 ? 'border-b border-gray-100 pb-10' : ''}`}>
                      <img src={`https://images.unsplash.com/photo-${review.avatar}?w=400&h=400&fit=crop`} className="h-16 w-16 rounded-2xl object-cover shrink-0" alt="Reviewer" referrerPolicy="no-referrer" />
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h5 className="text-xl font-serif text-text-dark">{review.name}</h5>
                          <span className="text-xs text-gray-400 font-medium">{review.date}</span>
                        </div>
                        <p className="text-lg text-gray-500 font-light italic leading-relaxed">
                          "{review.comment.replace('{seller.name}', seller.name)}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="mt-12 w-full rounded-2xl border-burgundy/10 text-burgundy h-14 font-bold uppercase tracking-widest text-xs">Read All 52 Stories</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
