import React, {useEffect} from 'react';
import styles from './Header.module.css'

type HeaderPropsType = {
    isAuth: boolean
    login: string
    isAuthorizedTC: () => void
}

const Header: React.FC<HeaderPropsType> = props => {

    const {
        isAuth,
        login,
        isAuthorizedTC
    } = props

    useEffect(isAuthorizedTC, [isAuth])

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