import React, {useState} from 'react';
import styles from './Header.module.css'
import {useDispatch, useSelector} from "react-redux";
import {TAppState} from "../../state/store";
import {Link} from "react-router-dom";
import {logout} from '../../state/reducers/app-reducer';
import {Button, Menu} from "antd";
import {LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import logo from './../../assets/img/logo.png'
const Header = () => {

    const dispatch = useDispatch()
    const isAuth = useSelector((state: TAppState) => state.app.isAuth)
    const login = useSelector((state: TAppState) => state.app.login)

    const logoutClick = () => {
        dispatch(logout())
    }

    const [collapsed, setCollapsed] = useState(true)

    return <header className={styles.header__wrapper}>
        <div>
            <div className={styles.header__mobile_menu}>
                <Button type="primary"
                        onClick={() => setCollapsed(!collapsed)}>
                    <MenuUnfoldOutlined/>
                </Button>
                {collapsed ? <div>Menu</div> : <div/>}
            </div>
            <img className={styles.header__logo} src={logo} alt="logo"/>
        </div>
        <div>
            {isAuth
                ? <div>
                    <span className={styles.header__login}>{login}</span>
                    <Button onClick={logoutClick} type="primary" shape="round" icon={<LogoutOutlined/>}
                            size={"middle"}>Logout</Button>
                </div>
                : <Link to={'/login'}>Login</Link>
            }
        </div>
    </header>
};

export default Header;