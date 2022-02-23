import React, { useState } from 'react'
import styled from 'styled-components'
import ReactRating from 'react-rating'
import DatetimeRangePicker from 'react-datetime-range-picker'

import { Button, Editicon, Pin, Star } from 'components/atoms'
import { IBike } from 'types'
import { popping } from 'animations'
import { useNavigate } from 'react-router'
import { ReservationList } from 'components/templates'


interface Props {
	bike: IBike
}

export const BikeCard: React.FC<Props> = ({ bike }) => {
	const [isExpanded, setisExpanded] = useState(false)
		
	const navigate = useNavigate()

	const toggleExpanded = () => setisExpanded(state => !state)

	const goToEditBike = () => navigate(`/edit-bike/${bike._id}`)
	
	const isAvailable = !!bike.reservations.length

	const isAdmin = true

	return (
		<Div isAvailable={isAvailable} isExpanded={isExpanded} onClick={toggleExpanded}>
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
					<ReactRating emptySymbol={<Star />} fullSymbol={<Star isFull />} />
				</div>
			</div>

			<div className="reserve_action" onClick={(e: React.MouseEvent<HTMLDivElement>) => {e.stopPropagation()}}>
				<DatetimeRangePicker />
				<Button buttonPurpose='default' isLoading={false}>
					Reserve
				</Button>
			</div>

			<ReservationList reservations={bike.reservations} bike={bike} />

		</Div>
	)
}

const Div = styled.div<{ isAvailable: boolean, isExpanded: boolean }>`
	position: relative;
	width: calc(90% - 10%);
	animation: ${popping} 300ms ease-in-out;
	margin: 0 auto;
	padding: 1.7rem 5% 2.5rem;
	height: ${({ isExpanded }) => isExpanded ? '260px' : '100px'};
	overflow: ${({ isExpanded }) => isExpanded ? 'scroll' : 'hidden'};
	background-color: var(--background-color);
	border-radius: var(--border-radius);
	display: flex;
	flex-direction: column;
	box-shadow: 5px 5px 17px 0px rgba(0, 0, 0, 0.12);
	filter: ${({ isAvailable }) => !isAvailable ? 'grayscale(0)' : 'grayscale(1)'};
	opacity:${({ isAvailable }) => !isAvailable ? '1' : '0.3'};
	pointer-events: ${({ isAvailable }) => !isAvailable ? 'all' : 'none'};

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
	}
`