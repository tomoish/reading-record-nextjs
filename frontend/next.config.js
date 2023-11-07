/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "iss.ndl.go.jp",
      },
      {
        protocol: "https",
        hostname: "cover.openbd.jp",
      },
    ],
  },
  env: {
    API_URL: process.env.API_URL,
    guest_email: process.env.guest_email,
    guest_password: process.env.guest_password,
  },
};

module.exports = nextConfig;
