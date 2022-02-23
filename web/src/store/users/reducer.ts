import { IUSerWithReservations } from "types/user";
import { UPDATE_USERS } from "./constants";

const INITIAL_STATE: IUSerWithReservations[] = []

interface IAction {
    type: string,
    payload: { users: IUSerWithReservations[] }
}

export const userReducer = (state = INITIAL_STATE, action: IAction) => {
	switch(action.type) {
		case UPDATE_USERS:
			return action.payload.users

		default:
			return state
	}
}