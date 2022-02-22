import { Api } from "api"
import { AxiosResponse } from "axios"
import { IUSer, IUserResponse } from "types/user"

type SignUp = (newUser: Omit<IUSer, 'role'>) => Promise<IUserResponse>

export const signUp: SignUp = async (newUser) => {
    try {
        const response: AxiosResponse<IUserResponse> = await Api.post('user/signup', newUser)
        return response.data

    } catch (error) {
        throw error
    }
}