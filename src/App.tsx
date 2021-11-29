import React, {useEffect} from 'react'
import './App.css'
import Sidebar from './components/common/sidebar/Sidebar'
import Header from './components/common/header/HeaderC'
import Users from './components/users/UsersC'
import {Route, Routes} from 'react-router-dom'
import Profile from "./components/profile/ProfileC";
import {connect} from 'react-redux'
import {isAuthorizedTC} from "./redux/auth-reducer";
import {AppStateType} from "./redux/store";
import Preloader from "./components/common/preloader/Preloader";
import Messages from "./components/messages/MessagesC";
import Login from "./components/common/login/login";


const App = (props: any) => {

    const {
        isAuth,
        isAuthorizedTC
    } = props

    useEffect(() => {
        if (!isAuth) {
            isAuthorizedTC()
        }
    }, [isAuth, isAuthorizedTC])

    return (
        <div className='app_wrapper'>
            <Header/>
            <Sidebar/>
            <div className='app_content'>
                {
                    isAuth
                        ?
                        <Routes>
                            <Route path='/profile' element={<Profile/>}/>
                            <Route path='/profile/:userID' element={<Profile/>}/>
                            <Route path='/users' element={<Users/>}/>
                            <Route path='/messages' element={<Messages/>}/>
                            <Route path='/messages/:userID' element={<Messages/>}/>
                        </Routes>
                        : <Login />
                }
            </div>
        </div>
    );
}

export default connect((state: AppStateType) => ({
    isAuth: state.auth.isAuth
}), {
    isAuthorizedTC
})(App);
