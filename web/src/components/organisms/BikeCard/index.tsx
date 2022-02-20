import React from 'react'
import styled from 'styled-components'
import ReactRating from 'react-rating'

import { Pin, Star } from 'components/atoms'
import { IBike } from 'types'
import { popping } from 'animations'


interface Props {
	bike: IBike
}

export const BikeCard: React.FC<Props> = ({ bike }) => {

	const isAvailable = !!bike.reservations.length

	return (
		<Div isAvailable={isAvailable}>
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
		</Div>
	)
}

const Div = styled.div<{ isAvailable: boolean }>`
	width: 90%;
	animation: ${popping} 300ms ease-in-out;
	margin: 0 auto;
	padding: 1.7rem 0;
	min-height: 100px;
	background-color: var(--background-color);
	border-radius: var(--border-radius);
	display: flex;
	box-shadow: 5px 5px 17px 0px rgba(0, 0, 0, 0.12);

	filter: ${({ isAvailable }) => isAvailable ? 'grayscale(0)' : 'grayscale(1)'};
	opacity:${({ isAvailable }) => isAvailable ? '1' : '0.3'};
	pointer-events: ${({ isAvailable }) => isAvailable ? 'all' : 'none'};

	.card_left {
		width: 50%;
		height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;

		img {
			width: clamp(100px, 80%, 200px);

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

`