import React from "react";
import { NavLink } from "react-router-dom";
import classes from './MessagesPage.module.css'

function MessagesPage(props: any) {

    const messagesElement = props.messagesPage.messages.map((m: any) => {

        let style = {
            color: 'blue'
        }

        return (

            (m.userId != '0')
                ? <div className={classes.altMessage}>
                    <div className={classes.altMessage__body}>
                        <div className={classes.altMessage__data}>
                            <div className={classes.altMessage__data_name}>{m.userId}</div>
                            <div className={classes.altMessage__data_text}>{m.text}</div>
                        </div>
                        <div className={classes.altMessage__time}>{props.time}</div>
                    </div>
                    <img className={classes.altMessage__img} src='https://sun9-74.userapi.com/Ph-WiuOtF985il9AvN9JqiCWedmHtSGSSTXrSA/ltEB2Z2-YO4.jpg' alt="avatar" />
                </div>
                : <div className={classes.message}>
                    <img className={classes.message__img} src='https://sun9-74.userapi.com/Ph-WiuOtF985il9AvN9JqiCWedmHtSGSSTXrSA/ltEB2Z2-YO4.jpg' alt="avatar" />
                    <div className={classes.message__body}>
                        <div className={classes.message__data}>
                            <div className={classes.message__data_name}>{m.userId}</div>
                            <div className={classes.message__data_text}>{m.text}</div>
                        </div>
                        <div className={classes.message__time}>{props.time}</div>
                    </div>
                </div>
        )
    })

    const usersElement = props.allUsers.map((u: any) => {
        return (
            <div>
                <NavLink className={classes.link}
                    activeClassName={classes.active}
                    to={`/messages/${u.id}`}>{u.name}</NavLink>
            </div>
        )
    })

    return (
        <div className={classes.messagesPage}>
            <div className={classes.users}>
                {usersElement}
            </div>
            <div className={classes.messages}>
                {messagesElement}
            </div>
        </div>
    )
}

export default MessagesPage