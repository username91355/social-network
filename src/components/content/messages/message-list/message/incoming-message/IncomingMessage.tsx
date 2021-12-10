import styles from "./IncomingMessage.module.css"
import avatar from "../../../../../../assets/img/avatar-small.png";
import React from "react";
import {TUser} from "../../../../../../redux/reducers/messages-reducer";

export type TProps = {
    message: string
    interlocutors: Array<TUser>
}

const IncomingMessage: React.FC<TProps> = props => {

    const {
        interlocutors,
        message
    } = props

    return (
        <div className={styles.messages__incoming}>
            <div/>
            <div className={styles.messages__incoming_message}>
                <h4>{(interlocutors.length > 0) && interlocutors[0].name }</h4>
                <span>{message}</span>
            </div>
            <img className={styles.messages__incoming_img}
                 src={(interlocutors.length > 0 && interlocutors[0].photos.small !== null)
                     ? interlocutors[0].photos.small
                     : avatar}
                 alt="interlocutorsPhoto"/>
        </div>
    )
}

export default IncomingMessage