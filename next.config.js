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
    //       allowedOrigins: ["ubiquitous-funicular-pjrp5rpjwv5397j4-3000.app.github.dev", "localhost:3000"]
    //     }
    //   },
};

module.exports = nextConfig;
