import { NextResponse } from 'next/server'

export async function middleware(request) {
    const { pathname } = request.nextUrl

    const accessToken = request.cookies.get('accessToken')
    const refreshToken = request.cookies.get('refreshToken')
    const finalRes = NextResponse.next()


    // For each request, check if the access token is expired
    // If the access token is expired, refresh it using the refresh token
    if (!accessToken && refreshToken) {
        console.log("Middleware: Access Token is expired, Refreshing...")
        try {
            const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
                method: "POST",
                headers: {
                    "Cookie": `refreshToken=${refreshToken.value}`,
                },
            });

            if (refreshRes.ok) {
                // getSetCookie() returns each Set-Cookie as its own string — safe to parse.
                // The old .split(',') broke on the comma inside `Expires=Wed, 09 Jun...`.
                const setCookies = refreshRes.headers.getSetCookie();

                // Parse the new access token to pass it to the CURRENT request
                // This ensures the Server Component gets the new token immediately
                const newAccessToken = setCookies
                    .find(c => c.startsWith('accessToken='))
                    ?.split(';')[0]
                    ?.split('=')[1];

                if (newAccessToken) {
                    // Inject the new token into the request that will be processed by the app
                    request.cookies.set('accessToken', newAccessToken);

                    // Create the response using the MODIFIED request
                    const nextRes = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });

                    // Also set each cookie on the response so the browser saves them
                    setCookies.forEach(c => nextRes.headers.append("set-cookie", c));

                    return nextRes;
                }
            }
        } catch (error) {
            finalRes.headers.set("set-cookie", "")
            console.error("Middleware: Failed to refresh token", error);
        }
    }

    // Check if the request is for /portfolio-v2/
    if (pathname.startsWith('/portfolio-v2/')) {
        const parts = pathname.split('/')
        const userId = parts[2]

        if (userId) {
            const targetUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/bundle/${userId}/index.html`
            return NextResponse.rewrite(new URL(targetUrl))
        }
    }

    return finalRes
}

export const config = {
    matcher: [
        '/portfolio-v2/:path*',
        '/:path*',
    ]
}
