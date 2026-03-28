/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jratul-s3-bucket1.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
