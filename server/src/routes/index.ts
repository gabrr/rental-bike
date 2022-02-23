import express from "express"
import { adminRoute, protectedRoute } from 'middlewares/tokenVerifier'

import userController from 'controllers/user'
import bikeController from 'controllers/bike'
import reservationController from 'controllers/reservation'


const routes = express.Router()

// Users and Authentication
routes.get('/api/user/users', protectedRoute, userController.index)
routes.post('/api/user/signin', userController.signIn)
routes.post('/api/user/signup', userController.signUp)
routes.delete('/api/user/delete-user/:userId', adminRoute, userController.deleteUser)
routes.patch('/api/user/edit-user/:userId', adminRoute, userController.editUser)
routes.post('/api/user/create-user', adminRoute, userController.createUser)

// Bikes
routes.get('/api/bike', protectedRoute, bikeController.index)
routes.delete('/api/bike/delete-bike/:bikeId', adminRoute, bikeController.deleteBike)
routes.patch('/api/bike/edit-bike/:bikeId', protectedRoute, bikeController.editBike)
routes.post('/api/bike/image/:bikeId', adminRoute, bikeController.upload.single('image'), bikeController.imageUploader)
routes.post('/api/bike/create-bike', adminRoute, bikeController.createBike)
routes.post('/api/bike/rate/:bikeId', protectedRoute, bikeController.rateBike)

// Reservations
routes.get('/api/reservation', adminRoute, reservationController.index)
routes.get('/api/reservation/user/:userId', protectedRoute, reservationController.userReservations)
routes.get('/api/reservation/bike/:bikeId', protectedRoute, reservationController.bikeReservations)
routes.delete('/api/reservation/delete-reservation/:reservationId', protectedRoute, reservationController.deleteReservation)
routes.patch('/api/reservation/edit-reservation/:reservationId', protectedRoute, reservationController.editReservation)
routes.post('/api/reservation/create-reservation', protectedRoute, reservationController.createReservation)

export default routes 