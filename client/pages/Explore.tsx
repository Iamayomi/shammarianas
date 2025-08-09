import { useState } from "react";
import { Link } from "react-router-dom";
import { Filter, Grid, List, Star, Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";

const categories = [
  "All Categories", "Code", "Video", "Audio", "Plugins", "Graphics", 
  "Mobile Apps", "Themes", "3D Assets", "Templates"
];

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

const assets = [
  {
    id: "demo1",
    title: "Modern React Dashboard",
    category: "Code",
    price: 29,
    originalPrice: 49,
    rating: 4.9,
    downloads: 1240,
    image: "/placeholder.svg",
    isPremium: true,
    isTrending: true,
    tags: ["React", "Dashboard", "Admin Panel"],
    author: "CodeMaster",
  },
  {
    id: "demo2",
    title: "Social Media Graphics Pack",
    category: "Graphics",
    price: 0,
    rating: 4.7,
    downloads: 2100,
    image: "/placeholder.svg",
    isPremium: false,
    isBestSelling: true,
    tags: ["Instagram", "Facebook", "Twitter"],
    author: "DesignPro",
  },
  {
    id: "demo3",
    title: "Music Player App UI",
    category: "Mobile Apps",
    price: 39,
    rating: 4.8,
    downloads: 876,
    image: "/placeholder.svg",
    isPremium: true,
    tags: ["Mobile", "Music", "iOS", "Android"],
    author: "AppDesigner",
  },
  {
    id: "demo4",
    title: "Corporate WordPress Theme",
    category: "Themes",
    price: 25,
    rating: 4.6,
    downloads: 1456,
    image: "/placeholder.svg",
    isPremium: true,
    tags: ["WordPress", "Corporate", "Business"],
    author: "ThemeForge",
  },
  {
    id: "demo5",
    title: "3D Character Models",
    category: "3D Assets",
    price: 15,
    rating: 4.9,
    downloads: 543,
    image: "/placeholder.svg",
    isPremium: true,
    isTrending: true,
    tags: ["3D", "Character", "Animation"],
    author: "3DArtist",
  },
  {
    id: "demo6",
    title: "JavaScript Animations Library",
    category: "Code",
    price: 0,
    rating: 4.8,
    downloads: 3200,
    image: "/placeholder.svg",
    isPremium: false,
    tags: ["JavaScript", "Animation", "Library"],
    author: "DevStudio",
  },
];

export default function Explore() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceFilter, setPriceFilter] = useState("all");

  const filteredAssets = assets.filter(asset => {
    const matchesCategory = selectedCategory === "All Categories" || asset.category === selectedCategory;
    const matchesSearch = asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesPrice = priceFilter === "all" || 
                        (priceFilter === "free" && asset.price === 0) ||
                        (priceFilter === "paid" && asset.price > 0);
    
    return matchesCategory && matchesSearch && matchesPrice;
  });

  return (
    <Layout>
      <div className="bg-background min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-primary-foreground mb-4">Explore Digital Assets</h1>
            <p className="text-primary-foreground/80 text-lg">
              Discover thousands of high-quality digital assets across multiple categories
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-64 space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedCategory === category
                          ? "bg-primary/20 text-primary font-medium"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3">Price</h3>
                <div className="space-y-2">
                  {[
                    { value: "all", label: "All Items" },
                    { value: "free", label: "Free" },
                    { value: "paid", label: "Premium" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setPriceFilter(option.value)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        priceFilter === option.value
                          ? "bg-primary/20 text-primary font-medium"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Search and Controls */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search assets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-secondary border-input text-foreground"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48 bg-secondary border-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex border border-border rounded-lg">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-r-none"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-l-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Results Header */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredAssets.length} results
                  {selectedCategory !== "All Categories" && ` in ${selectedCategory}`}
                </p>
              </div>

              {/* Assets Grid/List */}
              <div className={
                viewMode === "grid" 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }>
                {filteredAssets.map((asset) => (
                  <Card key={asset.id} className="group hover:shadow-lg transition-shadow duration-200 bg-card border-border">
                    <Link to={`/asset/${asset.id}`}>
                      {viewMode === "grid" ? (
                        <>
                          <div className="relative">
                            <img
                              src={asset.image}
                              alt={asset.title}
                              className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <div className="absolute top-3 left-3 flex gap-2">
                              {asset.isPremium && (
                                <Badge className="bg-primary text-primary-foreground">Premium</Badge>
                              )}
                              {asset.isTrending && (
                                <Badge className="bg-orange-500 text-white">Trending</Badge>
                              )}
                              {asset.isBestSelling && (
                                <Badge className="bg-green-600 text-white">Best Selling</Badge>
                              )}
                            </div>
                            {asset.originalPrice && (
                              <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded text-xs">
                                Save ${asset.originalPrice - asset.price}
                              </div>
                            )}
                          </div>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-xs text-primary font-medium">{asset.category}</span>
                              <div className="text-right">
                                {asset.price === 0 ? (
                                  <span className="font-bold text-green-400">Free</span>
                                ) : (
                                  <div>
                                    <span className="font-bold text-foreground">${asset.price}</span>
                                    {asset.originalPrice && (
                                      <span className="text-xs text-muted-foreground line-through ml-1">
                                        ${asset.originalPrice}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                            <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                              {asset.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">by {asset.author}</p>
                            <div className="flex flex-wrap gap-1 mb-3">
                              {asset.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                {asset.rating}
                              </div>
                              <div className="flex items-center">
                                <Download className="h-4 w-4 mr-1" />
                                {asset.downloads.toLocaleString()}
                              </div>
                            </div>
                          </CardContent>
                        </>
                      ) : (
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <img
                              src={asset.image}
                              alt={asset.title}
                              className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-2">
                                <div className="min-w-0 flex-1">
                                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                                    {asset.title}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">by {asset.author}</p>
                                </div>
                                <div className="text-right ml-4 flex-shrink-0">
                                  {asset.price === 0 ? (
                                    <span className="font-bold text-green-400">Free</span>
                                  ) : (
                                    <span className="font-bold text-foreground">${asset.price}</span>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                <span className="text-primary font-medium">{asset.category}</span>
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                  {asset.rating}
                                </div>
                                <div className="flex items-center">
                                  <Download className="h-4 w-4 mr-1" />
                                  {asset.downloads.toLocaleString()}
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {asset.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      )}
                    </Link>
                  </Card>
                ))}
              </div>

              {filteredAssets.length === 0 && (
                <div className="text-center py-12">
                  <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No assets found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
                </div>
              )}

              {/* Load More */}
              {filteredAssets.length > 0 && (
                <div className="text-center mt-12">
                  <Button variant="outline" size="lg">
                    Load More Assets
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
