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

    login(email: string, password: string, rememberMe: boolean, captcha: boolean = false): Promise<IResponse<IUserID>> {
        return instance
            .post<IResponse<IUserID>>('/auth/login', {email,password,rememberMe,captcha})
            .then(res => res.data)
    },

    logout(): Promise<IResponse> {
        return instance
            .delete<IResponse>('/auth/login')
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

type IUserID = { id: number }