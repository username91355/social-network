import {
    changeSearchArea, changeShowingUsers,
    setInitStatus,
    setUsers, setWaitToSubscribing,
    subscribeToUser,
    unsubscribeFromUser,
    usersReducer,
    UsersStateType
} from "./users-reducer";

const testState: UsersStateType = {
    count: 10,
    page: 1,
    term: '',
    friend: null,
    userInitialization: 'SUCCESS',
    users: [
        {
            id: 11,
            name: 'First start user',
            status: 'Wait',
            followed: true,
            photos: {
                small: 'url_small_img',
                large: 'url_large_img'
            }
        },
        {
            id: 12,
            name: 'Second start user',
            status: 'Dance',
            followed: false,
            photos: {
                small: 'url_small_img',
                large: 'url_large_img'
            }
        }
    ],
    followingInProgress: []
}

test('Users-reducer: Set users', ()=> {

    const users = [
        {
            id: 10001,
            name: 'First user',
            status: 'Working',
            followed: true,
            photos: {
                small: 'url_small_img',
                large: 'url_large_img'
            }
        },
        {
            id: 10002,
            name: 'Second user',
            status: 'In vacation',
            followed: false,
            photos: {
                small: 'url_small_img',
                large: 'url_large_img'
            }
        },
        {
            id: 10003,
            name: 'Third user',
            status: 'In vacation',
            followed: false,
            photos: {
                small: 'url_small_img',
                large: 'url_large_img'
            }
        }
    ]

    const changedState = usersReducer(testState,setUsers(users))

    expect(changedState.users.length).toBe(3)
    expect(changedState.users).toEqual(users)
    expect(testState).not.toEqual(changedState)
})

test('Users-reducer: Set init status', ()=> {

    const changedState = usersReducer(testState,setInitStatus('TEST'))

    expect(changedState.userInitialization).toBe('TEST')
    expect(testState).not.toEqual(changedState)
})

test('Users-reducer: Subscribe to user', ()=> {

    const changedState = usersReducer(testState,subscribeToUser(12))

    expect(changedState.users[1].followed).toBeTruthy()
    expect(changedState.users[1]).toEqual({
        id: 12,
        name: 'Second start user',
        status: 'Dance',
        followed: true,
        photos: {
            small: 'url_small_img',
            large: 'url_large_img'
        }
    })
    expect(testState).not.toEqual(changedState)
})


test('Users-reducer: Unsubscribe to user', ()=> {

    const changedState = usersReducer(testState,unsubscribeFromUser(11))

    expect(changedState.users[0].followed).toBeFalsy()
    expect(changedState.users[0]).toEqual({
        id: 11,
        name: 'First start user',
        status: 'Wait',
        followed: false,
        photos: {
            small: 'url_small_img',
            large: 'url_large_img'
        }
    })
    expect(testState).not.toEqual(changedState)
})

test('Users-reducer: Set wait to subscribing', ()=> {

    const changedState = usersReducer(testState,setWaitToSubscribing(12))

    expect(changedState.followingInProgress).toEqual([12])
    expect(changedState.users[1]).toEqual({
        id: 12,
        name: 'Second start user',
        status: 'Dance',
        followed: false,
        photos: {
            small: 'url_small_img',
            large: 'url_large_img'
        }
    })
    expect(testState).not.toEqual(changedState)
})

test('Users-reducer: Remove wait to subscribing', ()=> {

    const changedState = usersReducer(testState,setWaitToSubscribing(11))

    expect(changedState.followingInProgress).toEqual([11])
    expect(changedState.users[0]).toEqual({
        id: 11,
        name: 'First start user',
        status: 'Wait',
        followed: true,
        photos: {
            small: 'url_small_img',
            large: 'url_large_img'
        }
    })
    expect(testState).not.toEqual(changedState)
})

test('Users-reducer: Change search area', ()=> {

    const changedState = usersReducer(testState, changeSearchArea('test'))

    expect(changedState.term).toBe('test')
    expect(testState).not.toEqual(changedState)
})

test('Users-reducer: Change showing users', ()=> {

    const changedState = usersReducer(testState, changeShowingUsers(true))

    expect(changedState.friend).toBeTruthy()
    expect(testState).not.toEqual(changedState)
})