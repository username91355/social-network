import {useSelector} from "react-redux";
import {AppStateType} from "../data/redux";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";


const WithAuth = ({children}: any) => {

    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    debugger
    const navigate = useNavigate()

    useEffect(()=> {
        if (!isAuth) navigate('/login')
    })

    return <>{children}</>
}

export default WithAuth