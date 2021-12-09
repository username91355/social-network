import React from 'react';
import styles from './Header.module.css'

type HeaderPropsType = {
    isAuth: boolean
    login: string
}

const Header: React.FC<HeaderPropsType> = props => {

    const {
        isAuth,
        login
    } = props

    return (
        <div className={styles.header_wrapper}>
            {
                isAuth
                    ? login
                    : 'Not authorized'
            }
        </div>
    );
};

export default Header;