/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "7777",
        pathname: "/local-files/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "7777",
        pathname: "/uploadedFiles/**",
      },
      {
        protocol: "https",
        hostname: "l2srv-backend.a-demidenko.ru",
        port: "",
        pathname: "/uploadedFiles/**",
      },
      {
        protocol: "https",
        hostname: "l2srv-backend.a-demidenko.ru",
        port: "",
        pathname: "/tmp/**",
      },
    ],
  },
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(js|ts)x?$/],
      },

      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
