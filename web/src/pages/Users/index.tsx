import React, { useEffect } from 'react'
import { HomeLists } from 'components/templates/HomeLists'
import styled from 'styled-components'
import { UserCard } from 'components/organisms'
import { popping } from 'animations'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from 'store/users/actions'
import { useAuth } from 'hooks/auth'

export const Users = () => {
	
	const { user } = useAuth()
	const dispatch = useDispatch()
	const users = useSelector(state => state.userReducer)

	useEffect(() => {
		getUsers(dispatch)
	}, [])

	return (
		<HomeLists hideFilter role={user?.role || 'user'} tab='Users'>
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
