import {usersAPI} from "../../data/serverAPI";

//Action types
export const SET_DIALOGS = 'SET_DIALOGS'
export const CHANGE_NEW_MESSAGE_AREA = 'CHANGE_NEW_MESSAGE_AREA'
export const SEND_MESSAGE = 'SEND_MESSAGE'

//State
export const initialState = {

    dialogs: [],

    messages: {
        20345: [
            {id: 1, message: 'Hi!', outgoing: false},
            {id: 2, message: 'Hello!', outgoing: true},
            {id: 3, message: 'How are you?', outgoing: false},
            {id: 4, message: 'I`m fine. How ary you?', outgoing: true},
            {id: 5, message: 'I am OK.', outgoing: true},
            {id: 6, message: 'OK. Maybe go to the walk?', outgoing: false},
        ],
        20239: [
            {id: 1, message: 'Hello. What time do i need to arrive today?', outgoing: false},
            {id: 2, message: 'Hello. At 8pm', outgoing: true},
            {id: 3, message: 'Ok. Thx', outgoing: false}
        ],
        15190: [
            {id: 1, message: 'Hi. How are you?', outgoing: true},
            {id: 2, message: 'Good afternoon! I\'m on a business trip in Norway', outgoing: false},
        ],
        2: [
            {id: 1, message: 'Hi. Thanks for the help.', outgoing: true},
            {id: 2, message: 'Hi. You are always welcome!', outgoing: false},
            {id: 3, message: 'How are you?', outgoing: false},
        ]
    },
    newMessageText: ''
}

//Reducer
export const messagesReducer = (state: any = initialState, action: any) => {
    switch (action.type) {

        case SET_DIALOGS:
            return {
                ...state,
                dialogs: action.list
            }

        case CHANGE_NEW_MESSAGE_AREA:
            return {
                ...state,
                newMessageText: action.value
            }

        case SEND_MESSAGE: {

            const allMessageID = [...state.messages[action.userId].map((p:any) => p.id)]

            const generateID = (id: number): number => {
                return (allMessageID.some(i => +i === +id))
                    ? generateID(id + 1)
                    : id
            }

            return  {
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

        default:
            return state
    }
}

//Action creators
export const changeNewMessageArea = (value: string) => ({type: CHANGE_NEW_MESSAGE_AREA, value} as const)
export const sendMessage = (userId: number, message: string) => ({type: SEND_MESSAGE, userId, message} as const)
export const setDialogs = (list: any) => ({type: SET_DIALOGS, list} as const)

//Thunk
export const setDialogsTC = () => async (dispatch: any) => {
    const response = await usersAPI.getUsers(20, 1, '', true)
    dispatch(setDialogs(response.data.items))
}

//TYPSCRIPT
type initialStateType = {
    dialogs: Array<TUser>
    messages: Array<TMessage>
    newMessageText: string
}

export type TUser = {
    followed: boolean
    id: number
    name: string
    photos: {
        small: string | null
        large: string | null
    }
    status: string | null
    uniqueUrlName: string | null
}

type TMessage = {
    id: number
    message: string
    outgoing: boolean
}

export default messagesReducer