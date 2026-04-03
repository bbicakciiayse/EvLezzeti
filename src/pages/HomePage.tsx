import { motion } from 'motion/react';
import { Button } from '../components/Button';
import { FoodCard } from '../components/FoodCard';
import { MOCK_FOOD_ITEMS } from '../data';
import { Search, Utensils, Star, ShieldCheck, Truck, ShoppingBag, SlidersHorizontal } from 'lucide-react';

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32">
        <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-orange-50 blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-amber-50 blur-3xl" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="mb-4 inline-block rounded-full bg-orange-100 px-4 py-1.5 text-sm font-bold text-orange-700">
                🏠 Gerçek Ev Lezzeti Kapınızda
              </span>
              <h1 className="mb-6 text-5xl font-black leading-tight text-gray-900 sm:text-6xl">
                Komşunuzun Mutfağından <span className="text-orange-600">Sıcak Sofranıza.</span>
              </h1>
              <p className="mb-8 text-xl text-gray-600">
                WhatsApp ve Instagram karmaşasına son. Sertifikalı ev aşçılarından otantik, sağlıklı ve taze yemekleri keşfedin.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="px-8" onClick={() => navigate('/explore')}>Hemen Keşfet</Button>
                <Button variant="outline" size="lg" className="px-8 gap-2" onClick={() => navigate('/explore?filter=true')}>
                  <SlidersHorizontal className="h-5 w-5" />
                  Detaylı Filtrele
                </Button>
              </div>
              
              <div className="mt-10 flex items-center gap-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-white ring-2 ring-orange-50"
                      src={`https://i.pravatar.cc/150?u=${i}`}
                      alt="User"
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-bold text-gray-900">1,200+</span> mutlu müşteri bu hafta sipariş verdi.
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=800&fit=crop"
                  alt="Homemade Food"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              
              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 -right-6 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Güvenlik</p>
                    <p className="text-sm font-bold text-gray-900">Onaylı Satıcılar</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                    <Star className="h-6 w-6 fill-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Puan</p>
                    <p className="text-sm font-bold text-gray-900">4.9/5 Ortalama</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-black text-gray-900">Neden EvLezzeti?</h2>
            <p className="mx-auto max-w-2xl text-gray-600">Geleneksel lezzetleri modern teknoloji ve güvenle birleştiriyoruz.</p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: <Utensils className="h-8 w-8" />,
                title: "Otantik Lezzetler",
                desc: "Restoran zincirlerinde bulamayacağınız, nesilden nesile aktarılan gerçek tarifler."
              },
              {
                icon: <ShieldCheck className="h-8 w-8" />,
                title: "Güvenli Ödeme",
                desc: "Ödemeniz bizde güvende. Yemek teslim edilene kadar satıcıya aktarılmaz."
              },
              {
                icon: <Truck className="h-8 w-8" />,
                title: "Hızlı Teslimat",
                desc: "Kendi kurye ağımız veya satıcı teslimatı ile yemeğiniz sıcak servis edilir."
              }
            ].map((feature, i) => (
              <div key={i} className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Items */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-black text-gray-900">Popüler Lezzetler</h2>
              <p className="text-gray-600">Şu an bölgenizde en çok tercih edilen ev yemekleri.</p>
            </div>
            <Button variant="outline">Tümünü Gör</Button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MOCK_FOOD_ITEMS.slice(0, 4).map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[40px] bg-orange-600 px-8 py-16 text-center text-white sm:px-16">
          <div className="absolute top-0 left-0 -z-10 h-full w-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-500 via-orange-600 to-orange-700" />
          <h2 className="mb-6 text-4xl font-black sm:text-5xl">Kendi Mutfağınızın Patronu Olun</h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-orange-100">
            Yemek yapma yeteneğinizi kazanca dönüştürün. EvLezzeti ile binlerce müşteriye ulaşın, siparişlerinizi kolayca yönetin.
          </p>
          <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">Satıcı Başvurusu Yap</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50 pt-16 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-2 lg:col-span-2">
              <Link to="/" className="mb-6 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600 text-white">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <span className="text-xl font-black tracking-tight text-gray-900">
                  Ev<span className="text-orange-600">Lezzeti</span>
                </span>
              </Link>
              <p className="mb-6 max-w-xs text-gray-600">
                Türkiye'nin en büyük ev yapımı yemek pazaryeri. Sağlıklı, taze ve otantik lezzetler.
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-bold text-gray-900">Kurumsal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Hakkımızda</li>
                <li>Kariyer</li>
                <li>İletişim</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-bold text-gray-900">Destek</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Yardım Merkezi</li>
                <li>Sıkça Sorulan Sorular</li>
                <li>İptal ve İade</li>
                <li>Güvenlik</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-bold text-gray-900">Yasal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Kullanım Koşulları</li>
                <li>Gizlilik Politikası</li>
                <li>KVKK Aydınlatma Metni</li>
                <li>Çerez Politikası</li>
              </ul>
            </div>
          </div>
          <div className="mt-16 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
            © 2026 EvLezzeti. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>
  );
};

import { Link, useNavigate } from 'react-router-dom';
