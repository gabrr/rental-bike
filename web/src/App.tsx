import React from "react";
import { AppRoutes } from "routes";
import { AppContextProvider } from "contexts";
import { FilterOptions, SideMenu } from "components/organisms";

const App = () => {
	return (
    <AppContextProvider>
			<AppRoutes />
			<FilterOptions />
			<SideMenu />
		</AppContextProvider>
  )
}

export default App;
