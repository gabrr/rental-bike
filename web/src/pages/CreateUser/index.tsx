import React from 'react'
import { CreateEdit } from 'components/templates/CreateEdit'
import { Button, Input } from 'components/atoms'
import styled from 'styled-components'

export const CreateUser = () => {
	return (
		<CreateEdit role='admin' title='Create User'>
			<Div>
				<form onSubmit={() => {}}>
					<Input className='inputs' placeholder='Name' />
					<Input className='inputs' placeholder='E-mail' />
					<Input className='inputs' placeholder='Password' />
					<select name="role" id="role">
						<option value="">Select a role</option>
						<option value="admin">Admin</option>
						<option value="user">User</option>
					</select>
				</form>

				<Button className='add_bike_button' buttonPurpose='positive' isLoading={false}>
					Create User
				</Button>
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
