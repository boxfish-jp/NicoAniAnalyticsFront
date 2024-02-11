/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "anime.nicovideo.jp",
        port: "",
      },
      {
        protocol: "https",
        hostname: "nicovideo.cdn.nimg.jp",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
