import React, { ChangeEvent,KeyboardEvent } from "react";
import { NavLink } from "react-router-dom";
import classes from './MessagesPage.module.css'

function MessagesPage(props: MessagePagePropsType) {

    const changeMessageTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.changeMessageTextArea(e.currentTarget.value)
    }

    const sendMessage = () => {
        props.sendMessage()
    }

    const sendMessageOnKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.code === 'Enter' && e.ctrlKey === true) {
            props.sendMessage()
        }
    }

    const messagesElement = props.messagesPage.messages.map((m: MessageType) => {

        return (

            (m.userId != '0')
                ? <div className={classes.altMessage}>
                    <div></div>
                    <div className={classes.altMessage__text}>{m.text}</div>
                    <div className={classes.altMessage__name}>{m.name}</div>
                </div>
                : <div className={classes.message}>
                    <div className={classes.message__name}>{m.name}</div>
                    <div className={classes.message__text}>{m.text}</div>
                    <div></div>
                </div>
        )
    })

    const usersElement = props.allUsers.map((u: UserType) => {
        return (
            <div className={classes.messagesPage__user}>
                <NavLink className={classes.messagesPage__user_link}
                    activeClassName={classes.messagesPage__user_link_active}
                    to={`/messages/${u.id}`}>{u.name}</NavLink>
            </div>
        )
    })

    return (
        <div className={classes.messagesPage__wrapper}>
            <div className={classes.messagesPage__users}>
                {usersElement}
            </div>
            <div className={classes.messagesPage__messages}>
                {messagesElement}
                <div className={classes.messagesPage__newMessage}>
                    <textarea className={classes.messagesPage__newMessage_textArea}
                        onKeyPress={sendMessageOnKeyPress}
                        value={props.messagesPage.newMessageTextArea}
                        onChange={changeMessageTextArea}>
                    </textarea>
                    <div><button className={classes.messagesPage__newMessage_button}
                    onClick={sendMessage}>Send</button></div>
                </div>
            </div>
        </div>
    )
}

type MessagePagePropsType = {
    allUsers: Array<UserType>
    changeMessageTextArea: (value: string) => void
    messagesPage: MessagesPageType
    sendMessage: () => void
}

type MessagesPageType = {
    messages: Array<MessageType>
    newMessageTextArea: string
}

type MessageType = {
    id: string
    userId: string
    name: string
    incoming: boolean
    text: string
}

type UserType = {
    id: string
    name: string
    onFriends: boolean
}

export default MessagesPage