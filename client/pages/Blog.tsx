import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Calendar, MessageCircle, User, Tag, Filter, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";

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
  commentsCount?: number;
}

const BLOG_CATEGORIES = [
  'All',
  'Business',
  'Lifestyle', 
  'Creative',
  'WordPress',
  'Design',
  'Technology',
  'Tutorial'
];

export default function Blog() {
  const { user, token } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      setIsAdmin(user.role === 'admin');
    }
    fetchBlogs();
  }, [user, token]);

  const fetchBlogs = async () => {
    try {
      // Try to fetch from admin endpoint if user is admin, otherwise use public endpoint
      let response;
      if (user?.role === 'admin' && token) {
        response = await fetch('/api/admin/blogs', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      } else {
        // For now, we'll use a demo blog structure since public blog endpoint isn't implemented
        setBlogs([
          {
            _id: '1',
            title: 'Getting Started with Modern Web Development',
            content: 'Learn the fundamentals of modern web development with React, TypeScript, and modern tooling.',
            excerpt: 'A comprehensive guide to kickstart your web development journey with the latest technologies and best practices.',
            slug: 'getting-started-modern-web-development',
            featuredImage: '/placeholder.svg',
            tags: ['Web Development', 'React', 'TypeScript', 'Tutorial'],
            status: 'published',
            authorName: 'Admin',
            createdAt: new Date().toISOString(),
            commentsCount: 5
          },
          {
            _id: '2',
            title: 'Design Systems and Component Libraries',
            content: 'Building scalable design systems that work across teams and products.',
            excerpt: 'Learn how to create and maintain design systems that scale with your organization and improve team collaboration.',
            slug: 'design-systems-component-libraries',
            featuredImage: '/placeholder.svg',
            tags: ['Design', 'UI/UX', 'Components', 'Frontend'],
            status: 'published',
            authorName: 'Admin',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            commentsCount: 12
          },
          {
            _id: '3',
            title: 'The Future of Digital Marketplaces',
            content: 'Exploring trends and innovations shaping the future of digital commerce.',
            excerpt: 'Discover what\'s coming next in the world of digital marketplaces and e-commerce technology.',
            slug: 'future-digital-marketplaces',
            featuredImage: '/placeholder.svg',
            tags: ['Business', 'E-commerce', 'Future', 'Technology'],
            status: 'published',
            authorName: 'Admin',
            createdAt: new Date(Date.now() - 172800000).toISOString(),
            commentsCount: 8
          },
          {
            _id: '4',
            title: 'Mastering CSS Grid and Flexbox',
            content: 'Complete guide to modern CSS layout techniques for responsive web design.',
            excerpt: 'Master the art of creating responsive layouts with CSS Grid and Flexbox in this comprehensive tutorial.',
            slug: 'mastering-css-grid-flexbox',
            featuredImage: '/placeholder.svg',
            tags: ['CSS', 'Layout', 'Responsive Design', 'Tutorial'],
            status: 'published',
            authorName: 'Admin',
            createdAt: new Date(Date.now() - 259200000).toISOString(),
            commentsCount: 18
          },
          {
            _id: '5',
            title: 'Building Accessible Web Applications',
            content: 'Essential practices for creating inclusive and accessible web experiences.',
            excerpt: 'Learn how to build web applications that are accessible to all users, following WCAG guidelines.',
            slug: 'building-accessible-web-applications',
            featuredImage: '/placeholder.svg',
            tags: ['Accessibility', 'Web Development', 'WCAG', 'Inclusive Design'],
            status: 'published',
            authorName: 'Admin',
            createdAt: new Date(Date.now() - 345600000).toISOString(),
            commentsCount: 23
          },
          {
            _id: '6',
            title: 'API Design Best Practices',
            content: 'How to design RESTful APIs that are scalable, maintainable, and developer-friendly.',
            excerpt: 'Explore the essential principles and patterns for designing robust APIs that stand the test of time.',
            slug: 'api-design-best-practices',
            featuredImage: '/placeholder.svg',
            tags: ['API', 'Backend', 'REST', 'Best Practices'],
            status: 'published',
            authorName: 'Admin',
            createdAt: new Date(Date.now() - 432000000).toISOString(),
            commentsCount: 14
          }
        ]);
        setLoading(false);
        return;
      }

      if (response?.ok) {
        const blogsData = await response.json();
        setBlogs(blogsData.blogs || []);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter blogs based on search term and category
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || 
                           blog.tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase()));
    return matchesSearch && matchesCategory && blog.status === 'published';
  });

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading blog posts...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Header */}
        <header className="relative bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
            <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Blog
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Insights, tutorials, and industry trends for developers and designers
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-3 bg-white/10 border border-white/20 backdrop-blur-sm text-white placeholder:text-gray-300 rounded-full focus:bg-white/20 focus:border-white/40"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Main Content Area */}
              <div className="lg:w-2/3">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {BLOG_CATEGORIES.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={selectedCategory === category 
                        ? "bg-purple-600 hover:bg-purple-700" 
                        : "border-gray-600 text-gray-300 hover:bg-gray-800"
                      }
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                {/* Blog Posts */}
                <div className="space-y-8">
                  {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog) => (
                      <Card key={blog._id} className="group hover:shadow-xl transition-all duration-300 bg-gray-900/50 border-gray-700 hover:border-gray-600 overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          {/* Featured Image */}
                          {blog.featuredImage && (
                            <div className="md:w-1/3 relative overflow-hidden">
                              <img
                                src={blog.featuredImage}
                                alt={blog.title}
                                className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:hidden"></div>
                            </div>
                          )}
                          
                          {/* Content */}
                          <div className="flex-1 p-6">
                            <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                              </div>
                              {blog.commentsCount && (
                                <div className="flex items-center gap-1">
                                  <MessageCircle className="h-4 w-4" />
                                  <span>{blog.commentsCount} Comments</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                <span>by {blog.authorName}</span>
                              </div>
                            </div>
                            
                            <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                              <Link to={`/blog/${blog.slug}`}>
                                {blog.title}
                              </Link>
                            </h2>
                            
                            <p className="text-gray-400 mb-4 line-clamp-3">
                              {blog.excerpt}
                            </p>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {blog.tags.map((tag, index) => (
                                <Badge 
                                  key={index} 
                                  variant="outline" 
                                  className="text-purple-400 border-purple-400/30 bg-purple-400/10"
                                >
                                  <Tag className="h-3 w-3 mr-1" />
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            
                            <Link 
                              to={`/blog/${blog.slug}`}
                              className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium transition-colors group"
                            >
                              Read More
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <Card className="bg-gray-900/50 border-gray-700">
                      <CardContent className="p-12 text-center">
                        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Search className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">No articles found</h3>
                        <p className="text-gray-400">
                          {searchTerm 
                            ? "Try adjusting your search terms or filters"
                            : "No blog posts match your current category selection"
                          }
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Pagination could go here */}
              </div>

              {/* Sidebar */}
              <div className="lg:w-1/3">
                <div className="sticky top-8 space-y-8">
                  {/* Search Widget */}
                  <Card className="bg-gray-900/50 border-gray-700">
                    <CardHeader>
                      <h3 className="text-lg font-semibold text-white">Search Articles</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          type="text"
                          placeholder="Search by title, content, or tags..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Categories Widget */}
                  <Card className="bg-gray-900/50 border-gray-700">
                    <CardHeader>
                      <h3 className="text-lg font-semibold text-white">Categories</h3>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {BLOG_CATEGORIES.map((category) => {
                          const categoryCount = category === 'All' 
                            ? blogs.filter(b => b.status === 'published').length
                            : blogs.filter(b => 
                                b.status === 'published' && 
                                b.tags.some(tag => tag.toLowerCase().includes(category.toLowerCase()))
                              ).length;

                          return (
                            <li key={category}>
                              <button
                                onClick={() => setSelectedCategory(category)}
                                className={`w-full flex justify-between items-center p-2 rounded transition-colors text-left ${
                                  selectedCategory === category
                                    ? 'bg-purple-600 text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                }`}
                              >
                                <span>{category}</span>
                                <Badge variant="outline" className="text-xs">
                                  {categoryCount}
                                </Badge>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Recent Posts Widget */}
                  <Card className="bg-gray-900/50 border-gray-700">
                    <CardHeader>
                      <h3 className="text-lg font-semibold text-white">Recent Posts</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {blogs.slice(0, 3).map((blog) => (
                          <div key={blog._id} className="flex gap-3">
                            {blog.featuredImage && (
                              <img
                                src={blog.featuredImage}
                                alt={blog.title}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                            )}
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-white mb-1 line-clamp-2">
                                <Link 
                                  to={`/blog/${blog.slug}`}
                                  className="hover:text-purple-400 transition-colors"
                                >
                                  {blog.title}
                                </Link>
                              </h4>
                              <p className="text-xs text-gray-400">
                                {new Date(blog.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tags Widget */}
                  <Card className="bg-gray-900/50 border-gray-700">
                    <CardHeader>
                      <h3 className="text-lg font-semibold text-white">Popular Tags</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {Array.from(new Set(blogs.flatMap(blog => blog.tags))).slice(0, 10).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="cursor-pointer hover:bg-purple-600 hover:border-purple-600 transition-colors"
                            onClick={() => setSearchTerm(tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Newsletter Widget */}
                  <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500/30">
                    <CardHeader>
                      <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 text-sm mb-4">
                        Get the latest articles and insights delivered to your inbox.
                      </p>
                      <div className="space-y-3">
                        <Input
                          type="email"
                          placeholder="Your email address"
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                        />
                        <Button className="w-full bg-purple-600 hover:bg-purple-700">
                          Subscribe
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
