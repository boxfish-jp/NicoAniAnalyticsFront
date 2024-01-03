/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
    esmExternals: false,
  },
};

module.exports = nextConfig;
