import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function ProtectedRoutes() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    async function checkAuth() {
      try {
        await api.get("/users/me");
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  if (loading) {
    return <div>Checking session...</div>;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}
