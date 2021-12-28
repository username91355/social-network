import {IProfile, serverAPI} from "../../api/api";
import {ThunkType} from "../store";
import {Nullable} from "./app-reducer";

//constants
const SET_PROFILE = 'socialNetwork/profileReducer/SET_PROFILE'
const SET_STATUS = 'socialNetwork/profileReducer/SET_STATUS'
const SET_PROFILE_INIT_STATUS = 'socialNetwork/profileReducer/SET_PROFILE_INIT_STATUS'
const ADD_POST = 'socialNetwork/profileReducer/ADD_POST'
const REMOVE_POST = 'socialNetwork/profileReducer/REMOVE_POST'
const CHANGE_POST_TEXT = 'socialNetwork/profileReducer/CHANGE_POST_TEXT'

export enum ProfileStatus {
    IDLE,
    LOADING,
    SUCCESS,
    FAILED
}

//initialization state
const iState: IProfileReducerState = {
    profile: null,
    status: null,
    profileStatus: ProfileStatus.IDLE,
    posts: [
        {id: 1, text: "Hello React! It,s my first post!", likes: 20, comment: 5},
        {id: 2, text: "Second post! I`am find.", likes: 5, comment: 2},
        {id: 3, text: "How are your friends?", likes: 15, comment: 2},
    ],
    newPostText: '',
}

//reducer
export const profileReducer = (state: IProfileReducerState = iState, action: TProfileReducerActions) => {
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
        case SET_PROFILE_INIT_STATUS:
            return {
                ...state,
                profileStatus: action.profileStatus
            }
        case ADD_POST: {

            const allPostID = [...state.posts.map(p => p.id)]

            const generateID = (id: number): number => {
                return (allPostID.some(i => +i === +id))
                    ? generateID(id + 1)
                    : id
            }

            return {
                ...state,
                posts: [{
                    id: generateID(1),
                    text: state.newPostText,
                    likes: 0,
                    comment: 0
                }, ...state.posts],
                newPostText: ''
            }
        }
        case CHANGE_POST_TEXT:
            return {
                ...state,
                newPostText: action.value
            }
        case REMOVE_POST:
            return {
                ...state,
                posts: state.posts.filter(i => i.id !== action.id)
            }
        default:
            return state
    }
}

//action creators
const setProfile = (profile: IProfile) => ({type: SET_PROFILE, profile} as const)
const setStatus = (status: string) => ({type: SET_STATUS, status} as const)
const setProfileInitStatus = (profileStatus: ProfileStatus) => ({type: SET_PROFILE_INIT_STATUS, profileStatus} as const)
export const addPost = () => ({type: ADD_POST} as const)
export const removePost = (id: number) => ({type: REMOVE_POST, id} as const)
export const changeNewPostText = (value: string) => ({type: CHANGE_POST_TEXT, value} as const)

//thunks
export const profileInitialization = (userId: number): ThunkType => async dispatch => {
    dispatch(setProfileInitStatus(ProfileStatus.LOADING))
    const result = await serverAPI.getProfile(userId)

    if (result) {
        dispatch(setProfile(result))
        await dispatch(getStatus(result.userId))
        dispatch(setProfileInitStatus(ProfileStatus.SUCCESS))
    } else {
        dispatch(setProfileInitStatus(ProfileStatus.FAILED))
    }
}

export const getStatus = (userId: number): ThunkType => async dispatch => {
    const userStatus = await serverAPI.getProfileStatus(userId)

    dispatch(setStatus(userStatus))
}

export const changeStatus = (status: string): ThunkType => async dispatch => {
    const result = await serverAPI.setProfileStatus(status)

    if (result.resultCode === 0) {
        dispatch(setStatus(status))
    } else {
        dispatch(setProfileInitStatus(ProfileStatus.FAILED))
    }

}

//types
interface IProfileReducerState {
    profile: Nullable<IProfile>
    status: Nullable<string>
    profileStatus: ProfileStatus
    posts: IPost[]
    newPostText: string
}

interface IPost {
    id: number
    text: string
    likes: number
    comment: number
}

export type TProfileReducerActions =
    TSetProfile
    | TSetStatus
    | TSetProfileInitStatus
    | TAddPost
    | TRemovePost
    | TChangeNewPostText
export type TSetProfile = ReturnType<typeof setProfile>
type TSetStatus = ReturnType<typeof setStatus>
type TSetProfileInitStatus = ReturnType<typeof setProfileInitStatus>
type TAddPost = ReturnType<typeof addPost>
type TRemovePost = ReturnType<typeof removePost>
type TChangeNewPostText = ReturnType<typeof changeNewPostText>