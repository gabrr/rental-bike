import { allBikes } from './../mock/bikes';
import { BIKE_MODELS, LOCATIONS } from "../mock/assistence"
import { IAllBikes } from "../mock/bikes"

const filterBikes = (allBikes: IAllBikes[], { addressF, colorF, modelF, timeFrame  }: any) => {
	return allBikes.filter(({ address, color, model, reservations }) => {
		let result = true
		
		if (!!addressF && addressF !== address) return false
		if (!!colorF && colorF !== color) return false
		if (!!modelF && modelF !== model) return false

		if (!timeFrame?.startPeriod || !timeFrame?.endPeriod) return true

		
		// Refers to wether it has reservation within the time frame filtered.
		reservations.forEach(reservation => {
			const start = Date.parse(reservation.startPeriod)
			const end = Date.parse(reservation.endPeriod)

			const filterStart = Date.parse(timeFrame.startPeriod)
			const filterEnd = Date.parse(timeFrame.endPeriod)

			if (start <= filterStart && end >= filterEnd) result = false

			if (start >= filterStart && end <= filterEnd) result = false				
			
			//console.log({
			//	start,
			//	filterStart,
			//	overLaps: (start < filterStart && end > filterEnd) || start > filterStart && end < filterEnd
			//})

		})
		
		return result
	})
}

test("Test filtering data", () => {
	const addressF = LOCATIONS[0]
	const colorF = "red"
	const modelF = BIKE_MODELS[0]
	const timeFrame = {
		startPeriod: new Date("2022/02/01").toISOString(),
		endPeriod: new Date("2022/03/01").toISOString()
	}

	const result = filterBikes(allBikes, { addressF, colorF, modelF, timeFrame })

	expect(result).toBeInstanceOf(Array)
	
	expect(result).toHaveLength(0)
})

test("Return all elements if no filter passed", () => {
	const addressF = undefined
	const colorF = undefined
	const modelF = undefined
	const timeFrame = {}

	const result = filterBikes(allBikes, { addressF, colorF, modelF, timeFrame })

	expect(result).toBeInstanceOf(Array)
	
	expect(result).toHaveLength(allBikes.length)
})

test("Test second reservation of the bike timeframe, if it overlaps it shouldn't come", () => {
	const addressF = undefined
	const colorF = undefined
	const modelF = undefined

	const timeFrame = {
		startPeriod: new Date("2022/07/01").toISOString(),
		endPeriod: new Date("2022/07/10").toISOString(),
	}

	const result = filterBikes(allBikes, { addressF, colorF, modelF, timeFrame })

	expect(result).toBeInstanceOf(Array)
	
	expect(result).toHaveLength(allBikes.length - 1)
})

test("Testing one filter option", () => {
	const addressF = LOCATIONS[2]
	const colorF = undefined
	const modelF = undefined

	const timeFrame = {}

	const result = filterBikes(allBikes, { addressF, colorF, modelF, timeFrame })
	expect(result).toHaveLength(1)
	expect(result[0].address).toBe(LOCATIONS[2])
})

test("Testing multiple filter options", () => {
	const addressF = undefined
	const colorF = 'red'
	const modelF = BIKE_MODELS[1]

	const timeFrame = {}

	const result = filterBikes(allBikes, { addressF, colorF, modelF, timeFrame })
	expect(result).toHaveLength(2)
})

