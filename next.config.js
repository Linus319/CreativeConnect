/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'skhxtmjbcfmytgqgdayj.supabase.co',
                search: '',
            },
        ],
        
    },
    experimental: {
        serverActions: {
          allowedOrigins: ["studious-carnival-v6vqjvq69qghp67r.github.dev", "localhost:3000"]
        }
    },
};

module.exports = nextConfig;
