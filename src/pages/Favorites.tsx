import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { useStore } from '@/store/useStore';
import { products } from '@/data/mockData';

gsap.registerPlugin(ScrollTrigger);

export function Favorites() {
  const favoritesRef = useRef<HTMLDivElement>(null);
  const { favorites } = useStore();

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  useEffect(() => {
    if (favoritesRef.current) {
      gsap.fromTo(
        favoritesRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, []);

  if (favoriteProducts.length === 0) {
    return (
      <main className="min-h-screen bg-[#F6F7F9] pt-24 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-[#0B0D10] mb-4">No favorites yet</h1>
          <p className="text-gray-500 mb-8 max-w-md">
            Save products you like to your favorites for quick access later.
          </p>
          <Link to="/products">
            <Button className="bg-[#D31111] hover:bg-[#b30e0e] gap-2">
              Browse Products
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F6F7F9] pt-20">
      <div ref={favoritesRef} className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-[#0B0D10]">
            My Favorites
          </h1>
          <span className="text-gray-500">
            {favoriteProducts.length} {favoriteProducts.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
