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

export interface IBikeResponse {
	"name": string
	"model": string
	"color": string
	"img": string
	"address": string
	"_id": string
}

export interface IEditBike {
	"name"?: string
	"model"?: string
	"color"?: string
	"img"?: string
	"address"?: string
}