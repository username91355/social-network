import styles from "./MessageList.module.css";
import {ChangeEvent} from "react";
import Message from "./message/Message";

const MessageList = (props: any) => {

    const {
        dialogId,
        dialogs,
        messages,
        authUserPhoto,
        newMessageText,
        changeNewMessageArea,
        sendMessage
    } = props

    const interlocutors = dialogs.filter((i: any) => (i.id === +dialogId))

    if (messages.length === 0) {
        return <div>Select user for start dialog</div>
    }

    return (
        <div className={styles.messages__container}>
            <div className={styles.messages__messages_window}>
                {
                    messages.map((d: any) => {
                        return <Message outgoing={d.outgoing}
                                        message={d.message}
                                        authUserPhoto={authUserPhoto}
                                        interlocutors={interlocutors}/>
                    })
                }
            </div>
            <hr/>
            <textarea className={styles.messages__textarea}
                      value={newMessageText}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                          changeNewMessageArea(e.currentTarget.value)}
                      placeholder={'Enter new message'}/>
            <div className={styles.messages__button_container}>
                <button className={styles.messages__button_container_btn} onClick={() => sendMessage(dialogId)}>Send
                </button>
            </div>
        </div>
    )
}

export default MessageList