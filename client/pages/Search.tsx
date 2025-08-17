import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Download, Heart, Filter, Grid, List } from "lucide-react";
import { api } from "@/shared/api";

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
  type: "free" | "premium";
  fileSize: string;
  fileType: string;
}

interface SearchFilters {
  category: string;
  priceFilter: string;
  sortBy: string;
  search: string;
}

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  // const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState<SearchFilters>({
    category: searchParams.get("category") || "All Categories",
    priceFilter: searchParams.get("price") || "all",
    sortBy: searchParams.get("sort") || "popular",
    search: searchParams.get("q") || "",
  });

  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchAssets();
  }, [filters, pagination.page]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      if (response.ok) {
        setCategories(["All Categories", ...data.categories]);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: "12",
        ...(filters.category !== "All Categories" && {
          category: filters.category,
        }),
        ...(filters.priceFilter !== "all" && {
          priceFilter: filters.priceFilter,
        }),
        ...(filters.sortBy && { sortBy: filters.sortBy }),
        ...(filters.search && { search: filters.search }),
      });

      const response = await fetch(`/api/assets?${params}`);
      const data = await response.json();

      if (response.ok) {
        setAssets(data.assets);
        setPagination((prev) => ({
          ...prev,
          pages: data.pages,
          total: data.total,
        }));
      }
    } catch (error) {
      console.error("Failed to fetch assets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));

    // Update URL params
    const newSearchParams = new URLSearchParams();
    if (newFilters.search) newSearchParams.set("q", newFilters.search);
    if (newFilters.category !== "All Categories")
      newSearchParams.set("category", newFilters.category);
    if (newFilters.priceFilter !== "all")
      newSearchParams.set("price", newFilters.priceFilter);
    if (newFilters.sortBy !== "popular")
      newSearchParams.set("sort", newFilters.sortBy);

    setSearchParams(newSearchParams);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAssets();
  };

  const AssetCard = ({ asset }: { asset: Asset }) => (
    <Card
      className={`group hover:shadow-lg transition-all duration-200 ${viewMode === "list" ? "flex" : ""}`}
    >
      <div
        className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : "aspect-video"} bg-gray-100 rounded-t-lg overflow-hidden`}
      >
        <img
          src={asset.image}
          alt={asset.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        {asset.isTrending && (
          <Badge className="absolute top-2 left-2 bg-red-500">Trending</Badge>
        )}
        {asset.isBestSelling && (
          <Badge className="absolute top-2 left-2 bg-green-500">
            Best Selling
          </Badge>
        )}
        {asset.isFeatured && (
          <Badge className="absolute top-2 right-2 bg-blue-500">Featured</Badge>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <Button variant="secondary" size="sm">
            View Details
          </Button>
        </div>
      </div>

      <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{asset.title}</h3>
          <Button variant="ghost" size="sm">
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        <p
          className={`text-gray-600 mb-3 ${viewMode === "list" ? "line-clamp-2" : "line-clamp-2"}`}
        >
          {asset.description}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline">{asset.category}</Badge>
          <Badge variant="outline">{asset.type}</Badge>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {asset.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{asset.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {asset.downloads.toLocaleString()}
              </span>
            </div>
          </div>
          <span className="text-xs text-gray-500">{asset.fileSize}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {asset.price === 0 ? (
              <span className="text-lg font-bold text-green-600">Free</span>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">${asset.price}</span>
                {asset.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ${asset.originalPrice}
                  </span>
                )}
              </div>
            )}
          </div>
          <span className="text-sm text-gray-600">by {asset.authorName}</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Search Assets</h1>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-4">
              <Input
                placeholder="Search for assets, themes, graphics..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="flex-1"
              />
              <Button type="submit">Search</Button>
            </div>
          </form>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <Select
              value={filters.category}
              onValueChange={(value) => handleFilterChange("category", value)}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.priceFilter}
              onValueChange={(value) =>
                handleFilterChange("priceFilter", value)
              }
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.sortBy}
              onValueChange={(value) => handleFilterChange("sortBy", value)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 ml-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode("grid")}
                className={
                  viewMode === "grid"
                    ? "bg-primary text-primary-foreground"
                    : ""
                }
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode("list")}
                className={
                  viewMode === "list"
                    ? "bg-primary text-primary-foreground"
                    : ""
                }
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Showing {assets.length} of {pagination.total} results
              {filters.search && <span> for "{filters.search}"</span>}
            </p>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Assets Grid/List */}
            <div
              className={`${
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              } mb-8`}
            >
              {assets.map((asset) => (
                <AssetCard key={asset._id} asset={asset} />
              ))}
            </div>

            {/* Empty State */}
            {assets.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No assets found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or browse our categories.
                </p>
                <Button
                  onClick={() => {
                    setFilters({
                      category: "All Categories",
                      priceFilter: "all",
                      sortBy: "popular",
                      search: "",
                    });
                    setSearchParams(new URLSearchParams());
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  disabled={pagination.page === 1}
                  onClick={() =>
                    setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
                  }
                >
                  Previous
                </Button>

                {Array.from(
                  { length: Math.min(5, pagination.pages) },
                  (_, i) => {
                    const page = i + 1;
                    return (
                      <Button
                        key={page}
                        variant={
                          pagination.page === page ? "default" : "outline"
                        }
                        onClick={() =>
                          setPagination((prev) => ({ ...prev, page }))
                        }
                      >
                        {page}
                      </Button>
                    );
                  },
                )}

                <Button
                  variant="outline"
                  disabled={pagination.page === pagination.pages}
                  onClick={() =>
                    setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
                  }
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
