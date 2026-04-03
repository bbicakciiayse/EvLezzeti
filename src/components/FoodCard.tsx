import { Star, Clock, MapPin, ShieldCheck } from 'lucide-react';
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
      whileHover={{ y: -4 }}
      className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md"
      onClick={handleCardClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 right-3 rounded-full bg-white/90 px-2 py-1 text-xs font-bold text-orange-600 backdrop-blur-sm">
          {item.category}
        </div>
      </div>
      <div className="p-4">
        <div className="mb-1 flex items-center justify-between">
          <h3 className="line-clamp-1 text-lg font-bold text-gray-900">{item.title}</h3>
          <span className="text-lg font-bold text-orange-600">{formatCurrency(item.price)}</span>
        </div>
        
        <div className="mb-3 flex items-center gap-1 text-sm text-gray-500">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="font-medium text-gray-900">{item.rating}</span>
          <span>({item.reviewCount} yorum)</span>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 overflow-hidden rounded-full bg-gray-100">
               <img src={`https://ui-avatars.com/api/?name=${item.sellerName}&background=random`} alt={item.sellerName} className="h-full w-full object-cover" />
            </div>
            <span className="text-sm font-medium text-gray-700">{item.sellerName}</span>
            <ShieldCheck className="h-4 w-4 text-blue-500" />
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            <span>{item.prepTime}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
