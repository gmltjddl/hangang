const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );

  app.use(
    '/feed',
    createProxyMiddleware({
      target: 'http://api.waqi.info',
      changeOrigin: true,
    })
  );

  app.use(
    '/1360000',
    createProxyMiddleware({
      target: 'http://apis.data.go.kr',
      changeOrigin: true,
    })
  );
};
