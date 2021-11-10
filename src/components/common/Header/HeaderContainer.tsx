import {Header} from "./Header";
import {connect} from "react-redux";
import { login, logout } from "../../../redux/reducers/profileReducer";

const mapStateToProps = (state: any) => {
    return ({
        isInitializationUser: state.profile.isInitializationUser
    })
}

export const HeaderContainer = connect(mapStateToProps, {
    login,
    logout
})(Header)