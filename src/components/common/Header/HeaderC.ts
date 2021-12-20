import { connect } from "react-redux";
import Header from "./Header";
import {AppStateType} from "../../../data/store";
import { compose } from "redux";
import React from "react";

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

export default compose<React.ComponentType>(
    connect(mapStateToProps,{}),
    React.memo,
)(Header)