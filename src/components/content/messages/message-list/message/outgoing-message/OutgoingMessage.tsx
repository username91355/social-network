import styles from "./OutgoingMessage.module.css";
import React from "react";

export type TProps = {
    message: string
    authUserPhoto: string
    authUserName: string
}

const OutgoingMessage: React.FC<TProps> = props => {

    const {
        authUserPhoto,
        authUserName,
        message
    } = props

    return (
        <div className={styles.messages__outgoing}>
            <img className={styles.messages__outgoing_img} src={authUserPhoto} alt="authUserPhoto"/>
            <div className={styles.messages__outgoing_message}>
                <h4>{authUserName}</h4>
                <span>{message}</span>
            </div>
            <div/>
        </div>
    )
}

export default OutgoingMessage