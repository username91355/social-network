import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../data/store";
import Preloader from "../common/preloader/Preloader";
import {isAuthorizedTC} from "../../data/auth-reducer";
import Content from "./Content";
import Login from "../common/login/Login";

const ContentWithAuth: React.FC = () => {

    const dispatch = useDispatch(),
        isAuth = useSelector((store: AppStateType) => store.auth.isAuth),
        initialize = useSelector((store: AppStateType) => store.auth.initialize)

    useEffect(() => {
        dispatch(isAuthorizedTC())
        console.log('useEffect')
    }, [])

    return <>
        {
            !initialize
                ? <Preloader/>
                : isAuth
                    ? <Content/>
                    : <Login/>
        }
    </>
}

export default ContentWithAuth