import {authAPI} from "../api/serverAPI";
import {getProfileTC} from "./profile-reducer";

const IS_AUTHORIZE = 'SocialNetwork/authReducer/IS_AUTHORIZE'
const INITIALIZE_IS_COMPLETED = 'SocialNetwork/authReducer/INITIALIZE_IS_COMPLETED'

const initialState = {
    isAuth: false,
    initialize: false,
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

        case INITIALIZE_IS_COMPLETED:
            return {
                ...state,
                initialize: true
            }

        default:
            return state
    }
}

//Action creators
export const isAuthorized = (data: any) => ({type: IS_AUTHORIZE, payload: {...data}})
const isInitialize = () => ({type: INITIALIZE_IS_COMPLETED})

//Thunks
export const isAuthorizedTC = () => async (dispatch: any) => {
    const response = await authAPI.isAuth()

    if (response.data.resultCode === 0) {
        dispatch(isAuthorized(response.data.data))
        dispatch(getProfileTC(response.data.data.id))
        dispatch(isInitialize())
    } else {
        console.error('Error 401: You are not authorized')
        dispatch(isInitialize())
    }
}

export default authReducer