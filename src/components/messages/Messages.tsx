import React, {useEffect} from 'react';
import styles from './Messages.module.css';
import DialogList from "./dialog-list/DialogList";
import {useParams} from "react-router-dom";
import MessageList from "./message-list/MessageList";

const Messages = (props: any) => {

    const {
        messages,
        dialogs,
        interlocutors,
        authUserPhoto,
        newMessageText,
        setDialogsTC,
        changeNewMessageArea,
        sendMessage
    } = props

    const userID = useParams().userID

    useEffect(() => {
        setDialogsTC()
    }, dialogs)

    const messagesSort = userID ? messages[userID] : []

    if (dialogs === []) {
        setDialogsTC()
    }

    return (
        <div className={styles.messages__wrapper}>
            <DialogList dialogs={dialogs}/>
            <MessageList dialogId={userID}
                         dialogs={dialogs}
                         authUserPhoto={authUserPhoto}
                         messages={messagesSort}
                         newMessageText={newMessageText}
                         changeNewMessageArea={changeNewMessageArea}
                         sendMessage={sendMessage}/>
        </div>
    );
};

type TProps = {
    setDialogsTC: any
    dialogs: any
    messages: any
    newMessageText: string
    changeNewMessageArea: (value: string) => void
    sendMessage: () => void
}

export default Messages;