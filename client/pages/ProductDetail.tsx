import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Star, 
  Download, 
  Heart, 
  ShoppingCart, 
  Eye, 
  Calendar, 
  FileText, 
  User,
  ExternalLink,
  Shield,
  Zap,
  Globe
} from 'lucide-react';

interface Asset {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  downloads: number;
  image: string;
  isPremium: boolean;
  isTrending?: boolean;
  isBestSelling?: boolean;
  isFeatured?: boolean;
  tags: string[];
  author: string;
  authorName: string;
  type: 'free' | 'premium';
  fileSize: string;
  fileType: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [asset, setAsset] = useState<Asset | null>(null);
  const [relatedAssets, setRelatedAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      fetchAsset();
      fetchRelatedAssets();
    }
  }, [id]);

  const fetchAsset = async () => {
    try {
      const response = await fetch(`/api/assets/${id}`);
      const data = await response.json();
      
      if (response.ok) {
        setAsset(data.asset);
      } else {
        console.error('Failed to fetch asset:', data.error);
        navigate('/404');
      }
    } catch (error) {
      console.error('Failed to fetch asset:', error);
      navigate('/404');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedAssets = async () => {
    if (!asset) return;
    
    try {
      const response = await fetch(`/api/assets?category=${asset.category}&limit=4`);
      const data = await response.json();
      
      if (response.ok) {
        setRelatedAssets(data.assets.filter((a: Asset) => a._id !== id));
      }
    } catch (error) {
      console.error('Failed to fetch related assets:', error);
    }
  };

  const handlePurchase = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!asset) return;

    setPurchasing(true);
    try {
      if (asset.price === 0) {
        // Free asset - direct download
        const response = await fetch(`/api/assets/${asset._id}/download`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        const data = await response.json();
        if (response.ok) {
          // Trigger download or show success message
          alert('Free asset added to your downloads!');
        } else {
          alert(data.error || 'Failed to download asset');
        }
      } else {
        // Paid asset - create checkout session
        const response = await fetch('/api/payments/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ assetIds: [asset._id] })
        });
        
        const data = await response.json();
        if (response.ok && data.sessionUrl) {
          window.location.href = data.sessionUrl;
        } else {
          alert(data.error || 'Failed to create checkout session');
        }
      }
    } catch (error) {
      console.error('Purchase error:', error);
      alert('Failed to process purchase');
    } finally {
      setPurchasing(false);
    }
  };

  const handleAddToFavorites = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('/api/auth/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ assetId: asset?._id })
      });
      
      if (response.ok) {
        setIsFavorite(!isFavorite);
      }
    } catch (error) {
      console.error('Failed to add to favorites:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Asset not found</h2>
          <p className="text-gray-600 mb-4">The asset you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/explore')}>
            Browse Assets
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-primary">
            Home
          </button>
          <span>/</span>
          <button onClick={() => navigate('/explore')} className="hover:text-primary">
            Explore
          </button>
          <span>/</span>
          <span>{asset.category}</span>
          <span>/</span>
          <span className="text-foreground">{asset.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Asset Image */}
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-6">
              <img
                src={asset.image}
                alt={asset.title}
                className="w-full h-full object-cover"
              />
              {asset.isTrending && (
                <Badge className="absolute top-4 left-4 bg-red-500">
                  <Zap className="h-3 w-3 mr-1" />
                  Trending
                </Badge>
              )}
              {asset.isBestSelling && (
                <Badge className="absolute top-4 left-4 bg-green-500">
                  Best Selling
                </Badge>
              )}
              {asset.isFeatured && (
                <Badge className="absolute top-4 right-4 bg-blue-500">
                  Featured
                </Badge>
              )}
            </div>

            {/* Asset Details */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{asset.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>by {asset.authorName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(asset.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddToFavorites}
                    className={isFavorite ? 'text-red-500' : ''}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="license">License</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="description" className="mt-4">
                    <div className="space-y-4">
                      <p className="text-gray-700 leading-relaxed">
                        {asset.description}
                      </p>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {asset.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="details" className="mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-1">Category</h4>
                        <p className="text-gray-600">{asset.category}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">File Size</h4>
                        <p className="text-gray-600">{asset.fileSize}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">File Type</h4>
                        <p className="text-gray-600">{asset.fileType}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Downloads</h4>
                        <p className="text-gray-600">{asset.downloads.toLocaleString()}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Rating</h4>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-gray-600">{asset.rating}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Type</h4>
                        <Badge variant={asset.type === 'free' ? 'default' : 'secondary'}>
                          {asset.type}
                        </Badge>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="license" className="mt-4">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                        <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-green-800">Commercial License</h4>
                          <p className="text-green-700 text-sm">
                            Use this asset in personal and commercial projects
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>✓ Use in unlimited projects</p>
                        <p>✓ Modify and customize</p>
                        <p>✓ Commercial use allowed</p>
                        <p>✗ Cannot resell or redistribute as-is</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  {asset.price === 0 ? (
                    <div>
                      <span className="text-3xl font-bold text-green-600">Free</span>
                      <p className="text-sm text-gray-600 mt-1">Download now</p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-3xl font-bold">${asset.price}</span>
                        {asset.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">
                            ${asset.originalPrice}
                          </span>
                        )}
                      </div>
                      {asset.originalPrice && (
                        <p className="text-sm text-green-600 mt-1">
                          Save ${asset.originalPrice - asset.price}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                
                <Button
                  onClick={handlePurchase}
                  disabled={purchasing}
                  className="w-full mb-3"
                  size="lg"
                >
                  {purchasing ? (
                    'Processing...'
                  ) : asset.price === 0 ? (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Download Free
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Purchase Now
                    </>
                  )}
                </Button>
                
                <div className="text-center text-xs text-gray-500">
                  <Shield className="h-3 w-3 inline mr-1" />
                  Secure payment via Stripe
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Downloads</span>
                  </div>
                  <span className="font-semibold">{asset.downloads.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">Rating</span>
                  </div>
                  <span className="font-semibold">{asset.rating}/5</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Views</span>
                  </div>
                  <span className="font-semibold">{(asset.downloads * 3).toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Author Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About the Author</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{asset.authorName}</h4>
                    <p className="text-sm text-gray-600">Digital Creator</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Assets */}
        {relatedAssets.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Related Assets</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedAssets.map((relatedAsset) => (
                <Card key={relatedAsset._id} className="group hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                    <img
                      src={relatedAsset.image}
                      alt={relatedAsset.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2 line-clamp-1">{relatedAsset.title}</h4>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">
                        {relatedAsset.price === 0 ? 'Free' : `$${relatedAsset.price}`}
                      </span>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => navigate(`/asset/${relatedAsset._id}`)}
                      >
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
