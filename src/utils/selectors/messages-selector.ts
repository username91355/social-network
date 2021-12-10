import {AppStateType} from "../../redux/store";

export const getMyPhoto = (state: AppStateType) => {
    if(state.profile.profile) {
        return state.profile.profile.photos.small
    } else {
        return ''
    }
}

export const getMyName = (state: AppStateType) => {
    if(state.profile.profile) {
        return state.profile.profile.fullName
    } else {
        return ''
    }
}