import React, { FormEvent, useState } from 'react'
import { CreateEdit } from 'components/templates/CreateEdit'
import { Button, Input } from 'components/atoms'
import styled from 'styled-components'
import { INPUT_ERRORS, isInputValid } from 'utils'
import { isInputValidProps } from 'types'
import { createUser } from 'services/user'
import { useNavigate } from 'react-router'
import { notifyError } from 'utils/notifier'

interface IForm {
	email: string
	password: string
	name: string
	role: string
}

export const CreateUser = () => {
	const navigate = useNavigate()
	const [form, setform] = useState<IForm>({} as IForm)
	const [errors, seterrors] = useState<IForm>({} as IForm)
	const [isLoading, setisLoading] = useState(false)

	const handleCreateUser = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setisLoading(true)
		createUser(form)
			.then(() => {
				setisLoading(false)
				navigate('/users')
			})
			.catch(() => {
				setisLoading(false)
				notifyError('Error to create user.')
			})
	}

	const handleInputs = (e: React.FormEvent<HTMLInputElement>, name: isInputValidProps['type']) => {
		const value = e.currentTarget.value

		if (!isInputValid({ type: name, value })) {
			seterrors(prev => ({ ...prev, [name]: INPUT_ERRORS[name] }))
			setform(prev => ({ ...prev, [name]: value }))
			return
		}

		seterrors(prev => ({ ...prev, [name]: '' }))
		setform(prev => ({ ...prev, [name]: value }))
	}

	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.currentTarget.value
		setform(prev => ({ ...prev, role: value }))
	}

	return (
		<CreateEdit role='admin' title='Create User'>
			<Div>
				<form onSubmit={handleCreateUser}>
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
					<select name="role" id="role" onChange={handleSelect}>
						<option value="">Select a role</option>
						<option value="admin">Admin</option>
						<option value="user">User</option>
					</select>
					<Button className='add_bike_button' buttonPurpose='positive' isLoading={isLoading}>
						Create User
					</Button>
				</form>

			</Div>
		</CreateEdit>
	)
}

const Div = styled.div`
	width: 90%;
	margin: auto;
	display: flex;
	flex-direction: column;
	justify-content: center;

	.inputs {
		width: 100%;
		margin: 10px auto;
	}
	
	.react_rating {
		margin: 10px 0;
	}


	.upload_file {
		height: 100px;
		width: 100%;
		background-color: var(--input-background);
		border-radius: var(--border-radius);
		display: grid;
		align-content: center;
    justify-content: center;
	}

	.add_bike_button {
		width: max-content;
		padding: 10px 30px;
		margin: 20px 0;
	}

	#role {
		width: 100%;
		padding: 10px 0;
		border: none;
		background-color: var(--input-background);
		color: var(--primary-text);
		border-radius: var(--border-radius);
	}
`
