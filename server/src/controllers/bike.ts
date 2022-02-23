import jwt from 'jsonwebtoken'
import Bike from 'models/Bike'
import { Request, Response } from 'express'
import { createBikeValidation, editBikeValidation, rateBikeValidation } from 'utils/validation'
import multer from 'multer'
import path from 'path'
import { JWT_SECRET, PORT } from 'config/env'
import { IUserToken } from 'types/jwt'

class BikeController {
    async index(req: Request, res: Response ) {
        try {
					const bikes = await Bike.find()
					return res.json(bikes)

        } catch (error: any) {
					return res.status(400).json(error.message)
        }
    }

		async deleteBike(req: Request, res: Response) {
			try {
				const bikeId = req.params.bikeId
				await Bike.deleteOne({ _id: bikeId })

				res.json('bike deleted!')

			} catch (error: any) {
				return res.status(401).json(error.message)
			}
		}

		async createBike(req: Request, res: Response) {
			try {
				const isNameExisting = await Bike.findOne({ name: req.body.name })

				const { error } = createBikeValidation(req.body)
				if (error) throw Error(error.details[0].message)
				
				if (isNameExisting) throw Error('This bike already exists.')

				const newBike = await new Bike(req.body)
				newBike.save()

				return res.json(newBike)

			} catch (error: any) {
				return res.status(401).json(error.message)
			}
		}
		
		async editBike(req: Request, res: Response) {
			try {
				const bikeId = req.params.bikeId
				const updatedBike = req.body

				const { error } = editBikeValidation(req.body)
				if (error) throw Error(error.details[0].message)

				const newBike = await Bike.findByIdAndUpdate(bikeId, updatedBike, { new: true })
				return res.json(newBike)
				
			} catch (error: any) {
				return res.status(401).json(error.message)
			}
		}

		upload = multer({
			storage: multer.diskStorage({
				destination: function (req, file, cb) {
						cb(null, path.join(__dirname, '.', '..', 'uploads'))
				},
				filename: function (req, file, cb) {
						const uniqueSuffix = req.params.bikeId
						cb(null, file.fieldname + '-' + uniqueSuffix + '.png')
				}
			})
		})
		
		async imageUploader(req: Request, res: Response) {
			try {

				const path = `http://127.0.0.1:${PORT}/static/${req.file?.filename}`

				return res.json({ image: path })
        
    	} catch (error: any) {
        return res.status(401).json(error.message)
    }
		}

		async rateBike(req: Request, res: Response) {
			try {

				const { error } = rateBikeValidation(req.body)
				if (error) throw Error(error.details[0].message)

				const token = req.cookies.token || ''
				const bikeId = req.params.bikeId
				const rateGiven = req.body.rate

				const { _id } = jwt.verify(token, JWT_SECRET) as IUserToken

				const rating = [{
					userId: _id,
					rate: rateGiven
				}]

				const newBike = await Bike.findByIdAndUpdate(bikeId, { rating }, { new: true })
				return res.json(newBike)
				
			} catch (error: any) {
				return res.status(401).json(error.message)
			}
		}
}

export default new BikeController()