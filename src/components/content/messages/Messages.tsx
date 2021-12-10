import React, {useEffect} from 'react';
import styles from './Messages.module.css';
import DialogList from "./dialog-list/DialogList";
import {useParams} from "react-router-dom";
import MessageList from "./message-list/MessageList";
import {TMessages, TUser} from "../../../redux/reducers/messages-reducer";

type TProps = {
    dialogs: Array<TUser>
    messages: TMessages
    authUserPhoto: string
    authUserName: string
    newMessageText: string
    changeNewMessageArea: (value: string) => void
    sendMessage: (dialogID: number) => void
    setDialogsTC: () => void
}

const Messages: React.FC<TProps> = props => {

    const {
        messages,
        dialogs,
        authUserPhoto,
        authUserName,
        newMessageText,
        setDialogsTC,
        changeNewMessageArea,
        sendMessage
    } = props

    const userID = useParams().userID

    useEffect(() => {
        setDialogsTC()
    }, dialogs)

    const messagesSort = userID ? messages[+userID] : []
    const dialogID = userID ? userID : ''

    if (dialogs === []) {
        setDialogsTC()
    }

    return (
        <div className={styles.messages__wrapper}>
            <DialogList userList={dialogs}/>
            <MessageList dialogId={dialogID}
                         dialogs={dialogs}
                         authUserPhoto={authUserPhoto}
                         authUserName={authUserName}
                         messages={messagesSort}
                         newMessageText={newMessageText}
                         changeNewMessageArea={changeNewMessageArea}
                         sendMessage={sendMessage}/>
        </div>
    );
};

export default Messages;