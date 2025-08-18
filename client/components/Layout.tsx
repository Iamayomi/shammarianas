import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  LogOut,
  SearchIcon,
} from "lucide-react";
import "../style.css";
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
  const [isOpen, setIsOpen] = useState(false);

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

  // If user is NOT logged in
  if (user) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="text-white shadow-md border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
            <div className="flex justify-between h-16 items-center">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-2 p-3 border-r">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">DM</span>
                </div>
                <span className="text-xl font-semibold pr-4">
                  Sham Marianas
                </span>
              </Link>

              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-8 text-sm uppercase font-semibold">
                <Link to="/" className="hover:text-gray-00">
                  Home
                </Link>
                <Link to="/templates" className="hover:text-gray-00">
                  Templates
                </Link>
                <Link to="/services" className="hover:text-gray-00">
                  Services
                </Link>
                <Link to="/portfolio" className="hover:text-gray-00">
                  Portfolio
                </Link>
                <Link to="/blog" className="hover:text-gray-00">
                  Blogs
                </Link>
                <Link to="/support" className="hover:text-gray-00">
                  Contact Us
                </Link>
              </div>

              {/* Sign In Button */}
              <div className="hidden md:block p-2 border-l">
                <Link
                  to="/login"
                  className="block bg-purple-400 text-white px-4 py-2 ml-9 rounded-md mt-2 "
                >
                  Sign In
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 rounded-md hover:bg-gray-800 focus:outline-none"
                >
                  {isOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Dropdown */}
          {isOpen && (
            <div className="md:hidden bg-black px-4 pb-4 space-y-4">
              <Link to="/" className="block hover:text-gray-00">
                Home
              </Link>
              <Link to="/templates" className="block hover:text-gray-00">
                Templates
              </Link>
              <Link to="/services" className="block hover:text-gray-00">
                Services
              </Link>
              <Link to="/portfolio" className="block hover:text-gray-00">
                Portfolio
              </Link>
              <Link to="/blog" className="block hover:text-gray-00">
                Blogs
              </Link>
              <Link to="/support" className="block hover:text-gray-00">
                Contact Us
              </Link>
              <Link
                to="/login"
                className="block bg-purple-400 text-white px-4 py-2 rounded-md mt-2"
              >
                Sign In
              </Link>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-card text-card-foreground mt-16 relative overflow-hidden border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {/* Logo Section */}
              <div className="lg:col-span-1">
                <div className="flex items-center space-x-2 mb-6 ">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center ">
                    <span className="text-white font-bold text-lg">DM</span>
                  </div>
                  <span className="font-bold text-xl text-foreground">
                    shammarianas
                  </span>
                </div>
              </div>

              {/* Contact Section */}
              <div className="lg:col-span-1">
                <h6 className="text-lg font-semibold text-foreground mb-6">
                  Contact
                </h6>
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
                <h6 className="text-lg font-semibold text-foreground mb-6">
                  Useful Links
                </h6>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link
                      to="/"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/portfolio"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      Portfolio
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/templates"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      Templates
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/explore"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      Explore
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blog"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/support"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      Contact us
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Newsletter Section */}
              <div className="lg:col-span-1">
                <h6 className="text-lg font-semibold text-foreground mb-6">
                  Newsletter
                </h6>
                <div className="mb-8">
                  <div className="flex">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      className="flex-1 px-4 py-3 bg-secondary border border-border rounded-l-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <button className="px-6 py-3 bg-primary text-primary-foreground rounded-r-lg hover:bg-primary/90 transition-colors">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
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
                  <Link
                    to="/"
                    className="text-primary hover:text-primary/80 transition-colors font-medium"
                  >
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
      <div className="bg-background shadow-md">
        <div className="flex items-center justify-between px-4 py-3 md:px-8">
          {/* Logo */}
          <div className="ml-2 pl-8">
            <Link className="flex items-center space-x-4" to="/">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">DM</span>
              </div>
              <span className="logo-text font-semibold">shammarianas</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className=" hidden md:flex items-center md:space-x-48 m-auto">
            <Link to="/explore">
              <span className="butn butn-sm butn-bord radius-30 border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-100">
                Explore
              </span>
            </Link>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex items-center">
              <Search className="m-8 text-gray-400" size={24} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search assets..."
                className="px-6 py-2 bg-gray-200 rounded-l-md text-black focus:outline-none"
              />
              <button
                type="submit"
                className="bg-purple-600 px-3 py-2 rounded-r-md text-white hover:bg-purple-700"
              >
                Go
              </button>
            </form>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <button className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full px-1">
                      {cartCount}
                    </span>
                  )}
                </button>
              </Link>

              {/* User Dropdown */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{user.name || "User"}</span>
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
                    {user.role === "admin" && (
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
                  <button className="border px-4 py-2 rounded-lg">
                    Sign In
                  </button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden px-4 pb-4 space-y-3">
            <Link to="/explore" className="block text-gray-300">
              Explore
            </Link>
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search assets..."
                className="flex-1 px-4 py-2 bg-gray-200 rounded-l-md text-black focus:outline-none"
              />
              <button
                type="submit"
                className="bg-purple-600 px-3 py-2 rounded-r-md text-white hover:bg-purple-700"
              >
                Go
              </button>
            </form>
            <Link to="/dashboard" className="block">
              Dashboard
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="block">
                  My Downloads
                </Link>
                <Link to="/dashboard" className="block">
                  My Favorites
                </Link>
                <Link to="/support" className="block">
                  Support
                </Link>
                {user.role === "admin" && (
                  <Link to="/admin" className="block">
                    Admin Panel
                  </Link>
                )}
                <button onClick={handleLogout} className="block text-red-500">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="block">
                <button className="bg-purple-600 text-white px-4 py-2 w-full rounded-md hover:bg-purple-700">
                  Sign In
                </button>
              </Link>
            )}
          </div>
        )}
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
                {
                  path: "/search?category=Graphics",
                  label: "Graphic Templates",
                },
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
                {/* <Search className="icon h-4 w-4" />  */}
                Trade
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
                <span className="font-bold text-xl text-foreground">
                  shammarianas
                </span>
              </div>
            </div>

            {/* Contact Section */}
            <div className="lg:col-span-1">
              <h6 className="text-lg font-semibold text-foreground mb-6">
                Contact
              </h6>
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
              <h6 className="text-lg font-semibold text-foreground mb-6">
                Useful Links
              </h6>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    to="/"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/portfolio"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link
                    to="/templates"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Templates
                  </Link>
                </li>
                <li>
                  <Link
                    to="/explore"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Explore
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/support"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter Section */}
            <div className="lg:col-span-1">
              <h6 className="text-lg font-semibold text-foreground mb-6">
                Newsletter
              </h6>
              <div className="mb-8">
                <div className="flex">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="flex-1 px-4 py-3 bg-secondary border border-border rounded-l-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <button className="px-6 py-3 bg-primary text-primary-foreground rounded-r-lg hover:bg-primary/90 transition-colors">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
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
                <Link
                  to="/"
                  className="text-primary hover:text-primary/80 transition-colors font-medium"
                >
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
