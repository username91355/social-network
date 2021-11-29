import { connect } from "react-redux";
import Header from "./Header";
import {isAuthorizedTC} from "../../../redux/auth-reducer";
import {AppStateType} from "../../../redux/store";

type TMSTPHeader = {
    isAuth: boolean
    login: string
}

const mapStateToProps = (state: AppStateType): TMSTPHeader => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect(mapStateToProps,{
    isAuthorizedTC
})(Header)