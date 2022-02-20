import React from 'react'
import styled from 'styled-components'

import { Button, Editicon } from 'components/atoms'
import { ReservationList } from 'components/templates'

interface Props {
	user: {
		id: string,
		userName: string
		email: string
		reservations: {
			id: string
			bike: string
			period: string
		}[]
	}
}

export const UserCard: React.FC<Props> = ({ user }) => {



	return (
		<Div>
			<div className="card_header">
				<div className="left">
					<p className="user_name">{user.userName}</p>
					<p className="user_email">{user.email}</p>
				</div>
				<div className="right">
					<div className="reservations_counter">
						{user.reservations.length}
					</div>
					<Editicon />
				</div>
			</div>
			<Button buttonPurpose='negative' isLoading={false}>
				Delete User
			</Button>

			<ReservationList hideReservator reservations={user.reservations} />
		</Div>
	)
}

const Div = styled.div`
	width: 90%;
	min-height: 100px;
	background-color: var(--background-color);
	border-radius: var(border-radius);
	box-shadow: 5px 5px 17px 0px rgba(0, 0, 0, 0.12);

`