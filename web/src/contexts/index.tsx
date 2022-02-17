import { AuthProvider } from 'contexts/auth'
import { ReduxProvider } from 'store/provider';
import { combineComponents } from 'contexts/contextsCombiner';

const providers = [
  AuthProvider,
  ReduxProvider,
]

export const AppContextProvider = combineComponents(...providers);