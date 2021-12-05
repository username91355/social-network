import {AxiosResponse} from "axios";
import {profileAPI} from "../data/serverAPI";

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

    dialogs: [
        {id: 1, name: 'Alexandr'},
        {id: 2, name: 'Anvar'},
        {id: 3, name: 'Anna'},
        {id: 4, name: 'Igor'},
        {id: 5, name: 'Lena'},
    ],

    messages: [
        {id: 1, message: 'Hi!', outgoing: false},
        {id: 2, message: 'Hello!', outgoing: true},
        {id: 3, message: 'How are you?', outgoing: false},
        {id: 4, message: 'I`m fine. How ary you?', outgoing: true},
        {id: 5, message: 'I am OK.', outgoing: true},
        {id: 6, message: 'OK. Maybe go to the walk?', outgoing: false},
    ],

    newMessageText: ''
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

        case CHANGE_NEW_MESSAGE_AREA:
            return {
                ...state,
                newMessageText: action.value
            }

        case SEND_MESSAGE:
            const allMessageID = [...state.messages.map(p => p.id)]

            const generateID = (id: number): number => {
                return (allMessageID.some(i => +i === +id))
                    ? generateID(id + 1)
                    : id
            }

            return {
                ...state,
                messages: [...state.messages, {
                    id: generateID(Math.max(...allMessageID)),
                    message: state.newMessageText,
                    outgoing: true
                }],
                newMessageText: ''
            }

        default:
            return state
    }
}

//Action creator
export const setProfile = (profile: AxiosResponse<TProfile>) => ({type: SET_PROFILE, profile} as const)
export const setStatus = (status: string) => ({type: SET_STATUS, status} as const)
export const changeNewMessageArea = (value: string) => ({type: CHANGE_NEW_MESSAGE_AREA, value} as const)
export const sendMessage = () => ({type: SEND_MESSAGE} as const)

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
    dialogs: Array<TDialog>
    messages: Array<TMessage>
    newMessageText: string
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

export type TMessage = {
    id: number
    message: string
    outgoing: boolean
}

export type TDialog = {
    id: number
    name: string
}

export default profileReducer