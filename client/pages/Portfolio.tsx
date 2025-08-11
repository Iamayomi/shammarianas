import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ExternalLink,
  Github,
  Eye,
  Filter,
  Grid3X3,
  List,
  Star,
  Calendar,
  User,
  Code,
  Palette,
  Smartphone,
  Monitor,
  ShoppingBag,
  Layers,
  Award,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";

interface Portfolio {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  projectUrl?: string;
  githubUrl?: string;
  technologies: string[];
  featured: boolean;
  status: "draft" | "published";
  authorName: string;
  createdAt: string;
  views?: number;
  likes?: number;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
}

const PORTFOLIO_CATEGORIES = [
  "All",
  "Web Development",
  "Mobile App",
  "UI/UX Design",
  "Branding",
  "E-commerce",
  "Other",
];

const TECHNOLOGY_FILTERS = [
  "All",
  "React",
  "Vue.js",
  "Angular",
  "Node.js",
  "Python",
  "TypeScript",
  "JavaScript",
  "Next.js",
  "Tailwind CSS",
  "MongoDB",
  "PostgreSQL",
  "Firebase",
];

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "web development":
      return <Code className="h-4 w-4" />;
    case "mobile app":
      return <Smartphone className="h-4 w-4" />;
    case "ui/ux design":
      return <Palette className="h-4 w-4" />;
    case "branding":
      return <Award className="h-4 w-4" />;
    case "e-commerce":
      return <ShoppingBag className="h-4 w-4" />;
    default:
      return <Layers className="h-4 w-4" />;
  }
};

