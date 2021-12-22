import React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
    login: string | null
    logoutHandler: () => void
}

const Header: React.FC<IProps> = props => {

    const {
        login,
        logoutHandler,
    } = props

    return (
        <header>
            {login
                ? <div>
                    <span>{login}</span>
                    <button onClick={logoutHandler}>Exit</button>
                </div>
                : <Link to={'/login'}>Login</Link>
            }
        </header>
    );
};

export default Header;