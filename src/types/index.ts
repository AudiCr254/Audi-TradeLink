export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  specs: string;
  stock: number;
  traderId: string;
  verified: boolean;
}

export interface Trader {
  id: string;
  businessName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  location: string;
  address: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  avatar?: string;
}

export interface User {
  id: string;
  email: string;
  role: 'customer' | 'trader';
  name: string;
  phone?: string;
  verified: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  itemCount: number;
  image: string;
}

export interface Review {
  id: string;
  customerId: string;
  customerName: string;
  traderId: string;
  rating: number;
  comment: string;
  date: string;
}
