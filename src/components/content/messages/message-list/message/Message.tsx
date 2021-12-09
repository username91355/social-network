import React from 'react';
import styles from './Message.module.css';
import avatar from '../../../../../assets/img/avatar-small.png'

type TProps = {
    outgoing: boolean
    message: string
    authUserPhoto: string
    interlocutors: any
}

const Message: React.FC<TProps> = props => {

    const {
        outgoing,
        message,
        authUserPhoto,
        interlocutors,
    } = props

    return (
        <div>
            {outgoing
                ? <div className={styles.messages__outgoing}>
                    <img className={styles.messages__outgoing_img} src={authUserPhoto} alt="authUserPhoto"/>
                    <div className={styles.messages__outgoing_message}>
                        <span>{message}</span>
                    </div>
                    <div/>
                </div>
                : <div className={styles.messages__incoming}>
                    <div/>
                    <div className={styles.messages__incoming_message}>
                        <span>{message}</span>
                    </div>
                    <img className={styles.messages__incoming_img}
                         src={(interlocutors.length > 0 && interlocutors[0].photos.small !== null)
                             ? interlocutors[0].photos.small
                             : avatar}
                         alt="interlocutorsPhoto"/>
                </div>}
        </div>
    );
};

export default Message;