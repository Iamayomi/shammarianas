import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Route Guards
import AdminRoute from "./components/AdminRoute";
import UserRoute from "./components/UserRoute";

// Pages
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import Search from "./pages/Search";
import Templates from "./pages/Templates";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Portfolio from "./pages/Portfolio";
import Services from "./pages/Services";
import Support from "./pages/Support";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Admin-only routes */}
            <Route path="/admin" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />

            {/* Public and user routes (admins will be redirected to /admin) */}
            <Route path="/" element={
              <UserRoute>
                <Index />
              </UserRoute>
            } />
            <Route path="/explore" element={
              <UserRoute>
                <Explore />
              </UserRoute>
            } />
            <Route path="/search" element={
              <UserRoute>
                <Search />
              </UserRoute>
            } />
            <Route path="/templates" element={
              <UserRoute>
                <Templates />
              </UserRoute>
            } />
            <Route path="/blog" element={
              <UserRoute>
                <Blog />
              </UserRoute>
            } />
            <Route path="/blog/:slug" element={
              <UserRoute>
                <BlogDetail />
              </UserRoute>
            } />
            <Route path="/portfolio" element={
              <UserRoute>
                <Portfolio />
              </UserRoute>
            } />
            <Route path="/services" element={
              <UserRoute>
                <Services />
              </UserRoute>
            } />
            <Route path="/support" element={
              <UserRoute>
                <Support />
              </UserRoute>
            } />
            <Route path="/dashboard" element={
              <UserRoute>
                <Dashboard />
              </UserRoute>
            } />
            <Route path="/product/:id" element={
              <UserRoute>
                <ProductDetail />
              </UserRoute>
            } />
            <Route path="/asset/:id" element={
              <UserRoute>
                <ProductDetail />
              </UserRoute>
            } />

            {/* Authentication routes (no restrictions) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
