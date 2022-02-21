import { AuthProvider } from 'contexts/auth'
import { FilterProvider } from 'contexts/filter'
import { SideMenuProvider } from 'contexts/sideMenu'
import { ReduxProvider } from 'store/provider'
import { combineComponents } from 'contexts/contextsCombiner'

const providers = [
  AuthProvider,
  ReduxProvider,
	FilterProvider,
	SideMenuProvider,
]

export const AppContextProvider = combineComponents(...providers)