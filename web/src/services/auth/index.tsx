import { Api } from "api"
import { AxiosResponse } from "axios"
import { signUp as handleSignUp } from "services/user";
import { ISignIn } from "types/auth";
import { IUSer, IUserResponse } from "types/user"


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
			const response: AxiosResponse<IUserResponse> = await Api.post('user/signin', user)
			this.authenticated = true
			return response.data

		} catch (error) {
			throw error
		}
  }

	async signup(newUser: Omit<IUSer, 'role'>) {
		try {
			const data = await handleSignUp(newUser)
			this.authenticated = true
			return data

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
