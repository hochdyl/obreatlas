import {NextRequest, NextResponse} from "next/server";

export function middleware(request: NextRequest): NextResponse
{
    const response = NextResponse.next()
    const authenticationPages = ['/register', '/login']


    if (authenticationPages.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return response
}

export const config = {
    matcher: ['/register/:path*', '/login/:path*']
}