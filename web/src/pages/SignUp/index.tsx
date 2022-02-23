import React, { useState } from 'react'
import { Button, Input, LinkButton } from 'components/atoms'
import { SignInUp } from 'components/templates'
import { useNavigate } from 'react-router'
import { callInLine, INPUT_ERRORS, isInputValid } from 'utils'
import { useAuth } from 'hooks/auth'
import { notifyError } from 'utils/notifier'

interface IForm {
	email: string
	password: string
	name: string
}

export const SignUp = () => {
	const navigate = useNavigate()
	const { signup } = useAuth()
	const [form, setform] = useState<IForm>({} as IForm)
	const [errors, seterrors] = useState<IForm>({} as IForm)
	const [isLoading, setisLoading] = useState(false)

	const createUser = (e: React.FormEvent) => {
		e.preventDefault()
		signup(form, () => navigate('/'), () => callInLine(() => setisLoading(false), () => notifyError('Error to sign up.')))
	}
	
	const goToSignIn = () => navigate('/signin')

	const handleInputs = (e: React.FormEvent<HTMLInputElement>, name: 'email' | 'password' | 'name') => {
		const value = e.currentTarget.value

		if (!isInputValid({ type: name, value })) {
			seterrors(prev => ({ ...prev, [name]: INPUT_ERRORS[name] }))
			setform({ ...form, [name]: value })
			return
		}

		seterrors(prev => ({ ...prev, [name]: '' }))
		setform({ ...form, [name]: value })
	}

	return (
		<SignInUp>
			<form onSubmit={createUser}>
				<p className="greeting_message">We’re glad to have you!</p>
				<Input
					error={errors?.['name']}
					className="inputs"
					placeholder='Full name'
					type='text'
					onChange={(e) => handleInputs(e, 'name')}
				/>
				<Input
					error={errors?.['email']}
					className="inputs"
					placeholder='E-mail'
					type='email'
					onChange={(e) => handleInputs(e, 'email')}
				/>
				<Input
					error={errors?.['password']}
					className="inputs"
					placeholder='Password'
					type='password'
					onChange={(e) => handleInputs(e, 'password')}
				/>

				<Button className='submit_button' buttonType='submit' buttonPurpose='default' isLoading={isLoading}>
					Sign up
				</Button>
				<LinkButton buttonType='button' onClick={goToSignIn} className="signup_button">I already have an account.</LinkButton>
			</form>
		</SignInUp>
	)
}