import React, { FormEvent, MouseEventHandler, useEffect, useState } from 'react'
import styled from 'styled-components'

import { CreateEdit } from 'components/templates'
import { Button, Input } from 'components/atoms'
import { INPUT_ERRORS, isInputValid } from 'utils'
import { useNavigate, useParams } from 'react-router'
import { deleteUser, editUser } from 'services/user'
import { notifyError } from 'utils/notifier'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from 'store/users/actions'

interface IForm {
	name: string
	role: string
}

export const EditUser = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { userId } = useParams()
	const user = useSelector(state => state.userReducer.find(({ _id }) => _id === userId))

	useEffect(() => {
		if (!user) {
			getUsers(dispatch)
		}
	}, [])

	const [form, setform] = useState<IForm>({} as IForm)
	const [errors, seterrors] = useState<IForm>({} as IForm)
	const [isLoading, setisLoading] = useState(false)

	const handleCreateUser = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setisLoading(true)
		editUser(userId || '', form)
			.then(() => {
				navigate('/users')
			})
			.catch(() => {
				setisLoading(false)
				notifyError('Error to create user.')
			})
	}

	const handleDeleteUser = () => {
		setisLoading(true)
		deleteUser(userId || '')
			.then(() => {
				navigate('/users')
			})
			.catch(() => {
				setisLoading(false)
				notifyError('Error to delete user.')
			})
	}

	const handleNameInput = (e: React.FormEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value

		if (!isInputValid({ type: 'name', value })) {
			seterrors(prev => ({ ...prev, name: INPUT_ERRORS.name }))
			setform(prev => ({ ...prev, name: value }))
			return
		}

		seterrors(prev => ({ ...prev, name: '' }))
		setform(prev => ({ ...prev, name: value }))
	}

	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.currentTarget.value
		setform(prev => ({ ...prev, role: value }))
	}

	return (
		<CreateEdit role='admin' title='Edit User'>
			<Div>
				<form onSubmit={handleCreateUser}>
					<Input
						error={errors?.['name']}
						className="inputs"
						placeholder='Full name'
						type='text'
						onChange={handleNameInput}
						defaultValue={user?.name}
					/>
					
					<select name="role" id="role" onChange={handleSelect} defaultValue={user?.role}>
						<option value="">Select a role</option>
						<option value="admin">Admin</option>
						<option value="user">User</option>
					</select>
				
					<div className="actions">
						<Button onClick={handleDeleteUser} className='delete' buttonPurpose='negative' isLoading={isLoading}>
							Delete User
						</Button>
						<Button buttonType='submit' className='update' buttonPurpose='positive' isLoading={isLoading}>
							Update User
						</Button>
					</div>
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

	.actions {
		display: flex;
		justify-content: space-between;
	}
	
	.delete, .update {
		width: max-content;
		padding: 10px 30px;
		margin: 20px 0;
	}

	#role {
		width: 100%;
		padding: 10px;
		border: none;
		background-color: var(--input-background);
		color: var(--primary-text);
		border-radius: var(--border-radius);
	}
`