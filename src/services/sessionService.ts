import {deleteCookie, getCookie, setCookie} from "cookies-next";

abstract class SessionService {
    static COOKIE_NAME = 'session'

    static getSession = () => getCookie(this.COOKIE_NAME)

    static openSession = (data: string) => setCookie(this.COOKIE_NAME, data, {expires: this.getExpires()})

    static closeSession = () => deleteCookie(this.COOKIE_NAME)

    static getExpires = () => {
        const days = parseInt(process.env.SESSION_COOKIE_DAYS ?? '0')
        const expires = Date.now() + days * 24 * 60 * 60 * 1000
        return new Date(expires)
    }
}
export default SessionService