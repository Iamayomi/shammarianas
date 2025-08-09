import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  Plus, 
  Upload, 
  Package, 
  Users, 
  DollarSign, 
  BarChart3,
  FileText,
  Briefcase,
  Settings,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Save,
  X,
  Star,
  TrendingUp,
  CheckCircle,
  Crown,
  Award,
  Image as ImageIcon,
  Menu,
  Home,
  LogOut,
  Bell,
  ChevronLeft,
  ChevronRight,
  PanelLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  'Code', 'Video', 'Audio', 'Plugins', 'Graphics', 
  'Mobile Apps', 'Themes', '3D Assets', 'Templates'
];

const PORTFOLIO_CATEGORIES = [
  'Web Development', 'Mobile App', 'UI/UX Design', 
  'Branding', 'E-commerce', 'Other'
];

// Sidebar navigation items
const SIDEBAR_ITEMS = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'categories', label: 'Categories', icon: ImageIcon },
  { id: 'assets', label: 'Assets', icon: Package },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'blogs', label: 'Blogs', icon: FileText },
  { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
  { id: 'services', label: 'Services', icon: Settings },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
];

interface Asset {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  fileUrl: string;
  isPremium: boolean;
  isTrending: boolean;
  isBestSelling: boolean;
  isFeatured: boolean;
  tags: string[];
  downloads: number;
  authorName: string;
  createdAt: string;
}

interface Blog {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  featuredImage?: string;
  tags: string[];
  status: 'draft' | 'published';
  authorName: string;
  createdAt: string;
}

interface Portfolio {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  projectUrl?: string;
  technologies: string[];
  featured: boolean;
  status: 'draft' | 'published';
  authorName: string;
  createdAt: string;
}

interface Service {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  icon: string;
  image?: string;
  features: string[];
  pricing?: {
    basic?: number;
    pro?: number;
    enterprise?: number;
  };
  featured: boolean;
  status: 'draft' | 'published';
  authorName: string;
  createdAt: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'moderator';
  avatar?: string;
  isEmailVerified: boolean;
  isActive: boolean;
  lastLogin?: string;
  totalPurchases: number;
  totalSpent: number;
  joinDate: string;
  location?: string;
  totalDownloads: number;
}

interface Analytics {
  totalAssets: number;
  totalUsers: number;
  totalRevenue: number;
  monthlyDownloads: number;
  popularCategories: { category: string; count: number }[];
  recentSales: any[];
  salesReport: {
    totalOrders: number;
    averageOrderValue: number;
    conversionRate: number;
  };
}

