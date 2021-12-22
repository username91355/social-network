import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'api-key': '2210e44f-8020-4c85-818f-e411c0b324dc',
    }
})

export const serverAPI = {

    me(): Promise<IResponse<IMe>> {
        return instance
            .get<IResponse<IMe>>('/auth/me')
            .then(res => res.data)
    },

    login(email: string, password: string, rememberMe: boolean, captcha: boolean = false): Promise<IResponse<TUserID>> {
        return instance
            .post<IResponse<TUserID>>('/auth/login', {email,password,rememberMe,captcha})
            .then(res => res.data)
    },

    logout(): Promise<IResponse> {
        return instance
            .delete<IResponse>('/auth/login')
            .then(res => res.data)
    },

    getUser(count: number, page: number, term: string, friend: boolean | null = null): Promise<IGetUserResponse> {
        return instance
            .get<IGetUserResponse>(`/users?count=${count}&page=${page}&term=${term}&friend=${friend}`)
            .then(res => res.data)
    }
}

interface IResponse<T = {}> {
    data: T,
    messages: string[],
    fieldsErrors?: string[],
    resultCode: number
}

export interface IMe {
    id:number
    login:string
    email:string
}

type TUserID = { id: number }

interface IGetUserResponse {
    items: User[]
    totalCount: number
    error: string | null
}

export interface User {
    name: string
    id: number
    uniqueUrlName: string | null,
    photos: {
        small: string | null,
        large: string | null
    },
    status: string | null,
    followed: boolean
}
