import type { NextRequest } from 'next/server'
import {NextResponse} from "next/server";
import {updateSession} from "@/services/SessionService";

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico|login|register).*)'
}

export const middleware = async (request: NextRequest) => {
    const session = await updateSession(request)

    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return session
}

