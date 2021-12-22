import React, {useEffect} from 'react';
import './App.css';
import {appInitialization} from "./data/reducers/auth-reducer";
import {useDispatch} from "react-redux";
import {Login} from "./component/login/Login";
import {Navigate, Route, Routes} from 'react-router-dom';
import Profile from './component/profile/Profile';
import Users from "./component/users/Users";
import Messages from "./component/messages/Messages";
import Layout from "./component/common/layout/Layout";

const App: React.FC = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(appInitialization())
    }, [dispatch])


    return (
        <div className="app__wrapper">
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route index element={<Navigate to={'/profile'} replace/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/messages' element={<Messages/>}/>
                    <Route path='/users' element={<Users/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='*' element={<div>Page not found</div>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
