//Action Types
import {serverAPI, User} from "../../api/api";
import {ThunkType} from "../redux";

const SET_USERS = 'SET_USERS'

//Initial state
const initialState = {
    count: 10,
    page: 1,
    term: '',
    friend: null,
    users: [],
}

//Reducer
export const usersReducer = (state: IUsersState = initialState, action: any) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        default:
            return state
    }
}

//Types
interface IUsersState {
    count: number
    page: number
    term: string
    friend: null
    users: User[]
}

//Action creators
const setUsers = (users: User[]) => ({type: SET_USERS, users})

//Thunk

export const usersInitialization = (count: number, page: number, term: string, friend: boolean | null): ThunkType =>
    async dispatch => {
        const result = await serverAPI.getUser(count,page,term,friend)

        if(!result.error) {
            dispatch(setUsers(result.items))
        }
    }