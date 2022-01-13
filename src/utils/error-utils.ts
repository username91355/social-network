import {Dispatch} from "redux";
import {AppStatus, setAppError, setAppStatus} from "../state/reducers/app-reducer";
import {ProfileStatus, setProfileInitStatus} from "../state/reducers/profile-reducer";

export const throwNewError = (dispatch: Dispatch, message: string | undefined) => {
    dispatch(setAppStatus(AppStatus.FAILED))
    throw new Error(message || '')
}

export const throwNewProfileError = (dispatch: Dispatch, message: string | undefined) => {
    dispatch(setProfileInitStatus(ProfileStatus.FAILED))
    throw new Error(message || '')
}

export const handlingError = (dispatch: Dispatch, err: Error | unknown) => {
    if (err instanceof Error) {
        dispatch(setAppError(err.message))
    } else {
        dispatch(setAppError('An error has occurred'))
        console.error(`An error has occurred. Contact the administrator. Error data: ${err}`)
    }
}