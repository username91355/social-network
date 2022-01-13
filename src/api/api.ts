import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        // 'api-key': 'a7116e67-1807-4b05-84ac-bacabf26edbb'
        'api-key': '6e713ecd-57df-4877-9a84-e619dbd38570'
    }
})

export const serverAPI = {

    me(): Promise<IResponse<IMe>> {
        return instance
            .get<IResponse<IMe>>('/auth/me')
            .then(res => res.data)
            .catch(err => err)
    },

    login(email: string, password: string, rememberMe: boolean, captcha: string | null): Promise<IResponse<{ userId: number }>> {
        return instance
            .post<IResponse<{ userId: number }>>('/auth/login', {email, password, rememberMe, captcha})
            .then(res => res.data)
            .catch(err => err)
    },

    logout(): Promise<IResponse> {
        return instance
            .delete<IResponse>('/auth/login')
            .then(res => res.data)
            .catch(err => err)
    },

    getCaptcha(): Promise<{ url: string }> {
        return instance
            .get<{ url: string }>('/security/get-captcha-url')
            .then(res => res.data)
            .catch(err => err)
    },

    getUsers(count: number, page: number, term: string, friend: boolean | null): Promise<IGetUser> {
        return instance
            .get<IGetUser>(`/users?count=${count}&page=${page}&term=${term}&friend=${friend}`)
            .then(res => res.data)
            .catch(err => err)
    },

    userIsFollowed(userId: number): Promise<boolean> {
        return instance
            .get<boolean>(`/follow/${userId}`)
            .then(res => res.data)
            .catch(err => err)
    },

    subscribeToUser(userId: number): Promise<IResponse> {
        return instance
            .post<IResponse>(`/follow/${userId}`, {})
            .then(res => res.data)
            .catch(err => err)
    },

    unsubscribeFromUser(userId: number): Promise<IResponse> {
        return instance
            .delete<IResponse>(`/follow/${userId}`)
            .then(res => res.data)
            .catch(err => err)
    },

    getProfile(userId: number): Promise<IProfile> {
        return instance
            .get<IProfile>(`/profile/${userId}`)
            .then(res => res.data)
            .catch(err => err)
    },

    getProfileStatus(userId: number): Promise<string> {
        return instance
            .get<string>(`/profile/status/${userId}`)
            .then(res => res.data)
            .catch(err => err)
    },

    setProfileStatus(status: string): Promise<IResponse> {
        return instance
            .put<IResponse>('/profile/status', {status})
            .then(res => res.data)
            .catch(err => err)
    },

    setProfileData(data: IProfile): Promise<IResponse> {
        return instance
            .put<IResponse>('/profile', {...data})
            .then(res => res.data)
            .catch(err => err)
    },

    setProfilePhoto(image: File): Promise<IResponse<IImages>>  {
        const formData = new FormData()
        formData.append('image', image)

        return instance
            .put<IResponse<IImages>>('/profile/photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => res.data)
            .catch(err => err)
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
    error: string | null
}

export interface IImages {
    large: string
    small: string
}

export interface IUser {
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