import React, {useState} from "react";
import {CloseOutlined, WarningOutlined} from "@ant-design/icons";
import styles from './ErrorSnackbar.module.css'

export const ErrorSnackbar: React.FC<IProps> = props => {

    const {error} = props
    const [close, setClose] = useState(false)

    const handleClose = () => {
        setClose(true)
    };

    if (error) {
        setTimeout(handleClose, 7000)
    }

    return (
        error ?
            <div className={`${styles.error__container} ${close ? styles.close : ''}`}>
                <div className={styles.error__text}>
                    <div>
                        <WarningOutlined/>
                        <span>Error</span>
                    </div>
                    <p>{error}</p>
                </div>
                <button className={styles.error__btn}
                        onClick={handleClose}>
                    <CloseOutlined/>
                </button>
            </div>
            : null
    );
}

//types
interface IProps {
    error: string | null
}