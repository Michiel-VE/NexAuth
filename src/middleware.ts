import {NextRequest, NextResponse} from 'next/server';
import {getToken} from "next-auth/jwt";


const protectedRoutes = ["/user"]

export default async function middleware(request: NextRequest) {
    const token = await getToken({req: request, secret: process.env.NEXTAUTH_SECRET});
    const {pathname} = request.nextUrl

    const isProtected = protectedRoutes.some((route) => {
        return pathname.startsWith(route)
    })

    if (isProtected && !token) {
        return NextResponse.redirect(new URL(process.env.NEXTAUTH_URL + "/login"), request.url)
    }

    if (request.nextUrl.pathname === '/login' && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }


    return NextResponse.next();
}
