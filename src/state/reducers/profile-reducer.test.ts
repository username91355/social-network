import {
    addPost,
    changeNewPostText,
    profileReducer,
    ProfileStatus,
    removePost,
    setProfile,
    setProfileInitStatus,
    setStatus
} from "./profile-reducer";

export const testState = {
    profile: null,
    status: null,
    profileStatus: ProfileStatus.IDLE,
    posts: [
        {id: 1, text: "Hello React! It,s my first post!", likes: 20, comment: 5},
        {id: 2, text: "Second post! I`am find.", likes: 5, comment: 2},
        {id: 3, text: "How are your friends?", likes: 15, comment: 2},
    ],
    newPostText: 'test',
}

const testProfile = {
    userId: 10000,
    fullName: 'testName',
    photos: {
        small: 'small',
        large: 'large'
    },
    contacts: {
        github: null,
        vk: null,
        facebook: null,
        instagram: null,
        twitter: null,
        website: null,
        youtube: null,
        mainLink: null,
    },
    aboutMe: null,
    lookingForAJobDescription: null,
    lookingForAJob: false
}

describe('Profile-reducer tests', () => {
    it('Messages reducer with unknown action', () => {
        //@ts-ignore
        const result = profileReducer(testState, {type: 'UNKNOWN_REDUCER'})

        expect(result).toBe(testState)
    })
    it('Set profile', () => {
        const result = profileReducer(testState, setProfile(testProfile))

        expect(result.profile).toEqual(testProfile)
        expect(result).not.toBe(testState)
    })
    it('Set status', () => {
        const result = profileReducer(testState, setStatus('status'))

        expect(result.status).toBe('status')
        expect(result).not.toBe(testState)
    })
    it('Set profile init status', () => {
        const result = profileReducer(testState, setProfileInitStatus(ProfileStatus.LOADING))

        expect(result.profileStatus).toBe(ProfileStatus.LOADING)
        expect(result).not.toBe(testState)
    })
    it('Add post', () => {
        const result = profileReducer(testState, addPost())

        expect(result.posts.length).toBe(4)
        expect(result.posts[0].id).toBe(4)
        expect(result.posts[0].text).toBe('test')
        expect(result.posts[0].likes).toBe(0)
        expect(result.posts[0].comment).toBe(0)
        expect(result).not.toBe(testState)
    })
    it('Remove post', () => {
        const result = profileReducer(testState, removePost(2))

        expect(result.posts.length).toBe(2)
        expect(result.posts[1].text).toBe("How are your friends?")
        expect(result.posts.map(i => i.text)).not.toContain("Second post! I`am find.")
        expect(result).not.toBe(testState)
    })
    it('Change new post text', () => {
        const result = profileReducer(testState, changeNewPostText('new text'))

        expect(result.newPostText).toBe('new text')
        expect(result).not.toBe(testState)
    })
})