import {IUser, serverAPI} from "../../api/api";
import {ThunkType} from "../store";

//constants
const SET_USERS = 'SET_USERS'
const SET_SUBSCRIPTION_STATUS = 'SET_SUBSCRIPTION_STATUS'
const REMOVE_SUBSCRIPTION_STATUS = 'REMOVE_SUBSCRIPTION_STATUS'
const ADD_TO_FRIENDS = 'ADD_TO_FRIENDS'
const REMOVE_FROM_FRIENDS = 'REMOVE_FROM_FRIENDS'

//initialization state
const iState = {
    count: 1,
    page: 10,
    term: '',
    friend: null,
    totalCount: null,
    users: [],
    subscriptionProcess: [],
}

//reducer
export const usersReducer = (state: IUsersState = iState, action: TUsersActions) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users
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
const setUsers = (users: IUser[]) => ({type: SET_USERS, users} as const)
const setSubscriptonStatus = (userId: number) => ({type: SET_SUBSCRIPTION_STATUS, userId} as const)
const removeSubscriptonStatus = (userId: number) => ({type: REMOVE_SUBSCRIPTION_STATUS, userId} as const)
const addFriend = (userId: number) => ({type: ADD_TO_FRIENDS, userId} as const)
const removeFriend = (userId: number) => ({type: REMOVE_FROM_FRIENDS, userId} as const)

//thunks
export const getUsers = (count: number, page: number, term: string, friend: boolean | null): ThunkType => async dispatch => {
    const result = await serverAPI.getUsers(count, page, term, friend)

    if (!result.error) {
        dispatch(setUsers(result.items))
    }
}

export const subscribeToUser = (userId: number): ThunkType => async dispatch => {
    dispatch(setSubscriptonStatus(userId))
    const result = await serverAPI.subscribeToUser(userId)

    if (result.resultCode === 0) {
        dispatch(addFriend(userId))
        dispatch(removeSubscriptonStatus(userId))
    }
}

export const unsubscribeFromUser = (userId: number): ThunkType => async dispatch => {
    dispatch(setSubscriptonStatus(userId))
    const result = await serverAPI.unsubscribeFromUser(userId)

    if (result.resultCode === 0) {
        dispatch(removeFriend(userId))
        dispatch(removeSubscriptonStatus(userId))
    }
}

//types
interface IUsersState {
    count: number,
    page: number,
    term: string,
    friend: boolean | null,
    totalCount: number | null,
    users: IUser[],
    subscriptionProcess: number[],
}

export type TUsersActions =
    | TSetUsers
    | TSetSubscriptonStatus
    | TAddFriend
    | TRemoveSubscriptonStatus
    | TRemoveFriend
type TSetUsers = ReturnType<typeof setUsers>
type TSetSubscriptonStatus = ReturnType<typeof setSubscriptonStatus>
type TRemoveSubscriptonStatus = ReturnType<typeof removeSubscriptonStatus>
type TAddFriend = ReturnType<typeof addFriend>
type TRemoveFriend = ReturnType<typeof removeFriend>