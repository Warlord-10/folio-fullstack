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
          {
            source: "/portfolio-v2/:userId",
            destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/bundle/:userId/index.html`,
          },
          
          // Routing all the backend APIs to the backend server
          {
            source: "/backend/:path*",
            destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/:path*`,
          }
        ]
    }
};

export default nextConfig;
