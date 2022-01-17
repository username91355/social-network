import React, {useEffect, useRef, useState} from 'react'
import styles from './Chat.module.css'
import {Avatar, Comment} from 'antd'
import {EnterTextForm} from "../../components/enter-text-form/EnterTextForm";
import {Preloader} from "../../components/preloader/Preloader";
import {useDispatch, useSelector} from "react-redux";
import {sendChatMessage, startMessagesListening, stopMessagesListening} from "../../state/reducers/chat-reducer";
import {TAppState} from "../../state/store";
import Checkbox, {CheckboxChangeEvent} from 'antd/es/checkbox';

const Chat = React.memo(() => {

    const [myMessage, setMyMessage] = useState<string>('')

    const dispatch = useDispatch()
    const messages = useSelector((state: TAppState) => state.chat.messages)
    const statusWS = useSelector((state: TAppState) => state.chat.statusWS)
    const messagesAnchorRef = useRef<HTMLDivElement | null>(null)
    const [autoScrollActive, setAutoScrollActive] = useState<boolean>(true)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    useEffect(() => {
        if (autoScrollActive) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    const sendMessage = () => {
        if (myMessage) {
            dispatch(sendChatMessage(myMessage))
            setMyMessage('')
        }
    }

    const onChangeAutoScrollState = (e: CheckboxChangeEvent) => {
        setAutoScrollActive(e.target.checked)
    }

    return (
        <div className={styles.chat__wrapper}>

            <div className={styles.chat__messages}>
                {statusWS !== 'ready'
                    ? <Preloader/>
                    : messages.map((m, i) => {
                        return <ChatMessage key={`${m.userId}${i}`}
                                            avatar={m.photo}
                                            author={m.userName}
                                            text={m.message}/>
                    })
                }
                <div className={styles.chat__scroll_anchor}
                     ref={messagesAnchorRef}/>
            </div>
            <div className={styles.chat__monitor_panel}>
                <EnterTextForm label={'Enter new message'}
                               value={myMessage}
                               onChange={setMyMessage}
                               send={sendMessage}
                               buttonDisabled={statusWS !== 'ready'}
                               title={'Send'}
                />
                <hr/>
                <Checkbox style={{color: 'white'}}
                          checked={autoScrollActive}
                          onChange={onChangeAutoScrollState}>Set auto-scroll</Checkbox>
            </div>
        </div>
    )
})

export default Chat

interface IProps {
    author: string
    avatar: string | null
    text: string
}

const ChatMessage: React.FC<IProps> = React.memo(props => {

    const {author, avatar, text} = props

    return (
        <Comment style={{backgroundColor: 'white', margin: '10px'}}
                 author={<a>{author}</a>}
                 avatar={<Avatar src={avatar || "https://joeschmoe.io/api/v1/random"} alt="avatar"/>}
                 content={<p>{text}</p>}
        />
    )
})

