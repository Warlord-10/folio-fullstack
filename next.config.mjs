// Backend host for next/image remotePatterns (avatars/banners are served from there)
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ? new URL(process.env.NEXT_PUBLIC_BACKEND_URL) : null;

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  reactStrictMode: false,
  logging: {
    fetches: {
      fullUrl: true
    }
  },

  images: {
    // ponytail: optimize in prod, pass-through in dev — the dev backend uses a self-signed
    // cert (localhost:3005), which the image optimizer can't fetch over TLS. Flip if dev TLS is fixed.
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: backendUrl
      ? [{ protocol: backendUrl.protocol.replace(':', ''), hostname: backendUrl.hostname, port: backendUrl.port || '' }]
      : [],
  },

  rewrites: async () => {
    return [
      // Routing the page to the bundle
      // Middleware handles /portfolio-v2/:userId -> backend bundle

      // Routing all the backend APIs to the backend server
      {
        source: "/backend/:path*",
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/:path*`,
      }
    ]
  }
};

export default nextConfig;
