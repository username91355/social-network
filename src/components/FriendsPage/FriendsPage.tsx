import axios from "axios"
import React from "react";
import classes from './FriendsPage.module.css'
import {Button, ButtonGroup} from "@mui/material";

//FRIEND PAGE
function FriendsPage(props: FriendsPagePropsType) {

    if (props.friendsPage.allUsers.length === 0) {
        axios
            .get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
                debugger
                props.setUsers(response.data)
            })
    }

    let addFriend = (id: string) => {
        props.addFriend(id)
    }

    let removeFriend = (id: string) => {
        props.removeFriend(id)
    }

    let friendsElements = props.friendsPage.allUsers.map((u: any) => <Friend
        key={u.id}
        id={u.id}
        name={u.name}
        onFriends={u.onFriends}
        addFriend={addFriend}
        removeFriend={removeFriend}
    />)

    return (
        <div>
            <div className={classes.friendsList__wrapper}>
                <ButtonGroup className={classes.friendsList__buttonBox}
                             variant="contained"
                             aria-label="outlined primary button group">
                    <Button>Show all</Button>
                    <Button>Show my friends</Button>
                    <Button>Show users</Button>
                </ButtonGroup>

                {friendsElements}
            </div>
        </div>
    )
}

//FRIEND ITEM
function Friend(props: FriendPropsType) {

    let add = () => {
        props.addFriend(props.id)
    }

    let remove = () => {
        props.removeFriend(props.id)
    }

    return (<div>
            {(!props.onFriends)
                ? <div className={classes.friendsList__item}>
                    <div className={classes.friendsList__item_name}>
                        {props.name}
                    </div>
                    <Button variant="contained" className={classes.friendsList__item_button}
                            onClick={add}>ADD</Button>
                </div>
                : <div className={classes.friendsList__item}>
                    <div className={classes.friendsList__item_name}>
                        {props.name}
                    </div>
                    <Button variant="contained" className={classes.friendsList__item_button}
                            onClick={remove}>Remove</Button>
                </div>}
        </div>
    )
}

type FriendsPagePropsType = {
    friendsPage: FriendsPageStateType
    addFriend: (id: string) => void
    removeFriend: (id: string) => void
    setUsers: (users: any | never) => void
}

type FriendsPageStateType = {
    allUsers: Array<UserType>
}

type UserType = {
    id: string
    name: string
    onFriends: boolean
}

type FriendPropsType = {
    id: string
    name: string
    onFriends: boolean
    removeFriend: (id: string) => void
    addFriend: (id: string) => void
}

export default FriendsPage