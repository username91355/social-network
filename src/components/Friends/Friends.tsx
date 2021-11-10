import React from 'react';
import styles from './Friends.module.css'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Button} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

type FriendsPropsType = {
    users: Array<UserType>,
    addFriend: (id: number) => void
    removeFriend: (id: number) => void
}

type FriendItemPropsType = {
    name: string
    onFriend: boolean
    addOnFriend: () => void
    removeFromFriend: () => void
}

type UserType = {
    id: number
    name: string
    onFriend: boolean
}

export const Friends: React.FC<FriendsPropsType> = ({users, addFriend, removeFriend}) => {

    return (
        <div className={styles.friends__wrapper}>
            <div>________________Search_________________</div>
            {users.map((u: any) => {

                const addOnFriend = () => {
                    addFriend(u.id)
                }

                const removeFromFriend = () => {
                    removeFriend(u.id)
                }

                return (
                    <div key={u.id} className={styles.friends__user}>
                        <FriendItem name={u.name}
                                    onFriend={u.onFriend}
                                    addOnFriend={addOnFriend}
                                    removeFromFriend={removeFromFriend}/>
                    </div>
                )
            })}
        </div>
    );
}

const FriendItem: React.FC<FriendItemPropsType> = ({
                                                       name,
                                                       onFriend,
                                                       addOnFriend,
                                                       removeFromFriend
                                                   }) => {
    return (
        <div className={styles.friendItem__wrapper}>
            <div className={styles.friendItem__avatar}>img</div>
            <div className={styles.friendItem__info}>{name}</div>
            <div className={styles.friendItem__interface}>
                {onFriend
                    ?<Button variant="contained"
                             startIcon={<HighlightOffIcon />}
                             onClick={removeFromFriend}>Remove
                    </Button>
                    : <Button variant="contained"
                              startIcon={<AddCircleOutlineIcon />}
                              onClick={addOnFriend}>Add</Button>
                }
            </div>
        </div>
    )
}