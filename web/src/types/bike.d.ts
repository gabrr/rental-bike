export interface IBike {
    _id: string
		name: string
		model: string
		color: string
		img: string
		address: string
		reservations: {
			_id: string
			userId: string
			startPeriod: Date
			endPeriod: Date
		}[]
}