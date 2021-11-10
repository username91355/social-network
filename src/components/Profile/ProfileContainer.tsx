import {connect} from "react-redux";
import {addPost, changePostTextArea, removePost} from "../../redux/reducers/profileReducer";
import {Profile} from "./Profile";

const mapStateToProps = (state: any) => {
    return ({
        posts: state.profile.posts,
        userData: state.profile.userData,
        newPostAreaValue: state.profile.newPostAreaValue
    })
}

export const ProfileContainer = connect(mapStateToProps, {
    addPost,
    removePost,
    changePostTextArea
})(Profile)