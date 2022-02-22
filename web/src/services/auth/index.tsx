import { Api } from "api"
import { AxiosResponse } from "axios"
import { ISignIn } from "types/auth";
import { IUSer } from "types/user"


export interface SignInResponse extends Omit<IUSer, 'password'> {
	_id: string
}

class Auth {
  authenticated: boolean

  constructor() {
    this.authenticated = false;
  }

  async signin(user: ISignIn) {
		try {
			const response: AxiosResponse<SignInResponse> = await Api.post('user/signin', user)
			this.authenticated = true
			return response.data

		} catch (error) {
			throw error
		}
  }

  signout() {
    this.authenticated = false;
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
