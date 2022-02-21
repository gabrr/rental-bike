import React from 'react'

interface SideMenuContextType {
  isOpen: boolean
	toggle: () => void
}

export const SideMenuContext = React.createContext<SideMenuContextType>(null!)

interface Props {
	children: React.ReactNode
}

export const SideMenuProvider: React.FC<Props> = ({ children }) => {
  const [isOpen, setisOpen] = React.useState<boolean>(false)

	const toggle = () => setisOpen(state => !state)

	const value = { toggle, isOpen }

  return <SideMenuContext.Provider value={value}>{children}</SideMenuContext.Provider>
}