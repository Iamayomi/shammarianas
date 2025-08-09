import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  Calendar, 
  User, 
  Tag, 
  ArrowLeft, 
  MessageCircle, 
  Share2, 
  BookOpen, 
  Clock,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  readTime?: number;
}

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchBlogPost(slug);
    }
  }, [slug, user, token]);

  const fetchBlogPost = async (postSlug: string) => {
    try {
      setLoading(true);
      setNotFound(false);

      // Try to fetch from admin endpoint if user is admin, otherwise simulate data
      if (user?.role === 'admin' && token) {
        // In a real app, we would have a specific endpoint for fetching by slug
        // For now, we'll simulate the blog post data
        simulateBlogData(postSlug);
      } else {
        simulateBlogData(postSlug);
      }
    } catch (error) {
      console.error('Error fetching blog post:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const simulateBlogData = (postSlug: string) => {
    // Simulate blog data based on the slug
    const blogData: Record<string, Blog> = {
      'getting-started-modern-web-development': {
        _id: '1',
        title: 'Getting Started with Modern Web Development',
        content: `
          <div class="prose prose-invert max-w-none">
            <p>Modern web development has evolved tremendously over the past few years. With the introduction of frameworks like React, Vue, and Angular, developers now have powerful tools to build sophisticated user interfaces.</p>
            
            <h2>Understanding the Modern Stack</h2>
            <p>Today's web development stack typically includes:</p>
            <ul>
              <li><strong>Frontend Framework:</strong> React, Vue, or Angular for building user interfaces</li>
              <li><strong>Build Tools:</strong> Vite, Webpack, or Parcel for optimizing and bundling code</li>
              <li><strong>Styling:</strong> Tailwind CSS, Styled Components, or CSS Modules</li>
              <li><strong>Backend:</strong> Node.js, Python, or Go for server-side logic</li>
              <li><strong>Database:</strong> MongoDB, PostgreSQL, or Firebase for data storage</li>
            </ul>

            <h2>Getting Started with React</h2>
            <p>React is one of the most popular frontend frameworks. Here's how to create your first React application:</p>
            
            <pre><code>npx create-react-app my-app
cd my-app
npm start</code></pre>

            <p>This will create a new React application with all the necessary dependencies and start a development server.</p>

            <h2>Modern Development Practices</h2>
            <p>Modern web development emphasizes several key practices:</p>
            
            <h3>Component-Based Architecture</h3>
            <p>Breaking your application into reusable components makes your code more maintainable and testable. Each component should have a single responsibility and be as independent as possible.</p>

            <h3>State Management</h3>
            <p>For complex applications, consider using state management libraries like Redux, Zustand, or Context API to manage application state effectively.</p>

            <h3>Performance Optimization</h3>
            <p>Optimize your applications by implementing lazy loading, code splitting, and proper caching strategies. Tools like React.memo() and useMemo() can help prevent unnecessary re-renders.</p>

            <h2>TypeScript Integration</h2>
            <p>TypeScript adds static type checking to JavaScript, which helps catch errors during development and improves code quality. Here's a simple TypeScript component example:</p>

            <pre><code>interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ text, onClick, variant = 'primary' }) => {
  return (
    <button 
      className={\`btn btn-\${variant}\`} 
      onClick={onClick}
    >
      {text}
    </button>
  );
};</code></pre>

            <h2>Deployment and Hosting</h2>
            <p>Once your application is ready, you can deploy it to various platforms:</p>
            <ul>
              <li><strong>Vercel:</strong> Excellent for React applications with automatic deployments</li>
              <li><strong>Netlify:</strong> Great for static sites with form handling and serverless functions</li>
              <li><strong>AWS:</strong> Scalable cloud hosting with extensive services</li>
              <li><strong>Digital Ocean:</strong> Simple and affordable VPS hosting</li>
            </ul>

            <h2>Conclusion</h2>
            <p>Modern web development offers powerful tools and frameworks that enable developers to build amazing applications. Start with the basics, practice regularly, and stay updated with the latest trends and best practices.</p>

            <p>Remember that the key to becoming a proficient web developer is consistent practice and building real projects. Start small, gradually increase complexity, and don't be afraid to experiment with new technologies.</p>
          </div>
        `,
        excerpt: 'A comprehensive guide to kickstart your web development journey with the latest technologies and best practices.',
        slug: 'getting-started-modern-web-development',
        featuredImage: '/placeholder.svg',
        tags: ['Web Development', 'React', 'TypeScript', 'Tutorial'],
        status: 'published',
        authorName: 'Admin',
        createdAt: new Date().toISOString(),
        commentsCount: 12,
        readTime: 8
      },
      'design-systems-component-libraries': {
        _id: '2',
        title: 'Design Systems and Component Libraries',
        content: `
          <div class="prose prose-invert max-w-none">
            <p>Design systems have become essential for maintaining consistency across products and teams. They provide a shared language between designers and developers, ensuring cohesive user experiences.</p>
            
            <h2>What is a Design System?</h2>
            <p>A design system is a collection of reusable components, guidelines, and standards that help teams build consistent digital experiences. It includes:</p>
            <ul>
              <li>Design tokens (colors, typography, spacing)</li>
              <li>Component library</li>
              <li>Design guidelines</li>
              <li>Documentation</li>
              <li>Code standards</li>
            </ul>

            <h2>Building Component Libraries</h2>
            <p>Component libraries are the implementation of your design system. Here's how to build effective component libraries:</p>

            <h3>Start with Design Tokens</h3>
            <pre><code>// tokens.js
export const colors = {
  primary: {
    50: '#f0f9ff',
    500: '#3b82f6',
    900: '#1e3a8a'
  },
  neutral: {
    50: '#f9fafb',
    500: '#6b7280',
    900: '#111827'
  }
};

export const spacing = {
  xs: '0.5rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem'
};</code></pre>

            <h3>Create Base Components</h3>
            <p>Start with fundamental components like buttons, inputs, and cards:</p>
            
            <pre><code>// Button.tsx
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { colors, spacing } from './tokens';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  ...props 
}) => {
  return (
    <button 
      className={\`btn btn-\${variant} btn-\${size}\`}
      {...props}
    >
      {children}
    </button>
  );
};</code></pre>

            <h2>Documentation is Key</h2>
            <p>Good documentation is crucial for design system adoption. Tools like Storybook help you document components with interactive examples:</p>

            <pre><code>// Button.stories.tsx
export default {
  title: 'Components/Button',
  component: Button,
};

export const Primary = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};</code></pre>

            <h2>Scaling Your Design System</h2>
            <p>As your design system grows, consider these strategies:</p>
            <ul>
              <li><strong>Versioning:</strong> Use semantic versioning for your component library</li>
              <li><strong>Breaking Changes:</strong> Communicate changes clearly and provide migration guides</li>
              <li><strong>Governance:</strong> Establish processes for proposing and reviewing changes</li>
              <li><strong>Testing:</strong> Implement visual regression testing to catch unintended changes</li>
            </ul>

            <h2>Tools and Technologies</h2>
            <p>Popular tools for building design systems include:</p>
            <ul>
              <li><strong>Storybook:</strong> Component documentation and development</li>
              <li><strong>Figma:</strong> Design collaboration and token management</li>
              <li><strong>Styled System:</strong> Consistent styling with design tokens</li>
              <li><strong>Chromatic:</strong> Visual testing and review</li>
            </ul>

            <h2>Conclusion</h2>
            <p>Design systems require investment upfront but pay dividends in consistency, efficiency, and maintainability. Start small, involve your team in the process, and iterate based on real usage and feedback.</p>
          </div>
        `,
        excerpt: 'Learn how to create and maintain design systems that scale with your organization and improve team collaboration.',
        slug: 'design-systems-component-libraries',
        featuredImage: '/placeholder.svg',
        tags: ['Design', 'UI/UX', 'Components', 'Frontend'],
        status: 'published',
        authorName: 'Admin',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        commentsCount: 8,
        readTime: 12
      },
      'future-digital-marketplaces': {
        _id: '3',
        title: 'The Future of Digital Marketplaces',
        content: `
          <div class="prose prose-invert max-w-none">
            <p>Digital marketplaces have revolutionized how we buy and sell products and services. From Amazon's retail dominance to specialized platforms for digital assets, the marketplace model continues to evolve.</p>
            
            <h2>Current Marketplace Landscape</h2>
            <p>Today's digital marketplaces serve various niches:</p>
            <ul>
              <li><strong>E-commerce:</strong> Amazon, eBay, Shopify</li>
              <li><strong>Services:</strong> Upwork, Fiverr, TaskRabbit</li>
              <li><strong>Digital Assets:</strong> Envato, Creative Market, Gumroad</li>
              <li><strong>Software:</strong> App Store, Google Play, Steam</li>
            </ul>

            <h2>Emerging Trends</h2>
            
            <h3>Decentralized Marketplaces</h3>
            <p>Blockchain technology enables truly decentralized marketplaces where no single entity controls the platform. These marketplaces offer:</p>
            <ul>
              <li>Reduced fees through elimination of intermediaries</li>
              <li>Increased transparency and trust</li>
              <li>Global accessibility without geographic restrictions</li>
              <li>Cryptocurrency payment integration</li>
            </ul>

            <h3>AI-Powered Personalization</h3>
            <p>Machine learning algorithms are transforming how marketplaces operate:</p>
            <ul>
              <li>Personalized product recommendations</li>
              <li>Dynamic pricing optimization</li>
              <li>Fraud detection and prevention</li>
              <li>Automated customer service</li>
            </ul>

            <h3>Augmented Reality Integration</h3>
            <p>AR technology is enhancing the shopping experience by allowing customers to:</p>
            <ul>
              <li>Visualize products in their environment</li>
              <li>Try on clothing and accessories virtually</li>
              <li>See furniture placement in their homes</li>
              <li>Experience products before purchasing</li>
            </ul>

            <h2>Challenges and Opportunities</h2>
            
            <h3>Trust and Safety</h3>
            <p>As marketplaces grow, ensuring trust between buyers and sellers becomes crucial:</p>
            <ul>
              <li>Identity verification systems</li>
              <li>Escrow services for high-value transactions</li>
              <li>Rating and review mechanisms</li>
              <li>Dispute resolution processes</li>
            </ul>

            <h3>Global Expansion</h3>
            <p>Marketplaces are expanding globally, facing challenges like:</p>
            <ul>
              <li>Currency exchange and payment processing</li>
              <li>International shipping and logistics</li>
              <li>Local regulations and compliance</li>
              <li>Cultural adaptation and localization</li>
            </ul>

            <h2>Technology Stack Evolution</h2>
            
            <h3>Microservices Architecture</h3>
            <p>Modern marketplaces are built using microservices for scalability:</p>
            <pre><code>// Example microservice structure
- User Service
- Product Catalog Service
- Payment Processing Service
- Order Management Service
- Notification Service
- Search Service</code></pre>

            <h3>Cloud-Native Solutions</h3>
            <p>Cloud platforms provide the infrastructure for global marketplaces:</p>
            <ul>
              <li>Auto-scaling for traffic spikes</li>
              <li>Global content delivery networks</li>
              <li>Managed databases and storage</li>
              <li>Serverless computing for cost optimization</li>
            </ul>

            <h2>The Role of NFTs and Digital Ownership</h2>
            <p>Non-fungible tokens are creating new marketplace categories:</p>
            <ul>
              <li>Digital art and collectibles</li>
              <li>Virtual real estate</li>
              <li>Gaming assets and characters</li>
              <li>Music and media licensing</li>
            </ul>

            <h2>Sustainability and Social Impact</h2>
            <p>Future marketplaces will prioritize:</p>
            <ul>
              <li>Carbon-neutral shipping options</li>
              <li>Sustainable product labeling</li>
              <li>Support for local and small businesses</li>
              <li>Fair trade and ethical sourcing</li>
            </ul>

            <h2>Conclusion</h2>
            <p>The future of digital marketplaces lies in creating more personalized, trustworthy, and sustainable platforms. Technology will continue to enable new forms of commerce while addressing traditional challenges like trust, globalization, and environmental impact.</p>

            <p>As developers and entrepreneurs, we have the opportunity to shape this future by building platforms that prioritize user experience, security, and positive social impact.</p>
          </div>
        `,
        excerpt: 'Discover what\'s coming next in the world of digital marketplaces and e-commerce technology.',
        slug: 'future-digital-marketplaces',
        featuredImage: '/placeholder.svg',
        tags: ['Business', 'E-commerce', 'Future', 'Technology'],
        status: 'published',
        authorName: 'Admin',
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        commentsCount: 15,
        readTime: 10
      }
    };

    const foundBlog = blogData[postSlug];
    if (foundBlog) {
      setBlog(foundBlog);
      // Simulate related blogs
      const related = Object.values(blogData)
        .filter(b => b.slug !== postSlug)
        .slice(0, 3);
      setRelatedBlogs(related);
    } else {
      setNotFound(true);
    }
  };

  const sharePost = () => {
    if (navigator.share && blog) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading blog post...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (notFound || !blog) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Blog Post Not Found</h2>
            <p className="text-gray-400 mb-6">The blog post you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/blog')} className="bg-purple-600 hover:bg-purple-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="bg-gray-900/50 border-b border-gray-700">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 text-gray-500" />
              <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                Blog
              </Link>
              <ChevronRight className="h-4 w-4 text-gray-500" />
              <span className="text-white truncate">{blog.title}</span>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <article className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <Button 
                variant="ghost" 
                onClick={() => navigate('/blog')}
                className="mb-8 text-gray-400 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>

              {/* Article Header */}
              <header className="mb-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
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

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  {blog.title}
                </h1>

                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  {blog.excerpt}
                </p>

                {/* Article Meta */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
                  <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>by {blog.authorName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(blog.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                    {blog.readTime && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{blog.readTime} min read</span>
                      </div>
                    )}
                    {blog.commentsCount && (
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4" />
                        <span>{blog.commentsCount} comments</span>
                      </div>
                    )}
                  </div>

                  <Button 
                    onClick={sharePost}
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </header>

              {/* Featured Image */}
              {blog.featuredImage && (
                <div className="mb-8">
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className="w-full h-64 md:h-96 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Article Content */}
              <div 
                className="prose prose-invert prose-lg max-w-none mb-12"
                dangerouslySetInnerHTML={{ __html: blog.content }}
                style={{
                  '--tw-prose-body': '#e5e7eb',
                  '--tw-prose-headings': '#ffffff',
                  '--tw-prose-lead': '#d1d5db',
                  '--tw-prose-links': '#a855f7',
                  '--tw-prose-bold': '#ffffff',
                  '--tw-prose-counters': '#9ca3af',
                  '--tw-prose-bullets': '#6b7280',
                  '--tw-prose-hr': '#374151',
                  '--tw-prose-quotes': '#d1d5db',
                  '--tw-prose-quote-borders': '#374151',
                  '--tw-prose-captions': '#9ca3af',
                  '--tw-prose-code': '#e5e7eb',
                  '--tw-prose-pre-code': '#e5e7eb',
                  '--tw-prose-pre-bg': '#1f2937',
                  '--tw-prose-th-borders': '#374151',
                  '--tw-prose-td-borders': '#374151',
                }}
              />

              {/* Article Footer */}
              <footer className="border-t border-gray-700 pt-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-gray-400 text-sm">Tags:</span>
                    {blog.tags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary"
                        className="bg-gray-800 text-gray-300 hover:bg-gray-700 cursor-pointer"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button 
                    onClick={sharePost}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Article
                  </Button>
                </div>
              </footer>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <section className="py-16 bg-gray-900/30">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                  <BookOpen className="h-6 w-6 text-purple-400" />
                  <h2 className="text-2xl font-bold text-white">Related Articles</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedBlogs.map((relatedBlog) => (
                    <Card key={relatedBlog._id} className="bg-gray-900/50 border-gray-700 group hover:border-gray-600 transition-all duration-300">
                      {relatedBlog.featuredImage && (
                        <div className="relative overflow-hidden">
                          <img
                            src={relatedBlog.featuredImage}
                            alt={relatedBlog.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <CardContent className="p-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {relatedBlog.tags.slice(0, 2).map((tag, index) => (
                            <Badge 
                              key={index} 
                              variant="outline" 
                              className="text-xs text-purple-400 border-purple-400/30"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">
                          <Link to={`/blog/${relatedBlog.slug}`}>
                            {relatedBlog.title}
                          </Link>
                        </h3>
                        
                        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                          {relatedBlog.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{new Date(relatedBlog.createdAt).toLocaleDateString()}</span>
                          {relatedBlog.readTime && <span>{relatedBlog.readTime} min read</span>}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <Button 
                    onClick={() => navigate('/blog')}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    View All Articles
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
