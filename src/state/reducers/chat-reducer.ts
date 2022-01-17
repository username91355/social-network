import {chatAPI, IChatMessage, TWSStatus} from "../../api/chat-api";
import {ThunkType} from "../store";
import {handlingError} from "../../utils/error-utils";
import {Dispatch} from "redux";

const SET_CHAT_MESSAGES = 'socialNetwork/messagesReducer/SET_CHAT_MESSAGES'
const SET_WEB_SOCKED_STATUS = 'socialNetwork/messagesReducer/SET_WEB_SOCKED_STATUS'
const SET_CHAT_MESSAGES_EMPTY = 'socialNetwork/messagesReducer/SET_CHAT_MESSAGES_EMPTY'

const iState = {
    messages: [] as IChatMessage[],
    statusWS: 'pending' as TWSStatus
}

export const chatReducer = (state: TState = iState, action: TChatActions) => {
    switch (action.type) {
        case SET_CHAT_MESSAGES:
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        case SET_WEB_SOCKED_STATUS:
            return {
                ...state,
                statusWS: action.payload.status
            }
        case SET_CHAT_MESSAGES_EMPTY:
            return {
                ...state,
                messages: []
            }
        default:
            return state
    }
}

//Actions
export const setChatMessages = (messages: IChatMessage[]) => ({
    type: SET_CHAT_MESSAGES,
    payload: {messages}
} as const)

export const setWebSockedStatus = (status: TWSStatus) => ({
    type: SET_WEB_SOCKED_STATUS,
    payload: {status}
} as const)

export const setChatMessagesEmpty = () => ({
    type: SET_CHAT_MESSAGES_EMPTY
} as const)

//thunks
let _newMessageHandler: ((messages: IChatMessage[]) => void) | null = null
let _newMessageStatusChangedHandler: ((status: TWSStatus) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(setChatMessages(messages))
        }
    }
    return _newMessageHandler
}

const newMessageStatusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageStatusChangedHandler === null) {
        _newMessageStatusChangedHandler = (status) => {
            dispatch(setWebSockedStatus(status))
        }
    }
    return _newMessageStatusChangedHandler
}

export const startMessagesListening = (): ThunkType => async dispatch => {
    try {
        chatAPI.start()
        chatAPI.subscribe('message-received', newMessageHandlerCreator(dispatch))
        chatAPI.subscribe('status-change', newMessageStatusChangedHandlerCreator(dispatch))

    } catch (err) {
        handlingError(dispatch, err)
    }
}

export const stopMessagesListening = (): ThunkType => async dispatch => {
    try {
        chatAPI.unsubscribe('message-received', newMessageHandlerCreator(dispatch))
        chatAPI.unsubscribe('status-change', newMessageStatusChangedHandlerCreator(dispatch))
        chatAPI.stop()
        dispatch(setChatMessagesEmpty())
    } catch (err) {
        handlingError(dispatch, err)
    }
}

export const sendChatMessage = (message: string): ThunkType => async dispatch => {
    try {
        chatAPI.send(message)

    } catch (err) {
        handlingError(dispatch, err)
    }
}

//types
type TState = typeof iState
export type TChatActions = | TSetChatMessages | TSetWebSockedStatus | TSetChatMessagesEmpty
type TSetChatMessages = ReturnType<typeof setChatMessages>
type TSetWebSockedStatus = ReturnType<typeof setWebSockedStatus>
type TSetChatMessagesEmpty = ReturnType<typeof setChatMessagesEmpty>
