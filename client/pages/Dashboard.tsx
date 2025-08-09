import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Heart, 
  Download, 
  ShoppingBag, 
  Settings, 
  Upload,
  BarChart3,
  Users,
  Package,
  DollarSign,
  Edit,
  Save,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { toast } from "sonner";

interface Asset {
  _id: string;
  title: string;
  image: string;
  price: number;
  category: string;
}

interface Order {
  _id: string;
  total: number;
  status: string;
  createdAt: string;
  assets: {
    assetId: Asset;
    price: number;
    title: string;
  }[];
}

interface Analytics {
  totalAssets: number;
  totalUsers: number;
  totalRevenue: number;
  monthlyDownloads: number;
  popularCategories: { category: string; count: number }[];
  recentSales: Order[];
}

export default function Dashboard() {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Asset[]>([]);
  const [downloads, setDownloads] = useState<Asset[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email
      });
      fetchUserData();
    }
  }, [user, token]);

  const fetchUserData = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // Fetch user profile with favorites and downloads
      const profileResponse = await fetch('/api/auth/profile', { headers });
      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        setFavorites(profileData.user.favorites || []);
        setDownloads(profileData.user.downloads || []);
      }

      // Fetch order history
      const ordersResponse = await fetch('/api/payments/orders', { headers });
      if (ordersResponse.ok) {
        const ordersData = await ordersResponse.json();
        setOrders(ordersData.orders || []);
      }

      // Fetch analytics for admin users
      if (user?.role === 'admin') {
        const analyticsResponse = await fetch('/api/admin/analytics', { headers });
        if (analyticsResponse.ok) {
          const analyticsData = await analyticsResponse.json();
          setAnalytics(analyticsData);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers,
        body: JSON.stringify({ name: profileData.name })
      });

      if (response.ok) {
        toast.success('Profile updated successfully');
        setIsEditingProfile(false);
        // Update user context if needed
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Logged out successfully");
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <ProtectedRoute fallbackMessage="Please sign in to access your dashboard.">
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-400 mt-1">
                {user?.role === 'admin' ? 'Admin Dashboard' : 'Your Digital Marketplace Dashboard'}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => navigate("/support")}>
                <Settings className="h-4 w-4 mr-2" />
                Support
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>

          {/* Admin Analytics */}
          {user?.role === 'admin' && analytics && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">Analytics Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <Card className="bg-gray-900/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <Package className="h-8 w-8 text-blue-400" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-400">Total Assets</p>
                        <p className="text-2xl font-bold text-white">{analytics.totalAssets}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-900/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <Users className="h-8 w-8 text-green-400" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-400">Total Users</p>
                        <p className="text-2xl font-bold text-white">{analytics.totalUsers}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-900/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <DollarSign className="h-8 w-8 text-purple-400" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-400">Total Revenue</p>
                        <p className="text-2xl font-bold text-white">${analytics.totalRevenue}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-900/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <Download className="h-8 w-8 text-orange-400" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-400">Downloads</p>
                        <p className="text-2xl font-bold text-white">{analytics.monthlyDownloads}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-4 mb-8">
                <Button onClick={() => navigate("/admin/upload")} className="bg-purple-600 hover:bg-purple-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Asset
                </Button>
                <Button variant="outline" onClick={() => navigate("/admin/assets")}>
                  <Package className="h-4 w-4 mr-2" />
                  Manage Assets
                </Button>
                <Button variant="outline" onClick={() => navigate("/admin/users")}>
                  <Users className="h-4 w-4 mr-2" />
                  Manage Users
                </Button>
              </div>
            </div>
          )}

          {/* User Dashboard */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-gray-900/50">
              <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">Overview</TabsTrigger>
              <TabsTrigger value="favorites" className="data-[state=active]:bg-purple-600">Favorites ({favorites.length})</TabsTrigger>
              <TabsTrigger value="downloads" className="data-[state=active]:bg-purple-600">Downloads ({downloads.length})</TabsTrigger>
              <TabsTrigger value="orders" className="data-[state=active]:bg-purple-600">Orders ({orders.length})</TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gray-900/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <Heart className="h-8 w-8 text-red-400" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-400">Favorites</p>
                        <p className="text-2xl font-bold text-white">{favorites.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-900/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <Download className="h-8 w-8 text-blue-400" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-400">Downloads</p>
                        <p className="text-2xl font-bold text-white">{downloads.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-900/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <ShoppingBag className="h-8 w-8 text-green-400" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-400">Orders</p>
                        <p className="text-2xl font-bold text-white">{orders.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button onClick={() => navigate("/explore")} variant="outline" className="h-12">
                      Browse Assets
                    </Button>
                    <Button onClick={() => navigate("/support")} variant="outline" className="h-12">
                      Get Support
                    </Button>
                    <Button onClick={() => navigate("/templates")} variant="outline" className="h-12">
                      View Templates
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="favorites" className="space-y-6">
              {favorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.map((asset) => (
                    <Card key={asset._id} className="group hover:shadow-lg transition-shadow bg-gray-900/50 border-gray-700">
                      <div className="relative">
                        <img
                          src={asset.image}
                          alt={asset.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <Badge className="absolute top-3 right-3 bg-purple-600">
                          {asset.category}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-white mb-2">{asset.title}</h3>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-purple-400">
                            {asset.price === 0 ? 'Free' : `$${asset.price}`}
                          </span>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-gray-900/50 border-gray-700">
                  <CardContent className="p-12 text-center">
                    <Heart className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold text-white mb-2">No favorites yet</h3>
                    <p className="text-gray-400 mb-4">Start exploring and add assets to your favorites</p>
                    <Button onClick={() => navigate("/explore")}>
                      Browse Assets
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="downloads" className="space-y-6">
              {downloads.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {downloads.map((asset) => (
                    <Card key={asset._id} className="group hover:shadow-lg transition-shadow bg-gray-900/50 border-gray-700">
                      <div className="relative">
                        <img
                          src={asset.image}
                          alt={asset.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <Badge className="absolute top-3 right-3 bg-green-600">
                          Downloaded
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-white mb-2">{asset.title}</h3>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">{asset.category}</span>
                          <Button size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download Again
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-gray-900/50 border-gray-700">
                  <CardContent className="p-12 text-center">
                    <Download className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold text-white mb-2">No downloads yet</h3>
                    <p className="text-gray-400 mb-4">Download assets to access them here</p>
                    <Button onClick={() => navigate("/explore")}>
                      Browse Assets
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order._id} className="bg-gray-900/50 border-gray-700">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-white">
                              Order #{order._id.slice(-8)}
                            </h3>
                            <p className="text-sm text-gray-400">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge 
                              variant={order.status === 'completed' ? 'default' : 'secondary'}
                              className={order.status === 'completed' ? 'bg-green-600' : ''}
                            >
                              {order.status}
                            </Badge>
                            <p className="text-lg font-bold mt-2 text-white">${order.total}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {order.assets.map((item, index) => (
                            <div key={index} className="flex justify-between items-center text-sm">
                              <span className="text-gray-300">{item.title}</span>
                              <span className="text-white">${item.price}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-gray-900/50 border-gray-700">
                  <CardContent className="p-12 text-center">
                    <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold text-white mb-2">No orders yet</h3>
                    <p className="text-gray-400 mb-4">Your purchase history will appear here</p>
                    <Button onClick={() => navigate("/explore")}>
                      Start Shopping
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    Profile Settings
                    {!isEditingProfile ? (
                      <Button variant="outline" size="sm" onClick={() => setIsEditingProfile(true)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setIsEditingProfile(false)}>
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                        <Button size="sm" onClick={updateProfile}>
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                      </div>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      disabled={!isEditingProfile}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                    <Input
                      id="email"
                      value={profileData.email}
                      disabled
                      className="bg-gray-800 border-gray-600 text-gray-400"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>
                  <div>
                    <Label className="text-gray-300">Account Type</Label>
                    <div className="mt-1">
                      <Badge variant={user?.role === 'admin' ? 'default' : 'secondary'}>
                        {user?.role === 'admin' ? 'Administrator' : 'User'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Account Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button onClick={() => navigate("/support")} variant="outline" className="w-full">
                    Contact Support
                  </Button>
                  <Button onClick={handleLogout} variant="destructive" className="w-full">
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
