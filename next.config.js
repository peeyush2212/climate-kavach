/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingIncludes: {
    "/api/download/sample": ["./data/sample/**/*"],
    "/api/download/premium": ["./data/premium/**/*"],
  },
};

module.exports = nextConfig;
