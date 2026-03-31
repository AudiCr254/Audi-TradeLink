import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Search, Filter, Check, Star, TrendingUp, Clock, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProductCard } from '@/components/ProductCard';
import { useStore } from '@/store/useStore';
import { categories, products } from '@/data/mockData';

gsap.registerPlugin(ScrollTrigger);

export function Home() {
  const { setSearchQuery, setSelectedCategory } = useStore();
  const heroRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.fromTo(
        '.hero-content',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 }
      );
      gsap.fromTo(
        '.hero-card',
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', delay: 0.4 }
      );
      gsap.fromTo(
        '.hero-rule',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: 'power2.out', delay: 0.6 }
      );

      // Categories Animation
      gsap.fromTo(
        '.category-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: categoriesRef.current,
            start: 'top 80%',
          },
        }
      );

      // Spotlight Animation
      gsap.fromTo(
        '.spotlight-image',
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: spotlightRef.current,
            start: 'top 70%',
          },
        }
      );
      gsap.fromTo(
        '.spotlight-content',
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: spotlightRef.current,
            start: 'top 70%',
          },
        }
      );

      // Products Animation
      gsap.fromTo(
        '.product-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: productsRef.current,
            start: 'top 80%',
          },
        }
      );

      // How It Works Animation
      gsap.fromTo(
        '.step-item',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: howItWorksRef.current,
            start: 'top 70%',
          },
        }
      );

      // Stats Animation
      gsap.fromTo(
        '.stat-card',
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const featuredProduct = products[4]; // High-voltage contactor

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="images/hero-workshop.jpg"
            alt="Industrial workshop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D10]/80 via-[#0B0D10]/50 to-transparent" />
        </div>

        <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="hero-content max-w-xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Audi TradeLink Market Place
              </h1>
              <div className="hero-rule h-0.5 bg-[#D31111] w-3/4 mb-6 origin-left" />
              <p className="text-lg text-gray-300 mb-8">
                Verified suppliers. Technical specs. Fast fulfillment.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button size="lg" className="bg-[#D31111] hover:bg-[#b30e0e] gap-2">
                    Browse products
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="border-white/30 text-blue-500 hover:bg-white/10">
                    Login
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Content - Featured Card */}
            <div className="hero-card hidden lg:block">
              <div className="bg-white/95 backdrop-blur-sm rounded-[18px] p-6 shadow-2xl max-w-md ml-auto">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-[#D31111] text-white text-xs font-medium px-3 py-1 rounded-full">
                    Featured
                  </span>
                </div>
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="w-full h-48 object-contain mb-4"
                />
                <h3 className="font-bold text-lg text-[#0B0D10] mb-2">
                  {featuredProduct.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{featuredProduct.specs}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#0B0D10]">
                    ${featuredProduct.price.toFixed(2)}
                  </span>
                  <Link to={`/product/${featuredProduct.id}`}>
                    <Button variant="outline" size="sm" className="gap-1">
                      View details
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section ref={categoriesRef} className="py-16 lg:py-24 bg-[#F6F7F9]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#0B0D10]">
              Explore by category
            </h2>
            <Link to="/products" className="text-[#D31111] font-medium hover:underline flex items-center gap-1">
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.name);
                }}
                className="category-card group text-left bg-white rounded-[18px] overflow-hidden shadow-[0_18px_40px_rgba(11,13,16,0.10)] hover:shadow-[0_24px_50px_rgba(11,13,16,0.15)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[#0B0D10] mb-1 group-hover:text-[#D31111] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">{category.itemCount.toLocaleString()} items</p>
                  <div className="mt-3 h-0.5 bg-[#D31111] w-1/2 origin-left group-hover:w-3/4 transition-all duration-300" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Supplier Spotlight Section */}
      <section ref={spotlightRef} className="py-16 lg:py-24 bg-[#F6F7F9]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Image */}
            <div className="spotlight-image relative">
              <div className="aspect-[3/4] rounded-[18px] overflow-hidden shadow-2xl">
                <img
                  src="images/supplier-portrait.jpg"
                  alt="Supplier spotlight"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-[18px] p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#D31111]/10 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-[#D31111]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#0B0D10]">4.8/5</p>
                    <p className="text-sm text-gray-500">Rating</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="spotlight-content">
              <span className="text-sm font-medium text-[#D31111] uppercase tracking-wider">
                Supplier spotlight
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0B0D10] mt-3 mb-4">
                Precision isn't an accident.
              </h2>
              <div className="h-0.5 bg-[#D31111] w-1/3 mb-6" />
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our verified suppliers meet technical, ethical, and delivery standards—so you don't have to guess.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  'ISO-certified quality systems',
                  'Documented traceability',
                  'Consistent lead times',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#D31111]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-[#D31111]" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <Link to="/suppliers">
                <Button className="bg-[#D31111] hover:bg-[#b30e0e] gap-2">
                  View supplier profile
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section ref={productsRef} className="py-16 lg:py-24 bg-[#F6F7F9]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#0B0D10]">
              Browse products
            </h2>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  className="pl-10 w-full sm:w-64"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <div key={product.id} className="product-card">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/products">
              <Button variant="outline" size="lg" className="gap-2">
                View all products
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section ref={howItWorksRef} className="py-16 lg:py-24 bg-[#0B0D10]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                How TraderLink works
              </h2>
              <div className="h-0.5 bg-[#D31111] w-1/3 mb-10" />

              <div className="space-y-8">
                {[
                  {
                    number: '01',
                    title: 'Search',
                    description: 'Filter by spec, certification, and location.',
                  },
                  {
                    number: '02',
                    title: 'Compare',
                    description: 'View datasheets, pricing, and lead times.',
                  },
                  {
                    number: '03',
                    title: 'Order',
                    description: 'Buy direct or request a quote—in minutes.',
                  },
                ].map((step, index) => (
                  <div key={index} className="step-item flex gap-6">
                    <span className="text-4xl font-bold text-[#D31111]">{step.number}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                      <p className="text-gray-400">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-[18px] overflow-hidden">
                <img
                  src="images/how-it-works-hands.jpg"
                  alt="How it works"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 lg:py-24 bg-[#F6F7F9]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0B0D10] mb-4">
                Verified suppliers. Real accountability.
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We check certifications, references, and delivery history—so you can quote with confidence.
              </p>
            </div>
            <div className="lg:text-right">
              <Link to="/verification">
                <Button variant="outline" className="gap-2">
                  See verification criteria
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              { value: '4,200+', label: 'Verified suppliers', icon: TrendingUp },
              { value: '98.2%', label: 'On-time delivery', icon: Clock },
              { value: '12h', label: 'Avg. quote response', icon: TrendingUp },
              { value: '160+', label: 'Countries served', icon: Globe },
            ].map((stat, index) => (
              <div
                key={index}
                className="stat-card bg-white rounded-[18px] p-6 shadow-[0_18px_40px_rgba(11,13,16,0.10)]"
              >
                <stat.icon className="w-8 h-8 text-[#D31111] mb-4" />
                <p className="text-3xl lg:text-4xl font-bold text-[#0B0D10] mb-2">{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <div className="mt-4 h-0.5 bg-[#D31111] w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-[#F6F7F9]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="bg-[#D31111] rounded-[18px] p-8 lg:p-16 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to find the right part?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Join thousands of buyers and suppliers on TraderLink. Start browsing or list your products today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/products">
                <Button size="lg" variant="secondary" className="gap-2">
                  Browse products
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Become a supplier
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