// Admin Sidebar Component
function AdminSidebar({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center space-x-2 px-2 py-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SH</span>
          </div>
          <span className="font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
            Admin Panel
          </span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => setActiveTab(item.id)}
                      tooltip={item.label}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Logout">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

// Header Component
function AdminHeader({ user, onLogout }: { user: any; onLogout: () => void }) {
  return (
    <header className="h-16 bg-sidebar border-b border-sidebar-border flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <SidebarTrigger className="lg:hidden" />
        <h1 className="text-xl font-semibold text-sidebar-foreground hidden sm:block">
          Admin Dashboard
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="text-sidebar-foreground/70 hover:text-sidebar-foreground hidden sm:flex">
          <Bell className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-medium text-sidebar-foreground">{user?.name}</div>
            <div className="text-xs text-sidebar-foreground/70">Administrator</div>
          </div>
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user?.name?.charAt(0)?.toUpperCase()}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="text-sidebar-foreground/70 hover:text-sidebar-foreground ml-2"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Active section state
  const [activeTab, setActiveTab] = useState('overview');

  // Assets state
  const [assets, setAssets] = useState<Asset[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [newAsset, setNewAsset] = useState({
    title: '',
    description: '',
    category: '',
    price: 0,
    image: '',
    fileUrl: '',
    isPremium: false,
    isTrending: false,
    isBestSelling: false,
    isFeatured: false,
    tags: [] as string[]
  });

  // File upload states
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [assetFile, setAssetFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Users state
  const [users, setUsers] = useState<User[]>([]);
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [selectedUserRole, setSelectedUserRole] = useState("all");
  const [selectedUserStatus, setSelectedUserStatus] = useState("all");

  // Categories state
  const [categories, setCategories] = useState<string[]>(CATEGORIES);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [showEditCategoryDialog, setShowEditCategoryDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string>("");
  const [newCategory, setNewCategory] = useState("");

  // Blogs state
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [showBlogDialog, setBlogShowDialog] = useState(false);
  const [showEditBlogDialog, setShowEditBlogDialog] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '',
    excerpt: '',
    slug: '',
    featuredImage: '',
    tags: [] as string[],
    status: 'draft' as 'draft' | 'published'
  });

  // Portfolio state
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [showPortfolioDialog, setShowPortfolioDialog] = useState(false);
  const [showEditPortfolioDialog, setShowEditPortfolioDialog] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | null>(null);
  const [newPortfolio, setNewPortfolio] = useState({
    title: '',
    description: '',
    category: '',
    image: '',
    projectUrl: '',
    technologies: [] as string[],
    featured: false,
    status: 'draft' as 'draft' | 'published'
  });

  // Services state
  const [services, setServices] = useState<Service[]>([]);
  const [showServiceDialog, setShowServiceDialog] = useState(false);
  const [showEditServiceDialog, setShowEditServiceDialog] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    shortDescription: '',
    icon: '',
    image: '',
    features: [] as string[],
    pricing: {
      basic: 0,
      pro: 0,
      enterprise: 0
    },
    featured: false,
    status: 'draft' as 'draft' | 'published'
  });

  // Analytics state
  const [analytics, setAnalytics] = useState<Analytics>({
    totalAssets: 0,
    totalUsers: 0,
    totalRevenue: 0,
    monthlyDownloads: 0,
    popularCategories: [],
    recentSales: [],
    salesReport: {
      totalOrders: 0,
      averageOrderValue: 0,
      conversionRate: 0
    }
  });

  // Loading states
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadAssets(),
        loadUsers(),
        loadBlogs(),
        loadPortfolios(),
        loadServices(),
        loadAnalytics()
      ]);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const loadAssets = async () => {
    try {
      const response = await fetch('/api/admin/assets');
      if (response.ok) {
        const data = await response.json();
        setAssets(data);
      } else {
        // Fallback to demo data
        setAssets(getDemoAssets());
      }
    } catch (error) {
      console.error('Error loading assets:', error);
      setAssets(getDemoAssets());
    }
  };

  const loadUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        // Fallback to demo data
        setUsers(getDemoUsers());
      }
    } catch (error) {
      console.error('Error loading users:', error);
      setUsers(getDemoUsers());
    }
  };

  const loadBlogs = async () => {
    try {
      const response = await fetch('/api/admin/blogs');
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      } else {
        setBlogs(getDemoBlogs());
      }
    } catch (error) {
      console.error('Error loading blogs:', error);
      setBlogs(getDemoBlogs());
    }
  };

  const loadPortfolios = async () => {
    try {
      const response = await fetch('/api/admin/portfolios');
      if (response.ok) {
        const data = await response.json();
        setPortfolios(data);
      } else {
        setPortfolios(getDemoPortfolios());
      }
    } catch (error) {
      console.error('Error loading portfolios:', error);
      setPortfolios(getDemoPortfolios());
    }
  };

  const loadServices = async () => {
    try {
      const response = await fetch('/api/admin/services');
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      } else {
        setServices(getDemoServices());
      }
    } catch (error) {
      console.error('Error loading services:', error);
      setServices(getDemoServices());
    }
  };

  const loadAnalytics = async () => {
    try {
      const response = await fetch('/api/admin/analytics');
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      } else {
        setAnalytics(getDemoAnalytics());
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
      setAnalytics(getDemoAnalytics());
    }
  };

  // Demo data functions
  const getDemoAssets = (): Asset[] => [
    {
      _id: '1',
      title: 'Modern Dashboard Template',
      description: 'Clean and modern dashboard template for React applications',
      category: 'Templates',
      price: 49.99,
      image: '/placeholder.svg',
      fileUrl: '/files/dashboard-template.zip',
      isPremium: true,
      isTrending: true,
      isBestSelling: false,
      isFeatured: true,
      tags: ['react', 'dashboard', 'admin'],
      downloads: 1250,
      authorName: 'Admin User',
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      _id: '2',
      title: 'E-commerce UI Kit',
      description: 'Complete UI kit for e-commerce applications',
      category: 'Templates',
      price: 79.99,
      image: '/placeholder.svg',
      fileUrl: '/files/ecommerce-ui-kit.zip',
      isPremium: true,
      isTrending: false,
      isBestSelling: true,
      isFeatured: false,
      tags: ['ui-kit', 'ecommerce', 'figma'],
      downloads: 890,
      authorName: 'Admin User',
      createdAt: '2024-01-10T14:20:00Z'
    }
  ];

  const getDemoUsers = (): User[] => [
    {
      _id: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      role: 'user',
      avatar: '/placeholder.svg',
      isEmailVerified: true,
      isActive: true,
      lastLogin: '2024-01-20T09:15:00Z',
      totalPurchases: 12,
      totalSpent: 589.88,
      joinDate: '2023-06-15T10:30:00Z',
      location: 'New York, USA',
      totalDownloads: 45
    },
    {
      _id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      role: 'moderator',
      avatar: '/placeholder.svg',
      isEmailVerified: true,
      isActive: true,
      lastLogin: '2024-01-19T16:45:00Z',
      totalPurchases: 8,
      totalSpent: 320.50,
      joinDate: '2023-08-22T14:20:00Z',
      location: 'California, USA',
      totalDownloads: 28
    },
    {
      _id: '3',
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      role: 'user',
      avatar: '/placeholder.svg',
      isEmailVerified: false,
      isActive: true,
      lastLogin: '2024-01-18T12:30:00Z',
      totalPurchases: 3,
      totalSpent: 149.97,
      joinDate: '2023-11-10T09:15:00Z',
      location: 'Toronto, Canada',
      totalDownloads: 15
    },
    {
      _id: '4',
      name: 'Emma Wilson',
      email: 'emma.wilson@email.com',
      role: 'user',
      avatar: '/placeholder.svg',
      isEmailVerified: true,
      isActive: false,
      lastLogin: '2024-01-15T08:20:00Z',
      totalPurchases: 1,
      totalSpent: 29.99,
      joinDate: '2023-12-05T11:45:00Z',
      location: 'London, UK',
      totalDownloads: 3
    },
    {
      _id: '5',
      name: 'David Rodriguez',
      email: 'david.rodriguez@email.com',
      role: 'admin',
      avatar: '/placeholder.svg',
      isEmailVerified: true,
      isActive: true,
      lastLogin: '2024-01-20T10:00:00Z',
      totalPurchases: 0,
      totalSpent: 0,
      joinDate: '2023-01-01T00:00:00Z',
      location: 'Madrid, Spain',
      totalDownloads: 0
    },
    {
      _id: '6',
      name: 'Lisa Anderson',
      email: 'lisa.anderson@email.com',
      role: 'user',
      avatar: '/placeholder.svg',
      isEmailVerified: true,
      isActive: true,
      lastLogin: '2024-01-19T19:30:00Z',
      totalPurchases: 7,
      totalSpent: 425.93,
      joinDate: '2023-09-18T13:25:00Z',
      location: 'Sydney, Australia',
      totalDownloads: 32
    }
  ];

  const getDemoBlogs = (): Blog[] => [
    {
      _id: '1',
      title: 'Getting Started with React 18',
      content: 'A comprehensive guide to React 18 features...',
      excerpt: 'Learn about the new features in React 18',
      slug: 'getting-started-react-18',
      featuredImage: '/placeholder.svg',
      tags: ['react', 'javascript', 'tutorial'],
      status: 'published',
      authorName: 'Admin User',
      createdAt: '2024-01-15T10:30:00Z'
    }
  ];

  const getDemoPortfolios = (): Portfolio[] => [
    {
      _id: '1',
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution built with React and Node.js',
      category: 'Web Development',
      image: '/placeholder.svg',
      projectUrl: 'https://example.com',
      technologies: ['React', 'Node.js', 'MongoDB'],
      featured: true,
      status: 'published',
      authorName: 'Admin User',
      createdAt: '2024-01-15T10:30:00Z'
    }
  ];

  const getDemoServices = (): Service[] => [
    {
      _id: '1',
      title: 'Web Development',
      description: 'Custom web development services',
      shortDescription: 'Professional web development',
      icon: 'globe',
      image: '/placeholder.svg',
      features: ['Responsive Design', 'SEO Optimized', 'Fast Performance'],
      pricing: {
        basic: 999,
        pro: 1999,
        enterprise: 4999
      },
      featured: true,
      status: 'published',
      authorName: 'Admin User',
      createdAt: '2024-01-15T10:30:00Z'
    }
  ];

  const getDemoAnalytics = (): Analytics => ({
    totalAssets: 156,
    totalUsers: 1250,
    totalRevenue: 45890,
    monthlyDownloads: 8456,
    popularCategories: [
      { category: 'Templates', count: 45 },
      { category: 'Graphics', count: 38 },
      { category: 'Code', count: 32 }
    ],
    recentSales: [],
    salesReport: {
      totalOrders: 234,
      averageOrderValue: 67.50,
      conversionRate: 12.5
    }
  });

  // Asset management functions
  const handleAssetUpload = async () => {
    if (!imageFile || !assetFile) {
      toast.error('Please select both preview image and asset file');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('title', newAsset.title);
      formData.append('description', newAsset.description);
      formData.append('category', newAsset.category);
      formData.append('price', newAsset.price.toString());
      formData.append('tags', newAsset.tags.join(','));
      formData.append('type', newAsset.isPremium ? 'premium' : 'free');
      formData.append('isTrending', newAsset.isTrending.toString());
      formData.append('isBestSelling', newAsset.isBestSelling.toString());
      formData.append('isFeatured', newAsset.isFeatured.toString());
      formData.append('image', imageFile);
      formData.append('asset', assetFile);

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(progress);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 201) {
          toast.success('Asset uploaded successfully to Cloudinary');
          setShowUploadDialog(false);
          resetUploadForm();
          loadAssets();
        } else {
          const errorData = JSON.parse(xhr.responseText);
          toast.error(errorData.error || 'Failed to upload asset');
        }
        setIsUploading(false);
        setUploadProgress(0);
      });

      xhr.addEventListener('error', () => {
        toast.error('Upload failed - network error');
        setIsUploading(false);
        setUploadProgress(0);
      });

      const token = localStorage.getItem('token');
      xhr.open('POST', '/api/admin/assets');
      if (token) {
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      }
      xhr.send(formData);

    } catch (error) {
      console.error('Error uploading asset:', error);
      toast.error('Failed to upload asset');
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const resetUploadForm = () => {
    setNewAsset({
      title: '',
      description: '',
      category: '',
      price: 0,
      image: '',
      fileUrl: '',
      isPremium: false,
      isTrending: false,
      isBestSelling: false,
      isFeatured: false,
      tags: []
    });
    setImageFile(null);
    setAssetFile(null);
    setUploadProgress(0);
  };

  const getAcceptedFileTypes = () => {
    return {
      image: '.jpg,.jpeg,.png,.gif',
      asset: '.zip,.rar,.pdf,.mp4,.mp3,.wav,.mov,.avi,.psd,.ai,.eps,.sketch,.fig,.xd,.apk,.ipa,.exe,.dmg,.pkg'
    };
  };

  const handleAssetEdit = (asset: Asset) => {
    setEditingAsset(asset);
    setShowEditDialog(true);
  };

  const handleAssetUpdate = async () => {
    if (!editingAsset) return;

    try {
      const response = await fetch(`/api/admin/assets/${editingAsset._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingAsset),
      });

      if (response.ok) {
        toast.success('Asset updated successfully');
        setShowEditDialog(false);
        setEditingAsset(null);
        loadAssets();
      } else {
        toast.error('Failed to update asset');
      }
    } catch (error) {
      console.error('Error updating asset:', error);
      toast.error('Failed to update asset');
    }
  };

  const handleAssetDelete = async (assetId: string) => {
    try {
      const response = await fetch(`/api/admin/assets/${assetId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Asset deleted successfully');
        loadAssets();
      } else {
        toast.error('Failed to delete asset');
      }
    } catch (error) {
      console.error('Error deleting asset:', error);
      toast.error('Failed to delete asset');
    }
  };

  // User management functions
  const handleUserStatusToggle = async (userId: string) => {
    try {
      const user = users.find(u => u._id === userId);
      if (!user) return;

      const updatedUser = { ...user, isActive: !user.isActive };
      
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        setUsers(users.map(u => u._id === userId ? updatedUser : u));
        toast.success(`User ${updatedUser.isActive ? 'activated' : 'deactivated'} successfully`);
      } else {
        toast.error('Failed to update user status');
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error('Failed to update user status');
    }
  };

  const handleUserRoleChange = async (userId: string, newRole: 'user' | 'admin' | 'moderator') => {
    try {
      const user = users.find(u => u._id === userId);
      if (!user) return;

      const updatedUser = { ...user, role: newRole };
      
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        setUsers(users.map(u => u._id === userId ? updatedUser : u));
        toast.success('User role updated successfully');
      } else {
        toast.error('Failed to update user role');
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Failed to update user role');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers(users.filter(u => u._id !== userId));
        toast.success('User deleted successfully');
      } else {
        toast.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  // Category management functions
  const handleCreateCategory = async () => {
    if (!newCategory.trim()) {
      toast.error('Category name is required');
      return;
    }

    if (categories.includes(newCategory.trim())) {
      toast.error('Category already exists');
      return;
    }

    try {
      const response = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newCategory.trim() }),
      });

      if (response.ok) {
        setCategories([...categories, newCategory.trim()]);
        setNewCategory('');
        setShowCategoryDialog(false);
        toast.success('Category created successfully');
      } else {
        toast.error('Failed to create category');
      }
    } catch (error) {
      console.error('Error creating category:', error);
      // Fallback: add to local state anyway for demo
      setCategories([...categories, newCategory.trim()]);
      setNewCategory('');
      setShowCategoryDialog(false);
      toast.success('Category created successfully');
    }
  };

  const handleEditCategory = (category: string) => {
    setEditingCategory(category);
    setNewCategory(category);
    setShowEditCategoryDialog(true);
  };

  const handleUpdateCategory = async () => {
    if (!newCategory.trim()) {
      toast.error('Category name is required');
      return;
    }

    if (categories.includes(newCategory.trim()) && newCategory.trim() !== editingCategory) {
      toast.error('Category already exists');
      return;
    }

    try {
      const response = await fetch(`/api/admin/categories/${encodeURIComponent(editingCategory)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newCategory.trim() }),
      });

      if (response.ok) {
        setCategories(categories.map(cat => cat === editingCategory ? newCategory.trim() : cat));
        setEditingCategory('');
        setNewCategory('');
        setShowEditCategoryDialog(false);
        toast.success('Category updated successfully');
      } else {
        toast.error('Failed to update category');
      }
    } catch (error) {
      console.error('Error updating category:', error);
      // Fallback: update local state anyway for demo
      setCategories(categories.map(cat => cat === editingCategory ? newCategory.trim() : cat));
      setEditingCategory('');
      setNewCategory('');
      setShowEditCategoryDialog(false);
      toast.success('Category updated successfully');
    }
  };

  const handleDeleteCategory = async (categoryName: string) => {
    try {
      const response = await fetch(`/api/admin/categories/${encodeURIComponent(categoryName)}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCategories(categories.filter(cat => cat !== categoryName));
        toast.success('Category deleted successfully');
      } else {
        toast.error('Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      // Fallback: remove from local state anyway for demo
      setCategories(categories.filter(cat => cat !== categoryName));
      toast.success('Category deleted successfully');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Filter functions
  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;
    const matchesFilter = filterType === 'all' ||
                         (filterType === 'premium' && asset.isPremium) ||
                         (filterType === 'trending' && asset.isTrending) ||
                         (filterType === 'bestselling' && asset.isBestSelling) ||
                         (filterType === 'featured' && asset.isFeatured);
    
    return matchesSearch && matchesCategory && matchesFilter;
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(userSearchTerm.toLowerCase());
    const matchesRole = selectedUserRole === 'all' || user.role === selectedUserRole;
    const matchesStatus = selectedUserStatus === 'all' ||
                         (selectedUserStatus === 'active' && user.isActive) ||
                         (selectedUserStatus === 'inactive' && !user.isActive);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Overview section
  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalAssets}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              +18% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(analytics.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              +25% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.monthlyDownloads.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={() => setShowUploadDialog(true)}
              className="h-20 flex flex-col items-center justify-center space-y-2"
            >
              <Plus className="h-6 w-6" />
              <span>Add New Asset</span>
            </Button>
            <Button
              onClick={() => setActiveTab('users')}
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
            >
              <Users className="h-6 w-6" />
              <span>Manage Users</span>
            </Button>
            <Button
              onClick={() => setActiveTab('reports')}
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
            >
              <BarChart3 className="h-6 w-6" />
              <span>View Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Popular Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.popularCategories.map((category) => (
              <div key={category.category} className="flex items-center justify-between">
                <span className="text-sm font-medium">{category.category}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{
                        width: `${(category.count / Math.max(...analytics.popularCategories.map(c => c.count))) * 100}%`
                      }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">{category.count}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Assets management section
  const renderAssets = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Manage Assets</h2>
          <p className="text-muted-foreground">Upload and manage your digital assets</p>
        </div>
        <Button onClick={() => setShowUploadDialog(true)} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Upload Asset
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="bestselling">Best Selling</SelectItem>
                <SelectItem value="featured">Featured</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {filteredAssets.length} assets
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAssets.map((asset) => (
          <Card key={asset._id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={asset.image}
                alt={asset.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-1">
                {asset.isPremium && (
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    <Crown className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                )}
                {asset.isTrending && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Trending
                  </Badge>
                )}
                {asset.isFeatured && (
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
                {asset.isBestSelling && (
                  <Badge variant="secondary" className="bg-red-100 text-red-800">
                    <Award className="h-3 w-3 mr-1" />
                    Best Seller
                  </Badge>
                )}
              </div>
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-sm line-clamp-2">{asset.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{asset.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {asset.category}
                  </Badge>
                  <span className="font-bold text-sm">{formatCurrency(asset.price)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{asset.downloads} downloads</span>
                  <span>{formatDate(asset.createdAt)}</span>
                </div>
                <div className="flex space-x-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAssetEdit(asset)}
                    className="flex-1"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="destructive" className="flex-1">
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Asset</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{asset.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleAssetDelete(asset._id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAssets.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No assets found</h3>
            <p className="text-muted-foreground mb-4">
              No assets match your current search and filter criteria.
            </p>
            <Button onClick={() => setShowUploadDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Upload Your First Asset
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Upload New Asset</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newAsset.title}
                  onChange={(e) => setNewAsset({...newAsset, title: e.target.value})}
                  placeholder="Asset title"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newAsset.category}
                  onValueChange={(value) => setNewAsset({...newAsset, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newAsset.description}
                onChange={(e) => setNewAsset({...newAsset, description: e.target.value})}
                placeholder="Asset description"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={newAsset.price}
                  onChange={(e) => setNewAsset({...newAsset, price: parseFloat(e.target.value) || 0})}
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={newAsset.tags.join(', ')}
                  onChange={(e) => setNewAsset({...newAsset, tags: e.target.value.split(',').map(tag => tag.trim())})}
                  placeholder="react, template, dashboard"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="preview-image">Preview Image *</Label>
                <div className="mt-1">
                  <Input
                    id="preview-image"
                    type="file"
                    accept={getAcceptedFileTypes().image}
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload a preview image (JPG, PNG, GIF). This will be displayed as the asset thumbnail.
                  </p>
                  {imageFile && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                      <p className="text-sm text-green-700">✓ Selected: {imageFile.name}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="asset-file">Asset File *</Label>
                <div className="mt-1">
                  <Input
                    id="asset-file"
                    type="file"
                    accept={getAcceptedFileTypes().asset}
                    onChange={(e) => setAssetFile(e.target.files?.[0] || null)}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    <p className="mb-1">Upload your asset file. Supported formats:</p>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <strong>Archives:</strong> ZIP, RAR
                      </div>
                      <div>
                        <strong>Video:</strong> MP4, MOV, AVI
                      </div>
                      <div>
                        <strong>Audio:</strong> MP3, WAV
                      </div>
                      <div>
                        <strong>Documents:</strong> PDF
                      </div>
                      <div>
                        <strong>Design:</strong> PSD, AI, EPS, Sketch
                      </div>
                      <div>
                        <strong>Apps:</strong> APK, IPA, EXE, DMG
                      </div>
                    </div>
                  </div>
                  {assetFile && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                      <p className="text-sm text-green-700">✓ Selected: {assetFile.name}</p>
                      <p className="text-xs text-gray-600">Size: {Math.round(assetFile.size / 1024)} KB</p>
                    </div>
                  )}
                </div>
              </div>

              {isUploading && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Uploading to Cloudinary...</span>
                    <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="premium"
                  checked={newAsset.isPremium}
                  onCheckedChange={(checked) => setNewAsset({...newAsset, isPremium: checked})}
                />
                <Label htmlFor="premium" className="text-sm">Premium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="trending"
                  checked={newAsset.isTrending}
                  onCheckedChange={(checked) => setNewAsset({...newAsset, isTrending: checked})}
                />
                <Label htmlFor="trending" className="text-sm">Trending</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="bestselling"
                  checked={newAsset.isBestSelling}
                  onCheckedChange={(checked) => setNewAsset({...newAsset, isBestSelling: checked})}
                />
                <Label htmlFor="bestselling" className="text-sm">Best Selling</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={newAsset.isFeatured}
                  onCheckedChange={(checked) => setNewAsset({...newAsset, isFeatured: checked})}
                />
                <Label htmlFor="featured" className="text-sm">Featured</Label>
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShowUploadDialog(false);
                  resetUploadForm();
                }}
                disabled={isUploading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAssetUpload}
                disabled={isUploading || !imageFile || !assetFile || !newAsset.title || !newAsset.category}
              >
                <Upload className="h-4 w-4 mr-2" />
                {isUploading ? `Uploading... ${uploadProgress}%` : 'Upload to Cloudinary'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Asset</DialogTitle>
          </DialogHeader>
          {editingAsset && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={editingAsset.title}
                    onChange={(e) => setEditingAsset({...editingAsset, title: e.target.value})}
                    placeholder="Asset title"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-category">Category</Label>
                  <Select
                    value={editingAsset.category}
                    onValueChange={(value) => setEditingAsset({...editingAsset, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingAsset.description}
                  onChange={(e) => setEditingAsset({...editingAsset, description: e.target.value})}
                  placeholder="Asset description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-price">Price ($)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={editingAsset.price}
                    onChange={(e) => setEditingAsset({...editingAsset, price: parseFloat(e.target.value) || 0})}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-tags">Tags (comma separated)</Label>
                  <Input
                    id="edit-tags"
                    value={editingAsset.tags.join(', ')}
                    onChange={(e) => setEditingAsset({...editingAsset, tags: e.target.value.split(',').map(tag => tag.trim())})}
                    placeholder="react, template, dashboard"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-image">Image URL</Label>
                <Input
                  id="edit-image"
                  value={editingAsset.image}
                  onChange={(e) => setEditingAsset({...editingAsset, image: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <Label htmlFor="edit-fileUrl">File URL</Label>
                <Input
                  id="edit-fileUrl"
                  value={editingAsset.fileUrl}
                  onChange={(e) => setEditingAsset({...editingAsset, fileUrl: e.target.value})}
                  placeholder="https://example.com/file.zip"
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-premium"
                    checked={editingAsset.isPremium}
                    onCheckedChange={(checked) => setEditingAsset({...editingAsset, isPremium: checked})}
                  />
                  <Label htmlFor="edit-premium" className="text-sm">Premium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-trending"
                    checked={editingAsset.isTrending}
                    onCheckedChange={(checked) => setEditingAsset({...editingAsset, isTrending: checked})}
                  />
                  <Label htmlFor="edit-trending" className="text-sm">Trending</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-bestselling"
                    checked={editingAsset.isBestSelling}
                    onCheckedChange={(checked) => setEditingAsset({...editingAsset, isBestSelling: checked})}
                  />
                  <Label htmlFor="edit-bestselling" className="text-sm">Best Selling</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-featured"
                    checked={editingAsset.isFeatured}
                    onCheckedChange={(checked) => setEditingAsset({...editingAsset, isFeatured: checked})}
                  />
                  <Label htmlFor="edit-featured" className="text-sm">Featured</Label>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAssetUpdate}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );

  // Categories management section
  const renderCategories = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Manage Categories</h2>
          <p className="text-muted-foreground">Create, edit, and manage explore categories</p>
        </div>
        <Button onClick={() => setShowCategoryDialog(true)} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Card key={category} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg mx-auto">
                  <ImageIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg text-center">{category}</h3>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditCategory(category)}
                    className="flex-1"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="destructive" className="flex-1">
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Category</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete the "{category}" category? This action cannot be undone.
                          All assets in this category will need to be reassigned.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteCategory(category)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {categories.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No categories found</h3>
            <p className="text-muted-foreground mb-4">
              Start by creating your first category for organizing assets.
            </p>
            <Button onClick={() => setShowCategoryDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Category
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Create Category Dialog */}
      <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="category-name">Category Name</Label>
              <Input
                id="category-name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter category name"
                className="mt-1"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => {
                setShowCategoryDialog(false);
                setNewCategory('');
              }}>
                Cancel
              </Button>
              <Button onClick={handleCreateCategory}>
                <Plus className="h-4 w-4 mr-2" />
                Create Category
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={showEditCategoryDialog} onOpenChange={setShowEditCategoryDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-category-name">Category Name</Label>
              <Input
                id="edit-category-name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter category name"
                className="mt-1"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => {
                setShowEditCategoryDialog(false);
                setEditingCategory('');
                setNewCategory('');
              }}>
                Cancel
              </Button>
              <Button onClick={handleUpdateCategory}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );

  // Users management section
  const renderUsers = () => (
    <div className="space-y-6">
      {/* Header with Statistics */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Manage Users</h2>
            <p className="text-muted-foreground">View and manage user accounts</p>
          </div>
        </div>

        {/* User Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Total Users</p>
                  <p className="text-2xl font-bold">{users.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Total Revenue</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(users.reduce((sum, user) => sum + user.totalSpent, 0))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm font-medium">Total Orders</p>
                  <p className="text-2xl font-bold">
                    {users.reduce((sum, user) => sum + user.totalPurchases, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Download className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm font-medium">Total Downloads</p>
                  <p className="text-2xl font-bold">
                    {users.reduce((sum, user) => sum + user.totalDownloads, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* User Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={userSearchTerm}
                onChange={(e) => setUserSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedUserRole} onValueChange={setSelectedUserRole}>
              <SelectTrigger>
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedUserStatus} onValueChange={setSelectedUserStatus}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {filteredUsers.length} users
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="p-4 font-medium">User</th>
                  <th className="p-4 font-medium">Role</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Purchases</th>
                  <th className="p-4 font-medium">Total Spent</th>
                  <th className="p-4 font-medium">Join Date</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            {user.email}
                            {user.isEmailVerified && (
                              <CheckCircle className="h-3 w-3 text-green-500 ml-1" />
                            )}
                          </div>
                          {user.location && (
                            <div className="text-xs text-muted-foreground">{user.location}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Select
                        value={user.role}
                        onValueChange={(role: 'user' | 'admin' | 'moderator') => 
                          handleUserRoleChange(user._id, role)
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="moderator">Moderator</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={user.isActive}
                          onCheckedChange={() => handleUserStatusToggle(user._id)}
                        />
                        <span className="text-sm">
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <div>{user.totalPurchases} orders</div>
                        <div className="text-muted-foreground">{user.totalDownloads} downloads</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium">{formatCurrency(user.totalSpent)}</div>
                      {user.totalPurchases > 0 && (
                        <div className="text-xs text-muted-foreground">
                          avg: {formatCurrency(user.totalSpent / user.totalPurchases)}
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <div>{formatDate(user.joinDate)}</div>
                        {user.lastLogin && (
                          <div className="text-muted-foreground text-xs">
                            Last: {formatDate(user.lastLogin)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="destructive">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete User</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete {user.name}? This action cannot be undone.
                                All their data including purchases and downloads will be permanently removed.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteUser(user._id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete User
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="p-8 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No users found</h3>
              <p className="text-muted-foreground">
                No users match your current search and filter criteria.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  // Simple placeholder sections
  const renderBlogs = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Manage Blogs</h2>
          <p className="text-muted-foreground">Create and manage blog posts</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Blog Post
        </Button>
      </div>
      <Card>
        <CardContent className="p-8 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Blog Management</h3>
          <p className="text-muted-foreground">Blog management functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );

  const renderPortfolio = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Manage Portfolio</h2>
          <p className="text-muted-foreground">Showcase your work and projects</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>
      <Card>
        <CardContent className="p-8 text-center">
          <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Portfolio Management</h3>
          <p className="text-muted-foreground">Portfolio management functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Manage Services</h2>
          <p className="text-muted-foreground">Create and manage your services</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>
      <Card>
        <CardContent className="p-8 text-center">
          <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Services Management</h3>
          <p className="text-muted-foreground">Services management functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Reports & Analytics</h2>
        <p className="text-muted-foreground">View detailed reports and analytics</p>
      </div>
      <Card>
        <CardContent className="p-8 text-center">
          <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Reports Dashboard</h3>
          <p className="text-muted-foreground">Advanced analytics and reporting features will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'categories':
        return renderCategories();
      case 'assets':
        return renderAssets();
      case 'users':
        return renderUsers();
      case 'blogs':
        return renderBlogs();
      case 'portfolio':
        return renderPortfolio();
      case 'services':
        return renderServices();
      case 'reports':
        return renderReports();
      default:
        return renderOverview();
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <SidebarInset className="flex-1">
          <AdminHeader user={user} onLogout={handleLogout} />

          <main className="flex-1 p-4 md:p-6 space-y-6">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center space-y-4">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-muted-foreground">Loading admin dashboard...</p>
                </div>
              </div>
            ) : (
              renderContent()
            )}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
