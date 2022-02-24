import React from 'react'
import {
  Routes,
  Route,
} from "react-router-dom";

import { SignIn, Home, NoExisting, SignUp, Users, AddBike, CreateUser, EditUser, EditBike, ViewBike } from 'pages'
import { RequireAuth } from 'routes/requireAuth';


const routes = [
		{ title: 'Home', component: Home, path: '/' , isProtected: true },
    { title: '404', component: NoExisting, path: '*' , isProtected: false },
    { title: 'Sign In', component: SignIn, path: '/signin', isProtected: false },
    { title: 'Sign Up', component: SignUp, path: '/signup', isProtected: false },
    { title: 'Users', component: Users, path: '/users', isProtected: true },
    { title: 'Add Bike', component: AddBike, path: '/add-bike', isProtected: true },
    { title: 'Create User', component: CreateUser, path: '/create-user', isProtected: true },
    { title: 'Edit User', component: EditUser, path: '/edit-user/:userId', isProtected: true },
    { title: 'Edit Bike', component: EditBike, path: '/edit-bike/:bikeId', isProtected: true },
    { title: 'View Bike', component: ViewBike, path: '/bike/:bikeId', isProtected: true },
]

export const AppRoutes: React.FC = () => {
	
    return (
        <Routes>
					{routes.map(({ isProtected, component: Component, path }, index) => {
						if (!isProtected) return <Route key={index+path} path={path} element={<Component />} />

						return (
							<Route
								key={index+path}
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
