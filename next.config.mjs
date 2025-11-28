/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  reactStrictMode: false,
  logging: {
    fetches: {
      fullUrl: true
    }
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
