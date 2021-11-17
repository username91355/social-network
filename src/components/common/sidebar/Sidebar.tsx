import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css'


const Sidebar = () => {
    return (
        <div className={styles.sidebar_wrapper}>
            <NavLink to='/profile'>Profile</NavLink>
            <NavLink to='/users'>Users</NavLink>
            <NavLink to='/messages'>Messages</NavLink>
        </div>
    );
};

export default Sidebar;