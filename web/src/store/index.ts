import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";


// reducers
const reducers = combineReducers({
    
})

export type AppState = ReturnType<typeof reducers>;

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))