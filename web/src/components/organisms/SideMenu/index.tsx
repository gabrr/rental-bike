import { LinkButton } from 'components/atoms'
import { useAuth } from 'hooks/auth'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import auth from 'services/auth'
import styled from 'styled-components'

interface Props {
	isOpen: boolean
	toggleSideMenu: () => void
}

export const SideMenu: React.FC<Props> = ({ isOpen, toggleSideMenu }) => {
	const { signout } = useAuth()
	const navigate = useNavigate()

	const handleSignUp = () => auth.signout(signout)

	const goToUsers = () => navigate('/users'); toggleSideMenu() 
	const goToBikes = () => navigate('/'); toggleSideMenu() 
	const goToAddBike = () => navigate('/add-bike'); toggleSideMenu() 
	const goToCreateUser = () => navigate('/create-user'); toggleSideMenu()


	useEffect(() => {
		const el = document.body
		isOpen ? (el.style.position = 'fixed') : (el.style.position = 'unset')

		return () => {
			(el.style.position = 'unset')
		}
	}, [isOpen])

	const options = [
		{
			label: 'Create User',
			action: goToCreateUser,
		},
		{
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
	]

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
	transition: transform 300ms ease-in-out;
	transform: translateX(100%);
	display: flex;
	flex-direction: column;
	gap: 1.8rem;
	justify-content: center;

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