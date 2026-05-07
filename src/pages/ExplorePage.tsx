import { motion } from 'motion/react';
import { MOCK_FOOD_ITEMS } from '../data';
import { FoodCard } from '../components/FoodCard';
import { Filter, Search, ChevronDown, SlidersHorizontal, X, ArrowUpDown } from 'lucide-react';
import { Button } from '../components/Button';
import { useState, useMemo, useEffect } from 'react';
import { FilterOverlay, FilterState } from '../components/FilterOverlay';
import { useSearchParams } from 'react-router-dom';

export const ExplorePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get('filter') === 'true') {
      setIsFilterOpen(true);
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('filter');
      setSearchParams(newParams, { replace: true });
    }
  }, [searchParams]);

  const [filters, setFilters] = useState<FilterState>({
    cuisineTypes: [],
    dietaryPreferences: [],
    flavorProfiles: [],
    occasions: [],
    priceRange: [0, 1000],
    minRating: 0,
    locations: [],
    sortBy: 'popular',
  });

  const filteredItems = useMemo(() => {
    let result = [...MOCK_FOOD_ITEMS];

    if (filters.cuisineTypes.length > 0) {
      result = result.filter((item) => filters.cuisineTypes.includes(item.cuisineType));
    }

    if (filters.dietaryPreferences.length > 0) {
      result = result.filter((item) =>
        filters.dietaryPreferences.every((pref) => item.dietaryPreferences.includes(pref))
      );
    }

    if (filters.flavorProfiles.length > 0) {
      result = result.filter((item) =>
        filters.flavorProfiles.some((profile) => item.flavorProfiles.includes(profile))
      );
    }

    if (filters.occasions.length > 0) {
      result = result.filter((item) =>
        filters.occasions.some((occasion) => item.occasions.includes(occasion))
      );
    }

    result = result.filter((item) => item.price <= filters.priceRange[1]);

    if (filters.minRating > 0) {
      result = result.filter((item) => item.rating >= filters.minRating);
    }

    if (filters.locations.length > 0) {
      result = result.filter((item) => filters.locations.includes(item.location));
    }

    switch (filters.sortBy) {
      case 'newest':
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [filters]);

  const activeFilterCount = 
    filters.cuisineTypes.length + 
    filters.dietaryPreferences.length + 
    filters.flavorProfiles.length +
    filters.occasions.length +
    (filters.minRating > 0 ? 1 : 0) + 
    filters.locations.length;

  return (
    <div className="min-h-screen bg-cream pt-12 pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-serif text-text-dark lg:text-7xl">Culinary Ateliers</h1>
            <p className="mt-6 text-xl text-gray-400 font-light leading-relaxed">
              Discover artisanal gastronomic creations crafted by talented culinary artisans in your neighborhood. 
              Filtering for flavor, trust, and heart.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              size="lg"
              variant={activeFilterCount > 0 ? 'primary' : 'outline'} 
              className={`rounded-2xl h-14 px-8 border-burgundy gap-3 relative ${activeFilterCount > 0 ? 'bg-burgundy text-cream' : 'text-burgundy hover:bg-burgundy/5'}`}
              onClick={() => setIsFilterOpen(true)}
            >
              <SlidersHorizontal className="h-5 w-5" />
              Sophisticated Filters
              {activeFilterCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-xl bg-terracotta text-[10px] font-bold text-cream shadow-lg ring-4 ring-cream">
                  {activeFilterCount}
                </span>
              )}
            </Button>
            <div className="hidden lg:flex items-center gap-2 px-6 h-14 rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 text-sm font-bold text-gray-400">
              <ArrowUpDown className="h-4 w-4" />
              <span>Sort by: Popularity</span>
            </div>
          </div>
        </div>

        {/* Active Filters Bar */}
        {activeFilterCount > 0 && (
          <div className="mb-12 flex flex-wrap gap-3 items-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-300 mr-2">Refined by:</span>
            {filters.cuisineTypes.map(t => (
              <span key={t} className="flex items-center gap-2 rounded-2xl bg-burgundy/5 px-4 py-2 text-xs font-bold text-burgundy ring-1 ring-burgundy/10">
                {t}
                <X className="h-4 w-4 cursor-pointer opacity-50 hover:opacity-100 transition-opacity" onClick={() => setFilters({...filters, cuisineTypes: filters.cuisineTypes.filter(i => i !== t)})} />
              </span>
            ))}
            {filters.dietaryPreferences.map(p => (
              <span key={p} className="flex items-center gap-2 rounded-2xl bg-burgundy/5 px-4 py-2 text-xs font-bold text-burgundy ring-1 ring-burgundy/10 capitalize">
                {p}
                <X className="h-4 w-4 cursor-pointer opacity-50 hover:opacity-100 transition-opacity" onClick={() => setFilters({...filters, dietaryPreferences: filters.dietaryPreferences.filter(i => i !== p)})} />
              </span>
            ))}
            {filters.flavorProfiles.map(f => (
              <span key={f} className="flex items-center gap-2 rounded-2xl bg-amber-500/10 px-4 py-2 text-xs font-bold text-amber-600 ring-1 ring-amber-600/20">
                {f}
                <X className="h-4 w-4 cursor-pointer opacity-50 hover:opacity-100 transition-opacity" onClick={() => setFilters({...filters, flavorProfiles: filters.flavorProfiles.filter(i => i !== f)})} />
              </span>
            ))}
            {filters.occasions.map(o => (
              <span key={o} className="flex items-center gap-2 rounded-2xl bg-indigo-500/10 px-4 py-2 text-xs font-bold text-indigo-600 ring-1 ring-indigo-600/20">
                {o}
                <X className="h-4 w-4 cursor-pointer opacity-50 hover:opacity-100 transition-opacity" onClick={() => setFilters({...filters, occasions: filters.occasions.filter(i => i !== o)})} />
              </span>
            ))}
            {filters.minRating > 0 && (
              <span className="flex items-center gap-2 rounded-2xl bg-burgundy/5 px-4 py-2 text-xs font-bold text-burgundy ring-1 ring-burgundy/10">
                {filters.minRating}+ Stars
                <X className="h-4 w-4 cursor-pointer opacity-50 hover:opacity-100 transition-opacity" onClick={() => setFilters({...filters, minRating: 0})} />
              </span>
            )}
            <button 
              onClick={() => setFilters({ cuisineTypes: [], dietaryPreferences: [], flavorProfiles: [], occasions: [], priceRange: [0, 1000], minRating: 0, locations: [], sortBy: 'popular' })}
              className="text-xs font-bold text-terracotta hover:underline ml-2"
            >
              Reset Canvas
            </button>
          </div>
        )}

        {/* Grid */}
        <div className="relative">
          {filteredItems.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filteredItems.map((item) => (
                <FoodCard key={item.id} item={item} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <div className="mb-8 rounded-[48px] bg-white p-12 shadow-inner ring-1 ring-gray-100">
                <Search className="h-20 w-20 text-cream stroke-burgundy/20" />
              </div>
              <h3 className="text-4xl font-serif text-text-dark mb-4">No Flavors Found</h3>
              <p className="text-xl text-gray-400 font-light max-w-md mx-auto">
                Our culinary artisans are working hard, but no dishes match your current palette. Try a broader search.
              </p>
              <Button size="xl" variant="outline" className="mt-12 scale-110 rounded-[28px] border-burgundy text-burgundy px-12 h-16" onClick={() => setFilters({ cuisineTypes: [], dietaryPreferences: [], flavorProfiles: [], occasions: [], priceRange: [0, 1000], minRating: 0, locations: [], sortBy: 'popular' })}>
                Reset Filters
              </Button>
            </motion.div>
          )}
        </div>

        {/* Load More */}
        {filteredItems.length > 0 && (
          <div className="mt-24 text-center">
            <Button variant="outline" size="xl" className="px-20 rounded-[28px] h-20 border-burgundy/20 text-burgundy hover:bg-burgundy/5 text-xl font-serif">Load More Stories</Button>
          </div>
        )}
      </div>

      <FilterOverlay 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        onApply={setFilters}
        initialFilters={filters}
      />
    </div>
  );
};
