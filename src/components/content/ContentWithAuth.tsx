import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import Login from "../common/login/login";
import Preloader from "../common/preloader/Preloader";
import {isAuthorizedTC} from "../../redux/auth-reducer";
import Content from "./Content";

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