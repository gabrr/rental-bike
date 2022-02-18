export interface IBike {
    id: string
		name: string
		model: string
		color: string
		img: string
		reservations: {
			userId: string
			startPeriod: Date
			endPeriod: Date
		}[]
}