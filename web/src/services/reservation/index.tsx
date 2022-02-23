import { Api } from "api"
import { AxiosResponse } from "axios"
import { IReservation, IReservationResponse, IEditReservation } from "types/reservation"

export const getReservations = async (): Promise<{ data: IReservation[] | [], error: boolean }> => {
    try {
        const response: AxiosResponse<IReservation[] | []> = await Api.get('reservation/')
        return { error: false, data: response.data }

    } catch (error) {
        throw error
    }
}

type CreateReservation = (newReservation: IReservation) => Promise<IReservationResponse>

export const createReservation: CreateReservation = async (newReservation) => {
    try {
			const response: AxiosResponse<IReservationResponse> = await Api.post('reservation/create-reservation', newReservation)
			return response.data

    } catch (error) {
        throw error
    }
}

type EditReservation = (reservationId: string, newReservation: IEditReservation) => Promise<IReservationResponse>

export const editReservation: EditReservation = async (reservationId, EditReservation) => {
    try {
			const response: AxiosResponse<IReservationResponse> = await Api.patch(`reservation/edit-reservation/${reservationId}`, EditReservation)
			return response.data

    } catch (error) {
			throw error
    }
}

export const deleteReservation = async (reservationId: string) => {
    try {
			const response: AxiosResponse<string> = await Api.delete(`reservation/delete-reservation/${reservationId}`)
			return response.data

    } catch (error) {
        throw error
    }
}

export const getReservationByUser = async (userId: string) => {
	try {
		const response: AxiosResponse<IReservation[] | []> = await Api.get(`reservation/user/${userId}`)
		return response.data

	} catch (error) {
		throw error
	}
}

export const getReservationByBike = async (bikeId: string) => {
	try {
		const response: AxiosResponse<IReservation[] | []> = await Api.get(`reservation/bike/${bikeId}`)
		return response.data

	} catch (error) {
		throw error
	}
}