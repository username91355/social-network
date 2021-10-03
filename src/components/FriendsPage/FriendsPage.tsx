import React from "react";

//FRIEND PAGE
function FriendsPage(props: any) {


    let addFriend = (id: string) => {
        props.addFriend(id)
    }

    let removeFriend = (id: string) => {
        props.removeFriend(id)
    }

    let friendsElements = props.state.allUsers.map((u: any) => <Friend
        key={u.id}
        id={u.id}
        name={u.name}
        onFriends={u.onFriends}
        addFriend={addFriend}
        removeFriend={removeFriend}
    />)

    return (
        <div>
            {friendsElements}
            <div>{props.state.friendsList}</div>
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

    let style = {
        width: '150px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr'
    }

    return (
        <div style={style}>
            <div>{props.name}</div>
            {(!props.onFriends) 
            ? <button onClick={add}>Add</button> 
            : <button onClick={remove}>Remove</button>}
        </div>
    )
}

type FriendPropsType = {
    id: string
    name: string
    onFriends: boolean
    removeFriend: (id: string) => void
    addFriend: (id: string) => void
}

export default FriendsPage