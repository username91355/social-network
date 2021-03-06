import {applyMiddleware, combineReducers, createStore} from "redux";
import {appReducer, TAppReducerActions} from "./reducers/app-reducer";
import thunk, {ThunkAction} from 'redux-thunk'
import {profileReducer, TProfileReducerActions} from "./reducers/profile-reducer";
import {TUsersReducerActions, usersReducer} from "./reducers/users-reducer";
import {messagesReducer, TMessagesReducerActions} from "./reducers/messages-reducer";
import {chatReducer, TChatActions} from "./reducers/chat-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    profile: profileReducer,
    users: usersReducer,
    messages: messagesReducer,
    chat: chatReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

//App state type
export type TAppState = ReturnType<typeof rootReducer>

//App actions type
export type TAppAction =
    | TAppReducerActions
    | TProfileReducerActions
    | TUsersReducerActions
    | TMessagesReducerActions
    | TChatActions

//Thunk type
export type ThunkType = ThunkAction<void, TAppState, unknown, TAppAction>

//@ts-ignore
window.store = store
