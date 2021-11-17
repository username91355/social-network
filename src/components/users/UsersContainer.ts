import {connect} from "react-redux";
import Users from "./Users";
import {
    changeSearchArea, changeShowingUsers,
    getUsersThunkCreator,
    setFollowedStatusThunkCreator,
    setUnfollowedStatusThunkCreator
} from "../../redux/users-reducer";

const MapStateToProps = (store: any) => {
    return {
        count: store.users.count,
        page: store.users.page,
        term: store.users.term,
        friend: store.users.friend,
        usersInit: store.users.userInitialization,
        users: store.users.users
    }
}

const MapDispatchToProps = (dispatch: any) => {
    return {
        getUsers: (count: number, page: number, term: string, friend: boolean) => {
            dispatch(getUsersThunkCreator(count, page, term, friend))
        },

        followOnUser: (id: number) => {
            dispatch(setFollowedStatusThunkCreator(id))
        },

        unfollowFromUser: (id: number) => {
            dispatch(setUnfollowedStatusThunkCreator(id))
        },

        changeSearchArea: (text: string) => {
            dispatch(changeSearchArea(text))
        },

        showAllUsers: () => {
            dispatch(changeShowingUsers(null))
        },

        showSubscribers: () => {
            dispatch(changeShowingUsers(true))
        },

        showNonSubscribers: () => {
            dispatch(changeShowingUsers(false))
        }

    }
}

export default connect(MapStateToProps, MapDispatchToProps)(Users)