import axios from "axios"
import React, { useState, MouseEvent } from "react";
import { FilterType, setUsersAC } from "../../redux/reducers/FriendsPageReducer";
import classes from './FriendsPage.module.css'

//FRIEND PAGE
function FriendsPage(props: FriendsPagePropsType) {

    if(props.friendsPage.allUsers.length === 0) {
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
                {friendsElements}
                <div className={classes.friendsList__buttonBox}>
                    <button className={classes.friendsList__buttonBox_item}>Show all</button>
                    <button className={classes.friendsList__buttonBox_item}>Show my friends</button>
                    <button className={classes.friendsList__buttonBox_item}>Show users</button>
                </div>
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
                <button
                    className={classes.friendsList__item_button}
                    onClick={add}>Add</button>
            </div>
            : <div className={classes.friendsList__item}>
                <div className={classes.friendsList__item_name}>
                    {props.name}
                </div>
                <button
                    className={classes.friendsList__item_button}
                    onClick={remove}>Remove</button>
            </div>}
    </div>
    )
}

type FriendsPagePropsType   = {
    friendsPage: FriednsPageStateType
    addFriend: (id:string) => void
    removeFriend: (id:string) => void
    setUsers: (users: any | never) => void
}

type FriednsPageStateType = {
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