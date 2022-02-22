import { Deleteicon } from 'components/atoms'
import React from 'react'
import styled from 'styled-components'
import { combineStartEndPeriod } from 'utils'

interface Props {
	hideReservator?: boolean
	hideReserved?: boolean
	reservations: {
		_id: string
		user?: string
		bike?: string
		startPeriod: Date,
		endPeriod: Date,
	}[]
}

export const ReservationList: React.FC<Props> = ({ reservations, hideReservator, hideReserved }) => {

	const cancelReservation = (e: React.MouseEvent, id: string) => {
		e.stopPropagation()
	}

	return (
		<Div>
			<h1 className="reservation_title">
				Reservations
			</h1>

			<div className="list">
				
					{reservations.map((reservation) => {
						return (
							<div key={reservation._id} className="reservation">
								<div className="left">
									{!hideReservator && <p className="reservator">{reservation.user}</p>}
									{!hideReserved && <p className="bike_reserved">{reservation.bike}</p>}
									<p className="period">{combineStartEndPeriod(reservation.startPeriod, reservation.endPeriod)}</p>
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