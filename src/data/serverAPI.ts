import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': '6e713ecd-57df-4877-9a84-e619dbd38570'
    }
})

export const usersAPI = {

    getUsers(count: number, page: number, term:string, friend:boolean) {
        return axiosInstance
            .get(`/users?count=${count}&page=${page}&term=${term}&friend=${friend}`)
    },

    follow(id: number) {
        return axiosInstance
            .post(`/follow/${id}`)
    },

    unfollow(id: number) {
        return axiosInstance
            .delete(`/follow/${id}`)
    }
}