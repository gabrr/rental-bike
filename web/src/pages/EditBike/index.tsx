import React from 'react'
import styled from 'styled-components'
import ReactRating from 'react-rating'

import { CreateEdit, ReservationList } from 'components/templates'
import { Button, Input, Star } from 'components/atoms'
import { useParams } from 'react-router'

export const EditBike = () => {

	//const { bikeId } = useParams()

	//console.log('bike: ', bikeId)

	const reservations = [
		{
			id: 'hjbkn',
			user: 'Gabriel Oliveira',
			bike: 'Z2',
			startPeriod: new Date(),
			endPeriod: new Date(),
		}
	]

	return (
		<CreateEdit role='admin' title='Edit Bike'>
			<Div>
				<form onSubmit={() => {}}>
					<Input className='inputs' placeholder='Name' />
					<Input className='inputs' placeholder='Model' />
					<Input className='inputs' placeholder='Color' />
					<Input className='inputs' placeholder='Location' />
				</form>

				<div className='react_rating'>
					<p className="rating_title">Initial Rating</p>
					<ReactRating emptySymbol={<Star />} fullSymbol={<Star isFull />} />
				</div>

				<div className="upload_file">
					Upload File
				</div>

				<section className="actions">
					<Button className='delete' buttonPurpose='negative' isLoading={false}>
						Delete Bike
					</Button>
					<Button className='update' buttonPurpose='positive' isLoading={false}>
						Update Bike
					</Button>
				</section>

				<ReservationList hideReserved reservations={reservations} />

			</Div>
		</CreateEdit>
	)
}

const Div = styled.div`
	width: 90%;
	margin: auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding-bottom: 5rem;

	.inputs {
		width: 100%;
		margin: 10px auto;
	}
	
	.react_rating {
		margin: 2rem 0 3rem;
	}

	.rating_title {
		font-weight: 600;
		font-size: 1.4rem;
		margin: 1rem 0;
	}

	.upload_file {
		height: 100px;
		width: 100%;
		background-color: var(--input-background);
		border-radius: var(--border-radius);
		display: grid;
		align-content: center;
    justify-content: center;
	}

	.actions {
		display: flex;
		justify-content: space-between;
	}

	.delete, .update {
		width: max-content;
		padding: 10px 30px;
		margin: 20px 0;
	}
`