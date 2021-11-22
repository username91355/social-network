import {connect, ConnectedProps} from "react-redux";
import Users from "./Users";
import {
    changeSearchArea, changeShowingUsers,
    getUsersThunkCreator,
    setFollowedStatusThunkCreator,
    setUnfollowedStatusThunkCreator
} from "../../redux/users-reducer";
import {
    selectorCount,
    selectorFriend,
    selectorPage,
    selectorTerm,
    selectorUsers,
    selectorUsersInit
} from "./UsersSelectors";
import {AppStateType} from "../../redux/store";

const MapStateToProps = (store: AppStateType) => {
    return {
        count: selectorCount(store),
        page: selectorPage(store),
        term: selectorTerm(store),
        friend: selectorFriend(store),
        usersInit: selectorUsersInit(store),
        users: selectorUsers(store),
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
        },
    }
}

const connector = connect(MapStateToProps, MapDispatchToProps)

export type UsersPropsType = ConnectedProps<typeof connector>

export default connector(Users)