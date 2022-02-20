export interface IBike {
    id: string
		name: string
		model: string
		color: string
		img: string
		address: string
		reservations: {
			id: string
			userId: string
			startPeriod: Date
			endPeriod: Date
		}[]
}