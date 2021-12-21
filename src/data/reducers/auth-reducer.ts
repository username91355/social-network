import {IMe, serverAPI} from "../../api/api";
import {ThunkType} from "../redux";

//Action types
const SUCCESS_AUTH = 'socialNetwork/authReducer/SUCCESS_AUTH'
const FAILED_AUTH = 'socialNetwork/authReducer/FAILED_AUTH'

//State
const initialState = {
    isAuth: false,
    id: null,
    login: null,
    email: null,
}

//Reducer
export const authReducer = (state: IAuthState = initialState, action: TAuthActions) => {
    switch (action.type) {
        case SUCCESS_AUTH:
            return {
                ...state,
                isAuth: true,
                ...action.payload
            }
        case FAILED_AUTH:
            return {
                ...state,
                isAuth: false,
                id: null,
                login: null,
                email: null,
            }
        default:
            return state
    }
}

//Types
interface IAuthState {
    isAuth: boolean,
    id: number | null,
    login: string | null,
    email: string | null,
}

type TAuthActions = TSuccessAuth | TFailedAuth
type TSuccessAuth = ReturnType<typeof successAuth>
type TFailedAuth = ReturnType<typeof failedAuth>

//Action creators
const successAuth = (payload: IMe) => ({type: SUCCESS_AUTH, payload} as const)
const failedAuth = () => ({type: FAILED_AUTH} as const)

//Thunks
export const setAuth = (): ThunkType => async dispatch => {
    const result = await serverAPI.me()

    if (result.resultCode === 0) {
        dispatch(successAuth(result.data))
    } else {
        dispatch(failedAuth())
    }
}

export const login = (email: string, password: string, rememberMe: boolean): ThunkType => async dispatch => {
    const result = await serverAPI.login(email, password, rememberMe, false)

    if (result.resultCode === 0) {
        dispatch(setAuth())
    } else {
        dispatch(failedAuth())
    }
}

export const logout = (): ThunkType => async dispatch => {
    const result = await serverAPI.logout()

    if (result.resultCode === 0) {
        dispatch(failedAuth())
    }
}

