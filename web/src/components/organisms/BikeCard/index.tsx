import React, { useState } from 'react'
import styled from 'styled-components'
import ReactRating from 'react-rating'
import DatetimeRangePicker from 'react-datetime-range-picker'

import { Button, Editicon, Pin, Star } from 'components/atoms'
import { IBike } from 'types'
import { popping } from 'animations'
import { useNavigate } from 'react-router'
import { ReservationList } from 'components/templates'
import { IUserResponse } from 'types/user'
import { useReservation } from 'hooks/reservation'
import { IReservation } from 'types/reservation'
import { notifyError, notifyInfo, notifySucess } from 'utils/notifier'
import { rateBike } from 'services/bike'
import { getBikes } from 'store/bikes/actions'
import { useDispatch } from 'react-redux'
import { bikeRateAverage } from 'utils/bikeRatingAverage'


interface Props {
	bike: IBike
	user: IUserResponse | null
}

export const BikeCard: React.FC<Props> = ({ bike, user }) => {
	const [isExpanded, setisExpanded] = useState(false)
	const [reservationData, setreservationData] = useState<IReservation>({} as IReservation)

	const {
		handleReservation
	} = useReservation()
		
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const goToViewBike = () => {
		setisExpanded(true)
		setTimeout(() => {
			navigate(`/bike/${bike._id}`)
		}, 250)
	}

	const goToEditBike = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		navigate(`/edit-bike/${bike._id}`)
	}
	
	const isAvailable = false

	const isAdmin = (user?.role === 'admin')

	const reserveBike = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		if (!user?._id) return notifyError('Error to reserve a bike.')
		if (!reservationData.startPeriod) return notifyInfo('A period should be selected.')

		const payload: IReservation = {
			bikeId: bike._id,
			userId: user?._id,
			startPeriod: reservationData.startPeriod,
			endPeriod: reservationData.endPeriod
		}

		handleReservation(payload)
	}

	const handleReservationDateTime = (dateAndTime: { start: string, end: string }) => {
		setreservationData(prev => ({
			...prev,
			startPeriod: dateAndTime.start,
			endPeriod: dateAndTime.end
		}))
	}

	const handleRating = (value: number) => {
		rateBike(value, bike._id)
			.then(async () => {
				getBikes(dispatch)
				notifySucess("Bike rated successfully!")
			})
			.catch(error => {
				notifyError(error.request.response || "Error to rate bike.")
			})
	}

	return (
		<Div isAvailable={isAvailable} className={isExpanded ? 'expanded' : ''} onClick={goToViewBike}>
			{isAdmin && <button className="edit_button" onClick={goToEditBike}>
				<Editicon />
			</button>}

			<div className="card_display">
				<div className="card_left">
					<img src={bike.img} alt={bike.model} />
				</div>

				<div className="card_right">
					<p className="bike_name">{bike.name}</p>
					<p className="color">{bike.color}</p>
					<div className="location">
						<Pin />
						<p className="address">{bike.address}</p>
					</div>
					<ReactRating
						emptySymbol={<Star />}
						fullSymbol={<Star isFull />}
						onClick={handleRating}
						initialRating={bikeRateAverage(bike)}
					/>
				</div>
			</div>

			<div className="reserve_action" onClick={(e: React.MouseEvent<HTMLDivElement>) => {e.stopPropagation()}}>
				<DatetimeRangePicker onChange={handleReservationDateTime} />
				<Button
					onClick={reserveBike}
					buttonPurpose='default'
					isLoading={false}
				>
					Reserve
				</Button>
			</div>

			<ReservationList reservations={bike.reservations} bike={bike} />

		</Div>
	)
}

const Div = styled.div<{ isAvailable: boolean, isExpanded?: boolean }>`
	position: relative;
	width: calc(90% - 10%);
	animation: ${popping} 300ms ease-in-out;
	margin: 0 auto;
	padding: 1.7rem 5% 2.5rem;
	height: 100px;
	overflow: hidden;
	background-color: var(--background-color);
	border-radius: var(--border-radius);
	display: flex;
	flex-direction: column;
	box-shadow: 5px 5px 17px 0px rgba(0, 0, 0, 0.12);
	filter: ${({ isAvailable }) => !isAvailable ? 'grayscale(0)' : 'grayscale(1)'};
	opacity:${({ isAvailable }) => !isAvailable ? '1' : '0.3'};
	pointer-events: ${({ isAvailable }) => !isAvailable ? 'all' : 'none'};
	transition: transform 250ms ease-in-out;
	cursor: pointer;

	&:hover {
		transform: scale(0.99);
		box-shadow: 1px 1px 4px -1px rgba(0, 0, 0, 0.3);
	}

	&.expanded {
		transform: scale(30);
		transform-origin: center;
		z-index: 2;
	}

	@media screen and (min-width: 850px) {
		img {
			margin-top: 4rem;
    	margin-right: auto;
		}
	}

	.card_display {
		display: flex;
		margin-bottom: 3rem;
	}

	.edit_button {
		position: absolute;
		right: 5%;
		top: 1.7rem;
		background: transparent;
		border: none;
		cursor: pointer;
	}

	.card_left {
		width: 50%;
		height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;

		img {
			width: clamp(100px, 80%, 200px);
			user-select: none;
			-webkit-user-drag: none;
		}
	}

	.bike_name {
		font-size: 1.6rem;
		font-weight: 600;
		margin: 0;
	}

	.color {
		font-size: 1.5rem;
		font-weight: 500;
		margin: 0;
	}

	.card_right {
		display: flex;
		flex-direction: column;
		align-items: baseline;
	}

	.location {
		display: flex;
		align-items: center;
		margin-bottom: 1rem;

		svg {
			height: 1.2rem;
			width: 1.2rem;
		}
	}

	.reserve_action {
		display: flex;
		justify-content: space-between;
		margin-bottom: 3rem;
		margin-top: 3rem;

		.rdt input {
			background-color: var(--input-background) !important;
			border: none !important;
			border-radius: var(--border-radius);
			padding: 10px 20px;
			color: var(--primary-text);
			margin: 0.5rem 0;
		}

		button {
			height: 40px;
    	margin-top: 0.5rem;
		}
	}
`