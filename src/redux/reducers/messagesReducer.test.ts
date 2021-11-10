import {changeNewMessageArea, messagesReducer, removeMessage, sendMessage} from "./messagesReducer";

const startState = {

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

test('Messages reducer, send message', ()=> {
    let localStartState = {...startState}
    localStartState.newMessageArea = 'New message'

    const result = messagesReducer(localStartState,sendMessage())

    expect(result.messages.length).toBe(7)
    expect(result.dialogs.length).toBe(5)
    expect(result.messages[6].id).toBe(7)
    expect(result.messages[6].message).toBe('New message')
    expect(result).not.toEqual(localStartState)
})

test('Messages reducer, remove message', ()=> {

    const result = messagesReducer(startState,removeMessage(2))

    expect(result.messages.length).toBe(5)
    expect(result.dialogs.length).toBe(5)
    expect(result.messages.some(i=> i.id === 2)).toBeFalsy()
    expect(result.messages[1].id).toBe(3)
    expect(result).not.toEqual(startState)
})

test("Profile reducer, change post text area", () => {

    const result = messagesReducer(startState,changeNewMessageArea('test'))

    expect(result.newMessageArea).toBe('test')
    expect(result).not.toEqual(startState)
})