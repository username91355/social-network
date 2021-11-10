// export const addFriend = (id: number) => ({type: ADD_FRIEND, id} as const)
// export const removeFriend = (id: number) => ({type: REMOVE_FRIEND, id} as const)
import {addFriend, removeFriend, StateType, usersReducer} from "./usersReducer";

let startState: StateType = {
    users: [
        {id:1, name: 'Dmitriy', onFriend: true},
        {id:2, name: 'Alexandr', onFriend: true},
        {id:3, name: 'Elena', onFriend: false},
        {id:4, name: 'Igor', onFriend: false},
        {id:5, name: 'Anvar', onFriend: false}
    ]
}

test("Users reducer, add fiends", ()=> {

    const result = usersReducer(startState,addFriend(3))

    expect(result.users.length).toBe(5)
    expect(result.users[2].onFriend).toBeTruthy()
    expect(result.users[3].onFriend).toBeFalsy()
    expect(result).not.toEqual(startState)
})

test("Users reducer, remove friend", ()=> {

    const result = usersReducer(startState,removeFriend(1))

    expect(result.users.length).toBe(5)
    expect(result.users[0].onFriend).toBeFalsy()
    expect(result.users[1].onFriend).toBeTruthy()
    expect(result).not.toEqual(startState)
})


