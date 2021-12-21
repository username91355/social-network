import React from 'react';

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
            <span>{login}</span>
            <button onClick={logoutHandler}>Exit</button>
        </header>
    );
};

export default Header;