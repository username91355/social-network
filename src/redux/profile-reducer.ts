import { AxiosResponse } from "axios";
import {profileAPI} from "../data/serverAPI";

const GET_PROFILE = 'GET_PROFILE'

type ProfileType = {
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
    },
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
    profile: ProfileType | null
    status: string | null
}

const initialState = {
    profile: null,
    status: null
}

const profileReducer = (state: initialStateType = initialState, action: any) => {
    switch (action.type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: action.profile
            }

        default:
            return state
    }
}

//Action creator
const getProfile = (profile: AxiosResponse<ProfileType>) => ({type: GET_PROFILE, profile} as const)

//Thunk
export const getProfileTC = (userID: number) => async (dispatch: any) => {
    console.log('request from PC')
    const response = await profileAPI.getProfile(userID)
    dispatch(getProfile(response.data))
}

export default profileReducer