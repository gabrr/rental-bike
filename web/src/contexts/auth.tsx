import React from 'react'
import auth from 'services/auth'
import { ISignIn } from 'types/auth'
import { IUSer, IUserResponse } from 'types/user'
import { notifyError } from 'utils/notifier'

interface AuthContextType {
  user: IUserResponse | null
	setUser: React.Dispatch<React.SetStateAction<IUserResponse | null>>,
  signin: (user: ISignIn, callback?: any, fallback?: any) => void
	signup: (newUser: Omit<IUSer, 'role'>, callback?: any, fallback?: any) => void
  signout: (callback?: any) => void
}

export const AuthContext = React.createContext<AuthContextType>(null!)

interface Props {
	children: React.ReactNode
}
export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = React.useState<IUserResponse | null>(null);

  const signin: AuthContextType['signin'] = (userSigningIn, callback, fallback) => {
    auth.signin(userSigningIn)
			.then((user) => {
				localStorage.setItem('user', JSON.stringify(user))
				setUser(user)
				callback?.()
			})
			.catch(error => {
				notifyError(error.request.response)
				fallback?.()
			})
  }

	const signup: AuthContextType['signup'] = (newUser, callback, fallback) => {
    auth.signup(newUser)
			.then((user) => {
				localStorage.setItem('user', JSON.stringify(user))
				setUser(user)
				callback?.()
			})
			.catch(error => {
				notifyError(error.request.response)
				fallback?.()
			})
  };

  const signout = () => {
		localStorage.removeItem('user')
		setUser(null)
    auth.signout()
  }

  const value = { user, setUser, signin, signup, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
