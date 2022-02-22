import express from "express"
import { adminRoute, protectedRoute } from 'middlewares/tokenVerifier'

import userController from 'controllers/user'
import bikeController from 'controllers/bike'


const routes = express.Router()

// Users and Authentication
routes.get('/api/user/users', adminRoute, userController.index)
routes.post('/api/user/signin', userController.signIn)
routes.post('/api/user/signup', userController.signUp)
routes.delete('/api/user/delete-user/:userId', adminRoute, userController.deleteUser)
routes.patch('/api/user/edit-user/:userId', adminRoute, userController.editUser)
routes.post('/api/user/create-user', adminRoute, userController.createUser)

// Bikes
routes.get('/api/bike', protectedRoute, bikeController.index)
routes.delete('/api/bike/delete-bike/:bikeId', adminRoute, bikeController.deletebike)
routes.post('/api/bike/create-bike', adminRoute, bikeController.createbike)
routes.patch('/api/bike/edit-bike', adminRoute, bikeController.editbike)


export default routes 