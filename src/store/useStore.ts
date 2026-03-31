import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, User, CartItem } from '@/types';

interface StoreState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  
  // Favorites
  favorites: string[];
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  
  // Search & Filter
  searchQuery: string;
  selectedCategory: string | null;
  selectedLocation: string | null;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setSelectedLocation: (location: string | null) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Auth
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      
      // Cart
      cart: [],
      addToCart: (product, quantity = 1) => {
        const { cart } = get();
        const existingItem = cart.find(item => item.product.id === product.id);
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          set({ cart: [...cart, { product, quantity }] });
        }
      },
      removeFromCart: (productId) => {
        set({ cart: get().cart.filter(item => item.product.id !== productId) });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set({
          cart: get().cart.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
          )
        });
      },
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        return get().cart.reduce((total, item) => 
          total + item.product.price * item.quantity, 0
        );
      },
      getCartCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      },
      
      // Favorites
      favorites: [],
      addToFavorites: (productId) => {
        set({ favorites: [...get().favorites, productId] });
      },
      removeFromFavorites: (productId) => {
        set({ favorites: get().favorites.filter(id => id !== productId) });
      },
      isFavorite: (productId) => {
        return get().favorites.includes(productId);
      },
      
      // Search & Filter
      searchQuery: '',
      selectedCategory: null,
      selectedLocation: null,
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      setSelectedLocation: (location) => set({ selectedLocation: location }),
    }),
    {
      name: 'audi-traderlink-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        cart: state.cart,
        favorites: state.favorites,
      }),
    }
  )
);
