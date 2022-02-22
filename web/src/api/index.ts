import axios from 'axios'

export const Api = axios.create({
	baseURL: process.env.REACT_APP_API,
	timeout: 10000,
	withCredentials: true,
})

