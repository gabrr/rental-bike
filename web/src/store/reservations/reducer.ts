import { IReservationResponse } from "types/reservation";
import { UPDATE_RESERVATIONS } from "./constants";

const INITIAL_STATE: IReservationResponse[] = []

interface IAction {
    type: string,
    payload: { reservations: IReservationResponse[] }
}

export const reservationReducer = (state = INITIAL_STATE, action: IAction) => {
	switch(action.type) {
		case UPDATE_RESERVATIONS:
			return action.payload.reservations

		default:
			return state
	}
}