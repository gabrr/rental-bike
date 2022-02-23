import type { IBike } from 'types'
import { BIKE_MODELS, LOCATIONS } from './assistence'


export interface IAllBikes extends Omit<IBike, '_id' | 'img' | 'name' | 'reservations'> {
	reservations: {
		startPeriod: string
		endPeriod: string
	}[]
}

export const allBikes: IAllBikes[] = [
	{
		address: LOCATIONS[0],
		color: "red",
		model: BIKE_MODELS[1],
		reservations: [
			{
				startPeriod: new Date("2022/03/01").toISOString(),
				endPeriod: new Date("2022/03/01").toISOString()
			}
		],
		"rating": [{
			"userId": "6216a2e266a89733528dc4f1",
			"rate": 4
		}]
	},
	{
		address: LOCATIONS[0],
		color: "red",
		model: BIKE_MODELS[1],
		"rating": [{
			"userId": "6216a2e266a89733528dc4f1",
			"rate": 4
		}],
		reservations: [
			{
				startPeriod: new Date("2022/03/01").toISOString(),
				endPeriod: new Date("2022/03/01").toISOString()
			},
			{
				startPeriod: new Date("2022/07/01").toISOString(),
				endPeriod: new Date("2022/07/10").toISOString()
			}
		]
	},
	{
		address: LOCATIONS[2],
		color: "pink",
		model: BIKE_MODELS[2],
		"rating": [{
			"userId": "6216a2e266a89733528dc4f1",
			"rate": 4
		}],
		reservations: []
	},
]