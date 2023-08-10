import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isPublicPath = pathname === "/login" || pathname === "/signup" || pathname === "/";

    const token = request.cookies.get("token")?.value || ''

    if (isPublicPath && token) {
        // return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }   

    if (config.matcher.includes(pathname)) {
        return NextResponse.next();
    }

    return NextResponse.redirect("/login");
}

export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
        '/postevent'
    ],
};