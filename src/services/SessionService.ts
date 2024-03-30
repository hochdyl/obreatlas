'use server'
import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";

const SESSION_COOKIE_NAME = 'session'

export const getSession = async () => {
    return cookies().get(SESSION_COOKIE_NAME)?.value;
}

export const setSession = async (apiToken: string) => {
    cookies().set({
        name: SESSION_COOKIE_NAME,
        value: apiToken,
        httpOnly: true,
        expires: await getExpires()
    })
}

export const deleteSession = async () => {
    cookies().delete(SESSION_COOKIE_NAME)
}

export const updateSession = async (request: NextRequest) => {
    const session = request.cookies.get(SESSION_COOKIE_NAME)
    if (!session) {
        return
    }

    const res = NextResponse.next()
    res.cookies.set({
        name: SESSION_COOKIE_NAME,
        value: session.value,
        httpOnly: true,
        expires: await getExpires()
    });
    return res
}

const getExpires = async () => {
    const seconds = parseInt(process.env.SESSION_EXPIRES ?? '0')
    const expires = Date.now() + seconds * 1000
    return new Date(expires)
}