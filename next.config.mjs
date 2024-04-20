/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.API_URL,
        SESSION_COOKIE_DAYS: process.env.SESSION_COOKIE_DAYS
    }
};

export default nextConfig;
