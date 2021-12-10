import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import Preloader from "../common/preloader/Preloader";
import {isAuthorizedTC} from "../../redux/auth-reducer";
import Content from "./Content";
import Login from "../common/login/Login";

const ContentWithAuth = () => {

    const dispatch = useDispatch()
    const isAuth = useSelector((store: AppStateType) => store.auth.isAuth)
    const initialize = useSelector((store: AppStateType) => store.auth.initialize)

    useEffect(() => {
        dispatch(isAuthorizedTC())
        console.log('useEffect')
    }, [])

    return <>
        {
            !initialize
                ? <Preloader/>
                : isAuth
                    ? <Content />
                    : <Login/>
        }
    </>
}

export default ContentWithAuth