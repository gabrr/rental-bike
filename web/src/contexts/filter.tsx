import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBikes } from 'services/bike'
import { getReservationByBike } from 'services/reservation'
import { updateBikes } from 'store/bikes/actions'
import { IBike } from 'types/bike'
import { notifyError } from 'utils/notifier'

interface FilterContextType {
  isOpen: boolean
	toggle: () => void
	setfilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>
}

export const FilterContext = React.createContext<FilterContextType>(null!)

interface Props {
	children: React.ReactNode
}

interface FilterOptions {
	colorF: string
	addressF: string
	modelF: string
	timeFrame: { startPeriod: string, endPeriod: string },
}

export const FilterProvider: React.FC<Props> = ({ children }) => {
	const dispatch = useDispatch()

  const [isOpen, setisOpen] = useState<boolean>(false)
	const [filterOptions, setfilterOptions] = useState<FilterOptions>({} as FilterOptions)
	const [allBikes, setAllBikes] = useState<IBike[]>([])

	useEffect(() => {
		getAllBikes()
		.then(async (bikes) => {
			const bikesWithReservations = bikes.map(async (bike) => {
				const reservations = await getReservationByBike(bike._id);
	
				return ({
					...bike,
					reservations
				})
			})
			const result = await Promise.all(bikesWithReservations)
			setAllBikes(result as any)
		})
		.catch(error => notifyError(error.request.response))
	}, [])

	useEffect(() => {
		const { addressF, colorF, modelF, timeFrame } = filterOptions

		const filterBikes = () => {
			if (!allBikes.length) return
			return allBikes.filter(({ address, color, model, reservations }) => {
				let result = true
				
				if (!!addressF && addressF !== address) return false
				if (!!colorF && colorF !== color) return false
				if (!!modelF && modelF !== model) return false
		
				if (!timeFrame?.startPeriod || !timeFrame?.endPeriod) return true
		
				
				// Refers to wether it has reservation within the time frame filtered.
				reservations.forEach(reservation => {
					const start = Date.parse(reservation.startPeriod)
					const end = Date.parse(reservation.endPeriod)
		
					const filterStart = Date.parse(timeFrame.startPeriod)
					const filterEnd = Date.parse(timeFrame.endPeriod)
		
					if (start <= filterStart && end >= filterEnd) result = false
		
					if (start >= filterStart && end <= filterEnd) result = false				
		
				})
				
				return result
			})
		}

		const result = filterBikes()

		if (result) updateBikes(dispatch, result as any)

	}, [filterOptions])

	const toggle = () => setisOpen(state => !state)

	const value = { toggle, isOpen, setfilterOptions }

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}