import {applyMiddleware, combineReducers, createStore} from "redux";
import {usersReducer} from "./users-reducer";
import thunkMiddleware from 'redux-thunk'
import authReducer from "./auth-reducer";
import profileReducer from "./profile-reducer";
import messagesReducer from "./reducers/messages-reducer";

const rootReducers = combineReducers({
    auth: authReducer,
    users: usersReducer,
    profile: profileReducer,
    messages: messagesReducer,
})

type RootReducerType = typeof rootReducers

export type AppStateType = ReturnType<RootReducerType>

export const store = createStore(rootReducers, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store
