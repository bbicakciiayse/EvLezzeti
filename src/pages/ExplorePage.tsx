import { motion } from 'motion/react';
import { MOCK_FOOD_ITEMS } from '../data';
import { FoodCard } from '../components/FoodCard';
import { Filter, Search, ChevronDown, SlidersHorizontal, X } from 'lucide-react';
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
      // Remove the param after opening so it doesn't reopen on refresh if not intended
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('filter');
      setSearchParams(newParams, { replace: true });
    }
  }, [searchParams]);
  const [filters, setFilters] = useState<FilterState>({
    cuisineTypes: [],
    dietaryPreferences: [],
    priceRange: [0, 500],
    minRating: 0,
    locations: [],
    sortBy: 'popular',
  });

  const filteredItems = useMemo(() => {
    let result = [...MOCK_FOOD_ITEMS];

    // Filter by Cuisine
    if (filters.cuisineTypes.length > 0) {
      result = result.filter((item) => filters.cuisineTypes.includes(item.cuisineType));
    }

    // Filter by Dietary
    if (filters.dietaryPreferences.length > 0) {
      result = result.filter((item) =>
        filters.dietaryPreferences.every((pref) => item.dietaryPreferences.includes(pref))
      );
    }

    // Filter by Price
    result = result.filter((item) => item.price <= filters.priceRange[1]);

    // Filter by Rating
    if (filters.minRating > 0) {
      result = result.filter((item) => item.rating >= filters.minRating);
    }

    // Filter by Location
    if (filters.locations.length > 0) {
      result = result.filter((item) => filters.locations.includes(item.location));
    }

    // Sort
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
    (filters.minRating > 0 ? 1 : 0) + 
    filters.locations.length;

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Lezzetleri Keşfet</h1>
            <p className="text-gray-600">Bölgenizdeki en iyi ev yemeklerini filtreleyerek bulun.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant={activeFilterCount > 0 ? 'primary' : 'outline'} 
              className="gap-2 relative"
              onClick={() => setIsFilterOpen(true)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Gelişmiş Filtreler
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-orange-600 ring-2 ring-orange-600">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Active Filters Bar */}
        {activeFilterCount > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {filters.cuisineTypes.map(t => (
              <span key={t} className="flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
                {t}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setFilters({...filters, cuisineTypes: filters.cuisineTypes.filter(i => i !== t)})} />
              </span>
            ))}
            {filters.dietaryPreferences.map(p => (
              <span key={p} className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 capitalize">
                {p}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setFilters({...filters, dietaryPreferences: filters.dietaryPreferences.filter(i => i !== p)})} />
              </span>
            ))}
            {filters.minRating > 0 && (
              <span className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
                {filters.minRating}+ Yıldız
                <X className="h-3 w-3 cursor-pointer" onClick={() => setFilters({...filters, minRating: 0})} />
              </span>
            )}
            <button 
              onClick={() => setFilters({ cuisineTypes: [], dietaryPreferences: [], priceRange: [0, 500], minRating: 0, locations: [], sortBy: 'popular' })}
              className="text-xs font-bold text-gray-400 hover:text-orange-600"
            >
              Tümünü Temizle
            </button>
          </div>
        )}

        {/* Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 rounded-full bg-gray-100 p-6">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Sonuç Bulunamadı</h3>
            <p className="text-gray-600">Filtrelerinizi değiştirerek tekrar deneyebilirsiniz.</p>
            <Button variant="outline" className="mt-6" onClick={() => setFilters({ cuisineTypes: [], dietaryPreferences: [], priceRange: [0, 500], minRating: 0, locations: [], sortBy: 'popular' })}>
              Filtreleri Sıfırla
            </Button>
          </div>
        )}

        {/* Load More */}
        {filteredItems.length > 0 && (
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" className="px-12">Daha Fazla Göster</Button>
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
