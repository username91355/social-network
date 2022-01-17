const subscribers = {
    'message-received': [] as TMessagesSubscriber[],
    'status-change': [] as TStatusChangedSubscriber[]
}

let ws: WebSocket | null = null;

function closeHandler() {
    giveToSubscribersAboutStatus('pending')
    setTimeout(createChannel, 3000)
}

function openHandler() {
    giveToSubscribersAboutStatus('ready')
}

function errorHandler() {
    giveToSubscribersAboutStatus('error')
    console.error('WS ERROR! Refresh page')
}

function messageHandler(e: MessageEvent) {
    let messages = JSON.parse(e.data)
    subscribers['message-received'].forEach(s => s(messages))
}

function cleanUp() {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.addEventListener('open', openHandler)
    ws?.addEventListener('error', errorHandler)
}

function giveToSubscribersAboutStatus (status: TWSStatus) {
    subscribers["status-change"].forEach( s => s(status))
}

function createChannel() {
    cleanUp()
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    giveToSubscribersAboutStatus('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}

export const chatAPI = {
    start() {
        createChannel()
    },

    stop() {
        subscribers["message-received"] = []
        subscribers["status-change"] = []
        cleanUp()
        ws?.close()

    },

    subscribe(eventName: TEvent, callback: TMessagesSubscriber | TStatusChangedSubscriber) {
        //@ts-ignore
        subscribers[eventName].push(callback)
    },

    unsubscribe(eventName: TEvent, callback: TMessagesSubscriber | TStatusChangedSubscriber) {
        //@ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },

    send(message: string) {
        ws?.send(message)
    }
}

//types

export interface IChatMessage {
    message: string
    photo: string
    userId: 2
    userName: string
}

type TMessagesSubscriber = (messages: IChatMessage[]) => void
type TStatusChangedSubscriber = (status: TWSStatus) => void
export type TWSStatus = 'pending' | 'ready' | 'error'
type TEvent = 'message-received' | 'status-change'