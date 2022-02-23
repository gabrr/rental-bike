import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import ReactRating from 'react-rating'

import { CreateEdit } from 'components/templates'
import { Button, Input, Star } from 'components/atoms'
import { ImageUploader } from 'components/organisms'
import { isBikeInputValidProps } from 'types'
import { createBike, editBike } from 'services/bike'
import { BIKE_INPUT_ERRORS, isBikeInputValid } from 'utils/inputValidators'
import { IBikeResponse } from 'types/bike'
import { notifyError } from 'utils/notifier'
import { useNavigate } from 'react-router'

interface IForm {
	name: string
	model: string
	color: string
	address: string
}

export const AddBike = () => {
	const form = useRef<HTMLFormElement>(null)
	const container = useRef<HTMLDivElement>(null)

	const navigate = useNavigate()

	const [imageUrl, setimageUrl] = useState('')
	const [bike, setbike] = useState<IForm>({} as IForm)
	const [errors, seterrors] = useState<IForm>({} as IForm)
	const [bikeResponse, setbikeResponse] = useState<IBikeResponse>()

	const [isLoading, setisLoading] = useState(false)

	useEffect(() => {
		if (imageUrl && bikeResponse?._id) {
			setisLoading(true)
			editBike(bikeResponse._id, { img: imageUrl })
				.then((data) => {
					setisLoading(false)
					setbikeResponse(data)
					navigate('/')
				})
				.catch(error => {
					notifyError(error.request.response)
					setisLoading(false)
				})
		}
	}, [imageUrl])

	useEffect(() => {
		if (bikeResponse?._id) {
			form.current?.requestSubmit()
		}
	}, [bikeResponse])

	const handleOnFormSubmit = (imageUrl: string) => setimageUrl(imageUrl)

	const handleCreateBike = (e: any) => {
		e.preventDefault()

		if (!container.current?.style.backgroundImage.includes('url')) return notifyError('Set an image to add a bike.')
		setisLoading(true)
		createBike(bike)
			.then(( data ) => {
				setbikeResponse(data)
				setisLoading(false)
			})
			.catch(error => {
				setisLoading(false)
				notifyError(error.request.response)
				console.log(error)
			})
	}

	const handleInputs = (e: React.FormEvent<HTMLInputElement>, name: isBikeInputValidProps['type']) => {
		const value = e.currentTarget.value

		if (!isBikeInputValid({ type: name, value })) {
			seterrors(prev => ({ ...prev, [name]: BIKE_INPUT_ERRORS[name] }))
			setbike({ ...bike, [name]: value })
			return
		}

		seterrors(prev => ({ ...prev, [name]: '' }))
		setbike({ ...bike, [name]: value })
	}

	return (
		<CreateEdit role='admin' title='Add Bike'>
			<Div>
				<form onSubmit={e => e.preventDefault()}>
					<Input
						error={errors?.['name']}
						className="inputs"
						placeholder='Name'
						type='text'
						onChange={(e) => handleInputs(e, 'name')}
					/>
					<Input
						className='inputs'
						placeholder='Model'
						error={errors?.['model']}
						type='text'
						onChange={(e) => handleInputs(e, 'model')}
					/>
					<Input
						className='inputs'
						placeholder='Color'
						error={errors?.['color']}
						type='text'
						onChange={(e) => handleInputs(e, 'color')}
					/>
					<Input
						className='inputs'
						placeholder='Address'
						error={errors?.['address']}
						type='text'
						onChange={(e) => handleInputs(e, 'address')}
					/>
				</form>
				<ReactRating
					className='react_rating'
					emptySymbol={<Star />}
					fullSymbol={<Star isFull />}
					initialRating={4}
				/>

				<ImageUploader container={container} form={form} onFormSubmit={handleOnFormSubmit} bikeId={bikeResponse?._id} />

				<Button onClick={handleCreateBike} className='add_bike_button' buttonPurpose='positive' isLoading={isLoading}>
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