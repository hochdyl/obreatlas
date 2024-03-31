import type { NextRequest } from 'next/server'
import {NextResponse} from "next/server";
import {updateSession} from "@/services/SessionService";

/*
 * Match all request paths except for the ones starting with:
 * - api (API routes)
 * - _next/static (static files)
 * - _next/image (image optimization files)
 * - favicon.ico (favicon file)
 */
export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)'
}

export const middleware = async (request: NextRequest) => {
    const session = await updateSession(request)

    const isLoginPage = request.url.endsWith('/login');
    const isRegisterPage = request.url.endsWith('/register');

    if (session && (isLoginPage || isRegisterPage)) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    if (!session && (!isLoginPage && !isRegisterPage)) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return session
}

