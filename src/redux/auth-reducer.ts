import {authAPI} from "../data/serverAPI";
import {getProfileTC} from "./profile-reducer";

const IS_AUTHORIZE = 'SocialNetwork/authReducer/IS_AUTHORIZE'

const initialState = {
    isAuth: false,
    id: null,
    email: null,
    login: null,
}

const authReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case IS_AUTHORIZE:
            return {
                ...state,
                ...action.payload,
                isAuth: true
            }

        default:
            return state
    }
}

//Action creators
export const isAuthorized = (data: any) => ({type: IS_AUTHORIZE, payload: {...data}})

//Thunks
export const isAuthorizedTC = () => async (dispatch: any) => {
    const response = await authAPI.isAuth()

    if (response.data.resultCode === 0) {
        dispatch(isAuthorized(response.data.data))
        dispatch(getProfileTC(response.data.data.id))
    } else {
        console.error('You are not authorized')
    }
}


export default authReducer