import { IBike } from "types"
import { bikeRateAverage } from "../utils/bikeRatingAverage"

test("Testing math to get average", () => {

	const bike = {
		"rating": [
			{
				"userId": "6216a2e266a89733528dc4f1",
				"rate": 4
			},
			{
				"userId": "6216a2e266a89733528dc4f1",
				"rate": 2
			},
			{
				"userId": "6216a2e266a89733528dc4f1",
				"rate": 2
			},
			{
				"userId": "6216a2e266a89733528dc4f1",
				"rate": 3
			},
			{
				"userId": "6216a2e266a89733528dc4f1",
				"rate": 2
			},
		]
	}

	const result = bikeRateAverage(bike as unknown as IBike)

	expect(result).toBe(2.6)
	
})