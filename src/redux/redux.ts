import { combineReducers, createStore } from "redux";
import FriednsPageReducer from "./reducers/FriendsPageReducer";
import MessagesPageReducer from "./reducers/MessagePageReduser";

let reducers = combineReducers({
    friendsPage: FriednsPageReducer,
    messagesPage: MessagesPageReducer
})

let store = createStore(reducers)

export default store