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
};

module.exports = nextConfig;
