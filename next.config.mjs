/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.API_URL,
        SESSION_EXPIRES: process.env.SESSION_EXPIRES
    }
};

export default nextConfig;
