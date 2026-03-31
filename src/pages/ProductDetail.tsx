import { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { Heart, MapPin, Phone, Mail, MessageCircle, BadgeCheck, ArrowLeft, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { products, traders } from '@/data/mockData';
import { toast } from 'sonner';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  
  const { 
    addToCart, 
    addToFavorites, 
    removeFromFavorites, 
    isFavorite,
    isAuthenticated 
  } = useStore();

  const product = products.find((p) => p.id === id);
  const trader = traders.find((t) => t.id === product?.traderId);
  const favorite = product ? isFavorite(product.id) : false;

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, []);

  if (!product || !trader) {
    return (
      <div className="min-h-screen bg-[#F6F7F9] pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#0B0D10] mb-4">Product not found</h1>
          <Link to="/products">
            <Button>Back to products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.info('Please sign in to add items to cart');
      navigate('/login');
      return;
    }
    addToCart(product);
    toast.success('Added to cart');
  };

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      toast.info('Please sign in to save favorites');
      navigate('/login');
      return;
    }
    if (favorite) {
      removeFromFavorites(product.id);
      toast.success('Removed from favorites');
    } else {
      addToFavorites(product.id);
      toast.success('Added to favorites');
    }
  };

  const handleContact = (type: 'whatsapp' | 'call' | 'email') => {
    switch (type) {
      case 'whatsapp':
        if (trader.whatsapp) {
          window.open(`https://wa.me/${trader.whatsapp.replace(/\D/g, '')}`, '_blank');
        } else {
          toast.info('WhatsApp not available for this trader');
        }
        break;
      case 'call':
        window.location.href = `tel:${trader.phone}`;
        break;
      case 'email':
        window.location.href = `mailto:${trader.email}`;
        break;
    }
  };

  return (
    <main className="min-h-screen bg-[#F6F7F9] pt-20">
      <div ref={contentRef} className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-[#D31111]">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-[#D31111]">Products</Link>
          <span>/</span>
          <span className="text-[#0B0D10]">{product.name}</span>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-[#D31111] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="bg-white rounded-[18px] p-8 shadow-[0_18px_40px_rgba(11,13,16,0.10)]">
            <div className="aspect-square flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-[#0B0D10] mb-2">
                  {product.name}
                </h1>
                <p className="text-gray-500">{product.specs}</p>
              </div>
              <button
                onClick={handleFavoriteClick}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  favorite
                    ? 'bg-[#D31111] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-5 h-5 ${favorite ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl lg:text-4xl font-bold text-[#D31111]">
                ${product.price.toFixed(2)}
              </span>
              {product.stock > 0 ? (
                <span className="text-green-600 text-sm font-medium">
                  In stock ({product.stock} available)
                </span>
              ) : (
                <span className="text-red-600 text-sm font-medium">Out of stock</span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Trader Info */}
            <div className="bg-white rounded-[18px] p-6 shadow-[0_18px_40px_rgba(11,13,16,0.10)] mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="font-bold text-[#0B0D10]">
                    {trader.businessName.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[#0B0D10]">{trader.businessName}</h3>
                    {trader.verified && (
                      <BadgeCheck className="w-5 h-5 text-[#D31111]" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="w-3 h-3" />
                    {trader.location}
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{trader.rating}</span>
                  <span className="text-gray-500 text-sm">({trader.reviewCount})</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleContact('whatsapp')}
                  className="flex items-center justify-center gap-2 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </button>
                <button
                  onClick={() => handleContact('call')}
                  className="flex items-center justify-center gap-2 py-2 px-4 bg-[#0B0D10] text-white rounded-lg hover:bg-[#1a1d23] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call
                </button>
                <button
                  onClick={() => handleContact('email')}
                  className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-[#D31111] hover:bg-[#b30e0e] h-14 text-lg gap-2"
                disabled={product.stock === 0}
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </Button>
              <Link to="/cart" className="flex-1">
                <Button variant="outline" className="w-full h-14 text-lg">
                  View Cart
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <div className="bg-white rounded-[18px] p-8 shadow-[0_18px_40px_rgba(11,13,16,0.10)]">
            <h2 className="text-xl font-bold text-[#0B0D10] mb-6">Product Details</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-[#0B0D10] mb-3">Specifications</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex justify-between py-2 border-b border-gray-100">
                    <span>Category</span>
                    <span className="font-medium">{product.category}</span>
                  </li>
                  <li className="flex justify-between py-2 border-b border-gray-100">
                    <span>Stock</span>
                    <span className="font-medium">{product.stock} units</span>
                  </li>
                  <li className="flex justify-between py-2 border-b border-gray-100">
                    <span>Verified</span>
                    <span className="font-medium">{product.verified ? 'Yes' : 'No'}</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[#0B0D10] mb-3">Supplier Information</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex justify-between py-2 border-b border-gray-100">
                    <span>Business Name</span>
                    <span className="font-medium">{trader.businessName}</span>
                  </li>
                  <li className="flex justify-between py-2 border-b border-gray-100">
                    <span>Location</span>
                    <span className="font-medium">{trader.location}</span>
                  </li>
                  <li className="flex justify-between py-2 border-b border-gray-100">
                    <span>Rating</span>
                    <span className="font-medium">{trader.rating}/5</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
