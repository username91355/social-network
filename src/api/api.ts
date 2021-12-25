import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'api-key': 'a7116e67-1807-4b05-84ac-bacabf26edbb'
    }
})

export const serverAPI = {

    me(): Promise<IResponse<IMe>> {
        return instance
            .get<IResponse<IMe>>('/auth/me')
            .then(res => res.data)
    },

    login(email: string, password: string, rememberMe: boolean, captcha: boolean): Promise<IResponse<{ userId: number }>> {
        return instance
            .post<IResponse<{ userId: number }>>('/auth/login', {email, password, rememberMe, captcha})
            .then(res => res.data)
    },

    logout(): Promise<IResponse> {
        return instance
            .delete<IResponse>('/auth/login')
            .then(res => res.data)
    },

    getCaptcha(): Promise<{ url: string }> {
        return instance
            .get<{ url: string }>('/security/get-captcha-url')
            .then(res => res.data)
    },

    getUsers(count: number, page: number, term: string, friend: boolean | null): Promise<IGetUser> {
        return instance
            .get<IGetUser>(`/users?count=${count}&page=${page}&term=${term}&friend=${friend}`)
            .then(res => res.data)
    },

    userIsFollowed(userId: number): Promise<boolean> {
        return instance
            .get<boolean>(`/follow/${userId}`)
            .then(res => res.data)
    },

    subscribeToUser(userId: number): Promise<IResponse> {
        return instance
            .post<IResponse>(`/follow/${userId}`, {})
            .then(res => res.data)
    },

    unsubscribeFromUser(userId: number): Promise<IResponse> {
        return instance
            .delete<IResponse>(`/follow/${userId}`)
            .then(res => res.data)
    },

    getProfile(userId: number): Promise<IProfile> {
        return instance
            .get<IProfile>(`/profile/${userId}`)
            .then(res => res.data)
    },

    setProfileData(data: IProfile): Promise<IResponse> {
        return instance
            .put<IResponse>('/profile', {...data})
            .then(res => res.data)
    },

    getProfileStatus(userId: number): Promise<string> {
        return instance
            .get<string>(`/profile/status/${userId}`)
            .then(res => res.data)
    },

    setProfileStatus(status: string): Promise<IResponse> {
        return instance
            .put<IResponse>('/profile/status', {status})
            .then(res => res.data)
    },

    setProfilePhoto(image: File): Promise<IResponse> {
        const formData = new FormData()
        formData.append('image', image)

        return instance
            .put<IResponse>('/profile/photo', image, {headers: {'ContentType': 'multipart/form-data'}})
            .then(res => res.data)
    },

}

//Types
interface IResponse<D = {}> {
    data: D
    resultCode: number
    messages: string[]
}

export interface IMe {
    id: number
    email: string
    login: string
}

interface IGetUser {
    items: IUser[]
    totalCount: number
    error: string
}

interface IUser {
    id: number
    name: string
    status: string
    photos: {
        small: string
        large: string
    }
    followed: boolean
}

export interface IProfile {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string
    aboutMe: string | null
    contacts: {
        github: string | null
        vk: string | null
        facebook: string | null
        instagram: string | null
        twitter: string | null
        website: string | null
        youtube: string | null
        mainLink: string | null
    }
    photos: {
        small: string | null
        large: string | null
    }
}