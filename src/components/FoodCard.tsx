import { Star, Clock, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { FoodItem } from '../types';
import { formatCurrency } from '../lib/utils';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface FoodCardProps {
  item: FoodItem;
  onClick?: () => void;
  key?: string | number;
}

export const FoodCard = ({ item, onClick }: FoodCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/product/${item.id}`);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group cursor-pointer overflow-hidden rounded-[40px] bg-white shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-2xl hover:shadow-burgundy/10"
      onClick={handleCardClick}
    >
      <div className="relative aspect-[1/1] overflow-hidden p-3">
        <div className="h-full w-full overflow-hidden rounded-[32px] relative shadow-inner">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent h-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/90 text-gray-400 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all hover:text-terracotta translate-y-2 group-hover:translate-y-0">
            <Heart className="h-5 w-5" />
          </div>
          <div className="absolute top-4 left-4 rounded-full bg-burgundy/10 backdrop-blur-sm px-4 py-1.5 text-[10px] font-bold text-burgundy ring-1 ring-burgundy/20 uppercase tracking-widest">
            {item.category}
          </div>
        </div>
      </div>
      <div className="p-8 pt-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="line-clamp-1 text-2xl font-serif text-text-dark group-hover:text-burgundy transition-colors">{item.title}</h3>
        </div>
        
        <div className="mb-6 flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-terracotta text-terracotta" />
            <span className="text-sm font-bold text-text-dark">{item.rating}</span>
          </div>
          <div className="h-1 w-1 rounded-full bg-gray-300" />
          <span className="text-sm text-gray-400 font-light italic">{item.reviewCount} neighbor stories</span>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-xl bg-cream ring-2 ring-white shadow-sm group-hover:ring-terracotta/20 transition-all">
               <img src={`https://ui-avatars.com/api/?name=${item.sellerName}&background=random`} alt={item.sellerName} className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-xs font-bold text-text-dark leading-none">{item.sellerName}</p>
              <div className="flex items-center gap-1 mt-1">
                <ShieldCheck className="h-3 w-3 text-green-500" />
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Verified</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-gray-300 uppercase tracking-[0.2em] mb-1">Appreciation</p>
            <p className="text-xl font-serif text-burgundy leading-none">{formatCurrency(item.price)}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
