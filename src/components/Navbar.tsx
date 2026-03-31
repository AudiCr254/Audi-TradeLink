import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingCart, User, Menu, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useStore } from '@/store/useStore';
import { categories } from '@/data/mockData';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { 
    user, 
    isAuthenticated, 
    logout, 
    getCartCount, 
    favorites,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
  } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/products');
      setShowSearch(false);
    }
  };

  const cartCount = getCartCount();
  const favoriteCount = favorites.length;

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#D31111] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AT</span>
            </div>
            <span className={`font-bold text-lg lg:text-xl transition-colors ${
              isScrolled ? 'text-[#0B0D10]' : 'text-white'
            }`}>
              Audi TraderLink
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-[#D31111] ${
                isActive('/') ? 'text-[#D31111]' : isScrolled ? 'text-[#0B0D10]' : 'text-white'
              }`}
            >
              Home
            </Link>
            
            {/* Categories Dropdown */}
            <div className="relative group">
              <button className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-[#D31111] ${
                isScrolled ? 'text-[#0B0D10]' : 'text-white'
              }`}>
                Categories
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
                <div className="p-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        navigate('/products');
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-[#0B0D10] hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to="/products"
              className={`text-sm font-medium transition-colors hover:text-[#D31111] ${
                isActive('/products') ? 'text-[#D31111]' : isScrolled ? 'text-[#0B0D10]' : 'text-white'
              }`}
            >
              Products
            </Link>
            <Link
              to="/suppliers"
              className={`text-sm font-medium transition-colors hover:text-[#D31111] ${
                isActive('/suppliers') ? 'text-[#D31111]' : isScrolled ? 'text-[#0B0D10]' : 'text-white'
              }`}
            >
              Suppliers
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Search Toggle */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={`p-2 rounded-lg transition-colors ${
                isScrolled ? 'hover:bg-gray-100 text-[#0B0D10]' : 'hover:bg-white/10 text-white'
              }`}
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Favorites */}
            <Link
              to="/favorites"
              className={`relative p-2 rounded-lg transition-colors ${
                isScrolled ? 'hover:bg-gray-100 text-[#0B0D10]' : 'hover:bg-white/10 text-white'
              }`}
            >
              <Heart className="w-5 h-5" />
              {favoriteCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D31111] text-white text-xs rounded-full flex items-center justify-center">
                  {favoriteCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className={`relative p-2 rounded-lg transition-colors ${
                isScrolled ? 'hover:bg-gray-100 text-[#0B0D10]' : 'hover:bg-white/10 text-white'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D31111] text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="hidden lg:flex items-center gap-2">
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="w-4 h-4" />
                    {user?.name}
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Sign in</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-[#D31111] hover:bg-[#b30e0e]">
                    Get started
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className={`lg:hidden p-2 rounded-lg transition-colors ${
                    isScrolled ? 'hover:bg-gray-100 text-[#0B0D10]' : 'hover:bg-white/10 text-white'
                  }`}
                >
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-white">
                <div className="flex flex-col gap-6 mt-8">
                  <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">
                    Home
                  </Link>
                  <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">
                    Products
                  </Link>
                  <Link to="/suppliers" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">
                    Suppliers
                  </Link>
                  <Link to="/favorites" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">
                    Favorites ({favoriteCount})
                  </Link>
                  <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">
                    Cart ({cartCount})
                  </Link>
                  
                  {!isAuthenticated ? (
                    <div className="flex flex-col gap-3 mt-4">
                      <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full">Sign in</Button>
                      </Link>
                      <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full bg-[#D31111] hover:bg-[#b30e0e]">
                          Get started
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 mt-4">
                      <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full">My Profile</Button>
                      </Link>
                      <Button 
                        variant="destructive" 
                        className="w-full"
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                      >
                        Logout
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="pb-4 animate-in slide-in-from-top-2">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="text"
                placeholder="Search by product name, SKU, or supplier..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-white/95"
                autoFocus
              />
              <Button type="submit" className="bg-[#D31111] hover:bg-[#b30e0e]">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
