import React, { useState } from 'react'
import { isInputValid, INPUT_ERRORS } from 'utils';
import { useAuth } from 'hooks/auth';
import { useNavigate } from 'react-router';
import auth from 'services/auth';
import { Input, Button, LinkButton } from 'components/atoms';
import { SignInUp } from 'components/templates';

export const SignIn = () => {
	const [form, setform] = useState({ email: '', password: '' })
	const [errors, seterrors] = useState({ email: '', password: '' })
	const [isLoading, setisLoading] = useState(false)
	const navigate = useNavigate()

	const { signin, user } = useAuth()

	const handleSignIn = (e: React.FormEvent) => {
		e.preventDefault()
		setisLoading(true)

		signin(form, () => navigate('/'), () => setisLoading(false))
	}

	const goToSignUp = () => navigate('/signup')

	const handleInputs = (e: React.FormEvent<HTMLInputElement>, name: 'email' | 'password') => {
		const value = e.currentTarget.value

		if (name === 'email' && !isInputValid({ type: name, value })) {
			seterrors(prev => ({ ...prev, [name]: INPUT_ERRORS[name] }))
			setform({ ...form, [name]: value })
			return
		}

		seterrors(prev => ({ ...prev, [name]: '' }))
		setform({ ...form, [name]: value })
	}

	return (
		<SignInUp>
			<form onSubmit={handleSignIn}>
				<p className="greeting_message">Welcome!</p>
				<Input
					error={errors['email']}
					className="inputs"
					type="email"
					placeholder="Email"
					onChange={(e) => handleInputs(e, 'email')}
					value={form.email}
				/>
				<Input
					className="inputs"
					type="password"
					onChange={(e) => handleInputs(e, 'password')}
					value={form.password}
					placeholder="Password"
				/>
				<Button className='submit_button' type="submit" isLoading={isLoading} buttonPurpose={'default'}>Sign in</Button>
				<LinkButton buttonType='button' onClick={goToSignUp} className="signup_button">Sign up here</LinkButton>
			</form>
		</SignInUp>
	)
}
