import React from "react";
import { AppRoutes } from "routes";
import { AppContextProvider } from "contexts";
import { FilterOptions, SideMenu } from "components/organisms";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
	return (
    <AppContextProvider>
			<AppRoutes />
			<FilterOptions />
			<SideMenu />
			<ToastContainer/>
		</AppContextProvider>
  )
}

export default App;
