import axios from 'axios'

const todoApi = axios.create({
    baseURL: 'https://6292d1a74e324aacf6dc841a.endapi.io',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})

todoApi.interceptors.request.use(
    (request) => {
        return request
    },
    null,
    { synchronous: true }
)

todoApi.interceptors.response.use(
    (response) => {
        // Dispatch any action on success
        return response
    },
    (error) => {
        if (error.response.status === 401) {
            // Add Logic to
            // 1. Redirect to login page or
            // 2. Request refresh token
        }
        return Promise.reject(error)
    }
)

export default todoApi
