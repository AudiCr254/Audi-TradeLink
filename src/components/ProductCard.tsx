import { Link } from 'react-router-dom';
import { Heart, MapPin, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { traders } from '@/data/mockData';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  showActions?: boolean;
}

export function ProductCard({ product, showActions = true }: ProductCardProps) {
  const { addToCart, addToFavorites, removeFromFavorites, isFavorite } = useStore();
  const trader = traders.find(t => t.id === product.traderId);
  const favorite = isFavorite(product.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product.id);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="group bg-white rounded-[18px] overflow-hidden shadow-[0_18px_40px_rgba(11,13,16,0.10)] hover:shadow-[0_24px_50px_rgba(11,13,16,0.15)] transition-all duration-300 hover:-translate-y-1 border border-gray-100">
      {/* Image */}
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.verified && (
          <div className="absolute top-3 left-3 bg-[#D31111] text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
            <BadgeCheck className="w-3 h-3" />
            Verified
          </div>
        )}
        {showActions && (
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              favorite
                ? 'bg-[#D31111] text-white'
                : 'bg-white/90 text-gray-600 hover:bg-white hover:text-[#D31111]'
            }`}
          >
            <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
          </button>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-[#0B0D10] mb-1 line-clamp-2 group-hover:text-[#D31111] transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-500 mb-2">{product.specs}</p>
        
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
          <MapPin className="w-3 h-3" />
          <span className="truncate">{trader?.location || 'Unknown location'}</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-[#0B0D10]">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            {trader?.verified && <BadgeCheck className="w-4 h-4 text-[#D31111]" />}
            <span className="truncate max-w-[100px]">{trader?.businessName}</span>
          </div>
        </div>

        {showActions && (
          <div className="flex gap-2">
            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-[#D31111] hover:bg-[#b30e0e] text-sm"
              size="sm"
            >
              Add to Cart
            </Button>
            <Link to={`/product/${product.id}`} className="flex-1">
              <Button variant="outline" className="w-full text-sm" size="sm">
                View Details
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
