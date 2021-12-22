import React, {useCallback} from 'react';
import {Link, NavLink, Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../data/reducers/auth-reducer";
import Preloader from "../preloader/Preloader";
import styles from './Layout.module.css'


const Layout: React.FC = () => {

    const dispatch = useDispatch(),
        login = useSelector((state: any) => state.auth.login),
        init = useSelector((state: any) => state.auth.init),
        logoutHandler = useCallback(() => {
            dispatch(logout())
        }, [dispatch])

    return <div className={styles.container}>
        <header>
            {login
                ? <div>
                    <span>{login}</span>
                    <button onClick={logoutHandler}>Exit</button>
                </div>
                : <Link to={'/login'}>Login</Link>
            }
        </header>
        <aside>
            <NavLink to={'/profile'}>Profile</NavLink>
            <NavLink to={'/messages'}>Messages</NavLink>
            <NavLink to={'/users'}>Users</NavLink>
        </aside>
        <main>{init ? <Outlet /> : <Preloader/>}</main>
        <footer>2021</footer>
    </div>
};

export default Layout;