import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStore } from '@/store/useStore';
import { mockUsers } from '@/data/mockData';
import { toast } from 'sonner';

export function Login() {
  const navigate = useNavigate();
  const { login } = useStore();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'customer' | 'trader'>('customer');
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login - in real app, this would call an API
    const user = mockUsers.find(u => u.email === email);
    
    if (user) {
      login(user);
      toast.success('Welcome back!');
      navigate('/');
    } else {
      // For demo, allow any login
      const mockUser = {
        id: 'demo-' + Date.now(),
        email,
        role: role,
        name: name || email.split('@')[0],
        verified: true,
      };
      login(mockUser);
      toast.success('Welcome!');
      navigate('/');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    // Mock registration
    const newUser = {
      id: 'new-' + Date.now(),
      email,
      role: role,
      name: name || email.split('@')[0],
      phone,
      verified: false,
    };
    
    login(newUser);
    toast.success('Account created successfully!');
    navigate('/');
  };

  return (
    <main className="min-h-screen bg-[#F6F7F9] pt-20 flex items-center justify-center py-12">
      <div className="w-full max-w-md px-4">
        <div className="bg-white rounded-[18px] shadow-[0_18px_40px_rgba(11,13,16,0.10)] p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-[#D31111] rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">AT</span>
            </div>
            <h1 className="text-2xl font-bold text-[#0B0D10]">
              {isRegistering ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-gray-500 mt-2">
              {isRegistering 
                ? 'Join Audi TraderLink today' 
                : 'Sign in to your account'}
            </p>
          </div>

          {/* Role Selection */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setRole('customer')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                role === 'customer'
                  ? 'bg-[#D31111] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Register as Customer
            </button>
            <button
              onClick={() => setRole('trader')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                role === 'trader'
                  ? 'bg-[#D31111] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Register as Trader
            </button>
          </div>

          {isRegistering ? (
            // Registration Form
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {role === 'trader' && (
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="businessName"
                      type="text"
                      placeholder="Enter your business name"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#D31111] hover:bg-[#b30e0e] h-12"
              >
                Create Account
              </Button>

              <p className="text-center text-sm text-gray-500">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegistering(false)}
                  className="text-[#D31111] hover:underline font-medium"
                >
                  Sign in
                </button>
              </p>
            </form>
          ) : (
            // Login Form
            <form onSubmit={handleLogin} className="space-y-4">
              <Tabs defaultValue="customer" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="customer" onClick={() => setRole('customer')}>
                    Customer
                  </TabsTrigger>
                  <TabsTrigger value="trader" onClick={() => setRole('trader')}>
                    Trader
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div>
                <Label htmlFor="loginEmail">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="loginEmail"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="loginPassword">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="loginPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-gray-500">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-[#D31111] hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#D31111] hover:bg-[#b30e0e] h-12"
              >
                Sign In
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              <p className="text-center text-sm text-gray-500">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegistering(true)}
                  className="text-[#D31111] hover:underline font-medium"
                >
                  Sign up
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
