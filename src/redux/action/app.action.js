import { SET_COLLAPSE, SET_NAVBAR_OPEN, TOGGLE_NAVBAR } from "../../config/app.config"

const appActions = {
    toggleNavbar: () => {
        return {
                type: TOGGLE_NAVBAR
            }
    },
    setNavbarOpen: open => {
        return {
                type: SET_NAVBAR_OPEN,
                payload: open
            }
    },
    setCollapse: open => {
        return {
                type: SET_COLLAPSE,
                payload: open
            }
    }
}

export default appActions