//ActionsTypes
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const ADD_POST = 'ADD_POST'
const REMOVE_POST = 'REMOVE_POST'
const CHANGE_POST_TEXT_AREA = 'CHANGE_POST_TEXT_AREA'

//ActionCreator
export const login = () => ({type: LOGIN} as const)
export const logout = () => ({type: LOGOUT} as const)
export const addPost = () => ({type: ADD_POST} as const)
export const removePost = (id: number) => ({type: REMOVE_POST, id} as const)
export const changePostTextArea = (text: string) => ({type: CHANGE_POST_TEXT_AREA, text} as const)

//Types
type StateType = {
    isInitializationUser: boolean
    userData: UserDataType
    posts: Array<PostType>
    newPostAreaValue: string
}
export type PostType = {
    id: number
    author: string
    text: string
    likes: number
    comments: number
}
export type ContactsType  = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}
export type UserDataType = {
    userId: number | null
    lookingForAJob: boolean | null
    lookingForAJobDescription: string | null
    fullName: string | null
    contacts: ContactsType
    photos: {
        small: string | null,
        large: string | null
    }
}
type GeneralACType = LoginACType | LogoutACType | AddPostACType | RemoveACType | ChangePostACType
type LoginACType = ReturnType<typeof login>
type LogoutACType = ReturnType<typeof logout>
type AddPostACType = ReturnType<typeof addPost>
type RemoveACType = ReturnType<typeof removePost>
type ChangePostACType = ReturnType<typeof changePostTextArea>

//State
const initialState = {
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

//Reducer
export const profileReducer = (state: StateType = initialState, action: GeneralACType) => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                isInitializationUser: true
            }
        }

        case LOGOUT: {
            return {
                ...state,
                isInitializationUser: false
            }
        }

        case ADD_POST: {

            const allMessageID = [...state.posts.map( p => p.id)]
            let newID = 1

            const generateID = (id: number): number => {
                return (allMessageID.some(i => +i === +id))
                    ? generateID(id+1)
                    : id
            }
            return {
                ...state,
                posts: [{
                    id: generateID(newID),
                    author: 'Alice',
                    text: state.newPostAreaValue,
                    likes: 0,
                    comments: 0
                }, ...state.posts],
                newPostAreaValue: ''
            }
        }

        case REMOVE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.id)
            }
        }

        case CHANGE_POST_TEXT_AREA: {
            return {
                ...state,
                newPostAreaValue: action.text
            }
        }

        default: {
            return state
        }
    }
}