/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "anime.nicovideo.jp",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
