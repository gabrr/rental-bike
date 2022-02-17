import { SET_THEME } from "./constants";

export const setTheme = (theme: 'dark' | 'light') => {
    return {
        type: SET_THEME,
        theme
    }
}