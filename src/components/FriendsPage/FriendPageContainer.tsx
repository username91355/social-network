import React from 'react'
import {connect} from "react-redux";
import { addFriendAC, removeFromFriendAC } from '../../redux/reducers/FriendsPageReducer';
import FriendsPage from './FriendsPage';

let mapStateToProps = (state: any) => {

    return {
        state: state.friendsPage
    }
}

let mapDispatchToProps = (dispatch: any) => {

    return {
        addFriend: (id:string) => {
            dispatch(addFriendAC(id))
        },

        removeFriend: (id: string) => {
            dispatch(removeFromFriendAC(id))
        }
    }
}

const FriendsPageContainer = connect(mapStateToProps,mapDispatchToProps)(FriendsPage)

export default FriendsPageContainer;
