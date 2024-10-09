import type { NextRequest } from 'next/server'
import * as jose from 'jose'

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('auth_token')?.value
    if (token) {
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET || '')
            const { payload } = await jose.jwtVerify(token, secret)
            if(request.nextUrl.pathname === '/'){
                return Response.redirect(new URL('/dashboard', request.url))
            }
        } catch (error) {
            request.cookies.clear()
            return Response.redirect(new URL('/', request.url))
        }
    } else {
        if (request.nextUrl.pathname.startsWith('/dashboard')) {
            return Response.redirect(new URL('/', request.url))
        }
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}