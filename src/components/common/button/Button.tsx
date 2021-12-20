import React from 'react';
import styles from './Button.module.css';

interface IButton {
    title: string
    onClick: () => void
    isActive?: boolean | null
    disabled?: boolean
}

const Button: React.FC<IButton> = props => {

    const {
        title,
        onClick,
        isActive = false,
        disabled = false,
    } = props

    return <button className={`${styles.btn} ${isActive && styles.btn__active}`}
                   onClick={onClick} disabled={disabled}>{title}</button>
};

export default React.memo(Button);