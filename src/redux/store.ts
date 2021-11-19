import {applyMiddleware, combineReducers, createStore} from "redux";
import {usersReducer} from "./users-reducer";
import thunkMiddleware from 'redux-thunk'

const rootReducers = combineReducers({
    users: usersReducer
})

type RootReducerType = typeof rootReducers

export type AppStateType = ReturnType<RootReducerType>

export const store = createStore(rootReducers, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store
