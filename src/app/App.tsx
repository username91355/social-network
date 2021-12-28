import React, {useEffect} from 'react';
import './App.module.css';
import styles from './App.module.css'
import {Header} from "../components/header/Header";
import {Nav} from "../components/nav/Nav";
import {Profile} from "../pages/profile/Profile";
import {Users} from '../pages/users/Users';
import {Messages} from "../pages/messages/Messages";
import {Login} from "../pages/login/Login";
import {Footer} from "../components/footer/Footer";
import {PageNotFound} from "../components/page-not-found/PageNotFound";
import {TAppState} from "../state/store";
import {appInitialization, AppStatus} from "../state/reducers/app-reducer";
import {useDispatch, useSelector} from "react-redux";
import {Navigate, Route, Routes} from 'react-router-dom';
import {Preloader} from "../components/preloader/Preloader";

export const App: React.FC = () => {

    const
        dispatch = useDispatch(),
        appStatus = useSelector((state: TAppState) => state.app.appStatus)

    useEffect(() => {
        dispatch(appInitialization())
    }, [dispatch])

    return (
        <div className={styles.app__wrapper}>
            <Header/>
            <Nav/>
            <main>{(appStatus === AppStatus.IDLE || appStatus === AppStatus.LOADING)
                ? <Preloader/>
                : <Routes>
                    <Route path='/' element={<Navigate to='/profile'/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/profile/:userId' element={<Profile/>}/>
                    <Route path='/users' element={<Users/>}/>
                    <Route path='/messages' element={<Messages/>}/>
                    <Route path='/messages/:userId' element={<Messages/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='*' element={<PageNotFound/>}/>
                </Routes>
            }</main>
            <Footer/>
        </div>
    );
}
