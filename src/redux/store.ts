import {applyMiddleware, combineReducers, createStore} from "redux";
import {usersReducer} from "./users-reducer";
import thunkMiddleware from 'redux-thunk'
import authReducer from "./auth-reducer";
import profileReducer from "./profile-reducer";

const rootReducers = combineReducers({
    auth: authReducer,
    users: usersReducer,
    profile: profileReducer
})

type RootReducerType = typeof rootReducers

export type AppStateType = ReturnType<RootReducerType>

export const store = createStore(rootReducers, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store
