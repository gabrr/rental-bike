import React from 'react'
import { Deleteicon } from 'components/atoms'
import styled from 'styled-components'
import { IBikeResponse } from 'types/bike'
import { IReservationResponse } from 'types/reservation'
import { IUserResponse } from 'types/user'
import { combineStartEndPeriod } from 'utils'
import { useReservation } from 'hooks/reservation'

interface Props {
	hideReservator?: boolean
	hideReserved?: boolean
	reservations?: IReservationResponse[]
	user?: IUserResponse,
	bike?: IBikeResponse
}

export const ReservationList: React.FC<Props> = ({ reservations, hideReservator, hideReserved, bike, user }) => {

	const { handleDeleteReservation } = useReservation()

	const cancelReservation = (e: React.MouseEvent, id: string) => {
		e.stopPropagation()
		handleDeleteReservation(id)
	}	

	const combineDates = (string: string, string2: string) => {
		return combineStartEndPeriod(new Date(string), new Date(string2))
	}

	return (
		<Div>
			<h1 className="reservation_title">
				Reservations
			</h1>

			<div className="list">
				
					{reservations?.map((reservation) => {
						return (
							<div key={reservation._id} className="reservation">
								<div className="left">
									{!hideReservator && <p className="reservator">{user?.name}</p>}
									{!hideReserved && <p className="bike_reserved">{bike?.name}</p>}
									<p className="period">{combineDates(reservation.startPeriod, reservation.endPeriod)}</p>
								</div>
								<button className="cancel_button" onClick={(e) => cancelReservation(e, reservation._id)}>
									<Deleteicon fill={'var(--button-text-default)'} />
								</button>

							</div>
						)
					})}
			</div>
		</Div>
	)
}


const Div = styled.div`
	.reservation_title {
		color: var(--primary-text);
		font-size: 1.4rem;
	}

	.reservation {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.reservator, .bike_reserved {
		font-weight: 600;
		font-size: 1.1rem;
		margin: 0;
	}

	.period {
		font-weight: 500;
		font-size: 1.1rem;
		margin: 0;
	}

	.cancel_button {
		border: none;
		background-color: rgba(255, 0, 0, 0.7);
		border-radius: 100%;
		height: 25px;
		width: 25px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`