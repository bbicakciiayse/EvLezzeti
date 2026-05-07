import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, MapPin, ChevronRight, Check, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../lib/utils';

interface FilterOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  initialFilters: FilterState;
}

export interface FilterState {
  cuisineTypes: string[];
  dietaryPreferences: string[];
  flavorProfiles: string[];
  occasions: string[];
  priceRange: [number, number];
  minRating: number;
  locations: string[];
  sortBy: 'popular' | 'newest' | 'price_asc' | 'price_desc';
}

const CUISINE_TYPES = ['Anadolu Seçkisi', 'Ege Mirası', 'Mezopotamya Sanatı', 'Kapadokya Esintisi', 'Modern Anadolu', 'Akdeniz Güncesi'];
const DIETARY_PREFS = ['vejetaryen', 'vegan', 'glutensiz', 'şekersiz', 'organik'];
const FLAVOR_PROFILES = ['Baharatlı', 'İsli', 'Ferah', 'Umami', 'Karamelize'];
const OCCASIONS = ['Aile Yemeği', 'Özel Davet', 'Romantik Akşam', 'Hızlı Gurme', 'Pazar Kahvaltısı'];
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
      flavorProfiles: [],
      occasions: [],
      priceRange: [0, 1000],
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
            className="fixed inset-0 z-[150] bg-burgundy/20 backdrop-blur-md"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-[160] flex w-full max-w-lg flex-col bg-cream shadow-2xl overflow-hidden rounded-l-[60px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-10 py-10 bg-white">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-burgundy text-cream shadow-xl">
                  <SlidersHorizontal className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-serif text-text-dark leading-none">Perspective</h2>
                  <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-2">Refine your discovery</p>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="rounded-2xl p-4 bg-cream text-gray-400 hover:text-burgundy transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-10 py-12 space-y-12 scrollbar-hide">
              {/* Sort By */}
              <section>
                <h3 className="mb-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-2">Hierarchy</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'popular', label: 'Eminence' },
                    { id: 'newest', label: 'Recent Finds' },
                    { id: 'price_asc', label: 'Value First' },
                    { id: 'price_desc', label: 'Premium First' },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setFilters({ ...filters, sortBy: option.id as any })}
                      className={cn(
                        'rounded-[24px] h-16 px-6 text-xs font-bold transition-all text-left flex items-center justify-between shadow-sm outline-none',
                        filters.sortBy === option.id 
                          ? 'bg-burgundy text-cream shadow-xl shadow-burgundy/20 ring-1 ring-burgundy/10' 
                          : 'bg-white text-gray-400 hover:text-burgundy hover:ring-1 hover:ring-burgundy/10'
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
                <h3 className="mb-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-2">Ancestral Heritage</h3>
                <div className="flex flex-wrap gap-3">
                  {CUISINE_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilters({ ...filters, cuisineTypes: toggleItem(filters.cuisineTypes, type) })}
                      className={cn(
                        'rounded-2xl px-6 py-4 text-xs font-bold transition-all shadow-sm ring-1 ring-gray-100',
                        filters.cuisineTypes.includes(type) 
                          ? 'bg-terracotta text-cream ring-terracotta shadow-xl shadow-terracotta/20' 
                          : 'bg-white text-gray-400 hover:bg-gray-50'
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </section>

              {/* Dietary Preferences */}
              <section>
                <h3 className="mb-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-2">Dietary Narratives</h3>
                <div className="flex flex-wrap gap-3">
                  {DIETARY_PREFS.map((pref) => (
                    <button
                      key={pref}
                      onClick={() => setFilters({ ...filters, dietaryPreferences: toggleItem(filters.dietaryPreferences, pref) })}
                      className={cn(
                        'rounded-2xl px-6 py-4 text-xs font-bold transition-all shadow-sm ring-1 ring-gray-100 capitalize',
                        filters.dietaryPreferences.includes(pref) 
                          ? 'bg-green-600 text-cream ring-green-600 shadow-xl shadow-green-600/20' 
                          : 'bg-white text-gray-400 hover:bg-gray-50'
                      )}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </section>

              {/* Flavor Profiles */}
              <section>
                <h3 className="mb-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-2">Flavor Profiles</h3>
                <div className="flex flex-wrap gap-3">
                  {FLAVOR_PROFILES.map((profile) => (
                    <button
                      key={profile}
                      onClick={() => setFilters({ ...filters, flavorProfiles: toggleItem(filters.flavorProfiles, profile) })}
                      className={cn(
                        'rounded-2xl px-6 py-4 text-xs font-bold transition-all shadow-sm ring-1 ring-gray-100',
                        filters.flavorProfiles.includes(profile) 
                          ? 'bg-amber-600 text-cream ring-amber-600 shadow-xl shadow-amber-600/20' 
                          : 'bg-white text-gray-400 hover:bg-gray-50'
                      )}
                    >
                      {profile}
                    </button>
                  ))}
                </div>
              </section>

              {/* Occasions */}
              <section>
                <h3 className="mb-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-2">Occasions</h3>
                <div className="flex flex-wrap gap-3">
                  {OCCASIONS.map((occasion) => (
                    <button
                      key={occasion}
                      onClick={() => setFilters({ ...filters, occasions: toggleItem(filters.occasions, occasion) })}
                      className={cn(
                        'rounded-2xl px-6 py-4 text-xs font-bold transition-all shadow-sm ring-1 ring-gray-100',
                        filters.occasions.includes(occasion) 
                          ? 'bg-indigo-600 text-cream ring-indigo-600 shadow-xl shadow-indigo-600/20' 
                          : 'bg-white text-gray-400 hover:bg-gray-50'
                      )}
                    >
                      {occasion}
                    </button>
                  ))}
                </div>
              </section>

              {/* Price Range */}
              <section>
                <div className="mb-8 flex items-center justify-between px-2">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Appreciation Threshold</h3>
                  <span className="text-xl font-serif text-burgundy">Up to {filters.priceRange[1]}₺</span>
                </div>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="20"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters({ ...filters, priceRange: [0, parseInt(e.target.value)] })}
                    className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-burgundy"
                  />
                </div>
              </section>

              {/* Min Rating */}
              <section>
                <h3 className="mb-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-2">Patron Trust</h3>
                <div className="flex gap-4">
                  {[3, 3.5, 4, 4.5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setFilters({ ...filters, minRating: rating })}
                      className={cn(
                        'flex-1 rounded-[24px] py-4 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm ring-1 ring-gray-100',
                        filters.minRating === rating 
                          ? 'bg-cream border-2 border-terracotta text-terracotta shadow-xl shadow-terracotta/5' 
                          : 'bg-white text-gray-400 hover:bg-gray-50'
                      )}
                    >
                      <Star className={cn('h-4 w-4', filters.minRating === rating ? 'fill-terracotta' : '')} />
                      {rating}+
                    </button>
                  ))}
                </div>
              </section>

              {/* Locations */}
              <section>
                <h3 className="mb-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-2">Coordinates</h3>
                <div className="space-y-3">
                  {LOCATIONS.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setFilters({ ...filters, locations: toggleItem(filters.locations, loc) })}
                      className={cn(
                        'flex w-full items-center justify-between rounded-[24px] px-8 h-16 text-xs font-bold transition-all shadow-sm ring-1 ring-gray-100',
                        filters.locations.includes(loc) 
                          ? 'bg-white border-2 border-burgundy text-burgundy shadow-xl shadow-burgundy/5' 
                          : 'bg-white text-gray-400 hover:bg-gray-50'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-terracotta" />
                        {loc}
                      </div>
                      {filters.locations.includes(loc) && <Check className="h-4 w-4" />}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="bg-white border-t border-gray-100 p-10 flex gap-4">
              <Button 
                variant="outline" 
                className="flex-1 rounded-2xl h-18 border-burgundy/10 text-burgundy font-bold text-xs uppercase tracking-widest gap-2" 
                onClick={resetFilters}
              >
                <RotateCcw className="h-4 w-4" /> Reset
              </Button>
              <Button 
                className="flex-[2] rounded-2xl h-18 bg-burgundy text-cream shadow-2xl shadow-burgundy/20 border-none font-bold text-xs uppercase tracking-widest" 
                onClick={handleApply}
              >
                Apply Filters
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
