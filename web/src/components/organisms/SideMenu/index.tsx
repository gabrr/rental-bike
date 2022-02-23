import { LinkButton } from 'components/atoms'
import { useAuth } from 'hooks/auth'
import { useFilter } from 'hooks/filter'
import { useSideMenu } from 'hooks/sideMenu'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'

export const SideMenu: React.FC = () => {
	const { signout, user } = useAuth()
	const { isOpen, toggle } = useSideMenu()
	const { toggle: toggleFilter, isOpen: isFilterOpen } = useFilter()
	const navigate = useNavigate()

	const goAndCloseMenu = (path: string) => {
		navigate(path)
		toggle()
		if (isFilterOpen) toggleFilter()
	}

	const handleSignUp = () => signout(goAndCloseMenu('/signin'))

	const goToUsers = () => goAndCloseMenu('/users')
	const goToBikes = () => goAndCloseMenu('/')
	const goToAddBike = () => goAndCloseMenu('/add-bike')
	const goToCreateUser = () => goAndCloseMenu('/create-user')


	useEffect(() => {
		const el = document.body
		isOpen ? (el.style.position = 'fixed') : (el.style.position = 'unset')

		return () => {
			(el.style.position = 'unset')
		}
	}, [isOpen])

	const options = [
		{
			adminRoute: true,
			label: 'Create User',
			action: goToCreateUser,
		},
		{
			adminRoute: true,
			label: 'Add Bike',
			action: goToAddBike,
		},
		{
			label: 'Users',
			action: goToUsers,
		},
		{
			label: 'Bikes',
			action: goToBikes,
		},
		{
			label: 'Sign Out',
			action: handleSignUp,
		},
	].filter(({ adminRoute }) => ((user?.role !== "admin") && !adminRoute) || user?.role === "admin")

	return (
		<Div className={isOpen ? 'opened' : ''}>
			{options.map(({ action, label }, index) =>
				<LinkButton key={index+'menu_option'} className='option_button' onClick={action}>
					{label}
				</LinkButton>
			)}
		</Div>
	)
}

const Div = styled.div`
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 100vh;
	background-color: var(--background-color);
	transition: transform 200ms ease-in-out;
	transform: translateX(100%);
	display: flex;
	flex-direction: column;
	gap: 1.8rem;
	justify-content: center;
	z-index: 2;

	&.opened {
		transform: translateX(0);
	}

	.option_button {
		text-decoration: none;
		font-size: 2.4rem;
		font-weight: 700;
	}

	.option_button:last-child {
		color: var(--negative);
	}

`