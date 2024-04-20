import {deleteCookie, getCookie, setCookie} from "cookies-next";

export const SESSION_COOKIE_NAME = 'session'

export const getSession = () => getCookie(SESSION_COOKIE_NAME)

export const setSession = (data: string) => setCookie(SESSION_COOKIE_NAME, data, {expires: getExpires()})

export const deleteSession = () => deleteCookie(SESSION_COOKIE_NAME)

export const getExpires = () => {
    const days = parseInt(process.env.SESSION_EXPIRES ?? '0')
    const expires = Date.now() + days * 24 * 60 * 1000
    return new Date(expires)
}