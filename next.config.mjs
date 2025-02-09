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
          {
            source: "/portfolio-v2/:userId",
            destination: `${process.env.BASE_URL}/bundle/:userId/index.html`,
          },
        ]
    }
};

export default nextConfig;
