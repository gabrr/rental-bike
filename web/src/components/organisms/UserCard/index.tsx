import React, { useState } from 'react'
import styled from 'styled-components'

import { Button, Editicon } from 'components/atoms'
import { ReservationList } from 'components/templates'
import { useNavigate } from 'react-router'

interface Props {
	user: {
		id: string,
		userName: string
		email: string
		reservations: {
			id: string
			bike: string
			startPeriod: Date,
			endPeriod: Date,
		}[]
	}
}

export const UserCard: React.FC<Props> = ({ user }) => {
	const [isExpanded, setisExpanded] = useState(false)
	const navigate = useNavigate()

	const toggleExpanded = () => setisExpanded(state => !state)

	const goToEditUser = () => navigate(`/edit-user/${user.id}`)

	return (
		<Div isExpanded={isExpanded} onClick={toggleExpanded}>
			<div className="card_header">
				<div className="left">
					<p className="user_name">{user.userName}</p>
				</div>
				<div className="right">
					<div className="reservations_counter">
						{user.reservations.length}
					</div>
					<button className="edit_button" onClick={goToEditUser}>
						<Editicon />
					</button>
				</div>
			</div>
			<p className="user_email">{user.email}</p>
			<ReservationList hideReservator reservations={user.reservations} />
		</Div>
	)
}

const Div = styled.div<{ isExpanded: boolean }>`
	width: calc(100% - 4rem);
	padding: 1rem 2rem;
	height: ${({ isExpanded }) => isExpanded ? '260px' : '30px'};
	overflow: ${({ isExpanded }) => isExpanded ? 'scroll' : 'hidden'};
	transition: height 200ms ease-in-out;
	background-color: var(--background-color);
	border-radius: var(--border-radius);
	box-shadow: 5px 5px 17px 0px rgba(0, 0, 0, 0.12);

	.card_header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		font-weight: 600;
		color: var(--primary-text);
		font-size: 1.1rem;

		.user_name {
			margin: 0.7rem 0;
		}
	}

	.user_email {
			margin-bottom: 2.5rem;
		}

	.reservations_counter {
		height: 2rem;
		width: 2rem;
		background-color: var(--input-background);
		color: var(--primary-text);
		border-radius: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.edit_button {
		background: transparent;
		border: none;
		cursor: pointer;
	}

`