import React from 'react'
import styled from 'styled-components'

interface Props {
	hideReservator?: boolean
	hideReserved?: boolean
	reservations: {
		id: string
		user?: string
		bike?: string
		period: string
	}[]
}

export const ReservationList: React.FC<Props> = ({ reservations, hideReservator, hideReserved }) => {
	return (
		<Div>
			<h1 className="reservation_title">
				Reservations
			</h1>

			<div className="list">
				
					{reservations.map((reservation) => {
						return (
							<div key={reservation.id} className="reservation">
								{!hideReservator && <p className="reservator">{reservation.user}</p>}
								{!hideReserved && <p className="bike_reserved">{reservation.bike}</p>}
								<p className="period">{reservation.period}</p>
							</div>
						)
					})}
			</div>
		</Div>
	)
}


const Div = styled.div`


`