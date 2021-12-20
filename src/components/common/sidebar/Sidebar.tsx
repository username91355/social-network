import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './Sidebar.module.css'


const Sidebar = () => {

    return (
        <div className={styles.sidebar_wrapper}>
            <NavLink className={({isActive}) => isActive
                ? styles.sidebar_link_active
                : styles.sidebar_link}
                     to='/profile'>Profile</NavLink>
            <NavLink className={({isActive}) => isActive
                ? styles.sidebar_link_active
                : styles.sidebar_link}  to='/users'>Users</NavLink>
            <NavLink className={({isActive}) => isActive
                ? styles.sidebar_link_active
                : styles.sidebar_link} to='/messages'>Messages</NavLink>
        </div>
    );
};

export default React.memo(Sidebar);