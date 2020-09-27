const proxy = require('http-proxy-middleware');

const router = {
  '/api/one/': 'https://gate.dev.tripi.vn/tripione',
};

module.exports = function (app) {
  app.use(
    proxy('/api/one/', {
      target: 'https://gate.dev.tripi.vn/tripione',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api/one/': '/',
      },
      router,
      logLevel: 'debug',
    }),
  );
};
