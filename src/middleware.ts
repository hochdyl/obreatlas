import type { NextRequest } from 'next/server'
import {NextResponse} from "next/server";
import {updateSession} from "@/services/SessionService";

/*
 * Match all request paths except for the ones starting with:
 * - api (API routes)
 * - login
 * - register
 * - _next/static (static files)
 * - _next/image (image optimization files)
 * - favicon.ico (favicon file)
 */
export const config = {
    matcher: '/((?!api|login|register|_next/static|_next/image|favicon.ico).*)'
}

export const middleware = async (request: NextRequest) => {
    const session = await updateSession(request)

    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return session
}

