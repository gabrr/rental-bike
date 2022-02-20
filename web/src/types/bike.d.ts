export interface IBike {
    id: string
		name: string
		model: string
		color: string
		img: string
		address: string
		reservations: {
			userId: string
			startPeriod: Date
			endPeriod: Date
		}[]
}