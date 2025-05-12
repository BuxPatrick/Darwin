
import { ReactNode } from "react";
import Header from "./Header";
import { useAuth } from "@/context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
}

export default function Layout({ children, requireAuth = false }: LayoutProps) {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  // If authentication is required and user is not logged in, redirect to auth page
  if (requireAuth && !loading && !user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  
  // Don't show header on auth page
  const isAuthPage = location.pathname === "/auth";
  
  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && <Header />}
      <main className={`flex-1 ${!isAuthPage ? "pt-4" : ""}`}>
        {children}
      </main>
    </div>
  );
}