export default function Portfolio() {
  const { user, token } = useAuth();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTechnology, setSelectedTechnology] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchPortfolios();
  }, [user, token]);

  const fetchPortfolios = async () => {
    try {
      // Try to fetch from admin endpoint if user is admin, otherwise use demo data
      if (user?.role === "admin" && token) {
        const response = await fetch("/api/admin/portfolios", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const portfoliosData = await response.json();
          setPortfolios(portfoliosData.portfolios || []);
        } else {
          setDemoPortfolios();
        }
      } else {
        setDemoPortfolios();
      }
    } catch (error) {
      console.error("Error fetching portfolios:", error);
      setDemoPortfolios();
    } finally {
      setLoading(false);
    }
  };

  const setDemoPortfolios = () => {
    const demoPortfolios: Portfolio[] = [
      {
        _id: "1",
        title: "E-commerce Dashboard",
        description:
          "A comprehensive admin dashboard for managing online stores with real-time analytics, inventory management, and customer insights.",
        category: "Web Development",
        image: "/placeholder.svg",
        projectUrl: "https://demo-ecommerce-dashboard.com",
        githubUrl: "https://github.com/example/ecommerce-dashboard",
        technologies: [
          "React",
          "TypeScript",
          "Node.js",
          "MongoDB",
          "Tailwind CSS",
        ],
        featured: true,
        status: "published",
        authorName: "John Doe",
        createdAt: new Date().toISOString(),
        views: 1250,
        likes: 89,
        difficulty: "Advanced",
      },
      {
        _id: "2",
        title: "Mobile Banking App",
        description:
          "Secure and intuitive mobile banking application with biometric authentication, transaction tracking, and investment portfolio management.",
        category: "Mobile App",
        image: "/placeholder.svg",
        projectUrl: "https://banking-app-demo.com",
        githubUrl: "https://github.com/example/banking-app",
        technologies: ["React Native", "TypeScript", "Firebase", "Redux"],
        featured: true,
        status: "published",
        authorName: "Jane Smith",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        views: 980,
        likes: 76,
        difficulty: "Advanced",
      },
      {
        _id: "3",
        title: "Brand Identity Design",
        description:
          "Complete brand identity design for a sustainable fashion startup, including logo, color palette, typography, and brand guidelines.",
        category: "Branding",
        image: "/placeholder.svg",
        projectUrl: "https://behance.net/gallery/brand-identity",
        technologies: ["Figma", "Adobe Illustrator", "Adobe Photoshop"],
        featured: false,
        status: "published",
        authorName: "Alex Johnson",
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        views: 720,
        likes: 54,
        difficulty: "Intermediate",
      },
      {
        _id: "4",
        title: "Task Management App",
        description:
          "Collaborative task management application with real-time updates, team workspaces, and advanced project tracking capabilities.",
        category: "Web Development",
        image: "/placeholder.svg",
        projectUrl: "https://taskmanager-demo.com",
        githubUrl: "https://github.com/example/task-manager",
        technologies: ["Vue.js", "Node.js", "PostgreSQL", "Socket.io"],
        featured: false,
        status: "published",
        authorName: "Sarah Wilson",
        createdAt: new Date(Date.now() - 259200000).toISOString(),
        views: 650,
        likes: 42,
        difficulty: "Intermediate",
      },
      {
        _id: "5",
        title: "Food Delivery App UI",
        description:
          "Modern and appetizing UI design for a food delivery application with smooth animations and intuitive user experience.",
        category: "UI/UX Design",
        image: "/placeholder.svg",
        projectUrl: "https://dribbble.com/shots/food-delivery-ui",
        technologies: ["Figma", "Principle", "Adobe XD"],
        featured: false,
        status: "published",
        authorName: "Mike Chen",
        createdAt: new Date(Date.now() - 345600000).toISOString(),
        views: 890,
        likes: 67,
        difficulty: "Beginner",
      },
      {
        _id: "6",
        title: "Cryptocurrency Portfolio Tracker",
        description:
          "Real-time cryptocurrency portfolio tracking application with market analysis, price alerts, and trading insights.",
        category: "Web Development",
        image: "/placeholder.svg",
        projectUrl: "https://crypto-tracker-demo.com",
        githubUrl: "https://github.com/example/crypto-tracker",
        technologies: [
          "Next.js",
          "TypeScript",
          "Chart.js",
          "TailwindCSS",
          "CoinGecko API",
        ],
        featured: true,
        status: "published",
        authorName: "David Kim",
        createdAt: new Date(Date.now() - 432000000).toISOString(),
        views: 1100,
        likes: 95,
        difficulty: "Advanced",
      },
      {
        _id: "7",
        title: "Social Media Analytics Dashboard",
        description:
          "Comprehensive analytics dashboard for social media managers to track performance across multiple platforms.",
        category: "Web Development",
        image: "/placeholder.svg",
        projectUrl: "https://social-analytics-demo.com",
        githubUrl: "https://github.com/example/social-analytics",
        technologies: ["React", "D3.js", "Node.js", "Express", "MongoDB"],
        featured: false,
        status: "published",
        authorName: "Emma Davis",
        createdAt: new Date(Date.now() - 518400000).toISOString(),
        views: 580,
        likes: 38,
        difficulty: "Intermediate",
      },
      {
        _id: "8",
        title: "E-learning Platform",
        description:
          "Interactive e-learning platform with video streaming, progress tracking, quizzes, and certification management.",
        category: "Web Development",
        image: "/placeholder.svg",
        projectUrl: "https://elearning-demo.com",
        githubUrl: "https://github.com/example/elearning-platform",
        technologies: ["Angular", "TypeScript", "Firebase", "Material UI"],
        featured: false,
        status: "published",
        authorName: "Chris Brown",
        createdAt: new Date(Date.now() - 604800000).toISOString(),
        views: 760,
        likes: 51,
        difficulty: "Advanced",
      },
    ];

    setPortfolios(demoPortfolios);
  };

  // Filter and sort portfolios
  const filteredPortfolios = portfolios
    .filter((portfolio) => {
      const matchesSearch =
        portfolio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        portfolio.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        portfolio.technologies.some((tech) =>
          tech.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      const matchesCategory =
        selectedCategory === "All" || portfolio.category === selectedCategory;
      const matchesTechnology =
        selectedTechnology === "All" ||
        portfolio.technologies.some((tech) => tech === selectedTechnology);
      return (
        matchesSearch &&
        matchesCategory &&
        matchesTechnology &&
        portfolio.status === "published"
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "popular":
          return (b.views || 0) - (a.views || 0);
        case "liked":
          return (b.likes || 0) - (a.likes || 0);
        default:
          return 0;
      }
    });

  const featuredPortfolios = portfolios
    .filter((p) => p.featured && p.status === "published")
    .slice(0, 3);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading portfolio...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Header */}
        <header
          className="page-header bg-img section-padding valign"
          style={{
            backgroundImage: "url('/assets/imgs/background/bg4.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container pt-80">
            <div className="row">
              <div className="col-12">
                <div className="text-center">
                  <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                      <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Portfolio 
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* Featured Projects */}
   

        {/* Filter and Search Section */}
        <section className="py-8 bg-gray-900/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>

                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-600 text-white">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {PORTFOLIO_CATEGORIES.map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                        className="text-white"
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedTechnology}
                  onValueChange={setSelectedTechnology}
                >
                  <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="Technology" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {TECHNOLOGY_FILTERS.map((tech) => (
                      <SelectItem
                        key={tech}
                        value={tech}
                        className="text-white"
                      >
                        {tech}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* View Options */}
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 bg-gray-800 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="newest" className="text-white">
                      Newest
                    </SelectItem>
                    <SelectItem value="oldest" className="text-white">
                      Oldest
                    </SelectItem>
                    <SelectItem value="popular" className="text-white">
                      Most Viewed
                    </SelectItem>
                    <SelectItem value="liked" className="text-white">
                      Most Liked
                    </SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex bg-gray-800 rounded-lg border border-gray-600">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={
                      viewMode === "grid"
                        ? "bg-purple-600"
                        : "text-gray-400 hover:text-white"
                    }
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={
                      viewMode === "list"
                        ? "bg-purple-600"
                        : "text-gray-400 hover:text-white"
                    }
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {filteredPortfolios.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    : "space-y-6"
                }
              >
                {filteredPortfolios.map((portfolio) => (
                  <Card
                    key={portfolio._id}
                    className={`group bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-all duration-300 ${
                      viewMode === "list"
                        ? "flex flex-col md:flex-row overflow-hidden"
                        : "overflow-hidden"
                    }`}
                  >
                    <div
                      className={`relative ${viewMode === "list" ? "md:w-1/3" : ""}`}
                    >
                      <img
                        src={portfolio.image}
                        alt={portfolio.title}
                        className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                          viewMode === "list"
                            ? "w-full h-64 md:h-full"
                            : "w-full h-48"
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                      <div className="absolute top-3 left-3 flex gap-2">
                        <Badge
                          variant="outline"
                          className="bg-black/50 border-gray-500 text-white text-xs"
                        >
                          {getCategoryIcon(portfolio.category)}
                          <span className="ml-1">{portfolio.category}</span>
                        </Badge>
                        {portfolio.difficulty && (
                          <Badge
                            variant="outline"
                            className={`bg-black/50 border-gray-500 text-xs ${
                              portfolio.difficulty === "Beginner"
                                ? "text-green-400"
                                : portfolio.difficulty === "Intermediate"
                                  ? "text-yellow-400"
                                  : "text-red-400"
                            }`}
                          >
                            {portfolio.difficulty}
                          </Badge>
                        )}
                      </div>
                      <div className="absolute bottom-3 right-3 flex gap-1">
                        {portfolio.views && (
                          <Badge
                            variant="outline"
                            className="bg-black/50 border-gray-500 text-white text-xs"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            {portfolio.views}
                          </Badge>
                        )}
                        {portfolio.likes && (
                          <Badge
                            variant="outline"
                            className="bg-black/50 border-gray-500 text-white text-xs"
                          >
                            <Star className="h-3 w-3 mr-1" />
                            {portfolio.likes}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <CardContent
                      className={`p-6 ${viewMode === "list" ? "md:w-2/3" : ""}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                          {portfolio.title}
                        </h3>
                      </div>

                      <p className="text-gray-400 mb-4 line-clamp-3">
                        {portfolio.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {portfolio.technologies
                          .slice(0, 4)
                          .map((tech, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-purple-900/30 text-purple-300 border-purple-700 text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                        {portfolio.technologies.length > 4 && (
                          <Badge
                            variant="secondary"
                            className="bg-gray-800 text-gray-400 text-xs"
                          >
                            +{portfolio.technologies.length - 4}
                          </Badge>
                        )}
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{portfolio.authorName}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {new Date(
                                portfolio.createdAt,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        {portfolio.projectUrl && (
                          <Button
                            size="sm"
                            className="bg-purple-600 hover:bg-purple-700 flex-1"
                            asChild
                          >
                            <Link to={portfolio.projectUrl} target="_blank">
                              <ExternalLink className="h-3 w-3 mr-2" />
                              Live Demo
                            </Link>
                          </Button>
                        )}
                        {portfolio.githubUrl && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-600 text-gray-300 hover:bg-gray-800"
                            asChild
                          >
                            <Link to={portfolio.githubUrl} target="_blank">
                              <Github className="h-3 w-3 mr-2" />
                              Code
                            </Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-gray-900/50 border-gray-700">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Layers className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    No projects found
                  </h3>
                  <p className="text-gray-400">
                    {searchTerm ||
                    selectedCategory !== "All" ||
                    selectedTechnology !== "All"
                      ? "Try adjusting your search terms or filters"
                      : "No portfolio projects are available at the moment"}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Load More Button */}
            {filteredPortfolios.length > 0 &&
              filteredPortfolios.length >= 9 && (
                <div className="text-center mt-12">
                  <Button
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Load More Projects
                  </Button>
                </div>
              )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Start Your Next Project?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Get inspired by these projects or let's collaborate on something
                amazing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-purple-600 hover:bg-purple-700" size="lg">
                  Get in Touch
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  View Services
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
