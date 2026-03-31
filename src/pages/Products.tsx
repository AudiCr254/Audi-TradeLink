import { useEffect, useRef, useMemo } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Filter, X, ChevronDown, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { useStore } from '@/store/useStore';
import { categories, products, locations } from '@/data/mockData';

gsap.registerPlugin(ScrollTrigger);

export function Products() {
  const productsGridRef = useRef<HTMLDivElement>(null);
  
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedLocation,
    setSelectedLocation,
  } = useStore();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.product-grid-item',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: productsGridRef.current,
            start: 'top 85%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.specs.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;

      const matchesLocation =
        !selectedLocation ||
        locations.some((loc) =>
          loc.toLowerCase().includes(selectedLocation.toLowerCase())
        );

      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [searchQuery, selectedCategory, selectedLocation]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedLocation(null);
  };

  const hasFilters = searchQuery || selectedCategory || selectedLocation;

  return (
    <main className="min-h-screen bg-[#F6F7F9] pt-20">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-[#0B0D10] mb-6">
            Browse Products
          </h1>

          {/* Search & Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by product name, SKU, or supplier..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-12"
              />
            </div>

            <div className="flex gap-3">
              {/* Category Filter */}
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 h-12 border rounded-lg hover:border-[#D31111] transition-colors bg-white">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm">
                    {selectedCategory || 'All categories'}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100 z-10">
                  <div className="p-2">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="w-full text-left px-4 py-2 text-sm text-[#0B0D10] hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      All categories
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-colors ${
                          selectedCategory === cat.name
                            ? 'bg-[#D31111]/10 text-[#D31111]'
                            : 'text-[#0B0D10] hover:bg-gray-50'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Location Filter */}
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 h-12 border rounded-lg hover:border-[#D31111] transition-colors bg-white">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">
                    {selectedLocation || 'Location'}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100 z-10">
                  <div className="p-2">
                    <button
                      onClick={() => setSelectedLocation(null)}
                      className="w-full text-left px-4 py-2 text-sm text-[#0B0D10] hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      All locations
                    </button>
                    {locations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => setSelectedLocation(loc)}
                        className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-colors ${
                          selectedLocation === loc
                            ? 'bg-[#D31111]/10 text-[#D31111]'
                            : 'text-[#0B0D10] hover:bg-gray-50'
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              {hasFilters && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="h-12 gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Active Filters */}
          {hasFilters && (
            <div className="flex flex-wrap gap-2 mt-4">
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#D31111]/10 text-[#D31111] text-sm rounded-full">
                  Search: {searchQuery}
                  <button onClick={() => setSearchQuery('')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedCategory && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#D31111]/10 text-[#D31111] text-sm rounded-full">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory(null)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedLocation && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#D31111]/10 text-[#D31111] text-sm rounded-full">
                  Location: {selectedLocation}
                  <button onClick={() => setSelectedLocation(null)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-[#0B0D10]">{filteredProducts.length}</span> products
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div
            ref={productsGridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-grid-item">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-[#0B0D10] mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
