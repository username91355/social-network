import {IUser, serverAPI} from "../../api/api";
import {ADD_TO_FRIENDS, REMOVE_FROM_FRIENDS, TAddFriend, TRemoveFriend} from "./users-reducer";
import {setAppError} from "./app-reducer";
import {handlingError, throwNewError} from "../../utils/error-utils";

//constants
const SET_FRIEND_LIST = 'socialNetwork/messagesReducer/SET_FRIEND_LIST';
const CHANGE_NEW_MESSAGE_AREA = 'socialNetwork/messagesReducer/CHANGE_NEW_MESSAGE_AREA';
const SEND_MESSAGE = 'socialNetwork/messagesReducer/SEND_MESSAGE';
const REMOVE_MESSAGE = 'socialNetwork/messagesReducer/REMOVE_MESSAGE';

//initialization state
export const iState = {

    friends: [],

    messages: {
        20345: [
            {id: 1, message: 'Hi!', outgoing: false},
            {id: 2, message: 'Hello!', outgoing: true},
            {id: 3, message: 'How are you?', outgoing: false},
            {id: 4, message: 'I`m fine. How ary you?', outgoing: true},
            {id: 5, message: 'I am OK.', outgoing: true},
            {id: 6, message: 'OK. Maybe go to the walk?', outgoing: false},
        ],
        // 19850: [
        //     {id: 1, message: 'Hi. How are you?', outgoing: true},
        //     {id: 2, message: 'Good afternoon! I\'m on a business trip in Norway', outgoing: false},
        // ],
        21486: [
            {id: 1, message: 'Hi. How are you?', outgoing: true},
            {id: 2, message: 'Good afternoon! I\'m on a business trip in Norway', outgoing: false},
        ],
        2: [
            {id: 1, message: 'Hi. Thanks for the help.', outgoing: true},
            {id: 2, message: 'Hi. You are always welcome!', outgoing: false},
            {id: 3, message: 'How are you?', outgoing: false},
        ]
    },
    newMessageText: '',
    messagesError: ''
}

//reducer
export const messagesReducer = (state: IMessagesState = iState, action: TMessagesReducerActions) => {
    switch (action.type) {
        case SET_FRIEND_LIST:
            const friendsIdList = action.list.map(i => i.id);
            const friendsWithoutDialog = friendsIdList.filter(i => {
                return Object.keys(state.messages).indexOf('' + i) === -1
            })
            const restUsers = friendsWithoutDialog.map(i => ({[i]: []}))
            Object.assign(state.messages, ...restUsers)

            return {
                ...state,
                friends: action.list,
                messages: {...state.messages}
            }
        case CHANGE_NEW_MESSAGE_AREA:
            return {
                ...state,
                newMessageText: action.value
            }
        case SEND_MESSAGE: {
            const allMessageID = [...state.messages[action.userId].map((p: any) => p.id)]
            const generateID = (id: number): number => {
                return (allMessageID.some(i => +i === +id))
                    ? generateID(id + 1)
                    : id
            }
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.userId]: [
                        ...state.messages[action.userId],
                        {
                            id: generateID(Math.max(...allMessageID)),
                            message: state.newMessageText,
                            outgoing: true
                        }]
                },
                newMessageText: ''
            }
        }
        case REMOVE_MESSAGE:
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.userId]: state.messages[action.userId].filter(m => m.id !== action.messageId)
                },
            }
        case ADD_TO_FRIENDS:
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.userId]: []
                }
            }
        case REMOVE_FROM_FRIENDS:
            delete state.messages[action.userId]
            return {...state}
        default:
            return state
    }
}

//action creators
export const sendMessage = (userId: number) => ({type: SEND_MESSAGE, userId} as const)
export const removeMessage = (userId: number, messageId: number) => ({type: REMOVE_MESSAGE, userId, messageId} as const)
export const setFriendsList = (list: IUser[]) => ({type: SET_FRIEND_LIST, list} as const)
export const changeNewMessageArea = (value: string) => ({type: CHANGE_NEW_MESSAGE_AREA, value} as const)

//thunks
export const setFriends = () => async (dispatch: any) => {
    try {
        dispatch(setAppError(null))
        const response = await serverAPI.getUsers(20, 1, '', true)

        if (!response.error) {
            dispatch(setFriendsList(response.items))
        } else {
            throwNewError(dispatch, response.error)
        }
    } catch (err) {
        handlingError(dispatch, err)
    }
}

//types
interface IMessagesState {
    friends: IUser[]
    messages: {
        [key: number]: IMessage[]
    }
    newMessageText: string
}

export interface IMessage {
    id: number
    message: string
    outgoing: boolean
}

export type TMessagesReducerActions =
    TSendMessage
    | TRemoveMessage
    | TSetFriendsList
    | TChangeNewMessageArea
    | TAddFriend
    | TRemoveFriend
type TSendMessage = ReturnType<typeof sendMessage>
type TRemoveMessage = ReturnType<typeof removeMessage>
type TSetFriendsList = ReturnType<typeof setFriendsList>
type TChangeNewMessageArea = ReturnType<typeof changeNewMessageArea>