import { Link } from "react-router-dom";
import { Star, Download, Users, Shield, Search, ArrowRight, Play, Code, Image, Video, Layers, Smartphone, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";

const categories = [
  { name: "Code", icon: Code, count: "2.5k+", color: "bg-blue-100 text-blue-600" },
  { name: "Templates", icon: Layers, count: "1.8k+", color: "bg-purple-100 text-purple-600" },
  { name: "Graphics", icon: Image, count: "3.2k+", color: "bg-green-100 text-green-600" },
  { name: "Videos", icon: Video, count: "950+", color: "bg-red-100 text-red-600" },
  { name: "Mobile Apps", icon: Smartphone, count: "670+", color: "bg-yellow-100 text-yellow-600" },
  { name: "UI Kits", icon: Palette, count: "1.1k+", color: "bg-pink-100 text-pink-600" },
];

const featuredAssets = [
  {
    id: "demo1",
    title: "Modern React Dashboard",
    category: "Templates",
    price: "$29",
    rating: 4.9,
    downloads: "1.2k",
    image: "/placeholder.svg",
    isPremium: true,
  },
  {
    id: "demo2",
    title: "React Component Library",
    category: "Code",
    price: "Free",
    rating: 4.8,
    downloads: "850",
    image: "/placeholder.svg",
    isPremium: false,
  },
  {
    id: "demo3",
    title: "Social Media Graphics Pack",
    category: "Graphics",
    price: "$19",
    rating: 4.7,
    downloads: "2.1k",
    image: "/placeholder.svg",
    isPremium: true,
  },
  {
    id: "demo4",
    title: "Mobile App UI Kit",
    category: "Mobile Apps",
    price: "$39",
    rating: 4.9,
    downloads: "760",
    image: "/placeholder.svg",
    isPremium: true,
  },
];

const stats = [
  { label: "Digital Assets", value: "10,000+" },
  { label: "Happy Customers", value: "50,000+" },
  { label: "Downloads", value: "2M+" },
  { label: "Categories", value: "15+" },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Discover Premium
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 block">
                Digital Assets
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              From stunning templates to powerful code snippets, find everything you need to bring your creative projects to life. Join thousands of creators who trust shammarianas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/explore">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 px-8">
                  Explore Assets
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for templates, graphics, code, and more..."
                  className="w-full pl-12 pr-4 py-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                />
                <Button className="absolute right-2 top-2 bg-purple-600 hover:bg-purple-700">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-purple-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover high-quality digital assets across multiple categories. From web templates to mobile apps, we have everything you need.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Link key={index} to="/explore" className="group">
                <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`}>
                      <category.icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.count} assets</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Assets */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Assets</h2>
              <p className="text-gray-600">Hand-picked premium digital assets from our community</p>
            </div>
            <Link to="/templates">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredAssets.map((asset) => (
              <Card key={asset.id} className="group hover:shadow-lg transition-shadow duration-200">
                <Link to={`/product/${asset.id}`}>
                  <div className="relative">
                    <img
                      src={asset.image}
                      alt={asset.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {asset.isPremium && (
                      <div className="absolute top-3 right-3 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Premium
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs text-purple-600 font-medium">{asset.category}</span>
                      <span className="font-bold text-gray-900">{asset.price}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {asset.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        {asset.rating}
                      </div>
                      <div className="flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        {asset.downloads}
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose shammarianas?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the highest quality digital assets and the best experience for our community.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Guaranteed</h3>
              <p className="text-gray-600">
                Every asset is carefully reviewed by our team to ensure it meets our high-quality standards.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Active Community</h3>
              <p className="text-gray-600">
                Join thousands of creators, developers, and designers who share and discover amazing assets.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant Downloads</h3>
              <p className="text-gray-600">
                Get immediate access to your purchases with fast, reliable downloads and lifetime access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Join our community today and get access to thousands of premium digital assets. Start your creative journey with shammarianas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="px-8">
                Sign Up Free
              </Button>
            </Link>
            <Link to="/explore">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-purple-600 px-8">
                Browse Assets
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
