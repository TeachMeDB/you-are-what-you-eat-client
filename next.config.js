const withImages = require('next-images');

const redirects = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true
      }
    ];
  }
};

module.exports = withImages(redirects);
