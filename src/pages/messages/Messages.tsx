import React, {useCallback, useEffect} from 'react'
import styles from './Messages.module.css'
import {WithAuth} from '../../auxiliary-components/WithAuth'
import {Preloader} from '../../components/preloader/Preloader'
import {useDispatch, useSelector} from 'react-redux'
import {TAppState} from '../../state/store'
import {IUser} from '../../api/api'
import {NavLink, useParams} from 'react-router-dom'
import {EnterTextForm} from '../../components/enter-text-form/EnterTextForm'
import {DeleteOutlined} from '@ant-design/icons'
import {
    changeNewMessageArea,
    IMessage,
    removeMessage,
    sendMessage,
    setFriends
} from '../../state/reducers/messages-reducer'

const Messages: React.FC = React.memo(() => {

    const
        dispatch = useDispatch(),
        params = useParams(),
        friends: IUser[] = useSelector((state: TAppState) => state.messages.friends),
        messages: { [key: number]: IMessage[] } = useSelector((state: TAppState) => state.messages.messages),
        newMessageText: string = useSelector((state: TAppState) => state.messages.newMessageText)

    const userId = params.userId ? parseInt(params.userId, 10) : 0

    useEffect(() => {
        dispatch(setFriends())
    }, [])

    const interlocutorName = friends.find(i => i.id === userId)
    const send = useCallback(() => dispatch(sendMessage(userId)), [userId])
    const onChange = useCallback((value: string) => dispatch(changeNewMessageArea(value)), [])
    const remove = useCallback((messageId: number) => dispatch(removeMessage(userId, messageId)), [userId])

    return (
        <WithAuth>
            {!friends
                ? <Preloader/>
                : <div className={styles.messages__wrapper}>
                    <div className={styles.messages__dialogs}>
                        <div className={styles.messages__dialogs_friends}>
                            {friends.map(f => {
                                return <NavLink key={f.id}
                                                className={({isActive}) => isActive
                                                    ? styles.messages__dialogs_friends_activeLink
                                                    : styles.messages__dialogs_friends_link}
                                                to={`/messages/${f.id}`}
                                >{f.name}</NavLink>
                            })}
                        </div>
                        <div className={styles.messages__dialogs_messages}>
                            <div className={styles.messages__dialogs_messages_window}>
                                {userId && messages[userId]
                                    ? messages[userId].map(m => {
                                        return <div key={m.id}>
                                            <span><b>{m.outgoing
                                                ? 'BDmitriy'
                                                : interlocutorName && interlocutorName.name
                                            }: </b></span>
                                            <span>{m.message}</span>
                                            <span onClick={() => remove(m.id)}>
                                                <DeleteOutlined/>
                                            </span>
                                        </div>
                                    })
                                    : 'Select friend to start dialog'}
                            </div>
                            <EnterTextForm value={newMessageText}
                                           title={'Send message'}
                                           label={'New message'}
                                           onChange={onChange}
                                           send={send}/>
                        </div>
                    </div>
                </div>

            }
        </WithAuth>
    )
})

export default Messages