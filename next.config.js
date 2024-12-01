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
    // experimental: {
    //     serverActions: {
    //       allowedOrigins: ["supreme-space-waffle-r4gp5gp45xrcwpv6.github.dev", "localhost:3000"]
    //     }
    // },
};

module.exports = nextConfig;
