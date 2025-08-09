import { useEffect, useState } from "react";
import { 
  Code, 
  Smartphone, 
  Palette, 
  Globe, 
  Search, 
  BarChart3, 
  Shield, 
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  Users,
  Award,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Play,
  TrendingUp,
  Target,
  Lightbulb,
  Settings,
  HeadphonesIcon,
  Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

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
  category: string;
  timeline: string;
  testimonials?: {
    name: string;
    role: string;
    company: string;
    content: string;
    rating: number;
  }[];
}

interface ContactForm {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
}

const SERVICE_CATEGORIES = [
  'All',
  'Web Development',
  'Mobile Development',
  'UI/UX Design',
  'Digital Marketing',
  'Consulting',
  'Maintenance & Support'
];

const getServiceIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    code: <Code className="h-8 w-8" />,
    smartphone: <Smartphone className="h-8 w-8" />,
    palette: <Palette className="h-8 w-8" />,
    globe: <Globe className="h-8 w-8" />,
    search: <Search className="h-8 w-8" />,
    barchart: <BarChart3 className="h-8 w-8" />,
    shield: <Shield className="h-8 w-8" />,
    zap: <Zap className="h-8 w-8" />,
    settings: <Settings className="h-8 w-8" />,
    headphones: <HeadphonesIcon className="h-8 w-8" />
  };
  return icons[iconName] || <Code className="h-8 w-8" />;
};

