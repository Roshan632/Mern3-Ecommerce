import axios from 'axios'
import { toast } from 'react-toastify'

export const getBackendBaseUrl = () =>
    ((import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:3000')
        .replace(/\/$/, '')
        .replace(/\/api$/i, '')

const apiBaseUrl = getBackendBaseUrl()

export function getMediaUrl(path?: string | null) {
    if (!path) return ''
    if (/^(https?:)?\/\//i.test(path) || path.startsWith('data:')) return path

    const normalizedPath = path
        .replace(/\\/g, '/')
        .replace(/^\/?(?:src\/)?uploads\//i, '')
        .replace(/^\/+/, '')
    return `${apiBaseUrl}/${normalizedPath}`
}

const API = axios.create({
    baseURL : `${apiBaseUrl}/api`, 
    headers : {
        "Content-Type" : "application/json", 
        "Accept" : "application/json" 
    }
})

const APIWITHTOKEN = axios.create({
    baseURL : `${apiBaseUrl}/api`, 
    headers : {
        "Content-Type" : "application/json", 
        "Accept" : "application/json"
    }
})

APIWITHTOKEN.interceptors.request.use((config) => {
    const token = localStorage.getItem("tokenHoYo")
    if (token && config.headers) {
        // send as Bearer token so backend authorization middleware recognizes it
        config.headers.Authorization = `Bearer ${token}`
    }
    if (import.meta.env.DEV) {
        try {
            // log auth header for debugging in dev
            // eslint-disable-next-line no-console
            console.debug('[API] Request', config.method, config.url, 'Authorization=', config.headers?.Authorization)
        } catch (e) {}
    }
    return config
})

// handle auth failures globally (show one toast and clear local token once)
let authFailureHandled = false
APIWITHTOKEN.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status
        const config = error?.config
        // If 403, try one retry with raw token (no 'Bearer ') in case backend expects raw token
        if (status === 403 && config && !config._retry) {
            config._retry = true
            const rawToken = localStorage.getItem('tokenHoYo')
            if (rawToken && config.headers) {
                config.headers.Authorization = rawToken
            }
            return axios(config)
        }

        if ((status === 401 || status === 403) && !authFailureHandled) {
            authFailureHandled = true
            // clear stored token to force client-side logout
            localStorage.removeItem('tokenHoYo')
            // dynamically import store & logout to avoid circular static imports
            void (async () => {
                try {
                    const storeMod = await import('../store/store')
                    const authMod = await import('../store/authSlice')
                    storeMod.default.dispatch(authMod.logout())
                } catch (e) {
                    // ignore dynamic import failures
                }
            })()
            toast.error(error?.response?.data?.message ?? 'Session expired. Please login.')
        }
        return Promise.reject(error)
    }
)

export {API,APIWITHTOKEN}

