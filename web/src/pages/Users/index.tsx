import React, { useEffect } from 'react'
import { HomeLists } from 'components/templates/HomeLists'
import { UserCard } from 'components/organisms'
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
			{users.map((user) => <UserCard key={user._id} user={user} />)}
		</HomeLists>
	)
}
