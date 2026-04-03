import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, MapPin, ChevronRight, Check } from 'lucide-react';
import { Button } from './Button';

interface FilterOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  initialFilters: FilterState;
}

export interface FilterState {
  cuisineTypes: string[];
  dietaryPreferences: string[];
  priceRange: [number, number];
  minRating: number;
  locations: string[];
  sortBy: 'popular' | 'newest' | 'price_asc' | 'price_desc';
}

const CUISINE_TYPES = ['Türk Mutfağı', 'Ege Mutfağı', 'Anadolu Mutfağı', 'Gaziantep Mutfağı', 'Modern Mutfak', 'Karadeniz Mutfağı'];
const DIETARY_PREFS = ['vejetaryen', 'vegan', 'glutensiz', 'şekersiz', 'organik'];
const LOCATIONS = ['Beşiktaş, İstanbul', 'Kadıköy, İstanbul', 'Şişli, İstanbul', 'Üsküdar, İstanbul', 'Sarıyer, İstanbul'];

export const FilterOverlay = ({ isOpen, onClose, onApply, initialFilters }: FilterOverlayProps) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const toggleItem = (list: string[], item: string) => {
    return list.includes(item) ? list.filter((i) => i !== item) : [...list, item];
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const resetFilters = () => {
    setFilters({
      cuisineTypes: [],
      dietaryPreferences: [],
      priceRange: [0, 500],
      minRating: 0,
      locations: [],
      sortBy: 'popular',
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <h2 className="text-xl font-black text-gray-900">Gelişmiş Filtreler</h2>
              <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100">
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 scrollbar-hide">
              {/* Sort By */}
              <section>
                <h3 className="mb-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Sıralama</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'popular', label: 'En Popüler' },
                    { id: 'newest', label: 'En Yeni' },
                    { id: 'price_asc', label: 'Fiyat: Artan' },
                    { id: 'price_desc', label: 'Fiyat: Azalan' },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setFilters({ ...filters, sortBy: option.id as any })}
                      className={cn(
                        'rounded-xl px-4 py-3 text-sm font-bold transition-all text-left flex items-center justify-between',
                        filters.sortBy === option.id ? 'bg-orange-600 text-white shadow-lg shadow-orange-200' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      )}
                    >
                      {option.label}
                      {filters.sortBy === option.id && <Check className="h-4 w-4" />}
                    </button>
                  ))}
                </div>
              </section>

              {/* Cuisine Types */}
              <section>
                <h3 className="mb-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Mutfak Türü</h3>
                <div className="flex flex-wrap gap-2">
                  {CUISINE_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilters({ ...filters, cuisineTypes: toggleItem(filters.cuisineTypes, type) })}
                      className={cn(
                        'rounded-full px-4 py-2 text-sm font-bold transition-all',
                        filters.cuisineTypes.includes(type) ? 'bg-orange-100 text-orange-700 ring-2 ring-orange-600' : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-orange-200'
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </section>

              {/* Dietary Preferences */}
              <section>
                <h3 className="mb-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Diyet Tercihleri</h3>
                <div className="flex flex-wrap gap-2">
                  {DIETARY_PREFS.map((pref) => (
                    <button
                      key={pref}
                      onClick={() => setFilters({ ...filters, dietaryPreferences: toggleItem(filters.dietaryPreferences, pref) })}
                      className={cn(
                        'rounded-full px-4 py-2 text-sm font-bold transition-all capitalize',
                        filters.dietaryPreferences.includes(pref) ? 'bg-green-100 text-green-700 ring-2 ring-green-600' : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-green-200'
                      )}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </section>

              {/* Price Range */}
              <section>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Fiyat Aralığı</h3>
                  <span className="text-sm font-bold text-orange-600">₺0 - ₺{filters.priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="500"
                  step="10"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters({ ...filters, priceRange: [0, parseInt(e.target.value)] })}
                  className="w-full accent-orange-600"
                />
              </section>

              {/* Min Rating */}
              <section>
                <h3 className="mb-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Minimum Puan</h3>
                <div className="flex gap-2">
                  {[3, 3.5, 4, 4.5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setFilters({ ...filters, minRating: rating })}
                      className={cn(
                        'flex-1 rounded-xl py-3 text-sm font-bold transition-all flex items-center justify-center gap-1',
                        filters.minRating === rating ? 'bg-amber-100 text-amber-700 ring-2 ring-amber-600' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      )}
                    >
                      <Star className={cn('h-4 w-4', filters.minRating === rating ? 'fill-amber-600' : '')} />
                      {rating}+
                    </button>
                  ))}
                </div>
              </section>

              {/* Locations */}
              <section>
                <h3 className="mb-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Konum</h3>
                <div className="space-y-2">
                  {LOCATIONS.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setFilters({ ...filters, locations: toggleItem(filters.locations, loc) })}
                      className={cn(
                        'flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all',
                        filters.locations.includes(loc) ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-600' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {loc}
                      </div>
                      {filters.locations.includes(loc) && <Check className="h-4 w-4" />}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 p-6 flex gap-4">
              <Button variant="outline" className="flex-1" onClick={resetFilters}>Temizle</Button>
              <Button className="flex-[2]" onClick={handleApply}>Sonuçları Gör</Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

import { cn } from '../lib/utils';
