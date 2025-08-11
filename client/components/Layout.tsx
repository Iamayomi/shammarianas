import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X, LogOut } from "lucide-react";
import "../style.css"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import SearchComponent from "./Search";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const cartCount = cart.length;
  const currentPage = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 300) {
        navbar?.classList.add("nav-scroll");
      } else {
        navbar?.classList.remove("nav-scroll");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleDropdownMouseMove = (event: React.MouseEvent) => {
    const dropdown = event.currentTarget.querySelector(".dropdown-menu");
    dropdown?.classList.add("show");
  };

  const handleDropdownMouseLeave = (event: React.MouseEvent) => {
    const dropdown = event.currentTarget.querySelector(".dropdown-menu");
    dropdown?.classList.remove("show");
  };

  const handleToggleNav = () => {
    const navCollapse = document.querySelector(".navbar .navbar-collapse");
    navCollapse?.classList.toggle("show");
  };

  // If user is NOT logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="navbar navbar-expand-lg bord">
          <div className="container o-hidden">
            <Link className="logo icon-img-100" to="/">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">DM</span>
                </div>
                <span className="logo-text">shammarianas</span>
              </div>
            </Link>

            <button 
              className="navbar-toggler" 
              type="button" 
              onClick={handleToggleNav}
            >
              <span className="icon-bar">
                <Menu className="h-6 w-6" />
              </span>
            </button>

            <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
              <ul className="navbar-nav">
                <li 
                  onMouseLeave={handleDropdownMouseLeave} 
                  onMouseMove={handleDropdownMouseMove} 
                  className="nav-item dropdown"
                >
                  <Link 
                    className="nav-link dropdown-toggle" 
                    to="/" 
                    role="button" 
                    aria-haspopup="true" 
                    aria-expanded="false"
                  >
                    <span className="rolling-text">Home</span>
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/portfolio">
                        About us
                      </Link>
                    </li>
                  </ul>
                </li>
                
                <li className="nav-item">
                  <Link className="nav-link" to="/templates" role="button">
                    <span className="rolling-text">Templates</span>
                  </Link>
                </li>
                
                <li className="nav-item">
                  <Link className="nav-link" to="/services" role="button">
                    <span className="rolling-text">Services</span>
                  </Link>
                </li>
                
                <li className="nav-item">
                  <Link className="nav-link" to="/portfolio" role="button">
                    <span className="rolling-text">Portfolio</span>
                  </Link>
                </li>
                
                <li className="nav-item">
                  <Link className="nav-link" to="/blog" role="button">
                    <span className="rolling-text">Blogs</span>
                  </Link>
                </li>
                
                <li className="nav-item">
                  <Link className="nav-link" to="/support">
                    <span className="rolling-text">Contact Us</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="contact-button">
              <Link to="/login" className="butn butn-sm butn-bg main-colorbg radius-5">
                <span className="text">Sign In</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-card text-card-foreground mt-16 relative overflow-hidden border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {/* Logo Section */}
              <div className="lg:col-span-1">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">DM</span>
                  </div>
                  <span className="font-bold text-xl text-foreground">shammarianas</span>
                </div>
              </div>

              {/* Contact Section */}
              <div className="lg:col-span-1">
                <h6 className="text-lg font-semibold text-foreground mb-6">Contact</h6>
                <div className="space-y-4">
                  <h6 className="text-base">
                    <a
                      href="mailto:info@shammarianas.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      info@shammarianas.com
                    </a>
                  </h6>
                </div>
              </div>

              {/* Useful Links Section */}
              <div className="lg:col-span-1">
                <h6 className="text-lg font-semibold text-foreground mb-6">Useful Links</h6>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link to="/portfolio" className="text-muted-foreground hover:text-primary transition-colors">
                      Portfolio
                    </Link>
                  </li>
                  <li>
                    <Link to="/templates" className="text-muted-foreground hover:text-primary transition-colors">
                      Templates
                    </Link>
                  </li>
                  <li>
                    <Link to="/explore" className="text-muted-foreground hover:text-primary transition-colors">
                      Explore
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/support" className="text-muted-foreground hover:text-primary transition-colors">
                      Contact us
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Newsletter Section */}
              <div className="lg:col-span-1">
                <h6 className="text-lg font-semibold text-foreground mb-6">Newsletter</h6>
                <div className="mb-8">
                  <div className="flex">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      className="flex-1 px-4 py-3 bg-secondary border border-border rounded-l-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <button className="px-6 py-3 bg-primary text-primary-foreground rounded-r-lg hover:bg-primary/90 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Copyright Section */}
            <div className="border-t border-border pt-8 mt-20">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  © 2025 All Rights Reserved By{" "}
                  <Link to="/" className="text-primary hover:text-primary/80 transition-colors font-medium">
                    shammarianas
                  </Link>
                </p>
              </div>
            </div>
          </div>
          
          {/* Background blur effect */}
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
        </footer>
      </div>
    );
  }

  // If user IS logged in
  return (
    <div className="min-h-screen bg-background">
      <div className="navbar navbar-expand-lg bord">
        <Link className="logo icon-img-100" to="/">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">DM</span>
            </div>
            <span className="logo-text">shammarianas</span>
          </div>
        </Link>

        <Link to="/explore">
          <div className="ml-auto vi-more">
            <span className="butn butn-sm butn-bord radius-30">
              <span>Explore</span>
            </span>
            <span className="icon ti-arrow-top-right"></span>
          </div>
        </Link>

        {/* <SearchComponent /> */}

        <div className="right">
          <div className="nav_buttons">
            <Link to="/dashboard">
              <button>
                <ShoppingCart className="icon h-5 w-5" />
                {cartCount > 0 && <span className="cart_count">{cartCount}</span>}
              </button>
            </Link>

            <div className="navbar_dropdown">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="signed_in">
                      <User className="icon h-4 w-4" />
                      <span className="username">{user.name || "User"}</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="dropdown">
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">My Downloads</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">My Favorites</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/support">Support</Link>
                    </DropdownMenuItem>
                    {user.role === 'admin' && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin">Admin Panel</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleLogout} className="logout">
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/login">
                  <button>Sign In</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar for specific pages */}
      {!["/", "/login", "/register"].includes(currentPage) && (
        <div className="bottom-bar">
          <div className="links">
            <ul style={{ whiteSpace: "nowrap", alignItems: "center" }}>
              {[
                { path: "/explore", label: "Hot" },
                { path: "/search?category=Video", label: "Videos" },
                { path: "/search?category=3D Assets", label: "3D Models" },
                { path: "/templates", label: "Video Template" },
                { path: "/search?category=Graphics", label: "Pictures" },
                { path: "/search?category=Graphics", label: "Graphic Templates" },
                { path: "/search", label: "Mockups" },
                { path: "/search", label: "Fonts" },
                { path: "/search", label: "More" },
              ].map(({ path, label }) => (
                <li key={path}>
                  <Link 
                    className={location.pathname === path ? "active" : ""}
                    to={path}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="buttons">
            <Link to="/explore">
              <button>
                <Search className="icon h-4 w-4" /> Trade
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-card text-card-foreground mt-16 relative overflow-hidden border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Logo Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">DM</span>
                </div>
                <span className="font-bold text-xl text-foreground">shammarianas</span>
              </div>
            </div>

            {/* Contact Section */}
            <div className="lg:col-span-1">
              <h6 className="text-lg font-semibold text-foreground mb-6">Contact</h6>
              <div className="space-y-4">
                <h6 className="text-base">
                  <a
                    href="mailto:info@shammarianas.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    info@shammarianas.com
                  </a>
                </h6>
              </div>
            </div>

            {/* Useful Links Section */}
            <div className="lg:col-span-1">
              <h6 className="text-lg font-semibold text-foreground mb-6">Useful Links</h6>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/portfolio" className="text-muted-foreground hover:text-primary transition-colors">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link to="/templates" className="text-muted-foreground hover:text-primary transition-colors">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link to="/explore" className="text-muted-foreground hover:text-primary transition-colors">
                    Explore
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter Section */}
            <div className="lg:col-span-1">
              <h6 className="text-lg font-semibold text-foreground mb-6">Newsletter</h6>
              <div className="mb-8">
                <div className="flex">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="flex-1 px-4 py-3 bg-secondary border border-border rounded-l-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <button className="px-6 py-3 bg-primary text-primary-foreground rounded-r-lg hover:bg-primary/90 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Copyright Section */}
          <div className="border-t border-border pt-8 mt-20">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                © 2025 All Rights Reserved By{" "}
                <Link to="/" className="text-primary hover:text-primary/80 transition-colors font-medium">
                  shammarianas
                </Link>
              </p>
            </div>
          </div>
        </div>
        
        {/* Background blur effect */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
      </footer>
    </div>
  );
}
