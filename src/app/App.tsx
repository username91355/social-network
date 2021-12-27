import React, {useEffect} from 'react';
import {NavLink, Route, Routes, useLocation} from 'react-router-dom';
import './App.css';
import {Profile} from "../pages/profile/Profile";
import {Users} from '../pages/users/Users';
import Messages from "../pages/messages/Messages";
import Login from "../pages/login/Login";
import {appInitialization, AppStatus} from "../state/reducers/app-reducer";
import {useDispatch, useSelector} from "react-redux";
import {TAppState} from "../state/store";
import Header from "../components/header/Header";
import {PageNotFound} from "../components/page-not-found/PageNotFound";
import {Menu} from "antd";

export const App: React.FC = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const appStatus = useSelector((state: TAppState) => state.app.appStatus)

    useEffect(() => {
        dispatch(appInitialization())
    }, [dispatch])

    return (
        <div className="app__wrapper">
            <Header/>
            <nav>
                <Menu
                    onClick={()=>{}}
                    style={{width: 256}}
                    defaultSelectedKeys={[location.pathname]}
                    mode="inline"
                >
                    <Menu.Item key='/profile'><h3><NavLink to='/profile'>Profile</NavLink></h3></Menu.Item>
                    <Menu.Item key='/users'><h3><NavLink to='/users'>Users</NavLink></h3></Menu.Item>
                    <Menu.Item key='/messages'><h3><NavLink to='/messages'>Messages</NavLink></h3></Menu.Item>
                </Menu>
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
                        <Route path='*' element={<PageNotFound />}/>
                    </Routes>
                </main>
            }

            <footer>Social network ©2021 Created by Balyaev Dmitriy with Ant Design</footer>
        </div>
    );
}
