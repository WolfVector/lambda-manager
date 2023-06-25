/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/verify-user/",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "http://localhost:3000" }
        ]
      }
    ]
  }
}

module.exports = nextConfig
