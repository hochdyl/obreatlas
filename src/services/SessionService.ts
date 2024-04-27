import {deleteCookie, getCookie, setCookie} from "cookies-next";
import moment from "moment";

abstract class SessionService {
    static COOKIE_NAME = 'sessionToken'

    static getSession = () => getCookie(this.COOKIE_NAME)

    static startSession = (data: string) => setCookie(this.COOKIE_NAME, data, {expires: this.getExpires()})

    static closeSession = () => deleteCookie(this.COOKIE_NAME)

    static getExpires = () => {
        const days = parseInt(process.env.SESSION_COOKIE_DAYS ?? '0')
        return moment().add(days, 'days').toDate()
    }
}

export default SessionService