import React from "react"
import { useAuth } from "hooks/auth";
import { Navigate, useLocation } from "react-router-dom"

export const RequireAuth = ({ children }: { children: React.ReactElement }) => {
  const auth = useAuth();
	const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}