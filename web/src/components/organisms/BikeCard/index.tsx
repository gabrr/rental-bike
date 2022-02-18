import React from 'react'
import styled from 'styled-components'
import ReactRating from 'react-rating'

import { Pin, Star } from 'components/atoms'
import { IBike } from 'types'


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
				<p className="bike_name">Bike Z2</p>
				<p className="color">Black</p>
				<div className="location">
					<Pin />
					<p className="address">Centro, Florianópolis</p>
				</div>
				<ReactRating emptySymbol={<Star />} fullSymbol={<Star isFull />} />
			</div>
		</Div>
	)
}

const Div = styled.div<{ isAvailable: boolean }>`
	width: 90%;
	margin: 0 auto;
	padding: 1.7rem 0;
	min-height: 100px;
	background-color: var(--background-color);
	border-radius: var(--border-radius);
	display: flex;

	border: ${({ isAvailable }) => isAvailable ? "1px solid #21D704" : "none"};
	box-shadow: ${({ isAvailable }) => isAvailable ? "5px 5px 17px 0px rgba(23, 237, 70, 0.12)" : '5px 5px 17px 0px rgba(0, 0, 0, 0.08)'};
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