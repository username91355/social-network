import React from 'react';
import preloader from './../../../assets/gif/loading.gif'
import styles from './Preloader.module.css'

const Preloader = () => {
    return (
        <div className={styles.preloader_wrapper}>
            <img className={styles.preloader_img} src={preloader} alt='preloader'/>
        </div>
    );
};

export default Preloader;