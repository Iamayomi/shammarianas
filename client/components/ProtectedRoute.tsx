import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Lock } from "lucide-react";
import Layout from "./Layout";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  adminOnly?: boolean;
  fallbackMessage?: string;
}

export default function ProtectedRoute({ 
  children, 
  requireAuth = true, 
  adminOnly = false,
  fallbackMessage 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && requireAuth && !user) {
      navigate("/login");
    }
  }, [user, loading, requireAuth, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (requireAuth && !user) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center">
              <Lock className="h-12 w-12 mx-auto mb-4 text-purple-600" />
              <h2 className="text-xl font-semibold mb-2 text-white">Authentication Required</h2>
              <p className="text-gray-400 mb-6">
                {fallbackMessage || "You need to be logged in to access this page."}
              </p>
              <div className="space-y-2">
                <Button onClick={() => navigate("/login")} className="w-full">
                  Sign In
                </Button>
                <Button onClick={() => navigate("/register")} variant="outline" className="w-full">
                  Create Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (adminOnly && user?.role !== 'admin') {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center">
              <User className="h-12 w-12 mx-auto mb-4 text-red-500" />
              <h2 className="text-xl font-semibold mb-2 text-white">Access Denied</h2>
              <p className="text-gray-400 mb-6">
                This page requires administrator privileges.
              </p>
              <Button onClick={() => navigate("/dashboard")} className="w-full">
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return <>{children}</>;
}
