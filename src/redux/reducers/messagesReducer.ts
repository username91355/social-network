//Action type
const SEND_MESSAGE = 'SEND_MESSAGE'
const REMOVE_MESSAGE = 'REMOVE_MESSAGE'
const CHANGE_NEW_MESSAGE_AREA = 'CHANGE_NEW_MESSAGE_AREA'

//Action creator
export const sendMessage = () => ({type: SEND_MESSAGE} as const)
export const removeMessage = (id: number) => ({type: REMOVE_MESSAGE, id} as const)
export const changeNewMessageArea = (text: string) => ({type: CHANGE_NEW_MESSAGE_AREA, text} as const)

//Types
type MessagesStateType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageArea: string
}
export type DialogType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}
type MessagesActionType = SendMessageType | RemoveMessageType | ChangeNewMessageArea
type SendMessageType = ReturnType<typeof sendMessage>
type RemoveMessageType = ReturnType<typeof removeMessage>
type ChangeNewMessageArea = ReturnType<typeof changeNewMessageArea>

//State
let initialState: MessagesStateType = {

    dialogs: [
        {id: 1, name: 'Alexandr'},
        {id: 2, name: 'Anvar'},
        {id: 3, name: 'Anna'},
        {id: 4, name: 'Igor'},
        {id: 5, name: 'Lena'},
    ],

    messages: [
        {id: 1, message: 'Hi!'},
        {id: 2, message: 'Hello!'},
        {id: 3, message: 'How are you?'},
        {id: 4, message: 'I`m fine. How ary you?'},
        {id: 5, message: 'I am OK.'},
        {id: 6, message: 'OK. Mebye go to the walk?'},
    ],

    newMessageArea: ''
}

//Reducer
export const messagesReducer = (state: MessagesStateType = initialState, action: MessagesActionType) => {
    switch (action.type) {

        case SEND_MESSAGE: {

            const allMessageID = [...state.messages.map(i=> i.id)]
            let newID = 1

            const generateID = (id: number): number => {
                return (allMessageID.some(i => +i === +id))
                    ? generateID(id+1)
                    : id
            }

            return {
                ...state,
                messages: [...state.messages, {
                    id: generateID(newID),
                    message: state.newMessageArea
                }],
                newMessageArea: ''
            }
        }

        case REMOVE_MESSAGE: {
            return {
                ...state,
                messages: state.messages.filter(i => i.id !== action.id)
            }
        }

        case CHANGE_NEW_MESSAGE_AREA: {
            return {
                ...state,
                newMessageArea: action.text
            }
        }

        default: {
            return state
        }
    }
}