
//ActionsTypes
const ADD_FRIEND = 'ADD_FRIEND'
const REMOVE_FRIEND = 'REMOVE_FRIEND'

//ActionCreator
export const addFriend = (id: number) => ({type: ADD_FRIEND, id} as const)
export const removeFriend = (id: number) => ({type: REMOVE_FRIEND, id} as const)

//Types
type UserType = {
    id: number
    name: string
    onFriend: boolean
}
export type StateType = {
    users: Array<UserType>
}
type GeneralACType = AddFriendType | RemoveFriend
type AddFriendType = ReturnType<typeof addFriend>
type RemoveFriend = ReturnType<typeof removeFriend>

//State
const initialState = {
    users: [
        {id:1, name: 'Dmitriy', onFriend: true},
        {id:2, name: 'Alexandr', onFriend: true},
        {id:3, name: 'Elena', onFriend: false},
        {id:4, name: 'Igor', onFriend: false},
        {id:5, name: 'Anvar', onFriend: false}
    ]
}

//Reducer
export const usersReducer = (state: StateType = initialState, action: GeneralACType) => {
    switch (action.type) {
        case ADD_FRIEND: {
            return {
                ...state,
                users: state.users.map( u => u.id === action.id ? {...u, onFriend: true} : u)
            }
        }

        case REMOVE_FRIEND: {
            return {
                ...state,
                users: state.users.map( u => u.id === action.id ? {...u, onFriend: false} : u)
            }
        }

        default: {
            return state
        }
    }
}