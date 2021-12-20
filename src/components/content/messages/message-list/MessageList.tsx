import styles from "./MessageList.module.css";
import React, {ChangeEvent} from "react";
import Message from "./message/Message";
import {TMessage, TUser} from "../../../../data/reducers/messages-reducer";
import Button from "../../../common/button/Button";

type TProps = {
    dialogId: string
    dialogs: Array<TUser>
    messages: Array<TMessage>
    authUserPhoto: string
    authUserName: string
    newMessageText: string
    changeNewMessageArea: (value: string) => void
    sendMessage: (dialogID: number) => void
}

const MessageList: React.FC<TProps> = props => {

    const {
        dialogId,
        dialogs,
        messages,
        authUserPhoto,
        authUserName,
        newMessageText,
        changeNewMessageArea,
        sendMessage
    } = props

    const interlocutors = dialogs.filter((i: any) => (i.id === +dialogId))

    const textAreaOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        changeNewMessageArea(e.currentTarget.value)
    }
    const onClickButtonsendMessage = () => {
        sendMessage(+dialogId)
    }

    if (messages.length === 0) {
        return <div className={styles.messages__messages_window_alt}>Select user for start dialog</div>
    }

    return (
        <div className={styles.messages__container}>
            <div className={styles.messages__messages_window}>
                {
                    messages.map((d,i) => {
                        return <Message key={i}
                                        outgoing={d.outgoing}
                                        message={d.message}
                                        authUserPhoto={authUserPhoto}
                                        authUserName={authUserName}
                                        interlocutors={interlocutors}/>
                    })
                }
            </div>
            <textarea className={styles.messages__textarea}
                      value={newMessageText}
                      onChange={textAreaOnChange}
                      placeholder={'Enter new message'}/>
            <div className={styles.messages__button_container}>
                <Button title={'Send'} onClick={onClickButtonsendMessage} />
            </div>
        </div>
    )
}

export default MessageList