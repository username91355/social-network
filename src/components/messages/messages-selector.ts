import {AppStateType} from "../../redux/store";

export const getMyPhoto = (state: AppStateType) => {
    if(state.profile.profile) {
        return state.profile.profile.photos.small
    } else {
        return ''
    }
}