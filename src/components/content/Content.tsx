import Sidebar from "../common/sidebar/Sidebar";
import {Route, Routes} from "react-router-dom";
import Profile from "./profile/ProfileC";
import Users from "./users/UsersC";
import Messages from "./messages/MessagesC";
import React from "react";
import styles from './Content.module.css';
import Login from "../common/login/Login";

const Content: React.FC = () => {
    return <div className={styles.content__wrapper}>
        <Sidebar/>
        <div className={styles.content__content}>
            <Routes>
                <Route path='/' element={<Profile/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/profile/:userID' element={<Profile/>}/>
                <Route path='/users' element={<Users/>}/>
                <Route path='/messages' element={<Messages/>}/>
                <Route path='/messages/:userID' element={<Messages/>}/>
                <Route path='/login' element={<Login/>}/>
            </Routes>
        </div>
    </div>
};

export default Content