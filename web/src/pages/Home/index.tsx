import React from 'react'
import { HomeLists } from 'components/templates/HomeLists'
import { BikeCard, UserCard } from 'components/organisms'
import { bikes } from 'mock/bikes'
import styled from 'styled-components'

export const Home = () => {

	return (
		<HomeLists role='user' tab='Bikes'>
			{bikes.map((bike) => {
				return (
					<BikeCard bike={bike} />
				)
			})}
		</HomeLists>
	)
}