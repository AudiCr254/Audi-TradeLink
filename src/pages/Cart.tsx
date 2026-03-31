import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { traders } from '@/data/mockData';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export function Cart() {
  const navigate = useNavigate();
  const cartRef = useRef<HTMLDivElement>(null);
  
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    isAuthenticated,
  } = useStore();

  useEffect(() => {
    if (cartRef.current) {
      gsap.fromTo(
        cartRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, []);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.info('Please sign in to checkout');
      navigate('/login');
      return;
    }
    toast.success('Checkout functionality coming soon!');
  };

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#F6F7F9] pt-24 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-[#0B0D10] mb-4">Your cart is empty</h1>
          <p className="text-gray-500 mb-8 max-w-md">
            Looks like you haven't added any products to your cart yet.
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

  const total = getCartTotal();

  return (
    <main className="min-h-screen bg-[#F6F7F9] pt-20">
      <div ref={cartRef} className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-[#0B0D10] mb-8">
          Shopping Cart ({cart.length} items)
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const trader = traders.find(t => t.id === item.product.traderId);
              
              return (
                <div
                  key={item.product.id}
                  className="bg-white rounded-[18px] p-4 lg:p-6 shadow-[0_18px_40px_rgba(11,13,16,0.10)]"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Link to={`/product/${item.product.id}`} className="w-24 h-24 lg:w-32 lg:h-32 flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="font-semibold text-[#0B0D10] mb-1 line-clamp-2 hover:text-[#D31111] transition-colors">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-500 mb-2">{item.product.specs}</p>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{trader?.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">Sold by:</span>
                        <span className="font-medium">{trader?.businessName}</span>
                      </div>
                    </div>

                    {/* Price & Actions */}
                    <div className="flex flex-col items-end justify-between">
                      <span className="text-lg font-bold text-[#0B0D10]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-sm text-gray-500">
                      ${item.product.price.toFixed(2)} each
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[18px] p-6 shadow-[0_18px_40px_rgba(11,13,16,0.10)] sticky top-24">
              <h2 className="text-xl font-bold text-[#0B0D10] mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold text-[#0B0D10]">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full bg-[#D31111] hover:bg-[#b30e0e] h-12 text-lg gap-2"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </Button>

              <Link to="/products">
                <Button variant="outline" className="w-full mt-3">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
