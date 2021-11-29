import {AxiosResponse} from "axios";
import {profileAPI} from "../data/serverAPI";

//Action types
const SET_PROFILE = 'SET_PROFILE'
const GET_STATUS = 'GET_STATUS'

//State
const initialState = {
    profile: null,
    status: '',

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
        {id: 1, message: 'Hi!'},
        {id: 2, message: 'Hello!'},
        {id: 3, message: 'How are you?'},
        {id: 4, message: 'I`m fine. How ary you?'},
        {id: 5, message: 'I am OK.'},
        {id: 6, message: 'OK. Maybe go to the walk?'},
    ]
}

//Reducer
const profileReducer = (state: initialStateType = initialState, action: any) => {
    switch (action.type) {
        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile
            }

        case GET_STATUS:
            return {
                ...state,
                status: action.status
            }

        // case ADD_MESSAGE: {
        //     const allMessageID = [...state.messages.map(p => p.id)]
        //     let newID = 1
        //
        //     const generateID = (id: number) => {
        //         return (allMessageID.some(i => +i === +id))
        //             ? generateID(id + 1)
        //             : id
        //     }
        //     return {
        //         ...state,
        //         messagesData: [...state.messages, {
        //             id: generateID(newID),
        //             message: action.textMessage,
        //         }]
        //     }
        // }

        default:
            return state
    }
}

//Action creator
const setProfile = (profile: AxiosResponse<TProfile>) => ({type: SET_PROFILE, profile} as const)
const getStatus = (status: AxiosResponse<string>) => ({type: GET_STATUS, status} as const)

//Thunk
export const getProfileTC = (userID: number) => async (dispatch: any) => {
    console.log('request Profile')

    const response = await profileAPI.getProfile(userID)
    dispatch(setProfile(response.data))
}

export const getStatusTC = (userID: number) => async (dispatch: any) => {
    console.log('request Status')

    const response = await profileAPI.getStatus(userID)
    dispatch(getStatus(response.data))
}

//TYPSCRIPT
export type TProfile = {
    aboutMe: string | null
    contacts: {
        facebook: string | null
        website: string | null
        vk: string | null
        twitter: string | null
        instagram: string | null
        youtube: string | null
        github: string | null
        mainLink: string | null
    }
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
    status: string
    posts: Array<TPost>
    dialogs: Array<TDialog>
    messages: Array<TMessage>
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
}

export type TDialog = {
    id: number
    name: string
}

export default profileReducer