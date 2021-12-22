import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import {authReducer} from "./reducers/auth-reducer";
import {usersReducer} from "./reducers/users-reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

//App state type
export type AppStateType = ReturnType<typeof rootReducer>

//App actions type
export type AppActionType = any

//Thunk type
export type ThunkType = ThunkAction<void, AppStateType, unknown, AppActionType>

//@ts-ignore
window.store = store