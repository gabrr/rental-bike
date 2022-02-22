import { IBike } from "types";
import { ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM } from "./constants";

const INITIAL_STATE: IBike[] = []

interface IAction {
    type: string,
    payload: { item: IBike }
    ids?: string[]
}

export const listReducer = (state = INITIAL_STATE, action: IAction) => {

    switch(action.type) {
        case ADD_ITEM:
            return [...state, action.payload.item]

        case UPDATE_ITEM:
            const id = action.payload.item._id
            const newState = state.map(item => (item._id === id) ? action.payload.item : item)
            return newState

        case REMOVE_ITEM:
            const idToRemove = action.payload.item._id
            const stateWithItemRemoved = state.filter(item => item._id !== idToRemove)
            return stateWithItemRemoved

        default:
            return state
    }
}