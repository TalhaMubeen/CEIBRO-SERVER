import { ActionInterface } from ".";
import config from '../../config/project.config'

const intialStatue = {
    drawerOpen: false
}



const AppReducer = (state = intialStatue, action: ActionInterface ) => {
    switch(action.type) {
        case config.OPEN_DRAWER:
            return {
                ...state,
                drawerOpen: true
            }

        case config.CLOSE_DRAWER: 
            return {
                ...state,
                drawerOpen: false
            }
        
        default:
            return state
    }
        
} 

export default AppReducer