import {AxiosResponse} from "axios";
import {profileAPI} from "../api/serverAPI";

//Action types
export const SET_PROFILE = 'SET_PROFILE'
export const SET_STATUS = 'SET_STATUS'
export const CHANGE_NEW_MESSAGE_AREA = 'CHANGE_NEW_MESSAGE_AREA'
export const SEND_MESSAGE = 'SEND_MESSAGE'

//State
export const initialState = {
    profile: null,
    status: null,

    posts: [
        {id: 1, text: "Hello React! It,s my first post!", likes: 20, comment: 5},
        {id: 2, text: "Second post! I`am find.", likes: 5, comment: 2},
        {id: 3, text: "How are your friends?", likes: 15, comment: 2},
    ],
}

//Reducer
export const profileReducer = (state: initialStateType = initialState, action: any) => {
    switch (action.type) {
        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile
            }

        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }

        default:
            return state
    }
}

//Action creator
export const setProfile = (profile: AxiosResponse<TProfile>) => ({type: SET_PROFILE, profile} as const)
export const setStatus = (status: string) => ({type: SET_STATUS, status} as const)

//Thunk
export const getProfileTC = (userID: number) => async (dispatch: any) => {
    const response = await profileAPI.getProfile(userID)
    dispatch(setProfile(response.data))
}

export const getStatusTC = (userID: number) => async (dispatch: any) => {
    const response = await profileAPI.getStatus(userID)
    dispatch(setStatus(response.data))
}

export const setStatusTC = (status: string) => async (dispatch: any) => {
    const response = await profileAPI.setStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

//TYPSCRIPT
export type TProfile = {
    aboutMe: string | null
    contacts: TContacts
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string
    userId: number
    photos: {
        small: string | null
        large: string | null
    }
}

type initialStateType = {
    profile: TProfile | null
    status: string | null
    posts: Array<TPost>
}

export type TContacts = {
    [key: string]: string | null
}

type TPost = {
    id: number
    text: string
    likes: number
    comment: number
}

export default profileReducer