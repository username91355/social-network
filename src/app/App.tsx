import React, {useEffect} from 'react';
import {NavLink, Route, Routes} from 'react-router-dom';
import './App.css';
import {Profile} from "../pages/profile/Profile";
import {Users} from '../pages/users/Users';
import Messages from "../pages/messages/Messages";
import Login from "../pages/login/Login";
import {appInitialization, AppStatus} from "../state/reducers/app-reducer";
import {useDispatch, useSelector} from "react-redux";
import {TAppState} from "../state/store";
import Header from "../components/header/Header";

export const App: React.FC = () => {

    const dispatch = useDispatch()

    const appStatus = useSelector((state: TAppState) => state.app.appStatus)

    useEffect(() => {
        dispatch(appInitialization())
    }, [dispatch])

    return (
        <div className="app__wrapper">
            <Header/>
            <nav>
                <NavLink to='/profile'>Profile</NavLink>
                <NavLink to='/users'>Users</NavLink>
                <NavLink to='/messages'>Messages</NavLink>
            </nav>
            {(appStatus === AppStatus.IDLE || appStatus === AppStatus.LOADING)
                ? <div>Loading...</div>
                : <main>
                    <Routes>
                        <Route path='/' element={<Profile/>}/>
                        <Route path='/profile' element={<Profile/>}/>
                        <Route path='/profile/:userId' element={<Profile/>}/>
                        <Route path='/users' element={<Users/>}/>
                        <Route path='/messages' element={<Messages/>}/>
                        <Route path='/login' element={<Login/>}/>
                    </Routes>
                </main>
            }

            <footer>2021</footer>
        </div>
    );
}
