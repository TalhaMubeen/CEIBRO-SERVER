import { ActionInterface } from ".";
import { TOGGLE_NAVBAR, SET_NAVBAR_OPEN, SET_COLLAPSE } from "../../config/app.config";
import SidebarConfig from "../../navigation/SidebarConfig";


const intialStatue = {
    navbar: false,
    collapse: false,
    sidebarRoutes: SidebarConfig
}



const AppReducer = (state = intialStatue, action: ActionInterface ) => {
    switch(action.type) {
        case TOGGLE_NAVBAR:
            return {
                ...state,
                navbar: !state.navbar
            }
        case SET_NAVBAR_OPEN:
            return {
                ...state,
                navbar: action.payload
            }
        case SET_COLLAPSE:
            return {
                ...state,
                collapse: action.payload
            }
        default:
            return state
    }
        
} 

export default AppReducer