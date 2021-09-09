import { combineReducers } from 'redux'
import appReducer from './app.reducer'

const rootReducer  = combineReducers({
    app: appReducer
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>

export interface ActionInterface {
    type: string
    payload: any
}