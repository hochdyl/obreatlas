/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.API_URL,
        API_HOSTNAME: process.env.API_HOSTNAME,
        API_PORT: process.env.API_PORT,
        UPLOAD_PATH: process.env.UPLOAD_PATH,
        SESSION_COOKIE_DAYS: process.env.SESSION_COOKIE_DAYS
    },
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: process.env.API_HOSTNAME,
                port: process.env.API_PORT,
                pathname: '/uploads/*'
            }
        ]
    }
}
export default nextConfig;
