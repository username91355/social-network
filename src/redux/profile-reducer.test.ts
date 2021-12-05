import profileReducer, {
    CHANGE_NEW_MESSAGE_AREA, SEND_MESSAGE,
    SET_PROFILE,
    SET_STATUS,
    TProfile
} from "./profile-reducer";

const testState = {
    profile: null,
    status: null,

    posts: [
        {id: 1, text: "Hello React! It,s my first post!", likes: 20, comment: 5},
        {id: 2, text: "Second post! I`am find.", likes: 5, comment: 2}
    ],

    dialogs: [
        {id: 1, name: 'Alexandr'},
        {id: 2, name: 'Anvar'}
    ],

    messages: [
        {id: 1, message: 'Hi!', outgoing: false},
        {id: 2, message: 'Hello!', outgoing: true}
    ],

    newMessageText: ''
}

test('Profile reducer: set profile', () => {
    const profile: TProfile = {
        aboutMe: 'aboutMe',
        contacts: {
            vkontakte: 'vkontakte',
            facebook: 'facebook'
        },
        lookingForAJob: true,
        lookingForAJobDescription: 'lookingForAJobDescription',
        fullName: 'TestName',
        userId: 1,
        photos: {
            small: 'small',
            large: 'large'
        }
    }


    const result = profileReducer(testState, {type: SET_PROFILE, profile})

    expect(result.profile).not.toBe(null)
    expect(result.profile.fullName).toBe('TestName')
    expect(result.profile.contacts.vkontakte).toBe('vkontakte')
    expect(result).not.toEqual(testState)
})

test('Profile reducer: set status', () => {

    const result = profileReducer(testState, {type: SET_STATUS, status: 'Test status'})

    expect(result.status).not.toBe(null)
    expect(result).not.toEqual(testState)
})


test('Profile reducer: Change new message area', () => {

    const result = profileReducer(testState, {type: CHANGE_NEW_MESSAGE_AREA, value: 'text'})

    expect(result.newMessageText).toBe('text')
    expect(result).not.toEqual(testState)
})

test('Profile reducer: Send message', () => {
    const testSendMessageState = {...testState, newMessageText: 'Message'}
    const result = profileReducer(testSendMessageState, {type: SEND_MESSAGE})

    expect(result.messages.length).toBe(3)
    expect(result.messages[2]).toEqual({id:3, message: 'Message', outgoing: true})
    expect(result).not.toEqual(testSendMessageState)
})