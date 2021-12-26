import {IMe, serverAPI} from "../../api/api";
import {ThunkType} from "../store";
import {getStatus, profileInitialization, TSetProfile} from "./profile-reducer";

//constants
const SET_USER_DATA = 'SET_USER_DATA'
const REMOVE_USER_DATA = 'REMOVE_USER_DATA'
const SET_APP_ERROR = 'socialNetwork/appReducer/SET_APP_ERROR'
const SET_APP_STATUS = 'SET_APP_STATUS'
export enum AppStatus {
    IDLE,
    LOADING,
    SUCCESS,
    FAILED
}

//initialization state
const iState: IAppReducerState = {
    appStatus: AppStatus.IDLE,
    isAuth: false,
    id: null,
    email: null,
    login: null,
    error: null,
}

//reducer
export const appReducer = (state: IAppReducerState = iState, action: TAppReducerActions) => {
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
        default:
            return state
    }
}

//action creators
const setUserData = (payload: IMe) => ({type: SET_USER_DATA, payload} as const)
const removeUserData = () => ({type: REMOVE_USER_DATA} as const)
const setAppError = (error: string) => ({type: SET_APP_ERROR, error} as const)
const setAppStatus = (status: AppStatus) => ({type: SET_APP_STATUS, status} as const)

//thunks
export const appInitialization = (): ThunkType => async dispatch => {
    dispatch(setAppStatus(AppStatus.LOADING))
    const result = await serverAPI.me()

    if(result.resultCode === 0) {
        await dispatch(profileInitialization(result.data.id))
        dispatch(setUserData(result.data))
        dispatch(setAppStatus(AppStatus.SUCCESS))
    } else {
        dispatch(setAppError(result.messages[0]))
        dispatch(setAppStatus(AppStatus.FAILED))
    }
}
export const login = (email: string,password: string,rememberMe: boolean,captcha: boolean): ThunkType => async dispatch => {
    dispatch(setAppStatus(AppStatus.LOADING))
    const result = await serverAPI.login(email,password,rememberMe,captcha)

    if(result.resultCode === 0) {
        dispatch(appInitialization())
    } else {
        dispatch(setAppError(result.messages[0]))
        dispatch(setAppStatus(AppStatus.FAILED))
    }
}
export const logout = (): ThunkType => async dispatch => {
    const result = await serverAPI.logout()

    if(result.resultCode === 0) {
        dispatch(removeUserData())
        dispatch(setAppStatus(AppStatus.SUCCESS))
    } else {
        dispatch(setAppError(result.messages[0]))
        dispatch(setAppStatus(AppStatus.FAILED))
    }
}

//types
interface IAppReducerState {
    appStatus: AppStatus
    isAuth: boolean,
    id: number | null,
    email: string | null,
    login: string | null,
    error: string | null,
}

export type TAppReducerActions = TSetUserData | TRemoveUserData | TSetAppError | TSetAppStatus
type TSetUserData = ReturnType<typeof setUserData>
type TRemoveUserData = ReturnType<typeof removeUserData>
type TSetAppError = ReturnType<typeof setAppError>
type TSetAppStatus = ReturnType<typeof setAppStatus>