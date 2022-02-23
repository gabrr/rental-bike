import jwt from 'jsonwebtoken';
import Reservation from 'models/Reservation'
import { Request, Response } from 'express'
import { createReservationValidation, editReservationValidation } from 'utils/validation'
import { JWT_SECRET } from 'config/env';
import { IUserToken } from 'types/jwt';

class ReservationController {
    async index(req: Request, res: Response ) {
        try {
					const reservations = await Reservation.find()
					return res.json(reservations)

        } catch (error: any) {
					return res.status(400).json(error.message)
        }
    }

		async deleteReservation(req: Request, res: Response) {
			try {
				const reservationId = req.params.reservationId
				await Reservation.deleteOne({ _id: reservationId })

				res.json('Reservation deleted!')

			} catch (error: any) {
				return res.json(error.message)
			}
		}

		async createReservation(req: Request, res: Response) {
			try {
				const { error } = createReservationValidation(req.body)
				if (error) throw Error(error.details[0].message)
				
				const newReservation = await new Reservation(req.body)
				newReservation.save()

				return res.json(newReservation)

			} catch (error: any) {
				return res.json(error.message)
			}
		}
		
		async editReservation(req: Request, res: Response) {
			try {
				const reservationId = req.params.reservationId
				const updatedReservation = req.body

				const { error } = editReservationValidation(req.body)
				if (error) throw Error(error.details[0].message)

				const newReservation = await Reservation.findByIdAndUpdate(reservationId, updatedReservation, { new: true })
				return res.json({ reservation: newReservation })
				
			} catch (error: any) {
				return res.json(error.message)
			}
		}

		async userReservations(req: Request, res: Response) {
			try {
				const userId = req.params.userId
				
				const reservations = await Reservation.find({ userId })
				return res.json(reservations)
				
			} catch (error: any) {
				return res.json(error.message)
			}
		}

		async bikeReservations(req: Request, res: Response) {
			try {
				const bikeId = req.params.bikeId
				const token = req.cookies.token || ''
				const { role, _id } = jwt.verify(token, JWT_SECRET) as IUserToken

				if (role === 'user') {
					const reservations = await Reservation.find({ bikeId, userId: _id })
					return res.json(reservations)	
				}

				const reservations = await Reservation.find({ bikeId })
				return res.json(reservations)
				
			} catch (error: any) {
				return res.json(error.message)
			}
		}

}

export default new ReservationController()