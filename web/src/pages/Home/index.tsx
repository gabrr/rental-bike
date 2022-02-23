import React, { useEffect } from 'react'
import { HomeLists } from 'components/templates/HomeLists'
import { BikeCard } from 'components/organisms'
import { getBikes } from 'store/bikes/actions'
import { useDispatch, useSelector } from 'react-redux'

export const Home = () => {

	const dispatch = useDispatch()
	const bikes = useSelector(state => state.bikeReducer)

	useEffect(() => {
		getBikes(dispatch)
	}, [])

	return (
		<HomeLists role='admin' tab='Bikes'>
			{bikes.map((bike) => {
				return (
					<BikeCard bike={bike} key={bike._id} />
				)
			})}
		</HomeLists>
	)
}