import { AppStateType } from "../../../redux/store"

export const selectorCount = (state: AppStateType) => state.users.count
export const selectorPage = (state: AppStateType) => state.users.page
export const selectorTerm = (state: AppStateType) => state.users.term
export const selectorFriend = (state: AppStateType) => state.users.friend
export const selectorUsersInit = (state: AppStateType) => state.users.userInitialization
export const selectorUsers = (state: AppStateType) => state.users.users