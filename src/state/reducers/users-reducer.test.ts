import {
    addFriend,
    removeFriend,
    removeSubscriptionStatus,
    setSubscriptionStatus,
    setUsers,
    usersReducer
} from "./users-reducer";

const testState = {
    count: 1,
    page: 10,
    term: '',
    friend: null,
    totalCount: null,
    users: [],
    subscriptionProcess: [8, 9],
    usersError: null
}

const testUser = {
    id: 1,
    status: 'status',
    name: 'name',
    followed: false,
    photos: {
        small: 'small',
        large: 'large'
    }
}

const testFriend = {
    id: 2,
    status: 'friendStatus',
    name: 'friendName',
    followed: true,
    photos: {
        small: 'small',
        large: 'large'
    }
}

const tStateWithUsers = {
    count: 1,
    page: 10,
    term: '',
    friend: null,
    totalCount: null,
    users: [testUser, testFriend],
    subscriptionProcess: [8, 9],
    usersError: null
}

describe('User-reducer tests', () => {
    it('Messages reducer with unknown action', () => {
        //@ts-ignore
        const result = usersReducer(testState, {type: 'UNKNOWN_REDUCER'})

        expect(result).toBe(testState)
    })
    it('Set users', () => {
        const result = usersReducer(testState, setUsers([testUser, testFriend], 2))

        expect(result.totalCount).toBe(2)
        expect(result.users.length).toBe(2)
        expect(result.users[0]).toEqual(testUser)
        expect(result.users[1]).toEqual(testFriend)
        expect(result).not.toBe(testState)
    })
    it('Set subscription status', () => {
        const result = usersReducer(testState, setSubscriptionStatus(7))

        expect(result.subscriptionProcess).toContain(7)
        expect(result.subscriptionProcess.length).toBe(3)
        expect(result).not.toBe(testState)
    })
    it('Remove subscription status', () => {
        const result = usersReducer(testState, removeSubscriptionStatus(9))

        expect(result.subscriptionProcess).not.toContain(9)
        expect(result.subscriptionProcess.length).toBe(1)
        expect(result).not.toBe(testState)
    })
    it('Add friend', () => {
        const result = usersReducer(tStateWithUsers, addFriend(1))

        expect(result.users[0].followed).toBeTruthy()
        expect(result.users[1]).toEqual(testFriend)
        expect(result).not.toBe(tStateWithUsers)
    })
    it('Remove friend', () => {
        const result = usersReducer(tStateWithUsers, removeFriend(2))

        expect(result.users[0]).toEqual(testUser)
        expect(result.users[1].followed).toBeFalsy()
        expect(result).not.toBe(tStateWithUsers)
    })
})