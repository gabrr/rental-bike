import { Api } from "api"
import { AxiosResponse } from "axios"
import { IUSer, IUserResponse, IEditUser } from "types/user"

type SignUp = (newUser: Omit<IUSer, 'role'>) => Promise<IUserResponse>

export const signUp: SignUp = async (newUser) => {
    try {
        const response: AxiosResponse<IUserResponse> = await Api.post('user/signup', newUser)
        return response.data

    } catch (error) {
        throw error
    }
}

type CreateUser = (newUser: IUSer) => Promise<IUserResponse>

export const createUser: CreateUser = async (newUser) => {
    try {
			const response: AxiosResponse<IUserResponse> = await Api.post('user/create-user', newUser)
			return response.data

    } catch (error) {
        throw error
    }
}

type EditUser = (userId: string, newUser: IEditUser) => Promise<IUserResponse>

export const editUser: EditUser = async (userId, newUser) => {
    try {
			const response: AxiosResponse<IUserResponse> = await Api.patch(`user/edit-user/${userId}`, newUser)
			return response.data

    } catch (error) {
			throw error
    }
}

export const deleteUser = async (userId: string) => {
    try {
			const response: AxiosResponse<IUserResponse> = await Api.delete(`user/delete-user/${userId}`)
			return response.data

    } catch (error) {
        throw error
    }
}

export const getAllUsers = async () => {
    try {
			const response: AxiosResponse<IUserResponse[]> = await Api.get(`user/users`)
			return response.data

    } catch (error) {
        throw error
    }
}