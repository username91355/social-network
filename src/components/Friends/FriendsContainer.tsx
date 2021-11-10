import {connect} from "react-redux";
import {Friends} from "./Friends";
import {addFriend, removeFriend} from "../../redux/reducers/usersReducer";

const mapStateToPrpos = (state: any) => {
    return ({
        users: state.users.users
    })
}

export const FriendsContainer = connect(mapStateToPrpos, {
    addFriend,
    removeFriend
})(Friends)