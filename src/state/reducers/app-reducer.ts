import {IMe, serverAPI} from "../../api/api";
import {ThunkType} from "../store";
import {profileInitialization} from "./profile-reducer";
import {handlingError, throwNewError} from "../../utils/error-utils";

//constants
const SET_USER_DATA = 'socialNetwork/appReducer/SET_USER_DATA'
const REMOVE_USER_DATA = 'socialNetwork/appReducer/REMOVE_USER_DATA'
const SET_APP_ERROR = 'socialNetwork/appReducer/SET_APP_ERROR'
const SET_APP_STATUS = 'socialNetwork/appReducer/SET_APP_STATUS'
const SET_CAPTCHA_URL = 'socialNetwork/appReducer/SET_CAPTCHA_URL'

export enum AppStatus {
    IDLE,
    LOADING,
    SUCCESS,
    FAILED
}

//initialization state
const iState = {
    appStatus: AppStatus.IDLE as AppStatus,
    isAuth: false as boolean,
    id: null as Nullable<number>,
    email: null as Nullable<string>,
    login: null as Nullable<string>,
    error: null as Nullable<string>,
    captchaUrl: null as Nullable<string>
}

//reducer
export const appReducer = (state: TAppReducerState = iState, action: TAppReducerActions) => {
    switch (action.type) {
        case SET_APP_STATUS:
            return {
                ...state,
                appStatus: action.status
            }
        case SET_USER_DATA:
            return {
                ...state,
                isAuth: true,
                ...action.payload
            }
        case REMOVE_USER_DATA: {
            return {
                ...state,
                isAuth: false,
                id: null,
                login: null,
                email: null,
            }
        }
        case SET_APP_ERROR:
            return {
                ...state,
                error: action.error
            }
        case SET_CAPTCHA_URL:
            return {
                ...state,
                captchaUrl: action.url
            }
        default:
            return state
    }
}

//action creators
export const setUserData = (payload: IMe) => ({type: SET_USER_DATA, payload} as const)
export const removeUserData = () => ({type: REMOVE_USER_DATA} as const)
export const setAppError = (error: string | null) => ({type: SET_APP_ERROR, error} as const)
export const setAppStatus = (status: AppStatus) => ({type: SET_APP_STATUS, status} as const)
export const setCaptchaUrl = (url: string | null) => ({type: SET_CAPTCHA_URL, url} as const)

//thunks
export const appInitialization = (): ThunkType => async dispatch => {
    try {
        dispatch(setAppError(null))
        dispatch(setAppStatus(AppStatus.LOADING))

        const result = await serverAPI.me()

        if (result.resultCode === 0) {
            await dispatch(profileInitialization(result.data.id))
            dispatch(setUserData(result.data))
            dispatch(setAppStatus(AppStatus.SUCCESS))
        } else {
            handlingError(dispatch, result.messages[0])
        }
    } catch (err) {
        handlingError(dispatch, err)
    }
}

export const login = (email: string,
                      password: string,
                      rememberMe: boolean,
                      captcha: string | null): ThunkType => async dispatch => {
    try {
        dispatch(setAppError(null))
        dispatch(setAppStatus(AppStatus.LOADING))

        const result = await serverAPI.login(email, password, rememberMe, captcha)

        if (result.resultCode === 0) {
            dispatch(appInitialization())
        } else {
            if (result.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }
            throwNewError(dispatch, result.messages[0])
        }
    } catch (err) {
        handlingError(dispatch, err)
    }
}

export const logout = (): ThunkType => async dispatch => {
    try {
        dispatch(setAppError(null))

        const result = await serverAPI.logout()

        if (result.resultCode === 0) {
            dispatch(removeUserData())
            dispatch(setCaptchaUrl(null))
            dispatch(setAppStatus(AppStatus.SUCCESS))
        } else {
            throwNewError(dispatch, result.messages[0])
        }
    } catch (err) {
        handlingError(dispatch, err)
    }
}

export const getCaptchaUrl = (): ThunkType => async dispatch => {
    try {
        dispatch(setAppError(null))
        const result = await serverAPI.getCaptcha()

        if (result) {
            dispatch(setCaptchaUrl(result.url))
        } else {
            throwNewError(dispatch, 'Captcha not received')
        }
    } catch (err) {
        handlingError(dispatch, err)
    }
}

//types
export type Nullable<T> = T | null
type TAppReducerState = typeof iState

export type TAppReducerActions =
    | TSetUserData
    | TRemoveUserData
    | TSetAppError
    | TSetAppStatus
    | TSetCaptchaUrl
type TSetUserData = ReturnType<typeof setUserData>
type TRemoveUserData = ReturnType<typeof removeUserData>
type TSetAppError = ReturnType<typeof setAppError>
type TSetAppStatus = ReturnType<typeof setAppStatus>
type TSetCaptchaUrl = ReturnType<typeof setCaptchaUrl>