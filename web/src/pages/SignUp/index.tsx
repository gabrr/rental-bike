import React from 'react'
import { Button, Input, LinkButton } from 'components/atoms'
import { SignInUp } from 'components/templates'
import { useNavigate } from 'react-router'

export const SignUp = () => {
	const navigate = useNavigate()

	const createUser = () => {}
	const goToSignIn = () => navigate('/signin')

	return (
		<SignInUp>
			<form onSubmit={createUser}>
				<p className="greeting_message">We’re glad to have you!</p>
				<Input className="inputs" placeholder='Full name' type='text' />
				<Input className="inputs" placeholder='E-mail' type='email' />
				<Input className="inputs" placeholder='Password' type='password' />

				<Button className='submit_button' buttonType='submit' buttonPurpose='default' isLoading={false}>
					Sign up
				</Button>
				<LinkButton buttonType='button' onClick={goToSignIn} className="signup_button">I already have an account.</LinkButton>
			</form>
		</SignInUp>
	)
}