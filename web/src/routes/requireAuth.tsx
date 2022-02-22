import React, { useEffect } from "react"
import { useAuth } from "hooks/auth";
import { Navigate, useLocation } from "react-router-dom"

export const RequireAuth = ({ children }: { children: React.ReactElement }) => {
  const { user, setUser } = useAuth();
	const location = useLocation();
	const hasUser = localStorage.getItem('user')
	
	useEffect(() => {
		if (!user && hasUser) setUser(JSON.parse(hasUser))
	}, [user])	

  if (!hasUser) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}