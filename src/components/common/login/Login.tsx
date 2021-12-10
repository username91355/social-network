import React from 'react';
import styles from './Login.module.css'

const Login = () => {

    return (
        <div className={styles.login__wrapper}>
            Login <input type="text"/>
            Password <input type="text"/>
            Remember me <input type="checkbox"/>
        </div>
    );
};

export default Login;