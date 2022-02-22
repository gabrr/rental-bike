import React from 'react'
import { HomeLists } from 'components/templates/HomeLists'
import styled from 'styled-components'
import { UserCard } from 'components/organisms'
import { users } from 'mock/users'
import { popping } from 'animations'

export const Users = () => {
	return (
		<HomeLists hideFilter role='admin' tab='Users'>
			<Div>
				{users.map((user) => <UserCard key={user._id} user={user} />)}
			</Div>
		</HomeLists>
	)
}

const Div = styled.div`
	width: 90%;
	margin: auto;
	animation: ${popping} 300ms ease-in-out;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1rem;
`
