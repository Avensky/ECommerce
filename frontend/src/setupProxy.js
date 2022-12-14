const keys = require('./config/keys');
const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    ["/api"],
    createProxyMiddleware({
      target: keys.proxyTarget,
      changeOrigin: true,
    })
  );
};
