import {IUser, serverAPI} from "../../api/api";
import {ThunkType} from "../store";
import {Nullable} from "./app-reducer";

//constants
const SET_USERS = 'socialNetwork/usersReducer/SET_USERS'
const SET_SUBSCRIPTION_STATUS = 'socialNetwork/usersReducer/SET_SUBSCRIPTION_STATUS'
const REMOVE_SUBSCRIPTION_STATUS = 'socialNetwork/usersReducer/REMOVE_SUBSCRIPTION_STATUS'
export const ADD_TO_FRIENDS = 'socialNetwork/usersReducer/ADD_TO_FRIENDS'
export const REMOVE_FROM_FRIENDS = 'socialNetwork/usersReducer/REMOVE_FROM_FRIENDS'

//initialization state
const iState = {
    count: 1,
    page: 10,
    term: '',
    friend: null,
    totalCount: null,
    users: [],
    subscriptionProcess: [],
    usersError: null
}

//reducer
export const usersReducer = (state: IUsersState = iState, action: TUsersReducerActions) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users,
                totalCount: action.totalUsers
            }
        case SET_SUBSCRIPTION_STATUS:
            return {
                ...state,
                subscriptionProcess: [...state.subscriptionProcess, action.userId]
            }
        case REMOVE_SUBSCRIPTION_STATUS:
            return {
                ...state,
                subscriptionProcess: state.subscriptionProcess.filter(i => i !== action.userId)
            }
        case ADD_TO_FRIENDS:
            return {
                ...state,
                users: state.users.map(i => i.id === action.userId ? {...i, followed: true} : i)
            }
        case REMOVE_FROM_FRIENDS:
            return {
                ...state,
                users: state.users.map(i => i.id === action.userId ? {...i, followed: false} : i)
            }
        default:
            return state
    }
}

//action creators
export const setUsers = (users: IUser[], totalUsers: number) => ({type: SET_USERS, users, totalUsers} as const)
export const setSubscriptionStatus = (userId: number) => ({type: SET_SUBSCRIPTION_STATUS, userId} as const)
export const removeSubscriptionStatus = (userId: number) => ({type: REMOVE_SUBSCRIPTION_STATUS, userId} as const)
export const addFriend = (userId: number) => ({type: ADD_TO_FRIENDS, userId} as const)
export const removeFriend = (userId: number) => ({type: REMOVE_FROM_FRIENDS, userId} as const)

//thunks
export const getUsers = (count: number, page: number, term: string, friend: boolean | null): ThunkType => async dispatch => {
    const result = await serverAPI.getUsers(count, page, term, friend)

    if (!result.error) {
        dispatch(setUsers(result.items, result.totalCount))
    }
}

export const subscribeToUser = (userId: number): ThunkType => async dispatch => {
    dispatch(setSubscriptionStatus(userId))
    const result = await serverAPI.subscribeToUser(userId)

    if (result.resultCode === 0) {
        dispatch(addFriend(userId))
        dispatch(removeSubscriptionStatus(userId))
    }
}

export const unsubscribeFromUser = (userId: number): ThunkType => async dispatch => {
    dispatch(setSubscriptionStatus(userId))
    const result = await serverAPI.unsubscribeFromUser(userId)

    if (result.resultCode === 0) {
        dispatch(removeFriend(userId))
        dispatch(removeSubscriptionStatus(userId))
    }
}

//types
interface IUsersState {
    count: number
    page: number
    term: string
    friend: Nullable<boolean>
    totalCount: Nullable<number>
    users: IUser[]
    subscriptionProcess: number[]
    usersError: Nullable<string>
}

export type TUsersReducerActions =
    | TSetUsers
    | TSetSubscribtionStatus
    | TAddFriend
    | TRemoveSubscribtionStatus
    | TRemoveFriend
type TSetUsers = ReturnType<typeof setUsers>
type TSetSubscribtionStatus = ReturnType<typeof setSubscriptionStatus>
type TRemoveSubscribtionStatus = ReturnType<typeof removeSubscriptionStatus>
export type TAddFriend = ReturnType<typeof addFriend>
export type TRemoveFriend = ReturnType<typeof removeFriend>