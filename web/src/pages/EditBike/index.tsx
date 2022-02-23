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
					<Input
						className='inputs'
						placeholder='Model'
						error={errors?.['model']}
						type='text'
						defaultValue={bike?.model || ''}
						onChange={(e) => handleInputs(e, 'model')}
					/>
					<Input
						className='inputs'
						placeholder='Color'
						error={errors?.['color']}
						type='text'
						defaultValue={bike?.color || ''}
						onChange={(e) => handleInputs(e, 'color')}
					/>
					<Input
						className='inputs'
						placeholder='Address'
						error={errors?.['address']}
						type='text'
						defaultValue={bike?.address || ''}
						onChange={(e) => handleInputs(e, 'address')}
					/>
				</form>

				<div className='react_rating'>
					<p className="rating_title">Initial Rating</p>
					<ReactRating emptySymbol={<Star />} fullSymbol={<Star isFull />} />
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