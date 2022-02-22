import Bike from 'models/Bike'
import { Request, Response } from 'express'
import { createBikeValidation, editBikeValidation } from 'utils/validation'
import multer from 'multer'
import path from 'path'
import { PORT } from 'config/env'

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
				return res.json(error.message)
			}
		}

		async createBike(req: Request, res: Response) {
			try {
				const { error } = createBikeValidation(req.body)
				if (error) throw Error(error.details[0].message)
				
				const newBike = await new Bike(req.body)
				newBike.save()

				return res.json({ bike: newBike })

			} catch (error: any) {
				return res.json(error.message)
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
				return res.json(error.message)
			}
		}

		upload = multer({
			storage: multer.diskStorage({
				destination: function (req, file, cb) {
						cb(null, path.join(__dirname, '.', '..', 'uploads'))
				},
				filename: function (req, file, cb) {
						const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
						cb(null, file.fieldname + '-' + uniqueSuffix + '.png')
				}
			})
		})
		
		async imageUploader(req: Request, res: Response) {
			try {

				const path = `http://127.0.0.1:${PORT}/static/${req.file?.filename}`

				return res.json({ image: path })
        
    	} catch (error: any) {
        return res.json(error.message)
    }
		}
		
}

export default new BikeController()