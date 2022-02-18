import React from 'react'
import {
  Routes,
  Route,
} from "react-router-dom";

import { SignIn, Home, NoExisting, SignUp } from 'pages'
import { RequireAuth } from 'routes/requireAuth';


const routes = [
		{ title: 'Home', component: Home, path: '/' , isProtected: true },
    { title: '404', component: NoExisting, path: '*' , isProtected: false },
    { title: 'Sign In', component: SignIn, path: '/signin', isProtected: false },
    { title: 'Sign Up', component: SignUp, path: '/signup', isProtected: false },
]

export const AppRoutes: React.FC = () => {
	
    return (
        <Routes>
					{routes.map(({ isProtected, component: Component, path }) => {
						if (!isProtected) return <Route path={path} element={<Component />} />

						return (
							<Route
								path={path}
								element={
									<RequireAuth>
										<Component />
									</RequireAuth>
								}
							/>
						)
					})}
        </Routes>
    )
}
