import {IMe, serverAPI} from "../../api/api";
import {ThunkType} from "../redux";

//Action types
const SET_INIT_TRUE = 'socialNetwork/authReducer/SET_INIT_TRUE'
const SET_INIT_FALSE = 'socialNetwork/authReducer/SET_INIT_FALSE'
const SET_USER_DATA = 'socialNetwork/authReducer/SET_USER_DATA'
const REMOVE_USER_DATA = 'socialNetwork/authReducer/REMOVE_USER_DATA'

//State
const initialState = {
    init: false,
    isAuth: false,
    id: null,
    login: null,
    email: null,
}

//Reducer
export const authReducer = (state: IAuthState = initialState, action: TAuthActions) => {
    switch (action.type) {
        case SET_INIT_TRUE:
            return {
                ...state,
                init: true
            }
        case SET_INIT_FALSE:
            return {
                ...state,
                init: false
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
        default:
            return state
    }
}

//Types
interface IAuthState {
    init: boolean,
    isAuth: boolean,
    id: number | null,
    login: string | null,
    email: string | null,
}

type TAuthActions = TSetInitTrue | TSetInitFalse | TSetUserData | TRemoveUserData
type TSetInitTrue= ReturnType<typeof setInitTrue>
type TSetInitFalse = ReturnType<typeof setInitFalse>
type TSetUserData = ReturnType<typeof setUserData>
type TRemoveUserData = ReturnType<typeof removeUserData>

//Action creators
const setInitTrue = () => ({type: SET_INIT_TRUE} as const)
const setInitFalse = () => ({type: SET_INIT_FALSE} as const)
const setUserData = (payload: IMe) => ({type: SET_USER_DATA, payload} as const)
const removeUserData = () => ({type: REMOVE_USER_DATA} as const)

//Thunks
export const appInitialization = (): ThunkType => async dispatch => {
    dispatch(setInitFalse())
    const result = await serverAPI.me()

    if (result.resultCode === 0) {
        dispatch(setUserData(result.data))
    }
    dispatch(setInitTrue())
}

export const login = (email: string, password: string, rememberMe: boolean): ThunkType => async dispatch => {
    dispatch(setInitFalse())
    const result = await serverAPI.login(email, password, rememberMe, false)

    if (result.resultCode === 0) {
        dispatch(appInitialization())
    }
}

export const logout = (): ThunkType => async dispatch => {
    const result = await serverAPI.logout()

    if (result.resultCode === 0) {
        dispatch(removeUserData())
    }
}

