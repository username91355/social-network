import { combineReducers, createStore } from "redux";
import { profileReducer } from './reducers/profileReducer'
import {usersReducer} from "./reducers/usersReducer";
import {messagesReducer} from "./reducers/messagesReducer";

let reducers = combineReducers({
    profile: profileReducer,
    messages: messagesReducer,
    users: usersReducer
})

let store = createStore(reducers)

//Расширение интерфейса Window, сообщаем о новом свойстве
declare global {
    interface Window { store: any; }
}

window.store = store

export {store}