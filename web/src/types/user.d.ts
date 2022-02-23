import { IReservationResponse } from "./reservation";

export interface IUSer {
	name: string
	email: string
	role: string
	password: string
}

export interface IUSerWithReservations {
	_id: string
	name: string
	email: string
	role: string
	password: string
	reservations: IReservationResponse[]
}

export interface IUserResponse {
	"_id": string
	"name": string
	"email": string
	"role": string
	"createdAt": string
	"updatedAt": string
}

export interface IEditUser {
	name: string
	role: string
}