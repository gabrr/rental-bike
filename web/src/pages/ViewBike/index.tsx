import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import styled from 'styled-components'
import { IBike } from 'types'
import ReactRating from 'react-rating'
import DatetimeRangePicker from 'react-datetime-range-picker'

import { LinkButton, Editicon, Pin, Star, Button } from 'components/atoms'
import { pageIn, popping } from 'animations'
import { ReservationList } from 'components/templates'
import { IUserResponse } from 'types/user'
import { useReservation } from 'hooks/reservation'
import { IReservation } from 'types/reservation'
import { notifyError, notifyInfo, notifySucess } from 'utils/notifier'
import { rateBike } from 'services/bike'
import { getBikes } from 'store/bikes/actions'
import { useDispatch } from 'react-redux'
import { bikeRateAverage } from 'utils/bikeRatingAverage'
import { useAuth } from 'hooks/auth'

export const ViewBike = () => {

	const { bikeId } = useParams()
	const { user } = useAuth()
	const isAdmin = (user?.role === 'admin')

	const bike = useSelector(state => state.bikeReducer.find(({ _id }) => _id === bikeId) ?? {} as IBike)

	const [reservationData, setreservationData] = useState<IReservation>({} as IReservation)

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { handleReservation } = useReservation()

	const goBack = () => navigate('/')

	const goToEditBike = () => navigate(`/edit-bike/${bike._id}`)

	

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
		<Div>
			<div className="header">
				<LinkButton onClick={goBack}>
					Bikes List
				</LinkButton>
				{isAdmin && <button className="edit_button" onClick={goToEditBike}>
					<Editicon />
				</button>}
			</div>

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

const Div = styled.div`
	width: 90%;
	padding-bottom: 4rem;
	margin: auto;
	max-width: 600px;
	animation: ${pageIn} 300ms ease-in-out;
	
	.header {
		width: 100%;
		min-height: 70px;
		margin: 1.5rem auto 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
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
		background: transparent;
		border: none;
		cursor: pointer;
		transition: 150ms ease-in-out;
		
		&:hover svg {
			transform: rotate(30deg);
		}

		svg {
			width: 20px;
			height: 20px;
			transition: transform 350ms ease-in-out;
		}

		@media screen and (min-width: 850px) {
			svg {
				width: 27px;
				height: 27px;
			}
		}
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
		margin-top: clamp(3rem, 7vh, 10rem);

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