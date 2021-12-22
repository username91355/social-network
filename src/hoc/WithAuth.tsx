import React from 'react';
import {useSelector} from "react-redux";
import {Navigate, useLocation} from 'react-router-dom';
import {AppStateType} from "../data/redux";

interface IWithAuth {
    children: React.ReactNode
}

const WithAuth = ({children}: IWithAuth) => {

    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const location = useLocation()

    if(!isAuth) {
        return <Navigate to={'/login'} state={location.pathname}/>
    }
    return <>{children}</>
};

export default WithAuth;