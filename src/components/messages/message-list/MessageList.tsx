import styles from "./MessageList.module.css";
import {ChangeEvent} from "react";

const MessageList = (props: any) => {

    const {
        dialogId,
        messages,
        newMessageText,
        changeNewMessageArea,
        sendMessage
    } = props

    if (messages.length === 0) {
        return null
    }

    return (
        <div className={styles.messages__container}>
            {
                messages.map((d: any) => {
                    return <div key={d.id}>
                        {d.outgoing
                            ? <div className={styles.messages__outgoing_message}>
                                <div>img</div>
                                {d.message}
                                <div></div>
                            </div>
                            : <div className={styles.messages__incoming_message}>
                                <div></div>
                                {d.message}
                                <div>img</div>
                            </div>}
                    </div>
                })
            }
            <textarea value={newMessageText}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                          changeNewMessageArea(e.currentTarget.value)}
                      placeholder={'Enter new message'}/>
            <button onClick={() => sendMessage(dialogId,)}>Send</button>
        </div>
    )
}

export default MessageList