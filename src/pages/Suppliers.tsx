import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BadgeCheck, Star, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { traders } from '@/data/mockData';

gsap.registerPlugin(ScrollTrigger);

export function Suppliers() {
  const suppliersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.supplier-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: suppliersRef.current,
            start: 'top 80%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-[#F6F7F9] pt-20">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#0B0D10] mb-4">
            Verified Suppliers
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Connect with trusted suppliers who meet our rigorous verification standards. 
            Each supplier is vetted for quality, reliability, and compliance.
          </p>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="bg-[#0B0D10] py-8">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl lg:text-4xl font-bold text-[#D31111]">4,200+</p>
              <p className="text-gray-400 text-sm mt-1">Verified Suppliers</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-bold text-[#D31111]">98.2%</p>
              <p className="text-gray-400 text-sm mt-1">On-time Delivery</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-bold text-[#D31111]">4.7/5</p>
              <p className="text-gray-400 text-sm mt-1">Average Rating</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-bold text-[#D31111]">160+</p>
              <p className="text-gray-400 text-sm mt-1">Countries Served</p>
            </div>
          </div>
        </div>
      </div>

      {/* Suppliers Grid */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-12">
        <div ref={suppliersRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {traders.map((trader) => (
            <div
              key={trader.id}
              className="supplier-card bg-white rounded-[18px] p-6 shadow-[0_18px_40px_rgba(11,13,16,0.10)] hover:shadow-[0_24px_50px_rgba(11,13,16,0.15)] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  {trader.avatar ? (
                    <img
                      src={trader.avatar}
                      alt={trader.businessName}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-[#0B0D10]">
                      {trader.businessName.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[#0B0D10] truncate">
                      {trader.businessName}
                    </h3>
                    {trader.verified && (
                      <BadgeCheck className="w-5 h-5 text-[#D31111] flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{trader.location}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium text-sm">{trader.rating}</span>
                    <span className="text-gray-500 text-sm">({trader.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-6 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{trader.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{trader.email}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Link to={`/products?trader=${trader.id}`} className="flex-1">
                  <Button variant="outline" className="w-full" size="sm">
                    View Products
                  </Button>
                </Link>
                <Button
                  className="flex-1 bg-[#D31111] hover:bg-[#b30e0e]"
                  size="sm"
                  onClick={() => window.open(`mailto:${trader.email}`, '_blank')}
                >
                  Contact
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-12">
        <div className="bg-[#D31111] rounded-[18px] p-8 lg:p-12 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Become a Verified Supplier
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Join our network of trusted suppliers and reach thousands of buyers worldwide. 
            Get verified and start growing your business today.
          </p>
          <Link to="/register">
            <Button variant="secondary" size="lg" className="gap-2">
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