export default function Services() {
  const { user, token } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeService, setActiveService] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: ''
  });

  useEffect(() => {
    fetchServices();
  }, [user, token]);

  const fetchServices = async () => {
    try {
      // Try to fetch from admin endpoint if user is admin, otherwise use demo data
      if (user?.role === 'admin' && token) {
        const response = await fetch('/api/admin/services', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const servicesData = await response.json();
          setServices(servicesData.services || []);
        } else {
          setDemoServices();
        }
      } else {
        setDemoServices();
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      setDemoServices();
    } finally {
      setLoading(false);
    }
  };

  const setDemoServices = () => {
    const demoServices: Service[] = [
      {
        _id: '1',
        title: 'Custom Web Development',
        description: 'Build powerful, scalable web applications tailored to your business needs using cutting-edge technologies and best practices.',
        shortDescription: 'Custom web applications built with modern technologies',
        icon: 'code',
        image: '/placeholder.svg',
        features: [
          'Responsive Design',
          'Modern Framework (React, Vue, Angular)',
          'Database Integration',
          'API Development',
          'SEO Optimization',
          'Performance Optimization',
          'Security Implementation',
          'Cross-browser Compatibility'
        ],
        pricing: {
          basic: 2500,
          pro: 5000,
          enterprise: 10000
        },
        featured: true,
        status: 'published',
        authorName: 'Development Team',
        createdAt: new Date().toISOString(),
        category: 'Web Development',
        timeline: '4-8 weeks',
        testimonials: [
          {
            name: 'Sarah Johnson',
            role: 'CEO',
            company: 'TechStart Inc.',
            content: 'Outstanding web development service. They delivered exactly what we needed and more.',
            rating: 5
          }
        ]
      },
      {
        _id: '2',
        title: 'Mobile App Development',
        description: 'Create engaging mobile applications for iOS and Android platforms with native performance and modern user experiences.',
        shortDescription: 'Native and cross-platform mobile applications',
        icon: 'smartphone',
        features: [
          'Native iOS & Android Development',
          'Cross-platform Solutions (React Native, Flutter)',
          'App Store Deployment',
          'Push Notifications',
          'Offline Functionality',
          'Payment Integration',
          'Analytics Implementation',
          'Maintenance & Updates'
        ],
        pricing: {
          basic: 5000,
          pro: 10000,
          enterprise: 20000
        },
        featured: true,
        status: 'published',
        authorName: 'Mobile Team',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        category: 'Mobile Development',
        timeline: '6-12 weeks',
        testimonials: [
          {
            name: 'Michael Chen',
            role: 'Product Manager',
            company: 'InnovateCorp',
            content: 'The mobile app exceeded our expectations. Great performance and user experience.',
            rating: 5
          }
        ]
      },
      {
        _id: '3',
        title: 'UI/UX Design Services',
        description: 'Design beautiful, intuitive user interfaces and experiences that engage users and drive conversions.',
        shortDescription: 'User-centered design and interface development',
        icon: 'palette',
        features: [
          'User Research & Analysis',
          'Wireframing & Prototyping',
          'Visual Design',
          'Interaction Design',
          'Usability Testing',
          'Design System Creation',
          'Brand Integration',
          'Responsive Design'
        ],
        pricing: {
          basic: 1500,
          pro: 3000,
          enterprise: 6000
        },
        featured: false,
        status: 'published',
        authorName: 'Design Team',
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        category: 'UI/UX Design',
        timeline: '3-6 weeks'
      },
      {
        _id: '4',
        title: 'E-commerce Solutions',
        description: 'Complete e-commerce platforms with payment processing, inventory management, and customer analytics.',
        shortDescription: 'Full-featured online stores and marketplaces',
        icon: 'globe',
        features: [
          'Custom E-commerce Platform',
          'Payment Gateway Integration',
          'Inventory Management',
          'Order Processing',
          'Customer Management',
          'Analytics & Reporting',
          'Multi-vendor Support',
          'Mobile Optimization'
        ],
        pricing: {
          basic: 3000,
          pro: 7000,
          enterprise: 15000
        },
        featured: true,
        status: 'published',
        authorName: 'E-commerce Team',
        createdAt: new Date(Date.now() - 259200000).toISOString(),
        category: 'Web Development',
        timeline: '6-10 weeks'
      },
      {
        _id: '5',
        title: 'Digital Marketing & SEO',
        description: 'Boost your online presence with comprehensive digital marketing strategies and search engine optimization.',
        shortDescription: 'SEO, content marketing, and digital strategy',
        icon: 'search',
        features: [
          'SEO Optimization',
          'Content Strategy',
          'Social Media Marketing',
          'PPC Campaign Management',
          'Email Marketing',
          'Analytics & Reporting',
          'Conversion Optimization',
          'Brand Management'
        ],
        pricing: {
          basic: 1000,
          pro: 2500,
          enterprise: 5000
        },
        featured: false,
        status: 'published',
        authorName: 'Marketing Team',
        createdAt: new Date(Date.now() - 345600000).toISOString(),
        category: 'Digital Marketing',
        timeline: '3-6 months'
      },
      {
        _id: '6',
        title: 'Business Intelligence & Analytics',
        description: 'Transform your data into actionable insights with custom dashboards and analytics solutions.',
        shortDescription: 'Data visualization and business intelligence',
        icon: 'barchart',
        features: [
          'Custom Dashboards',
          'Data Visualization',
          'Real-time Analytics',
          'Reporting Automation',
          'Data Integration',
          'KPI Tracking',
          'Predictive Analytics',
          'Performance Monitoring'
        ],
        pricing: {
          basic: 2000,
          pro: 4500,
          enterprise: 8000
        },
        featured: false,
        status: 'published',
        authorName: 'Analytics Team',
        createdAt: new Date(Date.now() - 432000000).toISOString(),
        category: 'Consulting',
        timeline: '4-8 weeks'
      },
      {
        _id: '7',
        title: 'Cloud Infrastructure & DevOps',
        description: 'Scalable cloud solutions with automated deployment, monitoring, and security best practices.',
        shortDescription: 'Cloud hosting, DevOps, and infrastructure management',
        icon: 'shield',
        features: [
          'Cloud Migration',
          'Infrastructure as Code',
          'CI/CD Pipeline Setup',
          'Monitoring & Logging',
          'Security Implementation',
          'Performance Optimization',
          'Backup Solutions',
          '24/7 Support'
        ],
        pricing: {
          basic: 1500,
          pro: 3500,
          enterprise: 7000
        },
        featured: false,
        status: 'published',
        authorName: 'DevOps Team',
        createdAt: new Date(Date.now() - 518400000).toISOString(),
        category: 'Consulting',
        timeline: '2-4 weeks'
      },
      {
        _id: '8',
        title: 'Maintenance & Support',
        description: 'Ongoing maintenance, updates, and technical support to keep your applications running smoothly.',
        shortDescription: 'Ongoing support and maintenance services',
        icon: 'headphones',
        features: [
          'Regular Updates',
          'Bug Fixes',
          'Security Patches',
          'Performance Monitoring',
          'Technical Support',
          'Backup Management',
          'Server Maintenance',
          'Emergency Response'
        ],
        pricing: {
          basic: 500,
          pro: 1000,
          enterprise: 2000
        },
        featured: false,
        status: 'published',
        authorName: 'Support Team',
        createdAt: new Date(Date.now() - 604800000).toISOString(),
        category: 'Maintenance & Support',
        timeline: 'Ongoing'
      }
    ];

    setServices(demoServices);
  };

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    return matchesCategory && service.status === 'published';
  });

  const featuredServices = services.filter(s => s.featured && s.status === 'published');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    try {
      // In a real app, this would send to your backend
      toast.success('Thank you for your inquiry! We\'ll get back to you within 24 hours.');
      setContactForm({
        name: '',
        email: '',
        company: '',
        service: '',
        budget: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading services...</p>
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
                Our Services
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Comprehensive digital solutions to grow your business
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-purple-400" />
                  <span>Full-Stack Development</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-400" />
                  <span>Digital Strategy</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-400" />
                  <span>Innovation Consulting</span>
                </div>
                <div className="flex items-center gap-2">
                  <HeadphonesIcon className="h-5 w-5 text-green-400" />
                  <span>24/7 Support</span>
                </div>
              </div>

              <div className="mt-8">
                <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100 mr-4">
                  Get Started
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-900">
                  <Play className="h-4 w-4 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Services */}
        {featuredServices.length > 0 && (
          <section className="py-16 bg-gray-900/20">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-3 mb-8">
                <Star className="h-6 w-6 text-yellow-400" />
                <h2 className="text-2xl font-bold text-white">Featured Services</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredServices.map((service) => (
                  <Card key={service._id} className="group bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-all duration-300 overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-16 h-16 bg-purple-600/20 rounded-lg flex items-center justify-center text-purple-400">
                          {getServiceIcon(service.icon)}
                        </div>
                        <Badge className="bg-yellow-600 text-black font-medium">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                      <CardTitle className="text-xl text-white group-hover:text-purple-400 transition-colors">
                        {service.title}
                      </CardTitle>
                      <p className="text-gray-400 text-sm">{service.shortDescription}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-4 line-clamp-3">{service.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{service.timeline}</span>
                        </div>
                        {service.pricing && (
                          <div className="text-purple-400 font-medium">
                            From ${service.pricing.basic?.toLocaleString()}
                          </div>
                        )}
                      </div>

                      <Button className="w-full bg-purple-600 hover:bg-purple-700">
                        Learn More
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Services Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">All Services</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Choose from our comprehensive range of digital services designed to meet your specific needs and goals.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {SERVICE_CATEGORIES.map((category) => (
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

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredServices.map((service) => (
                <Card 
                  key={service._id} 
                  className="group bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-all duration-300 cursor-pointer"
                  onClick={() => setActiveService(activeService === service._id ? null : service._id)}
                >
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center text-purple-400 mb-3">
                      {getServiceIcon(service.icon)}
                    </div>
                    <CardTitle className="text-lg text-white group-hover:text-purple-400 transition-colors">
                      {service.title}
                    </CardTitle>
                    <p className="text-gray-400 text-sm">{service.shortDescription}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        <span>{service.timeline}</span>
                      </div>
                      {service.pricing && (
                        <div className="text-purple-400 font-medium text-xs">
                          ${service.pricing.basic?.toLocaleString()}+
                        </div>
                      )}
                    </div>

                    {activeService === service._id && (
                      <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
                        <h4 className="text-white font-medium mb-2">Key Features:</h4>
                        <ul className="text-gray-400 text-sm space-y-1">
                          {service.features.slice(0, 4).map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        
                        {service.pricing && (
                          <div className="mt-3 pt-3 border-t border-gray-700">
                            <div className="flex justify-between items-center">
                              <div className="text-xs text-gray-400">
                                <div>Basic: ${service.pricing.basic?.toLocaleString()}</div>
                                <div>Pro: ${service.pricing.pro?.toLocaleString()}</div>
                                <div>Enterprise: ${service.pricing.enterprise?.toLocaleString()}</div>
                              </div>
                              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                                Get Quote
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-gray-900/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Our Process</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                We follow a proven methodology to ensure successful project delivery and client satisfaction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Discovery & Planning",
                  description: "We analyze your requirements and create a detailed project roadmap.",
                  icon: <Target className="h-8 w-8" />
                },
                {
                  step: "02",
                  title: "Design & Prototyping",
                  description: "Create wireframes and prototypes to visualize the solution.",
                  icon: <Palette className="h-8 w-8" />
                },
                {
                  step: "03",
                  title: "Development & Testing",
                  description: "Build the solution using best practices and thorough testing.",
                  icon: <Code className="h-8 w-8" />
                },
                {
                  step: "04",
                  title: "Launch & Support",
                  description: "Deploy your solution and provide ongoing support and maintenance.",
                  icon: <Rocket className="h-8 w-8" />
                }
              ].map((process, index) => (
                <Card key={index} className="bg-gray-900/50 border-gray-700 text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center text-purple-400 mx-auto mb-4">
                      {process.icon}
                    </div>
                    <div className="text-purple-400 font-bold text-sm mb-2">{process.step}</div>
                    <h3 className="text-white font-semibold mb-2">{process.title}</h3>
                    <p className="text-gray-400 text-sm">{process.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">What Our Clients Say</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our satisfied clients have to say about our services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "CEO",
                  company: "TechStart Inc.",
                  content: "Outstanding web development service. They delivered exactly what we needed and more. The team was professional, responsive, and delivered on time.",
                  rating: 5
                },
                {
                  name: "Michael Chen",
                  role: "Product Manager",
                  company: "InnovateCorp",
                  content: "The mobile app exceeded our expectations. Great performance, intuitive design, and excellent user experience. Highly recommended!",
                  rating: 5
                },
                {
                  name: "Emily Rodriguez",
                  role: "Marketing Director",
                  company: "GrowthCo",
                  content: "Their digital marketing strategies helped us increase our online presence by 300%. The ROI has been incredible.",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <Card key={index} className="bg-gray-900/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-white font-medium">{testimonial.name}</div>
                        <div className="text-gray-400 text-sm">{testimonial.role}, {testimonial.company}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gray-900/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Let's discuss your project requirements and how we can help bring your vision to life.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <Card className="bg-gray-900/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Get a Quote</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-gray-300 text-sm mb-1 block">Name *</label>
                          <Input
                            type="text"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            className="bg-gray-800 border-gray-600 text-white"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-gray-300 text-sm mb-1 block">Email *</label>
                          <Input
                            type="email"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            className="bg-gray-800 border-gray-600 text-white"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-gray-300 text-sm mb-1 block">Company</label>
                        <Input
                          type="text"
                          value={contactForm.company}
                          onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-gray-300 text-sm mb-1 block">Service *</label>
                          <Select value={contactForm.service} onValueChange={(value) => setContactForm({ ...contactForm, service: value })}>
                            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-600">
                              {filteredServices.map(service => (
                                <SelectItem key={service._id} value={service.title} className="text-white">
                                  {service.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-gray-300 text-sm mb-1 block">Budget</label>
                          <Select value={contactForm.budget} onValueChange={(value) => setContactForm({ ...contactForm, budget: value })}>
                            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                              <SelectValue placeholder="Select budget range" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-600">
                              <SelectItem value="under-5000" className="text-white">&lt; $5,000</SelectItem>
                              <SelectItem value="5000-10000" className="text-white">$5,000 - $10,000</SelectItem>
                              <SelectItem value="10000-25000" className="text-white">$10,000 - $25,000</SelectItem>
                              <SelectItem value="25000-plus" className="text-white">$25,000+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <label className="text-gray-300 text-sm mb-1 block">Project Description *</label>
                        <Textarea
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          className="bg-gray-800 border-gray-600 text-white min-h-[120px]"
                          placeholder="Tell us about your project requirements..."
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Contact Info */}
                <div className="space-y-8">
                  <Card className="bg-gray-900/50 border-gray-700">
                    <CardContent className="p-6">
                      <h3 className="text-white font-semibold mb-4">Contact Information</h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-purple-400" />
                          <span className="text-gray-300">hello@example.com</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-purple-400" />
                          <span className="text-gray-300">+1 (555) 123-4567</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="h-5 w-5 text-purple-400" />
                          <span className="text-gray-300">San Francisco, CA</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900/50 border-gray-700">
                    <CardContent className="p-6">
                      <h3 className="text-white font-semibold mb-4">Why Choose Us?</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <span className="text-gray-300">10+ Years Experience</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <span className="text-gray-300">200+ Successful Projects</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <span className="text-gray-300">24/7 Support</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <span className="text-gray-300">Money-back Guarantee</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/30">
                    <CardContent className="p-6 text-center">
                      <TrendingUp className="h-12 w-12 text-purple-400 mx-auto mb-3" />
                      <h3 className="text-white font-semibold mb-2">Free Consultation</h3>
                      <p className="text-gray-300 text-sm mb-4">
                        Book a free 30-minute consultation to discuss your project.
                      </p>
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        Schedule Call
                      </Button>
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
