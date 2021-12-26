import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {TAppState} from "../../state/store";
import {Link} from "react-router-dom";
import { logout } from '../../state/reducers/app-reducer';

const Header = () => {

    const dispatch = useDispatch()
    const isAuth = useSelector((state: TAppState) => state.app.isAuth)
    const login = useSelector((state: TAppState) => state.app.login)

    const logoutClick = () => {
        dispatch(logout())
    }

    return <header>
        {isAuth
            ? <div>
                <span>{login}</span>
                <button onClick={logoutClick}>Logout</button>
            </div>
            : <Link to={'/login'}>Login</Link>
        }
    </header>
};

export default Header;