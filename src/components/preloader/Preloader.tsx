import React from 'react';
import styles from './Preloader.module.css'
import { Spin } from 'antd';

export const Preloader = () => {
    return <div className={styles.preloader__wrapper}><Spin size="large" /></div>
};