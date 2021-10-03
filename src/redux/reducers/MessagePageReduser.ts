import { type } from "os"
import { v1 } from "uuid"

//Action types
const CHANGE_MESSAGE_TEXT_AREA = 'CHANGE_MESSAGE_TEXT_AREA'
const SEND_MESSAGE = 'SEND_MESSAGE'

//Action Creators
const sendMessageAC = (userId: string, value: string) => {
    return {
        type: SEND_MESSAGE,
        userId: userId,
        value: value
    }
}

const changeMessageTextAreaAC = (value: string) => {
    return {
        type: CHANGE_MESSAGE_TEXT_AREA,
        value: value
    }
}

let initialState: MessagesStateType  = {

    messages: [
        {id: v1(), userId: '5', incoming: true, text: 'Hello'},
        {id: v1(), userId: '5', incoming: true, text: 'You want go to walk?'},
        {id: v1(), userId: '0', incoming: false, text: 'HI. Yes i want'},
        {id: v1(), userId: '5', incoming: true, text: 'Great. See you soon.'},
        {id: v1(), userId: '0', incoming: false, text: 'Ok)'}
    ],

    newMessageTextArea: ''

}

let MessagesPageReducer = (state: MessagesStateType  = initialState, action: ActionType) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            return {
                ...state,
                messages: [state.messages, {
                    id: v1(),
                    userId: action.userId,
                    incoming: action.userId !== '0',
                    text: action.value
                }]
            }
        }

        case CHANGE_MESSAGE_TEXT_AREA: {
            return {
                ...state,
                newMessageTextArea: action.value
            }
        }

        default: {
            return state
        }
    }
}

type MessagesStateType = {
    messages: Array<MessageType>
    newMessageTextArea: string
}

type MessageType = {
    id: string
    userId: string
    incoming: boolean
    text: string
}

type ActionType = {
    type: string
    id: string
    userId: string
    value: string
}

export { sendMessageAC, changeMessageTextAreaAC }
export default MessagesPageReducer