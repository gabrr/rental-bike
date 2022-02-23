import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { themeReducer } from 'store/theme/reducer';
import { bikeReducer } from 'store/bikes/reducer';
import { userReducer } from 'store/users/reducer';
import { reservationReducer } from 'store/reservations/reducer';

// reducers
const reducers = combineReducers({
	themeReducer,
	bikeReducer,
	userReducer,
	reservationReducer,
})

export type AppState = ReturnType<typeof reducers>;

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))