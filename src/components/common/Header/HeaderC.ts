import { connect } from "react-redux";
import Header from "./Header";
import {AppStateType} from "../../../redux/store";

type TMSTPHeader = {
    login: string
    isAuth: boolean
}

const mapStateToProps = (state: AppStateType): TMSTPHeader => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect(mapStateToProps,{})(Header)