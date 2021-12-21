import React, {useCallback, useEffect} from 'react';
import './App.css';
import {logout, setAuth} from "./data/reducers/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {Login} from "./component/login/Login";
import {Navigate, Route, Routes } from 'react-router-dom';
import Profile from './component/profile/Profile';
import { NavLink } from 'react-router-dom';
import Header from "./component/common/header/Header";
import WithAuth from './hoc/withAuth';

const App: React.FC = () => {

    const dispatch = useDispatch()
    const login = useSelector((state: any) => state.auth.login)

    useEffect(() => {
        dispatch(setAuth())
    }, [dispatch,setAuth])

    const logoutHandler = useCallback(() => {
        dispatch(logout())
    },[dispatch,logout])

    return (
        <div className="app__wrapper">
            <Header login={login} logoutHandler={logoutHandler}/>
            <aside>
                <NavLink to={'/profile'}>Profile</NavLink>
                <NavLink to={'/messages'}>Messages</NavLink>
                <NavLink to={'/users'}>Users</NavLink>
            </aside>
            <Routes>
                <Route path='/' element={<WithAuth>ASA</WithAuth>}/>
                <Route path='*' element={<div>Page not found</div>}/>
                <Route path='/profile' element={<WithAuth><Profile/></WithAuth>}/>
                <Route path='/login' element={<Login />}/>
            </Routes>
        </div>
    );
}

export default App;
