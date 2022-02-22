import { Api } from "api"
import { AxiosResponse } from "axios"

export const getReservations = async (): Promise<{ data: [] | [], error: boolean }> => {
    try {
        const response: AxiosResponse<any> = await Api.get('reservation/')
        return { error: false, data: response.data }

    } catch (error) {
        throw error
    }
}