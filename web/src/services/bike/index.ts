import { Api } from "api"
import { AxiosResponse } from "axios"
import { IBike } from 'types'
import { IBikeResponse, IEditBike } from "types/bike"

type CreateBike = (newBike: Omit<IBike, 'reservations' | '_id' | 'img' | 'rating'>) => Promise<IBikeResponse>

export const createBike: CreateBike = async (newBike) => {
    try {
			const response: AxiosResponse<IBikeResponse> = await Api.post('bike/create-bike', newBike)
			return response.data

    } catch (error) {
        throw error
    }
}

type EditBike = (bikeId: string, newBike: IEditBike) => Promise<IBikeResponse>

export const editBike: EditBike = async (bikeId, newBike) => {
    try {
			const response: AxiosResponse<IBikeResponse> = await Api.patch(`bike/edit-bike/${bikeId}`, newBike)
			return response.data

    } catch (error) {
        throw error
    }
}

export const deleteBike = async (bikeId: string) => {
    try {
			const response: AxiosResponse<string> = await Api.delete(`bike/delete-bike/${bikeId}`)
			return response.data

    } catch (error) {
        throw error
    }
}

export const getAllBikes = async () => {
    try {
			const response: AxiosResponse<IBikeResponse[]> = await Api.get(`bike/`)
			return response.data

    } catch (error) {
        throw error
    }
}

export const rateBike = async (rate: number, bikeId: string) => {
    try {
			const response: AxiosResponse<IBikeResponse[]> = await Api.post(`bike/rate/${bikeId}`, { rate })
			return response.data

    } catch (error) {
        throw error
    }
}