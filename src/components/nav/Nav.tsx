import React from 'react'
import styles from './Nav.module.css'
import {Menu} from 'antd'
import {NavLink, useLocation} from 'react-router-dom'

export const Nav = React.memo(() => {

    const location = useLocation()

    return (
        <nav className={styles.nav__wrapper}>
            <Menu
                onClick={() => {}}
                className={styles.nav__menu}
                defaultSelectedKeys={[location.pathname]}
                mode='inline'
            >
                <Menu.Item key='/profile'><h3><NavLink to='/profile'>Profile</NavLink></h3></Menu.Item>
                <Menu.Item key='/users'><h3><NavLink to='/users'>Users</NavLink></h3></Menu.Item>
                <Menu.Item key='/messages'><h3><NavLink to='/messages'>Messages</NavLink></h3></Menu.Item>
            </Menu>
        </nav>
    )
})