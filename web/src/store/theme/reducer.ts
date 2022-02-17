import { SET_THEME } from "./constants";

const INITIAL_STATE = 'light'

interface IAction {
    type: string,
    theme: 'dark' | 'light'
}

export const themeReducer = (state = INITIAL_STATE, action: IAction) => {
    switch(action.type) {
        case SET_THEME:
            return action.theme
        default:
            return state
    }
}