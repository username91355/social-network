import { v1 } from "uuid"

//Action types
const ADD_FRIEND = 'ADD_FRIEND'
const REMOVE_FROM_FRIEND = 'REMOVE_FROM_FRIEND'

//Action Creators
const addFriendAC = (id: string) => {
    return {
        type: ADD_FRIEND,
        id: id
    }
}

const removeFromFriendAC = (id: string) => {
    return {
        type: REMOVE_FROM_FRIEND,
        id: id
    }
}

let initialState: FriednsPageStateType = {

    allUsers: [
        { id: v1(), name: 'Dima' , onFriends: false},
        { id: v1(), name: 'Anvar' , onFriends: false},
        { id: v1(), name: 'Alexandr' , onFriends: false},
        { id: v1(), name: 'Alice' , onFriends: false},
        { id: v1(), name: 'Olga' , onFriends: false}
    ]
}

let FriednsPageReducer = (state = initialState, action: ActionCreatortype) => {
    switch (action.type) {
        case ADD_FRIEND: {
            return {
                ...state,
                allUsers: state.allUsers.map(user => {
                    return (user.id === action.id) 
                    ? {...user, onFriends: true} 
                    : user
                })
            }
        }

        case REMOVE_FROM_FRIEND: {
            return {
                ...state,
                allUsers: state.allUsers.map(user => {
                    return (user.id === action.id) 
                    ? {...user, onFriends: false} 
                    : user
                })
            }
        }

        default: {
            return state
        }
    }

}

type FriednsPageStateType = {
    allUsers: Array<UserType>
}

type UserType = {
    id: string
    name: string
    onFriends: boolean
}

type ActionCreatortype = {
    type: string
    id: string
}

export {addFriendAC, removeFromFriendAC}
export default FriednsPageReducer