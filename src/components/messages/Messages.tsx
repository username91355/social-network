import React from 'react';
import styles from './Messages.module.css'
import {sendMessage, TDialog, TMessage} from "../../redux/profile-reducer";
import {NavLink} from "react-router-dom";

const Messages = (props: TProps) => {

    const {
        messages,
        dialogs,
        newMessageText,
        changeNewMessageArea,
        sendMessage
    } = props

    // const params = useParams()
    // const userID = params.userID

    const dialogsItems = dialogs.map(d => {
        return <div key={d.id}>
            <NavLink to={`/messages/${d.id}`}>{d.name}</NavLink>
        </div>
    })

    const messagesItems = messages.map(d => {
        return <div key={d.id} style={!d.outgoing
            ? {textAlign: 'right'}
            : {}}>{d.message}</div>
    })

    return (
        <div className={styles.messages__wrapper}>
            <div className={styles.messages__dialogs}>
                {dialogsItems}
            </div>
            <div className={styles.messages__messages}>
                {messagesItems}
                <textarea value={newMessageText}
                          onChange={(e) =>
                              changeNewMessageArea(e.currentTarget.value)}
                          placeholder={'Enter new message'}/>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

type TProps = {
    messages: Array<TMessage>
    dialogs: Array<TDialog>
    newMessageText: string
    changeNewMessageArea: (value: string) => void
    sendMessage: () => void
}

export default Messages;