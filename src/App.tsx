import React from 'react'
import './App.css'
import Sidebar from './components/common/sidebar/Sidebar'
import Header from './components/common/header/HeaderC'
import Users from './components/users/UsersC'
import { Route, Routes } from 'react-router-dom'
import Profile from "./components/profile/ProfileC";

function App() {

    return (
        <div className='app_wrapper'>
            <Header/>
            <Sidebar/>
            <div className='app_content'>
                <Routes>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/profile/:userID' element={<Profile/>}/>
                    <Route path='/users' element={<Users/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
