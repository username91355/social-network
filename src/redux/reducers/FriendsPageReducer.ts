import { v1 } from "uuid"

//Action types
const ADD_FRIEND = 'ADD_FRIEND'
const REMOVE_FROM_FRIEND = 'REMOVE_FROM_FRIEND'
const SET_USERS = 'SET_USERS'

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

const setUsersAC = (users: any | never) => {
    return {
        type: SET_USERS,
        users: users
    }
}

let initialState: FriednsPageStateType = {

    allUsers: [
        
    ]
}

let FriednsPageReducer = (state = initialState, action: ActionCreatortype) => {
    switch (action.type) {
        
        case SET_USERS: {
            return {...state, 
                allUsers: [...state.allUsers, ...action.users.items]
            }
        }

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
    users?: any
    id?: string
    key?: string
}

export type FilterType = 'FILTER_ALL' | 'FILTER_FRIENDS' | 'FILTER_USERS'

// export type ServerUserType = {
//     followed: boolean
//     id: number
//     name: string
//     photos: ServerUserPhotoType
//     status?: null
//     uniqueUrlName?: null
// }

// export type ServerUserPhotoType = {
//     large: null
//     small: null
// }
    

export {addFriendAC, removeFromFriendAC, setUsersAC}
export default FriednsPageReducer