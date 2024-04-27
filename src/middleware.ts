import type {NextRequest} from 'next/server'
import {NextResponse} from "next/server";
import SessionService from "@/services/SessionService";

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

export const middleware = async (req: NextRequest) => {
    const isLoginPage = req.url.endsWith('/login');
    const isRegisterPage = req.url.endsWith('/register');
    const sessionCookie = req.cookies.get(SessionService.COOKIE_NAME)

    const redirectToLogin = () => {
        if (isLoginPage || isRegisterPage) return

        return NextResponse.redirect(new URL('/login', req.url))
    }

    if (!sessionCookie)
        return redirectToLogin()

    try {
        // Check if session is valid
        const sessionRequest = await fetch(new URL("/users/self", process.env.API_URL), {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${sessionCookie.value}`,
                "Content-Type": "application/json",
            }
        });

        if (!sessionRequest.ok)
            return redirectToLogin()
    } catch (e) {
        return redirectToLogin()
    }

    // Redirect to app if session is okay
    if (isLoginPage || isRegisterPage)
        return NextResponse.redirect(new URL('/', req.url))

    // Set a refreshed session cookie
    const response = NextResponse.next()
    response.cookies.set({
        name: SessionService.COOKIE_NAME,
        value: sessionCookie.value,
        expires: SessionService.getExpires()
    });
    return response
}