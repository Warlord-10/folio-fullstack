import { NextResponse } from 'next/server'

export function middleware(request) {
    const { pathname } = request.nextUrl

    // Check if the request is for /portfolio-v2/
    if (pathname.startsWith('/portfolio-v2/')) {
        // Extract the userId from the path: /portfolio-v2/[userId]
        const parts = pathname.split('/')
        const userId = parts[2]

        if (userId) {
            // Construct the target URL for the backend bundle
            // Pattern: /bundle/[userId]/index.html
            const targetUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/bundle/${userId}/index.html`

            // Rewrite the request to the external URL
            return NextResponse.rewrite(new URL(targetUrl))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/portfolio-v2/:path*',
}
