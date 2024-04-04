// next.config.js
module.exports = {
  async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://127.0.0.1:4000/document/:path*',
        },
      ]
    },
};