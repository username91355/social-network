import {Button, IconButton} from '@mui/material';
import TextField from '@mui/material/TextField';
import React, {ChangeEvent, KeyboardEvent} from 'react';
import {NavLink} from 'react-router-dom';
import {DialogType, MessageType} from '../../redux/reducers/messagesReducer';
import styles from './Messages.module.css'
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

type MessagesPropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageArea: string
    sendMessage: () => void
    removeMessage: (id: number) => void
    changeNewMessageArea: (text: string) => void
}

export const Messages: React.FC<MessagesPropsType> = ({
                                                          dialogs,
                                                          messages,
                                                          newMessageArea,
                                                          sendMessage,
                                                          removeMessage,
                                                          changeNewMessageArea
                                                      }) => {

    const dialogsItems = dialogs.map((i: DialogType) => {
        return (
            <div key={i.id} className={styles.messages__dialogs_item}>
                <NavLink className={styles.messages__dialogs_link}
                         activeClassName={styles.messages__dialogs_link_active}
                         to={`/messages/${i.id}`}>{i.name}</NavLink>
            </div>
        )
    })

    const messagesItems = messages.map((i: MessageType) => {

        const deleteMessage = () => {
            removeMessage(i.id)
        }

        return (
            <div key={i.id}>{i.message}
                <IconButton onClick={deleteMessage}>
                    <CloseIcon fontSize={'small'} />
                </IconButton>
            </div>
        )
    })

    const onChangeTAHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        changeNewMessageArea(e.currentTarget.value)
    }

    const onClickSendHandler = () => {
        sendMessage()
    }

    const onKeyPressSendHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            sendMessage()
        }
    }

    return (
        <div className={styles.messages__wrapper}>
            <div className={styles.messages__dialogs}>{dialogsItems}</div>
            <div className={styles.messages__messages}>
                <div>{messagesItems}</div>
                <div className={styles.messages__newMessage}>
                    <TextField label="New message"
                               variant="outlined"
                               value={newMessageArea}
                               onKeyDown={onKeyPressSendHandler}
                               onChange={onChangeTAHandler}/>
                    <Button variant="contained"
                            endIcon={<SendIcon/>}
                            onClick={onClickSendHandler}>Send</Button>
                </div>
            </div>
        </div>
    )
}
