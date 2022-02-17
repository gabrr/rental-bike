import React from "react";
import { Routes } from "routes";
import { AppContextProvider } from "contexts";

const App = () => {
  return (
    <AppContextProvider>
			<Routes/>
		</AppContextProvider>
  )
}

export default App;
