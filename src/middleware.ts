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
    const url = req.nextUrl
    const pathname = new URL(url).pathname

    const isAuthPage = pathname === '/login' || pathname === '/register'
    const isHomePage = pathname === '/'
    const isPublicPage = isHomePage || isAuthPage

    const sessionCookie = req.cookies.get(SessionService.COOKIE_NAME)
    
    const handleRedirect = () => {
        if (isPublicPage) {
            return NextResponse.next()
        }
        return NextResponse.redirect(new URL('/', req.url))
    }

    if (!sessionCookie) {
        return handleRedirect()
    }

    try {
        // Check if session is valid
        const sessionRequest = await fetch(new URL("/users/self", process.env.API_URL), {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${sessionCookie.value}`,
                "Content-Type": "application/json",
            }
        })

        if (!sessionRequest.ok) {
            return handleRedirect()
        }
    } catch (e) {
        return handleRedirect()
    }

    // Redirect to home if session is valid and url is an auth page
    if (isAuthPage) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    // Set a refreshed session cookie
    const response = NextResponse.next()
    response.cookies.set({
        name: SessionService.COOKIE_NAME,
        value: sessionCookie.value,
        expires: SessionService.getExpires()
    });
    return response
}