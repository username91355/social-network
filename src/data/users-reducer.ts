import {usersAPI} from "../api/serverAPI"

//Action types(constants)
const SET_USERS = 'SocialNetwork/usersReducer/SET_USER'
const SET_INIT_STATUS = 'SocialNetwork/usersReducer/SET_INIT_STATUS'
const SUBSCRIBE_TO_USER = 'SocialNetwork/usersReducer/SUBSCRIBE_TO_USER'
const UNSUBSCRIBE_TO_USER = 'SocialNetwork/usersReducer/UNSUBSCRIBE_TO_USER '
const SET_WAIT_TO_SUBSCRIBING = 'SocialNetwork/usersReducer/SET_WAIT_TO_SUBSCRIBING'
const REMOVE_WAIT_TO_SUBSCRIBING = 'SocialNetwork/usersReducer/REMOVE_WAIT_TO_SUBSCRIBING'
const CHANGE_SEARCH_AREA = 'SocialNetwork/usersReducer/CHANGE_SEARCH_AREA'
const CHANGE_SHOWING_USERS = 'SocialNetwork/usersReducer/CHANGE_SHOWING_USERS'

//Initial state
export const initializationStatus: InitializationStatusType = {
    NOT_INITIALIZED: 'NOT_INITIALIZED',
    IN_PROGRESS: 'IN_PROGRESS',
    SUCCESS: 'SUCCESS'
}
const initialState: UsersStateType = {
    count: 10,
    page: 1,
    term: '',
    friend: null,
    userInitialization: initializationStatus.NOT_INITIALIZED,
    users: [],
    followingInProgress: []
}

//Types
export type UsersStateType = {
    count: number,
    page: number,
    term: string,
    friend: boolean | null,
    userInitialization: string
    users: Array<UserType>
    followingInProgress: Array<number>
}

export type UserType = {
    id: number,
    name: string,
    status: string,
    photos: {
        small: string | null
        large: string | null
    }
    followed: boolean
}

type InitializationStatusType = {
    NOT_INITIALIZED: string
    IN_PROGRESS: string
    SUCCESS: string
}

export type ActionType =
    SetUsersType
    | SetInitStatusType
    | SubscribeToUserType
    | UnsubscribeFromUserType
    | SetWaitToSubscribingType
    | RemoveWaitToSubscribingType
    | ChangeSearchAreaType
    | ChangeShowingUsersType
type SetUsersType = ReturnType<typeof setUsers>
type SetInitStatusType = ReturnType<typeof setInitStatus>
type SubscribeToUserType = ReturnType<typeof subscribeToUser>
type UnsubscribeFromUserType = ReturnType<typeof unsubscribeFromUser>
type SetWaitToSubscribingType = ReturnType<typeof setWaitToSubscribing>
type RemoveWaitToSubscribingType = ReturnType<typeof removeWaitToSubscribing>
type ChangeSearchAreaType = ReturnType<typeof changeSearchArea>
type ChangeShowingUsersType = ReturnType<typeof changeShowingUsers>

//Reducer
export const usersReducer = (state: UsersStateType = initialState, action: ActionType) => {
    switch (action.type) {

        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }

        case SET_INIT_STATUS: {
            return {
                ...state,
                userInitialization: action.status
            }
        }

        case SUBSCRIBE_TO_USER: {
            return {
                ...state,
                users: state.users.map((u: any) => (u.id === action.id) ? {...u, followed: true} : u)
            }
        }

        case UNSUBSCRIBE_TO_USER: {
            return {
                ...state,
                users: state.users.map((u: any) => (u.id === action.id) ? {...u, followed: false} : u)
            }
        }

        case SET_WAIT_TO_SUBSCRIBING: {
            return {
                ...state,
                followingInProgress: [...state.followingInProgress, action.id]
            }
        }

        case REMOVE_WAIT_TO_SUBSCRIBING: {
            return {
                ...state,
                followingInProgress: state.followingInProgress.filter((i: any) => i !== action.id)
            }
        }

        case CHANGE_SEARCH_AREA: {
            return {
                ...state,
                term: action.text
            }
        }

        case CHANGE_SHOWING_USERS: {
            return {
                ...state,
                friend: action.friend
            }
        }

        default:
            return state
    }
}

//Action creators
export const setUsers = (users: any) => ({type: SET_USERS, users} as const)
export const setInitStatus = (status: any) => ({type: SET_INIT_STATUS, status} as const)
export const subscribeToUser = (id: number) => ({type: SUBSCRIBE_TO_USER, id} as const)
export const unsubscribeFromUser = (id: number) => ({type: UNSUBSCRIBE_TO_USER, id} as const)
export const setWaitToSubscribing = (id: number) => ({type: SET_WAIT_TO_SUBSCRIBING, id} as const)
export const removeWaitToSubscribing = (id: number) => ({type: REMOVE_WAIT_TO_SUBSCRIBING, id} as const)
export const changeSearchArea = (text: string) => ({type: CHANGE_SEARCH_AREA, text} as const)
export const changeShowingUsers = (friend: boolean | null) => ({type: CHANGE_SHOWING_USERS, friend} as const)

//Thunks
export const getUsersThunkCreator = (count: number, page: number, term: string, friend: boolean | null) =>
    async (dispatch: any) => {
        dispatch(setInitStatus(initializationStatus.IN_PROGRESS))
        const users = await usersAPI.getUsers(count, page, term, friend)

        if (users) {
            dispatch(setUsers(users.data.items))
            dispatch(changeSearchArea(''))
            dispatch(setInitStatus(initializationStatus.SUCCESS))
        }
    }

export const setFollowedStatusThunkCreator = (id: number) => async (dispatch: any) => {
    dispatch(setWaitToSubscribing(id))
    const response = await usersAPI.follow(id)

    if (response.data.resultCode === 0) {
        dispatch(subscribeToUser(id))
        dispatch(removeWaitToSubscribing(id))
    }
}

export const setUnfollowedStatusThunkCreator = (id: number) => async (dispatch: any) => {
    dispatch(setWaitToSubscribing(id))
    const response = await usersAPI.unfollow(id)

    if (response.data.resultCode === 0) {
        dispatch(unsubscribeFromUser(id))
        dispatch(removeWaitToSubscribing(id))
    }
}