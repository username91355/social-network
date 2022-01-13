import {IImages, IProfile, serverAPI} from "../../api/api";
import {ThunkType} from "../store";
import {Nullable, setAppError} from "./app-reducer";
import {handlingError, throwNewProfileError} from "../../utils/error-utils";

//constants
const SET_PROFILE = 'socialNetwork/profileReducer/SET_PROFILE'
const SET_STATUS = 'socialNetwork/profileReducer/SET_STATUS'
const SET_PROFILE_INIT_STATUS = 'socialNetwork/profileReducer/SET_PROFILE_INIT_STATUS'
const ADD_POST = 'socialNetwork/profileReducer/ADD_POST'
const SET_CURRENT_PROFILE_FRIEND_STATUS = 'socialNetwork/profileReducer/SET_CURRENT_PROFILE_FRIEND_STATUS'
const REMOVE_POST = 'socialNetwork/profileReducer/REMOVE_POST'
const CHANGE_POST_TEXT = 'socialNetwork/profileReducer/CHANGE_POST_TEXT'
const CHANGE_PROFILE_AVATAR = 'socialNetwork/profileReducer/CHANGE_PROFILE_AVATAR'

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
    currentProfileIsFriend: false,
    posts: [
        {id: 3, text: "How are your friends?", likes: 15, comment: 2},
        {id: 2, text: "Second post! I`am find.", likes: 5, comment: 2},
        {id: 1, text: "Hello React! It,s my first post!", likes: 20, comment: 5},
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
        case SET_CURRENT_PROFILE_FRIEND_STATUS:
            return {
                ...state,
                currentProfileIsFriend: action.isFriend
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
        case CHANGE_PROFILE_AVATAR:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.data
                }
            }
        default:
            return state
    }
}

//action creators
export const setProfile = (profile: IProfile) => ({
    type: SET_PROFILE, profile
} as const)

export const setStatus = (status: string) => ({
    type: SET_STATUS, status
} as const)

export const setProfileInitStatus = (profileStatus: ProfileStatus) => ({
    type: SET_PROFILE_INIT_STATUS,
    profileStatus
} as const)

export const setCurrentProfileFriendStatus = (isFriend: boolean) => ({
    type: SET_CURRENT_PROFILE_FRIEND_STATUS,
    isFriend
} as const)

export const addPost = () => ({
    type: ADD_POST
} as const)

export const removePost = (id: number) => ({
    type: REMOVE_POST,
    id
} as const)

export const changeNewPostText = (value: string) => ({
    type: CHANGE_POST_TEXT,
    value
} as const)

export const changeUserProfileAvatar = (data: IImages) => ({
    type: CHANGE_PROFILE_AVATAR,
    data
} as const)

//thunks
export const profileInitialization = (userId: number): ThunkType => async dispatch => {
    try {
        dispatch(setAppError(null))
        dispatch(setProfileInitStatus(ProfileStatus.LOADING))

        const response = await serverAPI.getProfile(userId)

        if (response) {
            dispatch(setProfile(response))
            await dispatch(getStatus(response.userId))
            await dispatch(getUserFriendStatus(response.userId))
            dispatch(setProfileInitStatus(ProfileStatus.SUCCESS))
        } else {
            throwNewProfileError(dispatch, 'Error in profile initialization. Contact the administrator.')
        }
    } catch (err) {
        handlingError(dispatch, err)
    }
}

export const getStatus = (userId: number): ThunkType => async dispatch => {
    try {
        dispatch(setAppError(null))

        const userStatus = await serverAPI.getProfileStatus(userId)

        dispatch(setStatus(userStatus))

    } catch (err) {
        handlingError(dispatch, err)
    }

}

export const getUserFriendStatus = (userId: number): ThunkType => async dispatch => {
    try {
        dispatch(setAppError(null))

        const response = await serverAPI.userIsFollowed(userId)

        dispatch(setCurrentProfileFriendStatus(response))

    } catch (err) {
        handlingError(dispatch, err)
    }
}

export const changeStatus = (status: string): ThunkType => async dispatch => {
    try {
        dispatch(setAppError(null))

        const response = await serverAPI.setProfileStatus(status)

        if (response.resultCode === 0) {
            dispatch(setStatus(status))
        } else {
            throwNewProfileError(dispatch, response.messages[0])
        }
    } catch (err) {
        handlingError(dispatch, err)
    }
}
export const changeProfileInfo = (data: IProfile): ThunkType => async dispatch => {
    try {
        dispatch(setAppError(null))

        const response = await serverAPI.setProfileData(data)

        if (response.resultCode === 0) {
            dispatch(setProfile(data))
        } else {
            throwNewProfileError(dispatch, response.messages[0])
        }
    } catch (err) {
        handlingError(dispatch, err)
    }
}

export const changeProfileAvatar = (file: File, id: number): ThunkType => async dispatch => {
    try {
        dispatch(setAppError(null))

        const response = await serverAPI.setProfilePhoto(file)

        if (response.resultCode === 0) {
            dispatch(changeUserProfileAvatar(response.data))
            dispatch(profileInitialization(id))
        } else {
            throwNewProfileError(dispatch, response.messages[0])
        }
    } catch (err) {
        handlingError(dispatch, err)
    }
}

//types
interface IProfileReducerState {
    profile: Nullable<IProfile>
    status: Nullable<string>
    profileStatus: ProfileStatus
    currentProfileIsFriend: boolean
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
    | TSetCurrentProfileFriendStatus
    | TAddPost
    | TRemovePost
    | TChangeNewPostText
    | TChangeUserProfileAvatar
export type TSetProfile = ReturnType<typeof setProfile>
type TSetStatus = ReturnType<typeof setStatus>
type TSetProfileInitStatus = ReturnType<typeof setProfileInitStatus>
type TSetCurrentProfileFriendStatus = ReturnType<typeof setCurrentProfileFriendStatus>
type TAddPost = ReturnType<typeof addPost>
type TRemovePost = ReturnType<typeof removePost>
type TChangeNewPostText = ReturnType<typeof changeNewPostText>
type TChangeUserProfileAvatar = ReturnType<typeof changeUserProfileAvatar>