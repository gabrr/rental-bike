import React from 'react'
import { HomeLists } from 'components/templates/HomeLists'
import { BikeCard } from 'components/organisms'
import { bikes } from 'mock/bikes'

export const Home = () => {

	return (
		<HomeLists role='admin' tab='Bikes'>
			{bikes.map((bike) => {
				return (
					<BikeCard bike={bike} key={bike.id} />
				)
			})}
		</HomeLists>
	)
}