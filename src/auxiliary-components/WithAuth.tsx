import React from "react";
import {TAppState} from "../state/store";
import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";

interface IWithAuth {
    children: React.ReactNode
}

export const WithAuth = ({children}: IWithAuth) => {

    const isAuth = useSelector((state: TAppState) => state.app.isAuth)
    const location = useLocation()

    return (!isAuth)
        ? <Navigate to='/login' state={location.pathname}/>
        : <>{children}</>
}
