import { motion } from 'motion/react';
import { Button } from '../components/Button';
import { FoodCard } from '../components/FoodCard';
import { MOCK_FOOD_ITEMS } from '../data';
import { Search, Utensils, Star, ShieldCheck, Truck, ShoppingBag, SlidersHorizontal, ArrowRight, Heart, Users, Clock, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();

  const categories = [
    { name: 'Ateş Üstü Lezzetler', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=400&fit=crop' },
    { name: 'Zeytinyağlı Atölyesi', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop' },
    { name: 'Hamur Sanatı', image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400&h=400&fit=crop' },
    { name: 'Tatlı Reçeteleri', image: 'https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=400&h=400&fit=crop' },
    { name: 'Bitkisel İmza', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop' },
    { name: 'Gurme Seçkiler', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        <div className="absolute top-0 right-0 -z-10 h-[800px] w-[800px] rounded-full bg-terracotta/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 h-[600px] w-[600px] rounded-full bg-burgundy/5 blur-3xl" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-burgundy shadow-sm ring-1 ring-gray-100">
                <span className="flex h-2 w-2 rounded-full bg-terracotta animate-pulse" />
                Artisan culinary creations, delivered hot.
              </div>
              <h1 className="mb-8 text-6xl font-serif leading-tight text-text-dark sm:text-7xl lg:text-8xl">
                You plan the gathering.<br />
                <span className="text-terracotta">sofra.</span> sets the table.
              </h1>
              <p className="mb-10 text-xl text-gray-600 leading-relaxed max-w-lg font-light">
                Discover local culinary artisans crafting immersive dining experiences.
              </p>
              
              <div className="flex flex-col gap-4 sm:flex-row shadow-2xl shadow-burgundy/5 rounded-[32px] overflow-hidden">
                <div className="relative flex-1 min-w-[300px]">
                  <Search className="absolute top-1/2 left-6 h-6 w-6 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Find trüf, kuzu incik, zırh mantı..."
                    className="w-full h-20 border-none bg-white pr-4 pl-16 text-xl outline-none transition-all placeholder:text-gray-300 font-light"
                  />
                </div>
                <Button size="xl" className="px-12 h-20 bg-burgundy hover:bg-burgundy/90 text-cream text-xl font-bold shadow-none border-none rounded-none" onClick={() => navigate('/explore')}>
                  Search
                </Button>
              </div>
              
              <div className="mt-12 flex items-center gap-12">
                <div>
                  <p className="text-3xl font-serif text-text-dark">4.9/5</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Patron Trust Index</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div>
                  <p className="text-3xl font-serif text-text-dark">2.4k+</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Certified Artisans</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="flex -space-x-4">
                  {[1, 2, 3].map((i) => {
                    const avatarIds = [
                      '1535713875002-d1d0cf377f3d',
                      '1539571696357-5a69c17a67c6',
                      '1507003211169-0a1dd7228f2d'
                    ];
                    return (
                      <img key={i} className="h-14 w-14 rounded-2xl border-4 border-cream object-cover shadow-sm" src={`https://images.unsplash.com/photo-${avatarIds[i-1]}?w=100&h=100&fit=crop`} alt="User" />
                    );
                  })}
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border-4 border-cream bg-terracotta text-xs font-bold text-white shadow-sm">
                    +1k
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[60px] shadow-[0_64px_128px_-16px_rgba(107,27,27,0.1)]">
                <img
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=1000&fit=crop"
                  alt="Artisanal Signature Creation"
                  className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
                />
                <div className="absolute inset-x-8 bottom-8 rounded-[40px] bg-white/40 backdrop-blur-xl p-8 border border-white/20 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif text-2xl text-text-dark">Chef Ayşe d'Atelier</h4>
                      <p className="text-sm text-gray-700 font-light mt-1">Vişneli Ege Esintili Yaprak Sarma</p>
                    </div>
                    <Link to="/cook/1" className="h-14 w-14 rounded-2xl bg-burgundy flex items-center justify-center text-cream shadow-xl hover:scale-110 transition-transform">
                      <ArrowRight className="h-6 w-6" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="absolute -top-12 -right-12 h-40 w-40 rounded-[48px] bg-white shadow-2xl flex flex-col items-center justify-center border border-gray-100 p-4 rotate-12">
                <Utensils className="h-8 w-8 text-terracotta mb-2" />
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center leading-tight">Artisanal<br />ImSignature</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-white rounded-[80px] -mt-20 relative z-10 shadow-sm border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-16 px-4">
            <div>
              <h2 className="text-4xl font-serif text-text-dark">Explore Palettes</h2>
              <p className="text-gray-400 font-light mt-2">Find the specific comfort you're looking for.</p>
            </div>
            <Link to="/explore" className="text-burgundy font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:underline">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex gap-12 overflow-x-auto pb-8 scrollbar-hide px-4">
            {categories.map((cat, i) => (
              <motion.button
                key={i}
                whileHover={{ y: -8 }}
                className="flex min-w-[160px] flex-col items-center gap-6 group"
              >
                <div className="h-32 w-32 overflow-hidden rounded-[48px] bg-cream shadow-inner ring-4 ring-white group-hover:ring-terracotta/40 transition-all duration-500">
                  <img src={cat.image} alt={cat.name} className="h-full w-full object-cover grayscale-[20%] group-hover:scale-110 transition-transform duration-700" />
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] text-center">{cat.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Items */}
      <section className="py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-20 flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between px-4">
            <div>
              <h2 className="mb-4 text-5xl font-serif text-text-dark">Trending Nearby</h2>
              <p className="text-xl text-gray-400 font-light">The most loved neighborhood flavors right now.</p>
            </div>
            <Button variant="outline" className="border-burgundy text-burgundy rounded-2xl h-14 px-8 font-bold uppercase tracking-widest text-[10px] border-none shadow-sm bg-white" onClick={() => navigate('/explore')}>
              Explore Discovery
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 px-4">
            {MOCK_FOOD_ITEMS.slice(0, 4).map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Escrow Explanation */}
      <section className="py-32 bg-burgundy rounded-[100px] mx-4 relative overflow-hidden group">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 h-[600px] w-[600px] rounded-full bg-white/5 blur-3xl group-hover:scale-110 transition-transform duration-1000" />
        <div className="mx-auto max-w-7xl px-8 sm:px-12 lg:px-20 relative z-10">
          <div className="grid grid-cols-1 gap-24 lg:grid-cols-2 items-center">
            <div>
              <div className="flex h-16 w-16 items-center justify-center rounded-[24px] bg-cream text-burgundy shadow-2xl mb-12">
                <Shield className="h-8 w-8" />
              </div>
              <h2 className="text-6xl font-serif mb-12 text-cream leading-tight">Trust is our secret ingredient.</h2>
              <div className="space-y-12">
                {[
                  { icon: <ShieldCheck />, title: "Escrow Protection", desc: "Your payment is held safely by sofra. exclusively released after your confirmation." },
                  { icon: <Clock />, title: "Kitchen Verification", desc: "Every chef is personally vetted for hygiene, quality, and community spirit." },
                  { icon: <Star />, title: "Verified Reactions", desc: "Only neighbors who have tasted the dish can share their stories." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 group/item">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[28px] bg-white/10 text-terracotta backdrop-blur-xl border border-white/10 shadow-2xl group-hover/item:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif mb-3 text-cream">{item.title}</h3>
                      <p className="text-cream/60 leading-relaxed font-light text-lg">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/trust" className="mt-16 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-terracotta hover:text-white transition-colors">
                Deep dive into our trust architecture <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-12 bg-cream/10 rounded-[80px] blur-3xl" />
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=800&fit=crop" 
                alt="Artisan Kitchen" 
                className="relative h-full w-full object-cover rounded-[80px] shadow-[0_64px_128px_-16px_rgba(0,0,0,0.4)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Artists */}
      <section className="py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 flex items-end justify-between px-4">
             <div>
               <h2 className="text-4xl font-serif text-text-dark">Meet the Artists</h2>
               <p className="text-xl text-gray-400 font-light mt-2">The humans behind your favorite flavors.</p>
             </div>
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 px-4">
            {[
              {
                id: 's1',
                name: "Chef Ayşe d'Atelier",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
                rating: "4.9",
                quote: "30 yılı aşkın culinary serüvenimi ve kadim Anadolu tekniklerini artık sizin sofranıza bir sanat eseri gibi taşıyorum...",
                dishes: [
                   "https://images.unsplash.com/photo-1544025162-d76694265947?w=200&h=200&fit=crop",
                   "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop",
                   "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200&h=200&fit=crop"
                ]
              },
              {
                id: 's2',
                name: "Signature d'Anatolie",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
                rating: "4.7",
                quote: "Unun ve suyun kadim dostluğunu, Mezopotamya’nın derin baharatlarıyla yeniden yorumlayan bir lezzet yolculuğu...",
                dishes: [
                   "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&h=200&fit=crop",
                   "https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=200&h=200&fit=crop",
                   "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop"
                ]
              },
              {
                id: 's3',
                name: "L'Atelier Gastronomique",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
                rating: "4.5",
                quote: "Doğanın saflığını porselenle buluşturan, mevsimsel ve sürdürülebilir bir gurme deneyimi sunuyoruz...",
                dishes: [
                   "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop",
                   "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop",
                   "https://images.unsplash.com/photo-1476224483481-17c45ea8ac4a?w=200&h=200&fit=crop"
                ]
              }
            ].map((chef) => (
              <div key={chef.id} className="group relative overflow-hidden rounded-[52px] bg-white p-10 shadow-sm ring-1 ring-gray-100 hover:shadow-2xl transition-all duration-500">
                <div className="mb-8 flex items-center gap-6">
                  <div className="h-20 w-20 overflow-hidden rounded-[28px] bg-cream shadow-inner ring-4 ring-white">
                    <img src={chef.avatar} className="h-full w-full object-cover" alt={chef.name} referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-text-dark">{chef.name}</h3>
                    <div className="flex items-center gap-1.5 text-terracotta mt-1">
                      <Star className="h-4 w-4 fill-terracotta" />
                      <span className="text-sm font-bold font-sans">{chef.rating} Patron Trust Index</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-8">
                  {chef.dishes.map((dish, j) => (
                    <img key={j} src={dish} className="h-24 w-full rounded-[24px] object-cover shadow-sm bg-cream" alt="Dish" referrerPolicy="no-referrer" />
                  ))}
                </div>
                <p className="text-lg text-gray-400 mb-10 italic font-light leading-relaxed">"{chef.quote}"</p>
                <Link to={`/cook/${chef.id}`} className="block">
                  <Button variant="outline" className="w-full h-16 border-burgundy text-burgundy rounded-[24px] group-hover:bg-burgundy group-hover:text-cream border-2 transition-all font-bold text-sm tracking-widest uppercase">
                    Visit Portfolio
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patron Chronicles */}
      <section className="pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 px-4">
            <h2 className="text-4xl font-serif text-text-dark">Patron Chronicles</h2>
            <p className="text-xl text-gray-400 font-light mt-2">Authentic dialogues from our global community of connoisseurs.</p>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 px-4">
            {[
              {
                name: "Serap Karahan",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
                comment: "The artisanal sarma was a revelation. Each bite carries the weight of tradition. Perfectly balanced tartness from the cherries.",
                dish: "Vişneli Sarma"
              },
              {
                name: "Canberk Özkan",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
                comment: "Finding this level of slow-cooked tenderness outside of a high-end restaurant is rare. The smoky depth of the lamb is incredible.",
                dish: "Kuzu İncik"
              },
              {
                name: "Zeynep Demir",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
                comment: "As a vegan, I often struggle with depth of flavor, but the mushroom symphony here is pure umami magic. A truly evolved palette.",
                dish: "Mantar Senfonisi"
              }
            ].map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-[40px] bg-cream p-10 ring-1 ring-burgundy/5"
              >
                <div className="flex items-center gap-4 mb-8">
                  <img src={review.avatar} className="h-14 w-14 rounded-2xl object-cover shadow-md" alt={review.name} />
                  <div>
                    <h4 className="font-serif text-xl text-text-dark">{review.name}</h4>
                    <p className="text-[10px] font-bold text-terracotta uppercase tracking-widest">Verified Connoisseur</p>
                  </div>
                </div>
                <p className="text-lg text-gray-500 font-light italic leading-relaxed mb-6">"{review.comment}"</p>
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest shadow-sm">
                  <Heart className="h-3 w-3 text-burgundy" /> {review.dish}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[80px] bg-white p-16 text-center text-text-dark sm:p-28 shadow-sm ring-1 ring-burgundy/5 border-b-8 border-burgundy/10">
          <div className="absolute top-0 left-0 -z-10 h-full w-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-terracotta/5 via-white to-white" />
          <h2 className="mb-10 text-6xl font-serif sm:text-7xl max-w-3xl mx-auto tracking-tight">Turn your passion into a premium atelier.</h2>
          <p className="mx-auto mb-16 max-w-2xl text-xl text-gray-400 font-light leading-relaxed">
            Join the community of culinary artisans. We handle the discovery, payments, and delivery so you can focus on the art of your craft.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <Button size="xl" className="bg-burgundy text-cream hover:bg-burgundy/90 px-16 rounded-[28px] text-xl h-20 shadow-2xl shadow-burgundy/20 border-none font-serif" onClick={() => navigate('/seller/onboarding')}>
              Start My Atelier
            </Button>
            <Button variant="outline" className="text-burgundy border-burgundy/10 rounded-[28px] h-20 px-16 font-bold uppercase tracking-widest text-xs hover:bg-burgundy/5">
              Explore Guidelines
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-32 pb-16 border-t border-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-16 md:grid-cols-4 lg:grid-cols-6 mb-32">
            <div className="col-span-2 lg:col-span-2">
              <Link to="/" className="mb-10 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-burgundy text-cream shadow-xl">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <span className="text-3xl font-serif tracking-tight text-text-dark">
                  sofra<span className="text-terracotta">.</span>
                </span>
              </Link>
              <p className="mb-10 max-w-xs text-xl text-gray-400 font-light leading-relaxed">
                Premium artisanal food marketplace. Curating the finest tradition for modern tables.
              </p>
              <div className="flex gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-12 w-12 rounded-2xl bg-cream border border-gray-100 flex items-center justify-center text-gray-300 hover:text-burgundy transition-all hover:scale-110 cursor-pointer shadow-sm">
                    <Heart className="h-5 w-5" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-8 text-[10px] font-bold uppercase tracking-[0.2em] text-text-dark">Discovery</h4>
              <ul className="space-y-6 text-sm text-gray-400 font-light">
                <li className="hover:text-burgundy cursor-pointer transition-colors">Home Cooks Nearby</li>
                <li className="hover:text-burgundy cursor-pointer transition-colors">Trending Dishes</li>
                <li className="hover:text-burgundy cursor-pointer transition-colors">Seasonal Palettes</li>
                <li className="hover:text-burgundy cursor-pointer transition-colors">Gift Reservations</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-8 text-[10px] font-bold uppercase tracking-[0.2em] text-text-dark">Artisans</h4>
              <ul className="space-y-6 text-sm text-gray-400 font-light">
                <li className="hover:text-burgundy cursor-pointer transition-colors">Open an Atelier</li>
                <li className="hover:text-burgundy cursor-pointer transition-colors">Community Stories</li>
                <Link to="/trust" className="block hover:text-burgundy transition-colors">Safety & Verification</Link>
                <li className="hover:text-burgundy cursor-pointer transition-colors">Chef Portal</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-8 text-[10px] font-bold uppercase tracking-[0.2em] text-text-dark">Assistance</h4>
              <ul className="space-y-6 text-sm text-gray-400 font-light">
                <li className="hover:text-burgundy cursor-pointer transition-colors">Support Atelier</li>
                <Link to="/trust" className="block hover:text-burgundy transition-colors">Trust Architecture</Link>
                <li className="hover:text-burgundy cursor-pointer transition-colors">Logistics Policy</li>
                <li className="hover:text-burgundy cursor-pointer transition-colors">Patron Rights</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-8 text-[10px] font-bold uppercase tracking-[0.2em] text-text-dark">The House</h4>
              <ul className="space-y-6 text-sm text-gray-400 font-light">
                <li className="hover:text-burgundy cursor-pointer transition-colors">Our Roots</li>
                <li className="hover:text-burgundy cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-burgundy cursor-pointer transition-colors">Press Room</li>
                <li className="hover:text-burgundy cursor-pointer transition-colors">Contact Hub</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between border-t border-gray-100 pt-16 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-300">
            <p>© 2026 SOFRA ATELIER INC. ROOTS IN TRADITION.</p>
            <div className="mt-8 flex gap-12 md:mt-0 items-center">
              <span className="hover:text-burgundy cursor-pointer transition-colors">Privacy Charter</span>
              <span className="hover:text-burgundy cursor-pointer transition-colors">Patron Terms</span>
              <span className="hover:text-burgundy cursor-pointer transition-colors">Transparency</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
