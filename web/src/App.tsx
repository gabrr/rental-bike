import React from "react";
import { AppRoutes } from "routes";
import { AppContextProvider } from "contexts";

const App = () => {
  return (
    <AppContextProvider>
			<AppRoutes />
		</AppContextProvider>
  )
}

export default App;
