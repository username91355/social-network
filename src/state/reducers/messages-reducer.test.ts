import {addFriend, removeFriend} from "./users-reducer";
import {
    changeNewMessageArea,
    messagesReducer,
    removeMessage,
    sendMessage,
    setFriendsList
} from "./messages-reducer";

const testUser = {
    id: 5,
    name: 'name',
    status: 'status',
    photos: {
        small: 'smallPhoto',
        large: 'largePhoto'
    },
    followed: true
}

export const testState = {

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
        19850: [
            {id: 1, message: 'Hi. How are you?', outgoing: true},
            {id: 2, message: 'Good afternoon! I\'m on a business trip in Norway', outgoing: false},
        ],
        2: [
            {id: 1, message: 'Hi. Thanks for the help.', outgoing: true},
            {id: 2, message: 'Hi. You are always welcome!', outgoing: false},
            {id: 3, message: 'How are you?', outgoing: false},
        ]
    },
    newMessageText: 'test',
    messagesError: ''
}

describe('Messages-reducer tests', () => {
    it('Messages reducer with unknown action', () => {
        //@ts-ignore
        const result = messagesReducer(testState, {type: 'UNKNOWN_REDUCER'})

        expect(result).toBe(testState)
    })
    it('Send message', () => {
        const result = messagesReducer(testState, sendMessage(19850))

        expect(result.messages[19850][2].id).toBe(3)
        expect(result.messages[19850][2].message).toBe('test')
        expect(result.messages[19850][2].outgoing).toBeTruthy()
        expect(result.messages[20345]).toEqual(testState.messages[20345])
        expect(result.messages[2]).toEqual(testState.messages[2])
        expect(Object.keys(result.messages).length).toBe(3)
        expect(result).not.toBe(testState)
    })
    it('Remove message', () => {
        const result = messagesReducer(testState, removeMessage(19850, 1))

        expect(result.messages[20345]).toEqual(testState.messages[20345])
        expect(result.messages[19850][0]).toEqual(testState.messages[19850][1])
        expect(Object.keys(result.messages[19850]).length).toBe(1)
        expect(result).not.toBe(testState)
    })
    it('Set friends list', () => {
        const result = messagesReducer(testState, setFriendsList([testUser]))

        expect(result.friends.length).toBe(1)
        expect(result.friends[0]).toBe(testUser)
        expect(result).not.toBe(testState)
    })
    it('Change new message area', () => {
        const result = messagesReducer(testState, changeNewMessageArea('new text'))

        expect(result.newMessageText).toBe('new text')
        expect(result).not.toBe(testState)
    })
    it('Add friend', () => {
        const result = messagesReducer(testState, addFriend(123))

        expect(Object.keys(result.messages).length).toBe(4)
        expect(Object.keys(result.messages)).toContain('123')
        expect(result).not.toBe(testState)
    })
    it('Remove friend', () => {
        const result = messagesReducer(testState, removeFriend(2))

        expect(Object.keys(result.messages).length).toBe(2)
        expect(Object.keys(result.messages)).not.toContain('2')
        expect(result).not.toBe(testState)
    })
})