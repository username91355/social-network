import React from 'react';
import styles from './Messages.module.css'
import {TDialog, TMessage} from "../../redux/profile-reducer";
import {NavLink} from "react-router-dom";

const Messages = (props: TProps) => {

    const {
        messages,
        dialogs
    } = props

    // const params = useParams()
    // const userID = params.userID

    const dialogsItems = dialogs.map( d => {
        return <div key={d.id}>
            <NavLink to={`/messages/${d.id}`}>{d.name}</NavLink>
        </div>
    })

    const messagesItems = messages.map( d => <div key={d.id}>{d.message}</div>)

    return (
        <div className={styles.messages__wrapper}>
            <div className={styles.messages__dialogs}>
                {dialogsItems}
            </div>
            <div className={styles.messages__messages}>
                {messagesItems}
            </div>
        </div>
    );
};

type TProps = {
    messages: Array<TMessage>
    dialogs: Array<TDialog>
}

export default Messages;