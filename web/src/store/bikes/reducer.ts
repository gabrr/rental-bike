import { IBike } from "types/bike";
import { UPDATE_BIKES } from "./constants";

const INITIAL_STATE: IBike[] = []

interface IAction {
    type: string,
    payload: { bikes: IBike[] }
}

export const bikeReducer = (state = INITIAL_STATE, action: IAction) => {
	switch(action.type) {
		case UPDATE_BIKES:
			return action.payload.bikes

		default:
			return state
	}
}