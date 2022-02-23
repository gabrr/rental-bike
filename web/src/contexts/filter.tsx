import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateBikes } from 'store/bikes/actions'
import { IBike, IBikeResponse } from 'types/bike'

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

	const bikesFromStore = useSelector(state => state.bikeReducer)
  const [isOpen, setisOpen] = useState<boolean>(false)
	const [filterOptions, setfilterOptions] = useState<FilterOptions>({} as FilterOptions)
	const [allBikes] = useState<IBike[]>(bikesFromStore)

	useEffect(() => {
		const { addressF, colorF, modelF, timeFrame } = filterOptions

		const filteredBikes = allBikes.filter(({ address, color, model, reservations }) => {
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

				if (start < filterStart && end > filterEnd) return false

				if (start > filterStart && end < filterEnd) return false				

			})
			
			return true
		})

		updateBikes(dispatch, filteredBikes)

	}, [filterOptions])

	const toggle = () => setisOpen(state => !state)

	const value = { toggle, isOpen, setfilterOptions }

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}