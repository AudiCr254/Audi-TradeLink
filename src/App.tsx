import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Login } from './pages/Login';
import { Cart } from './pages/Cart';
import { Favorites } from './pages/Favorites';
import { Suppliers } from './pages/Suppliers';
import { Profile } from './pages/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F6F7F9]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
        <Toaster position="top-right" richColors />
      </div>
    </Router>
  );
}

export default App;
