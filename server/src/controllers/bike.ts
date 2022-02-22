import Bike from 'models/Bike'
import { Request, Response } from 'express'
import { createBikeValidation, editBikeValidation } from 'utils/validation'

class BikeController {
    async index(req: Request, res: Response ) {
        try {
					const bikes = await Bike.find()
					return res.json(bikes)

        } catch (error: any) {
					return res.status(400).json(error.message)
        }
    }

		async deletebike(req: Request, res: Response) {
			try {
				const bikeId = req.params.bikeId
				await Bike.deleteOne({ _id: bikeId })

				res.json('bike deleted!')

			} catch (error: any) {
				return res.json(error.message)
			}
		}

		async createbike(req: Request, res: Response) {
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
		
		async editbike(req: Request, res: Response) {
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
}

export default new BikeController()