import React from 'react'

interface FilterContextType {
  isOpen: boolean
	toggle: () => void
}

export const FilterContext = React.createContext<FilterContextType>(null!)

interface Props {
	children: React.ReactNode
}

export const FilterProvider: React.FC<Props> = ({ children }) => {
  const [isOpen, setisOpen] = React.useState<boolean>(false)

	const toggle = () => setisOpen(state => !state)

	const value = { toggle, isOpen }

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}