import React from 'react'
import styles from './Footer.module.css'

export const Footer: React.FC = React.memo(() => {
    return (
        <footer className={styles.footer__wrapper}>
            Social network ©2021 Created by Balyaev Dmitriy with Ant Design
        </footer>
    )
})