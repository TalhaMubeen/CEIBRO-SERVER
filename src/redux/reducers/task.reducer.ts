import { ActionInterface } from ".";
import config from '../../config/task.config'

const intialStatue = {
    drawerOpen: false,
    menue: 1
}



const AppReducer = (state = intialStatue, action: ActionInterface ) => {
    console.log('we added', action, state)
    switch(action.type) {
        case config.OPEN_TASK_DRAWER:
            return {
                ...state,
                drawerOpen: true
            }

        case config.CLOSE_TASK_DRAWER: 
            return {
                ...state,
                drawerOpen: false
            }

        case config.SET_MENUE: 
            return {
                ...state,
                menue: action.payload
            }
        
        default:
            return state
    }
        
} 

export default AppReducer