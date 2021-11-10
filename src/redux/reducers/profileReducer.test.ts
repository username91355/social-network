import {addPost, changePostTextArea, login, logout, profileReducer, removePost} from "./profileReducer";

const startState = {
    isInitializationUser: true,
    userData: {
        userId: null,
        lookingForAJob: null,
        lookingForAJobDescription: null,
        fullName: 'Alice',
        contacts: {
            github: null,
            vk: null,
            facebook: null,
            instagram: null,
            twitter: null,
            website: null,
            youtube: null,
            mainLink: null
        },
        photos: {
            small: null,
            large: null
        }

    },
    posts: [
        {id: 2, author: 'Alice', text: 'Do you like this?', likes: 12, comments: 3},
        {id: 1, author: 'Alice', text: 'Hello!!! It`s my Social network', likes: 20, comments: 4}
    ],
    newPostAreaValue: ''
}

test("Profile reducer, login", ()=> {
    let localStartState = {...startState}
    localStartState.isInitializationUser = false

    const result = profileReducer(localStartState,login())

    expect(result.isInitializationUser).toBeTruthy()
    expect(result).not.toEqual(localStartState)
})

test("Profile reducer, logout", ()=> {

    const result = profileReducer(startState,logout())

    expect(result.isInitializationUser).toBeFalsy()
    expect(result).not.toEqual(startState)
})

test("Profile reducer, add post", () => {
    let localStartState = {...startState}
    localStartState.newPostAreaValue = 'POST TEST TEXT'

    const result = profileReducer(localStartState,addPost())

    expect(result.newPostAreaValue).toBe('')
    expect(result.posts.length).toBe(3)
    expect(result.posts[0].text).toBe('POST TEST TEXT')
    expect(result.posts[0].id).toBe(3)
    expect(result).not.toEqual(localStartState)
})

test("Profile reducer, remove post", () => {

    const result = profileReducer(startState,removePost(1))

    expect(result.posts.length).toBe(1)
    expect(result.posts[0].id).toBe(2)
    expect(result.posts[0].text).toBe('Do you like this?')
    expect(result).not.toEqual(startState)
})

test("Profile reducer, change post text area", () => {

    const result = profileReducer(startState,changePostTextArea('test'))

    expect(result.newPostAreaValue).toBe('test')
    expect(result).not.toEqual(startState)
})