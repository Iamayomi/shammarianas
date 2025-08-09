import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";

interface UserRouteProps {
  children: ReactNode;
}

export default function UserRoute({ children }: UserRouteProps) {
  const { user, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect admin users to admin dashboard
  if (user && user.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  // Render user content (including non-authenticated users for public pages)
  return <>{children}</>;
}
