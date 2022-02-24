import React, { createRef, useState } from 'react'
import styled from 'styled-components'
import ReactRating from 'react-rating'

import { CreateEdit, ReservationList } from 'components/templates'
import { Button, Input, Star } from 'components/atoms'
import { useNavigate, useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { IBike, isBikeInputValidProps } from 'types'
import { ImageUploader } from 'components/organisms'
import { BIKE_INPUT_ERRORS, isBikeInputValid } from 'utils/inputValidators'
import { deleteBike, editBike, getAllBikes } from 'services/bike'
import { notifyError } from 'utils/notifier'
import { BIKE_MODELS, COLORS, LOCATIONS } from 'mock/assistence'
import { bikeRateAverage } from 'utils/bikeRatingAverage'

interface IForm {
	name?: string
	model?: string
	color?: string
	address?: string
}

export const EditBike = () => {

	const container = createRef<HTMLDivElement>()
	const form = createRef<HTMLFormElement>()

	const { bikeId } = useParams()
	const bike = useSelector(state => state.bikeReducer.find(({ _id }) => _id === bikeId) ?? {} as IBike)

	const [editingBike, seteditingBike] = useState<IForm>({} as IForm)
	const [errors, seterrors] = useState<IForm>({} as IForm)
	const [isLoading, setisLoading] = useState(false)

	const navigate = useNavigate()

	const handleBikeUpdate = () => {
		setisLoading(true)
		form.current?.requestSubmit()
		editBike(bikeId || '', editingBike)
			.then(async () => {
				setisLoading(false)
				await getAllBikes()
				navigate('/')
			})
			.catch(error => {
				notifyError(error.request.response)
				setisLoading(false)
			})
	}

	const handleBikeDelete = () => {
		setisLoading(true)
		deleteBike(bikeId || '')
			.then(() => {
				setisLoading(false)
				navigate('/')
			})
			.catch(error => {
				notifyError(error.request.response)
				setisLoading(false)
			})
	}

	const handleInputs = (e: React.FormEvent<HTMLInputElement>, name: isBikeInputValidProps['type']) => {
		const value = e.currentTarget.value

		if (!isBikeInputValid({ type: name, value })) {
			seterrors(prev => ({ ...prev, [name]: BIKE_INPUT_ERRORS[name] }))
			seteditingBike(prev => ({ ...prev, [name]: value }))
			return
		}

		seterrors(prev => ({ ...prev, [name]: '' }))
		seteditingBike(prev => ({ ...prev, [name]: value }))
	}

	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>, name: string) => {
		const value = e.currentTarget.value
		seteditingBike(prev => ({ ...prev, [name]: value }))
	}

	return (
		<CreateEdit role='admin' title='Edit Bike'>
			<Div>
				<form onSubmit={() => {}}>
					<Input
						error={errors?.['name']}
						className="inputs"
						placeholder='Name'
						type='text'
						defaultValue={bike?.name || ''}
						onChange={(e) => handleInputs(e, 'name')}
					/>
					<select defaultValue={bike.model} required name="model" id="model" onChange={(e) => handleSelect(e, 'model')}>
						<option value="">Select a model</option>
						{BIKE_MODELS.map((string) => {
							return <option key={string} value={string}>{string}</option>
						})}
					</select>
					<select defaultValue={bike.address} required name="address" id="address" onChange={(e) => handleSelect(e, 'address')}>
						<option value="">Select a location</option>
						{LOCATIONS.map((string) => {
							return <option key={string} value={string}>{string}</option>
						})}
					</select>
					<select defaultValue={bike.color} required name="color" id="color" onChange={(e) => handleSelect(e, 'color')}>
						<option value="">Select a color</option>
						{Object.entries(COLORS).map(([key]) => {
							return <option key={key} value={key}>{key}</option>
						})}
					</select>
				</form>

				<div className='react_rating'>
					<p className="rating_title">Initial Rating</p>
					<ReactRating initialRating={bikeRateAverage(bike)} emptySymbol={<Star />} fullSymbol={<Star isFull />} />
				</div>

				<ImageUploader
					bikeId={bikeId}
					container={container}
					form={form}
					defaultValue={bike?.img || ''}
				/>

				<section className="actions">
					<Button
						className='delete'
						buttonPurpose='negative'
						isLoading={isLoading}
						onClick={handleBikeDelete}
					>
						Delete Bike
					</Button>

					<Button
						className='update'
						buttonPurpose='positive'
						isLoading={isLoading}
						onClick={handleBikeUpdate}
					>
						Update Bike
					</Button>
				</section>

				<ReservationList hideReserved reservations={bike.reservations} />

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

	form {
		display: flex;
    flex-direction: column;
    gap: 10px;
	}

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

	select {
		width: 100%;
		padding: 5px 10px;
		height: 50px;
		border: none;
		background-color: var(--input-background);
		color: var(--primary-text);
		border-radius: var(--border-radius);
	}
`