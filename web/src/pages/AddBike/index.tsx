import React from 'react'
import styled from 'styled-components'
import ReactRating from 'react-rating'

import { CreateEdit } from 'components/templates'
import { Button, Input, Star } from 'components/atoms'

export const AddBike = () => {
	return (
		<CreateEdit role='admin' title='Add Bike'>
			<Div>
				<form onSubmit={() => {}}>
					<Input className='inputs' placeholder='Name' />
					<Input className='inputs' placeholder='Model' />
					<Input className='inputs' placeholder='Color' />
					<Input className='inputs' placeholder='Location' />
				</form>
				<ReactRating className='react_rating' emptySymbol={<Star />} fullSymbol={<Star isFull />} />

				<div className="upload_file">
					Upload File
				</div>

				<Button className='add_bike_button' buttonPurpose='positive' isLoading={false}>
					Add Bike
				</Button>
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

	.inputs {
		width: 100%;
		margin: 10px auto;
	}
	
	.react_rating {
		margin: 10px 0;
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

	.add_bike_button {
		width: max-content;
		padding: 10px 30px;
		margin: 20px 0;
	}
`