import {IProfile, serverAPI} from "../../api/api";
import {ThunkType} from "../store";

//constants
const SET_PROFILE = 'SET_PROFILE'
const SET_STATUS = 'SET_STATUS'
const SET_PROFILE_INIT_STATUS = 'SET_PROFILE_INIT_STATUS'
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
    profileStatus: ProfileStatus.IDLE
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
        default:
            return state
    }
}

//action creators
const setProfile = (profile: IProfile) => ({type: SET_PROFILE, profile} as const)
const setStatus = (status: string) => ({type: SET_STATUS, status} as const)
const setProfileInitStatus = (profileStatus: ProfileStatus) => ({type: SET_PROFILE_INIT_STATUS, profileStatus} as const)

//thunks
export const profileInitialization = (userId: number): ThunkType => async dispatch => {
    dispatch(setProfileInitStatus(ProfileStatus.LOADING))
    const result = await serverAPI.getProfile(userId)

    if(result) {
        dispatch(setProfile(result))
        dispatch(setProfileInitStatus(ProfileStatus.SUCCESS))
    } else {
        dispatch(setProfileInitStatus(ProfileStatus.FAILED))
    }
}

//types
interface IProfileReducerState {
    profile: IProfile | null
    status: string | null
    profileStatus: ProfileStatus
}

export type TProfileReducerActions = TSetProfile | TSetStatus | TSetProfileInitStatus
export type TSetProfile = ReturnType<typeof setProfile>
type TSetStatus = ReturnType<typeof setStatus>
type TSetProfileInitStatus = ReturnType<typeof setProfileInitStatus>