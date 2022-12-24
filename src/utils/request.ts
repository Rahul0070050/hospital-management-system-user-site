import axios, { AxiosInstance } from 'axios'

export const request:AxiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true
})

// request.interceptors.request