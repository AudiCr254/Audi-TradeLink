import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Building2, Edit2, LogOut, Package, Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';

export function Profile() {
  const navigate = useNavigate();
  const { user, logout, favorites, cart } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  if (!user) {
    return (
      <main className="min-h-screen bg-[#F6F7F9] pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#0B0D10] mb-4">Please sign in</h1>
          <Link to="/login">
            <Button className="bg-[#D31111] hover:bg-[#b30e0e]">Sign In</Button>
          </Link>
        </div>
      </main>
    );
  }

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <main className="min-h-screen bg-[#F6F7F9] pt-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[18px] p-6 shadow-[0_18px_40px_rgba(11,13,16,0.10)] sticky top-24">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-[#D31111]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-[#D31111]" />
                </div>
                <h2 className="font-bold text-[#0B0D10]">{user.name}</h2>
                <p className="text-sm text-gray-500 capitalize">{user.role}</p>
              </div>

              <nav className="space-y-2">
                <Link
                  to="/favorites"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Heart className="w-5 h-5 text-gray-400" />
                  <span>Favorites</span>
                  <span className="ml-auto bg-[#D31111]/10 text-[#D31111] text-xs px-2 py-1 rounded-full">
                    {favorites.length}
                  </span>
                </Link>
                <Link
                  to="/cart"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ShoppingBag className="w-5 h-5 text-gray-400" />
                  <span>Cart</span>
                  <span className="ml-auto bg-[#D31111]/10 text-[#D31111] text-xs px-2 py-1 rounded-full">
                    {cart.length}
                  </span>
                </Link>
                {user.role === 'trader' && (
                  <Link
                    to="/my-products"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Package className="w-5 h-5 text-gray-400" />
                    <span>My Products</span>
                  </Link>
                )}
              </nav>

              <div className="border-t mt-6 pt-6">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-500 transition-colors w-full"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <div className="bg-white rounded-[18px] p-6 lg:p-8 shadow-[0_18px_40px_rgba(11,13,16,0.10)]">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-[#0B0D10]">Personal Information</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                      className="gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      {isEditing ? 'Save' : 'Edit'}
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-gray-400" />
                        Full Name
                      </Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <Label className="flex items-center gap-2 mb-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        Email Address
                      </Label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <Label className="flex items-center gap-2 mb-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        Phone Number
                      </Label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <Label className="flex items-center gap-2 mb-2">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        Account Type
                      </Label>
                      <Input value={user.role} disabled className="capitalize" />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="orders">
                <div className="bg-white rounded-[18px] p-6 lg:p-8 shadow-[0_18px_40px_rgba(11,13,16,0.10)]">
                  <h3 className="text-xl font-bold text-[#0B0D10] mb-6">Order History</h3>
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No orders yet</p>
                    <Link to="/products" className="mt-4 inline-block">
                      <Button variant="outline">Start Shopping</Button>
                    </Link>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings">
                <div className="bg-white rounded-[18px] p-6 lg:p-8 shadow-[0_18px_40px_rgba(11,13,16,0.10)]">
                  <h3 className="text-xl font-bold text-[#0B0D10] mb-6">Account Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-4 border-b">
                      <div>
                        <p className="font-medium text-[#0B0D10]">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive updates about your orders</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D31111]"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between py-4 border-b">
                      <div>
                        <p className="font-medium text-[#0B0D10]">SMS Notifications</p>
                        <p className="text-sm text-gray-500">Get text messages for important updates</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D31111]"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
}
