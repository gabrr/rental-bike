import React from 'react'
import {
  Routes as BrowserRoutes,
  Route,
} from "react-router-dom";

import { SignIn, Home } from 'pages'
import { RequireAuth } from 'routes/requireAuth';


const routes = [
    { title: 'Sign In', component: SignIn, path: '/signin', isProtected: false },
    { title: 'Home', component: Home, path: '/' , isProtected: true },
]

export const Routes: React.FC<{}> = () => {

    return (
        <BrowserRoutes>
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
        </BrowserRoutes>
    )
}
