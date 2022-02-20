import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { themeReducer } from 'store/theme/reducer';

// reducers
const reducers = combineReducers({
	themeReducer
})

export type AppState = ReturnType<typeof reducers>;

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))