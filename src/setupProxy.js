const proxy = require('http-proxy-middleware');

const router = {
  '/api/general': 'https://dev-api.tripi.vn',
  '/api/account': 'https://dev-api.tripi.vn',
};

// eslint-disable-next-line func-names
module.exports = function (app) {
  app.use(
    proxy('/api/', {
      target: 'https://dev-api.tripi.vn',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api/general/': '/',
        '^/api/account/': '/',
      },
      router,
      logLevel: 'debug',
    }),
  );
};
