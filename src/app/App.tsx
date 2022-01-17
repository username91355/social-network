import React, {Suspense, useEffect} from 'react'
import styles from './App.module.css'
import {Header} from '../components/header/Header'
import {Nav} from '../components/nav/Nav'
import {Profile} from '../pages/profile/Profile'
import {Login} from '../pages/login/Login'
import {Footer} from '../components/footer/Footer'
import {PageNotFound} from '../components/page-not-found/PageNotFound'
import {TAppState} from '../state/store'
import {appInitialization, AppStatus} from '../state/reducers/app-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {Navigate, Route, Routes} from 'react-router-dom'
import {Preloader} from '../components/preloader/Preloader'
import {ErrorSnackbar} from '../components/error-snackbar/ErrorSnackbar'

const Users = React.lazy(() => import('../pages/users/Users'))
const Messages = React.lazy(() => import('../pages/messages/Messages'))
const Chat = React.lazy(() => import('../pages/chat/Chat'))

export const App: React.FC = () => {

    const
        dispatch = useDispatch(),
        appStatus = useSelector((state: TAppState) => state.app.appStatus),
        appError = useSelector((state: TAppState) => state.app.error)

    useEffect(() => {
        dispatch(appInitialization())
    }, [dispatch])

    return (
        <div className={styles.app__wrapper}>
            <ErrorSnackbar error={appError}/>
            <Header/>
            <Nav/>
            <main>{(appStatus === AppStatus.IDLE || appStatus === AppStatus.LOADING)
                ? <Preloader/>
                : <Routes>
                    <Route path='/' element={<Navigate to='/profile'/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/profile/:userId' element={<Profile/>}/>
                    <Route path='/users' element={
                        <Suspense fallback={<Preloader/>}>
                            <Users/>
                        </Suspense>}/>
                    <Route path='/messages' element={
                        <Suspense fallback={<Preloader/>}>
                            <Messages/>
                        </Suspense>}/>
                    <Route path='/messages/:userId' element={
                        <Suspense fallback={<Preloader/>}>
                            <Messages/>
                        </Suspense>}/>
                    <Route path='/Chat' element={
                        <Suspense fallback={<Preloader/>}>
                            <Chat/>
                        </Suspense>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='*' element={<PageNotFound/>}/>
                </Routes>
            }</main>
            <Footer/>
        </div>
    )
}