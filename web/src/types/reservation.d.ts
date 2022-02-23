export interface IReservation {
	userId: string,
	bikeId: string,
	startPeriod: string,
	endPeriod: string,
}

export interface IReservationResponse {
	"_id": string,
	"userId": string,
	"bikeId": string,
	"startPeriod": string,
	"endPeriod": string,
	"createdAt": string,
	"updatedAt": string,
}

export interface IEditReservation {
	"userId"?: string,
	"bikeId"?: string,
	"startPeriod"?: string,
	"endPeriod"?: string,
}