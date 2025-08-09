// Example shared API interfaces

export interface DemoResponse {
  message: string;
}

// Asset interfaces
export interface Asset {
  id: number;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  downloads: number;
  image: string;
  isPremium: boolean;
  isTrending?: boolean;
  isBestSelling?: boolean;
  tags: string[];
  author: string;
  description?: string;
  fileUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AssetsResponse {
  assets: Asset[];
  total: number;
}

export interface CategoriesResponse {
  categories: string[];
}

// Authentication interfaces
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role?: "user" | "admin";
  name?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    role: "user" | "admin";
    name?: string;
  };
}

export interface UserProfile {
  id: number;
  email: string;
  name?: string;
  role: "user" | "admin";
  favorites: number[];
  downloads: number[];
  createdAt: string;
}

// Payment interfaces
export interface CheckoutRequest {
  assetIds: number[];
  userId: number;
}

export interface CheckoutResponse {
  sessionUrl: string;
  sessionId: string;
}

export interface Order {
  id: number;
  userId: number;
  assetIds: number[];
  total: number;
  status: "pending" | "completed" | "failed";
  createdAt: string;
}

export interface OrderHistoryResponse {
  orders: Order[];
}

// Admin interfaces
export interface UploadAssetRequest {
  title: string;
  description: string;
  category: string;
  tags: string[];
  price: number;
  file: File;
  type: "free" | "premium";
}

export interface AnalyticsResponse {
  totalAssets: number;
  totalUsers: number;
  totalRevenue: number;
  monthlyDownloads: number;
  popularCategories: { category: string; count: number }[];
  recentSales: Order[];
}
