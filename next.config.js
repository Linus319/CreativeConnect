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
    //       allowedOrigins: ["gloomy-broomstick-979jg9j7r4p395gj-3000.app.github.dev", "localhost:3000"]
    //     }
    //   },
};

module.exports = nextConfig;
