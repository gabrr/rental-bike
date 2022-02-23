import { IReservationResponse } from "./reservation";

export interface IBike {
    _id: string
		name: string
		model: string
		color: string
		img: string
		address: string
		reservations: IReservationResponse[]
		rating: {
			userId: string
			rate: number
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