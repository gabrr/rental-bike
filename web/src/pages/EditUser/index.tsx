import React from 'react'
import styled from 'styled-components'

import { CreateEdit } from 'components/templates'
import { Button, Input } from 'components/atoms'

export const EditUser = () => {
	return (
		<CreateEdit role='admin' title='Edit User'>
			<Div>
				<form onSubmit={() => {}}>
					<Input className='inputs' placeholder='Name' />
				</form>

				<div className="actions">
					<Button className='delete' buttonPurpose='negative' isLoading={false}>
						Delete User
					</Button>
					<Button className='update' buttonPurpose='positive' isLoading={false}>
						Update User
					</Button>
				</div>
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
`