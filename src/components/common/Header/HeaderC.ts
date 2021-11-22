import { connect } from "react-redux";
import Header from "./Header";
import {isAuthorizedTC} from "../../../redux/authReducer";
import {AppStateType} from "../../../redux/store";

type MSTPHeaderType = {
    isAuth: boolean
    login: string
}

const mapStateToProps = (state: AppStateType): MSTPHeaderType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect(mapStateToProps,{
    isAuthorizedTC
})(Header)